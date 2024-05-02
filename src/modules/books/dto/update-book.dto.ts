import { IsDate, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(255)
    title?: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(255)
    author?: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(255)
    description?: string;

    @IsNumber()
    @IsNotEmpty()
    availablity?: boolean;

    @IsNumber()
    @IsNotEmpty()
    amount: number

    @IsNumber()
    @IsNotEmpty()
    amountA: number

    @IsNotEmpty()
    @IsDate()
    year?: Date;

    state?: number;
}
