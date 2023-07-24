import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: 'id is must be' })
  @IsNumber()
  id: number;

  @IsOptional()
  @IsEmail()
  email?: string | any;

  @IsString()
  first_name?: string;

  @IsString()
  last_name?: string;

  @IsNotEmpty({ message: 'url to avatar is must be' })
  @IsString()
  @IsUrl()
  avatar: string;
}
