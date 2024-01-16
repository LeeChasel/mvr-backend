import { IsString } from 'class-validator';

export class UpdateFurnituresDto {
  @IsString({ each: true, message: 'Must be an array of strings' })
  furnitures: string[];
}
