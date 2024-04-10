import { PartialType } from '@nestjs/mapped-types';
import { CreateParameterValueDto } from './create-parameter_value.dto';

export class UpdateParameterValueDto extends PartialType(CreateParameterValueDto) {
    name?: string;
    short?: string;
    state?: number;
    parameter?: number;
}
