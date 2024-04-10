import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
    first_name?: string;
    last_name?: string;
    email?: string;
    document_type?: string;
    password?: string;
    profile?: number|any;
    state?: number;
}
