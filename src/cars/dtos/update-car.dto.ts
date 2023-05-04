/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsOptional, MinLength, IsNotEmptyObject, IsUUID } from 'class-validator';

export class updateCarDto {

    @IsNotEmptyObject()
    @IsUUID()
    @IsOptional()
    readonly id: string;

    @IsNotEmpty()
    @IsString()
    readonly brand: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    readonly model: string;
}
