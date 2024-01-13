import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsNotEmpty,
  IsNumberString,
  IsEnum,
} from 'class-validator';

// Need to declare the format: { key = value }, can't be { key(value) }
enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

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
  @IsEnum(GENDER)
  gender: GENDER;
}
