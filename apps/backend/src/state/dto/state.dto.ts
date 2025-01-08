import { IsString, Length } from "class-validator";

export class StateDto {
  @IsString()
  name: string;

  @IsString()
  @Length(2, 2)
  acronym: string;
}