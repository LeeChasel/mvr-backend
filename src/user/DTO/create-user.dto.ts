import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsNotEmpty,
  IsNumberString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumberString()
  @IsPhoneNumber('TW')
  phoneNumber: string;

  @IsNotEmpty()
  gender: 'MALE' | 'FEMALE';
}
