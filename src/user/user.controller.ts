import { UserService } from './user.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import * as moment from 'moment';

import {
  Body,
  Controller,
  Get,
  HttpException,
  Patch,
  Post,
  Request,
  StreamableFile,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LoginDto } from './DTO/login.dto';
import { UpdateMoneyDto } from './DTO/update-money.dto';
import { UpdatePasswordDto } from './DTO/update-password.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserInfo(@Request() req: { user: { email: string } }) {
    const user = await this.userService.findUserByEmail(req.user.email);
    delete user.password;
    return user;
  }

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const userByEmail = await this.userService.findUserByEmail(body.email);
    const userByPhoneNumber = await this.userService.findUserByPhoneNumber(
      body.phoneNumber,
    );

    if (userByEmail) {
      throw new HttpException(`Email: ${body.email} has been used`, 400);
    } else if (userByPhoneNumber) {
      throw new HttpException(
        `Phone number: ${body.phoneNumber} has been used`,
        400,
      );
    }

    return this.userService.createUser(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const jwt = await this.authService.login(body);
    const lastLoginAt = (await this.userService.getUserLastLogin(body.email))
      .lastLoginAt;

    moment.locale('zh-tw');
    if (!moment(lastLoginAt).isSame(moment(), 'days')) {
      await this.userService.updateUserLastLogin(body.email);
      await this.userService.updateUserLoginCount(body.email);
    }
    return jwt;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('password')
  async updatePassword(
    @Request() req: { user: { email: string } },
    @Body() body: UpdatePasswordDto,
  ) {
    const user = await this.authService.validateUser(
      req.user.email,
      body.oldPassword,
    );
    if (!user) {
      throw new UnauthorizedException('Old password is incorrect');
    }
    return this.userService.updatePassword(req.user.email, body.newPassword);
  }

  @UseGuards(JwtAuthGuard)
  @Get('loginCount')
  async getLoginCount(@Request() req: { user: { email: string } }) {
    return this.userService.getUserLoginCount(req.user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('money')
  async getMoney(@Request() req: { user: { email: string } }) {
    return this.userService.getUserMoney(req.user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('money')
  async updateMoney(
    @Request() req: { user: { email: string } },
    @Body() body: UpdateMoneyDto,
  ) {
    return this.userService.updateUserMoney(req.user.email, body.money);
  }

  @Get('file')
  test(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  }
}
