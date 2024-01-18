import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateCharacterDto } from './DTO/update-character';
import { UpdateInstrumentsDto } from './DTO/update-instruments';
import { UpdateClothingsDto } from './DTO/update-clothings';
import { UpdateFurnituresDto } from './DTO/update-furnitures';
import { DeleteInstrumentsDto } from './DTO/delete-instruments';
import { DeleteClothingsDto } from './DTO/delete-clothings';
import { DeleteFurnituresDto } from './DTO/delete-furnitures';

@UseGuards(JwtAuthGuard)
@Controller('character')
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @Get()
  async getCharacter(@Request() req: { user: { email: string } }) {
    const character = await this.characterService.getCharacter(req.user.email);
    delete character.id;
    delete character.userEmail;
    return character;
  }

  @Post()
  async updateCharacter(
    @Request() req: { user: { email: string } },
    @Body() updateData: UpdateCharacterDto,
  ) {
    const character = await this.characterService.updateCharacter(
      req.user.email,
      updateData,
    );
    delete character.id;
    delete character.userEmail;
    delete character.gender;
    return character;
  }

  @Get('instruments')
  async getInstruments(@Request() req: { user: { email: string } }) {
    const instruments = await this.characterService.getInstruments(
      req.user.email,
    );
    return instruments.instruments;
  }

  @Patch('instruments')
  async updateInstruments(
    @Request() req: { user: { email: string } },
    @Body() updateData: UpdateInstrumentsDto,
  ) {
    const instrumentNames: string[] = [];
    for (const instrument of updateData.instruments) {
      const instrumentName =
        await this.characterService.findInstrument(instrument);
      instrumentNames.push(instrumentName.name);
    }
    const updatedInstruments = await this.characterService.updateInstruments(
      req.user.email,
      instrumentNames,
    );
    return updatedInstruments.instruments;
  }

  @Get('clothings')
  async getClothings(@Request() req: { user: { email: string } }) {
    const clothings = await this.characterService.getClothings(req.user.email);
    return clothings.clothings;
  }

  @Patch('clothings')
  async updateClothings(
    @Request() req: { user: { email: string } },
    @Body() updateData: UpdateClothingsDto,
  ) {
    const clothingNames: string[] = [];
    for (const clothing of updateData.clothings) {
      const clothingName = await this.characterService.findClothing(clothing);
      clothingNames.push(clothingName.name);
    }
    const updatedClothings = await this.characterService.updateClothings(
      req.user.email,
      clothingNames,
    );
    return updatedClothings.clothings;
  }

  @Get('furnitures')
  async getFurnitures(@Request() req: { user: { email: string } }) {
    const furnitures = await this.characterService.getFurnitures(
      req.user.email,
    );
    return furnitures.furnitures;
  }

  @Patch('furnitures')
  async updateFurnitures(
    @Request() req: { user: { email: string } },
    @Body() updateData: UpdateFurnituresDto,
  ) {
    const furnitureNames: string[] = [];
    for (const furniture of updateData.furnitures) {
      const furnitureName =
        await this.characterService.findFurniture(furniture);
      furnitureNames.push(furnitureName.name);
    }
    const updatedFurnitures = await this.characterService.updateFurnitures(
      req.user.email,
      furnitureNames,
    );
    return updatedFurnitures.furnitures;
  }

  @Delete('instruments')
  async deleteInstruments(
    @Request() req: { user: { email: string } },
    @Body() deletedData: DeleteInstrumentsDto,
  ) {
    const instruments = await this.characterService.deleteInstruments(
      req.user.email,
      deletedData.instruments,
    );
    return instruments.instruments;
  }

  @Delete('clothings')
  async deleteClothings(
    @Request() req: { user: { email: string } },
    @Body() deletedData: DeleteClothingsDto,
  ) {
    const clothings = await this.characterService.deleteClothings(
      req.user.email,
      deletedData.clothings,
    );
    return clothings.clothings;
  }

  @Delete('furnitures')
  async deleteFurnitures(
    @Request() req: { user: { email: string } },
    @Body() deletedData: DeleteFurnituresDto,
  ) {
    const furnitures = await this.characterService.deleteFurnitures(
      req.user.email,
      deletedData.furnitures,
    );
    return furnitures.furnitures;
  }
}
