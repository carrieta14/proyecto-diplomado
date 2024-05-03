import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateLoanDto {
    @IsDateString()
    @IsNotEmpty()
    loan_date: Date;
    @IsDateString()
    @IsNotEmpty()
    return_date: Date;
    @IsNotEmpty()
    @IsDateString()
    expected_return_date: Date;
    @IsNumber()
    state: number;
}
