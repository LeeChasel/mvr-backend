import { UserService } from './user.service';
import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {}

  @Get()
  getTest(): string {
    const value = this.configService.get('DATABASE_URL');
    // const a = process.env.NODE_ENV;
    return value;
  }

  @Get(':username')
  async getUserByUsername(
    @Res() res: Response,
    @Param('username') username: string,
  ) {
    //  res.status(HttpStatus.OK).json([]);
    // res.status(HttpStatus.CREATED).send();

    // res.status(HttpStatus.NOT_FOUND).json({ message: 'Hello World!' });
    const t = await this.userService.findOne(username);
    if (t) {
      res.json(t);
    } else {
      res.status(HttpStatus.NOT_FOUND).send();
    }
  }
  // getUserInfo(): string {
  //   return this.userService.getUserInfo();
  // }
}
