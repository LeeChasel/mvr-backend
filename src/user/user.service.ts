import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './DTO/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // TODO: validate email and phoneNumber has not been used
  async createUser(userData: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(userData.password, saltOrRounds);
    return this.prisma.user.create({
      data: {
        ...userData,
        password: hash,
        character: {
          create: {
            gender: userData.gender,
          },
        },
        ownedItem: {
          create: {},
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
}
