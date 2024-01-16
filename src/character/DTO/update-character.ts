import { IsString } from 'class-validator';

export class UpdateCharacterDto {
  @IsString()
  beard: string;

  @IsString()
  glasses: string;

  @IsString()
  hair: string;

  @IsString()
  hands: string;

  @IsString()
  hat: string;

  @IsString()
  head: string;

  @IsString()
  pants: string;

  @IsString()
  shoes: string;

  @IsString()
  torso: string;
}
