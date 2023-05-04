/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
/* eslint-disable prettier/prettier */
export class CreateCarDto {

  
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly brand: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly model: string;
};
