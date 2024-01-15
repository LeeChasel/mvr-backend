import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { CharacterService } from './character.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('character')
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCharacter(@Request() req: { user: { email: string } }) {
    const character = await this.characterService.getCharacter(req.user.email);
    delete character.id;
    delete character.userEmail;
    return character;
  }
}
