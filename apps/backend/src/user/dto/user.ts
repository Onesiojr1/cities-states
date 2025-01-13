import { IsString, IsEmail, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string

  @IsString()
  password: string

  @IsArray()
  @IsString({ each: true })
  permissions: string[]
}