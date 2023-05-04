import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
