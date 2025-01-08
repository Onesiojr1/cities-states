import { IsString } from "class-validator";

export class cityDto {
  @IsString()
  name: string;
  
  @IsString()
  stateId: string;
}