import { PartialType } from '@nestjs/mapped-types';
import { CreateParameterDto } from './create-parameter.dto';
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateParameterDto extends PartialType(CreateParameterDto) {

    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    @MinLength(1)
    name?: string;

    @IsString()
    @MaxLength(255)
    description?: string;
}
