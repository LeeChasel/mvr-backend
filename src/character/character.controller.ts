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
import { UpdateCharacterDto } from './DTO/update-characterd.dto';
import { UpdateInstrumentsDto } from './DTO/update-instruments.dto';
import { UpdateClothingsDto } from './DTO/update-clothings.dto';
import { UpdateFurnituresDto } from './DTO/update-furnitures.dto';
import { DeleteInstrumentsDto } from './DTO/delete-instruments.dto';
import { DeleteClothingsDto } from './DTO/delete-clothings.dto';
import { DeleteFurnituresDto } from './DTO/delete-furnitures.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('character')
@Controller('character')
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @ApiOperation({
    summary:
      'Get basic information about the character, include gender and costumes',
  })
  @Get()
  @ApiResponse({
    status: 200,
    description: 'The character information has been successfully retrieved.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getCharacter(@Request() req: { user: { email: string } }) {
    const character = await this.characterService.getCharacter(req.user.email);
    delete character.id;
    delete character.userEmail;
    return character;
  }

  @ApiOperation({ summary: 'Update character costumes' })
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The character costumes has been successfully updated.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
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

  @ApiOperation({ summary: 'Get the instrument owned by the character' })
  @Get('instruments')
  @ApiResponse({
    status: 200,
    description: 'The character instruments has been successfully retrieved.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  async getInstruments(@Request() req: { user: { email: string } }) {
    const instruments = await this.characterService.getInstruments(
      req.user.email,
    );
    return instruments.instruments;
  }

  @ApiOperation({ summary: 'Add instruments owned by the character' })
  @Patch('instruments')
  @ApiResponse({
    status: 200,
    description: 'The character instruments has been successfully updated.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 404,
    description: 'Instrument not found in the database.',
  })
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

  @ApiOperation({ summary: 'Get the clothing owned by the character' })
  @Get('clothings')
  @ApiResponse({
    status: 200,
    description: 'The character clothings has been successfully retrieved.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  async getClothings(@Request() req: { user: { email: string } }) {
    const clothings = await this.characterService.getClothings(req.user.email);
    return clothings.clothings;
  }

  @ApiOperation({ summary: 'Add clothings owned by the character' })
  @Patch('clothings')
  @ApiResponse({
    status: 200,
    description: 'The character clothings has been successfully updated.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 404,
    description: 'clothing not found in the database.',
  })
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

  @ApiOperation({ summary: 'Get the furniture owned by the character' })
  @Get('furnitures')
  @ApiResponse({
    status: 200,
    description: 'The character furnitures has been successfully retrieved.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  async getFurnitures(@Request() req: { user: { email: string } }) {
    const furnitures = await this.characterService.getFurnitures(
      req.user.email,
    );
    return furnitures.furnitures;
  }

  @ApiOperation({ summary: 'Add furnitures owned by the character' })
  @Patch('furnitures')
  @ApiResponse({
    status: 200,
    description: 'The character furnitures has been successfully updated.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 404,
    description: 'furniture not found in the database.',
  })
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

  @ApiOperation({ summary: 'Delete instruments owned by the character' })
  @Delete('instruments')
  @ApiResponse({
    status: 200,
    description: 'The character instruments has been successfully deleted.',
  })
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

  @ApiOperation({ summary: 'Delete clothings owned by the character' })
  @Delete('clothings')
  @ApiResponse({
    status: 200,
    description: 'The character clothings has been successfully deleted.',
  })
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

  @ApiOperation({ summary: 'Delete furnitures owned by the character' })
  @Delete('furnitures')
  @ApiResponse({
    status: 200,
    description: 'The character furnitures has been successfully deleted.',
  })
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
