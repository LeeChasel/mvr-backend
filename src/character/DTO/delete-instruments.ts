import { IsString } from 'class-validator';

export class DeleteInstrumentsDto {
  @IsString({ each: true, message: 'Must be an array of strings' })
  instruments: string[];
}
