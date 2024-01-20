import { IsString } from 'class-validator';

export class DeleteFurnituresDto {
  @IsString({ each: true, message: 'Must be an array of strings' })
  furnitures: string[];
}
