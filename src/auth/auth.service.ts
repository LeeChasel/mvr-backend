import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/user/DTO/login.dto';

type ReturnUserType = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<ReturnUserType | null> {
    const user = await this.userService.findUserByEmail(email);
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user;
        return rest;
      }
    }
    return null;
  }

  async login(userData: LoginDto) {
    const payload = { email: userData.email, password: userData.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
