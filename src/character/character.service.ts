import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCharacterDto } from './DTO/update-characterd.dto';

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

  async updateCharacter(email: string, updateData: UpdateCharacterDto) {
    return this.prismaService.character.update({
      where: {
        userEmail: email,
      },
      data: {
        ...updateData,
      },
    });
  }

  async findInstrument(instrumentName: string) {
    const instrument = await this.prismaService.instrument.findUnique({
      where: {
        name: instrumentName,
      },
    });

    if (!instrument) {
      throw new HttpException(
        `Instrument: ${instrumentName} not found in database`,
        404,
      );
    }
    return instrument;
  }

  async getInstruments(email: string) {
    return this.prismaService.character.findUnique({
      where: {
        userEmail: email,
      },
      select: {
        instruments: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async updateInstruments(email: string, instruments: string[]) {
    return this.prismaService.character.update({
      where: {
        userEmail: email,
      },
      data: {
        instruments: {
          connect: instruments.map((instrument) => ({ name: instrument })),
        },
      },
      select: {
        instruments: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findClothing(clothingName: string) {
    const clothing = await this.prismaService.clothing.findUnique({
      where: {
        name: clothingName,
      },
    });

    if (!clothing) {
      throw new HttpException(
        `Clothing: ${clothingName} not found in database`,
        404,
      );
    }
    return clothing;
  }

  async getClothings(email: string) {
    return this.prismaService.character.findUnique({
      where: {
        userEmail: email,
      },
      select: {
        clothings: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async updateClothings(email: string, clothings: string[]) {
    return this.prismaService.character.update({
      where: {
        userEmail: email,
      },
      data: {
        clothings: {
          connect: clothings.map((clothing) => ({ name: clothing })),
        },
      },
      select: {
        clothings: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findFurniture(furnitureName: string) {
    const furniture = await this.prismaService.furniture.findUnique({
      where: {
        name: furnitureName,
      },
    });

    if (!furniture) {
      throw new HttpException(
        `Furniture: ${furnitureName} not found in database`,
        404,
      );
    }
    return furniture;
  }

  async getFurnitures(email: string) {
    return this.prismaService.character.findUnique({
      where: {
        userEmail: email,
      },
      select: {
        furnitures: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async updateFurnitures(email: string, furnitures: string[]) {
    return this.prismaService.character.update({
      where: {
        userEmail: email,
      },
      data: {
        furnitures: {
          connect: furnitures.map((furniture) => ({ name: furniture })),
        },
      },
      select: {
        furnitures: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async deleteInstruments(email: string, instruments: string[]) {
    return this.prismaService.character.update({
      where: {
        userEmail: email,
      },
      data: {
        instruments: {
          disconnect: instruments.map((instrument) => ({ name: instrument })),
        },
      },
      select: {
        instruments: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async deleteClothings(email: string, clothings: string[]) {
    return this.prismaService.character.update({
      where: {
        userEmail: email,
      },
      data: {
        clothings: {
          disconnect: clothings.map((clothing) => ({ name: clothing })),
        },
      },
      select: {
        clothings: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async deleteFurnitures(email: string, furnitures: string[]) {
    return this.prismaService.character.update({
      where: {
        userEmail: email,
      },
      data: {
        furnitures: {
          disconnect: furnitures.map((furniture) => ({ name: furniture })),
        },
      },
      select: {
        furnitures: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}
