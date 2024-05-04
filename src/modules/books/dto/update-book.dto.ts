import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {

    @IsString()
    @IsOptional()
    @MinLength(5)
    @MaxLength(255)
    title?: string;

    @IsString()
    @IsOptional()
    @MinLength(5)
    @MaxLength(255)
    author?: string;

    @IsString()
    @IsOptional()
    @MinLength(5)
    @MaxLength(255)
    description?: string;

    @IsNumber()
    @IsOptional()
    availablity?: boolean;

    @IsNumber()
    @IsOptional()
    amount: number

    @IsNumber()
    @IsOptional()
    amountA: number

    @IsDateString()
    @IsOptional()
    @IsDateString()
    year?: Date;

    @IsOptional()
    @IsNumber()
    state?: number;
}
