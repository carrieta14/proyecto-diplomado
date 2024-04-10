import { Injectable } from '@nestjs/common';
import { CreateParameterValueDto } from './dto/create-parameter_value.dto';
import { UpdateParameterValueDto } from './dto/update-parameter_value.dto';

@Injectable()
export class ParameterValuesService {
  create(createParameterValueDto: CreateParameterValueDto) {
    return 'This action adds a new parameterValue';
  }

  findAll() {
    return `This action returns all parameterValues`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parameterValue`;
  }

  update(id: number, updateParameterValueDto: UpdateParameterValueDto) {
    return `This action updates a #${id} parameterValue`;
  }

  remove(id: number) {
    return `This action removes a #${id} parameterValue`;
  }
}
