import { PartialType } from '@nestjs/mapped-types';
import { CreateLoanDto } from './create-loan.dto';

export class UpdateLoanDto extends PartialType(CreateLoanDto) {
    loan_date?: Date;
    return_date?: Date;
    expected_return_date?: Date;
    userId?: string;
    state?: number;
}
