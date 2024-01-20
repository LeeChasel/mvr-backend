import { IsString } from 'class-validator';

export class DeleteClothingsDto {
  @IsString({ each: true, message: 'Must be an array of strings' })
  clothings: string[];
}
