import { IsDateString, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLoanDto {
    @IsDateString()
    @IsNotEmpty()
    loan_date: Date;
    @IsDateString()
    @IsOptional()
    return_date?: Date|null;
    @IsNotEmpty()
    @IsDateString()
    expected_return_date: Date;
    @IsNumber()
    state: number;
    @IsString()
    @IsNotEmpty()
    bookId: string
}
