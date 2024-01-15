import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CharacterService {
  constructor(private prismaService: PrismaService) {}

  async getCharacter(email: string) {
    return this.prismaService.character.findUnique({
      where: {
        userEmail: email,
      },
    });
  }
}
