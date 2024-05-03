import { IsDate,IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateBookDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(255)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(255)
    author: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(255)
    description: string;

    @IsNumber()
    @IsNotEmpty()
    availablity: boolean;

    @IsNumber()
    @IsNotEmpty()
    amount: number

    @IsNumber()
    @IsNotEmpty()
    amountA: number

    @IsString()
    @IsNotEmpty()
    @IsDate()
    year: Date;

    @IsNumber()
    state: number;
}

