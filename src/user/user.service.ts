import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './DTO/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async generateHashedPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  // TODO: validate email and phoneNumber has not been used
  async createUser(userData: CreateUserDto): Promise<User> {
    const hash = await this.generateHashedPassword(userData.password);
    return this.prisma.user.create({
      data: {
        ...userData,
        password: hash,
        character: {
          create: {
            gender: userData.gender,
          },
        },
      },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async updatePassword(email: string, password: string) {
    const hash = await this.generateHashedPassword(password);
    return this.prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hash,
      },
    });
  }

  async getUserLastLogin(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        lastLoginAt: true,
      },
    });
  }

  async updateUserLastLogin(email: string) {
    return this.prisma.user.update({
      where: {
        email,
      },
      data: {
        lastLoginAt: new Date(),
      },
    });
  }

  async getUserLoginCount(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        loginCount: true,
      },
    });
  }

  async updateUserLoginCount(email: string) {
    return this.prisma.user.update({
      where: {
        email,
      },
      data: {
        loginCount: {
          increment: 1,
        },
      },
    });
  }

  async getUserMoney(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        money: true,
      },
    });
  }

  async updateUserMoney(email: string, money: number) {
    const deposit = (await this.getUserMoney(email)).money;
    const newMoney = deposit + money;
    if (newMoney < 0) {
      throw new HttpException('Not enough money', 400);
    }
    return this.prisma.user.update({
      where: {
        email,
      },
      data: {
        money: newMoney,
      },
      select: {
        money: true,
      },
    });
  }
}
