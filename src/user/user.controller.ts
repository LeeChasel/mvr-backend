import { UserService } from './user.service';
import * as moment from 'moment';

import {
  Body,
  Controller,
  Get,
  HttpException,
  Patch,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LoginDto } from './DTO/login.dto';
import { UpdateMoneyDto } from './DTO/update-money.dto';
import { UpdatePasswordDto } from './DTO/update-password.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Register a new user account' })
  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'The user account has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Email or phone number has been used.',
  })
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

  @ApiOperation({ summary: 'Login' })
  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully logged in.',
  })
  @ApiResponse({
    status: 401,
    description: 'Email or password is incorrect.',
  })
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

  @ApiOperation({ summary: "Get user's basic information" })
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get user info successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  async getUserInfo(@Request() req: { user: { email: string } }) {
    const user = await this.userService.findUserByEmail(req.user.email);
    delete user.password;
    return user;
  }

  @ApiOperation({ summary: 'Change password' })
  @UseGuards(JwtAuthGuard)
  @Patch('password')
  @ApiResponse({
    status: 200,
    description: 'Change password successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
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

  @ApiOperation({ summary: 'Get the number of user logins' })
  @UseGuards(JwtAuthGuard)
  @Get('loginCount')
  @ApiResponse({
    status: 200,
    description: 'Get login count successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  async getLoginCount(@Request() req: { user: { email: string } }) {
    return this.userService.getUserLoginCount(req.user.email);
  }

  @ApiOperation({ summary: "Get user's money amount" })
  @UseGuards(JwtAuthGuard)
  @Get('money')
  @ApiResponse({
    status: 200,
    description: 'Get money amount successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  async getMoney(@Request() req: { user: { email: string } }) {
    return this.userService.getUserMoney(req.user.email);
  }

  @ApiOperation({ summary: "Update user's money amount" })
  @UseGuards(JwtAuthGuard)
  @Patch('money')
  @ApiResponse({
    status: 200,
    description: 'Update money amount successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  async updateMoney(
    @Request() req: { user: { email: string } },
    @Body() body: UpdateMoneyDto,
  ) {
    return this.userService.updateUserMoney(req.user.email, body.money);
  }
}
