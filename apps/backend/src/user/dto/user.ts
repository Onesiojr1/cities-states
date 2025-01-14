import { IsString, IsEmail, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string

  @IsString()
  password: string
}

export class changeRoleDto {
  @IsString()
  roleId: string
}