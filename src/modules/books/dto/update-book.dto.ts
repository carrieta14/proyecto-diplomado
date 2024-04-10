import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
    title?: string;
    author?: string;
    description?: string;
    availability?: boolean;
    year?: Date;
    state?: number;
}
