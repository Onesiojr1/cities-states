import { IsString, IsEmail, IsArray } from 'class-validator';

export class CreateRoleDTO {
  @IsString()
  name: string

  @IsArray()
  @IsString({ each: true })
  permissions: string[]
}