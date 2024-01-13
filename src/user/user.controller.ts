import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LoginDto } from './DTO/login.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() body: CreateUserDto) {
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
    if (
      new Date(lastLoginAt).toLocaleDateString() !==
      new Date().toLocaleDateString()
    ) {
      await this.userService.updateUserLastLogin(body.email);
      await this.userService.updateUserLoginCount(body.email);
    }
    return jwt;
  }

  @UseGuards(JwtAuthGuard)
  @Get('loginCount')
  async getLoginCount(@Request() req: { user: { email: string } }) {
    return this.userService.getUserLoginCount(req.user.email);
  }
}
