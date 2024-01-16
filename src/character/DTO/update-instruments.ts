import { IsString } from 'class-validator';

export class updateInstrumentsDto {
  @IsString({ each: true, message: 'Must be an array of strings' })
  instruments: string[];
}
