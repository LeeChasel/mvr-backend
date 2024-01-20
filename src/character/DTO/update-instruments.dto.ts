import { IsString } from 'class-validator';

export class UpdateInstrumentsDto {
  @IsString({ each: true, message: 'Must be an array of strings' })
  instruments: string[];
}
