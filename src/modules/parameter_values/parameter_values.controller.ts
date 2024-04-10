import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParameterValuesService } from './parameter_values.service';
import { CreateParameterValueDto } from './dto/create-parameter_value.dto';
import { UpdateParameterValueDto } from './dto/update-parameter_value.dto';

@Controller('parameter-values')
export class ParameterValuesController {
  constructor(private readonly parameterValuesService: ParameterValuesService) {}

  @Post()
  create(@Body() createParameterValueDto: CreateParameterValueDto) {
    return this.parameterValuesService.create(createParameterValueDto);
  }

  @Get()
  findAll() {
    return this.parameterValuesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parameterValuesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParameterValueDto: UpdateParameterValueDto) {
    return this.parameterValuesService.update(+id, updateParameterValueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parameterValuesService.remove(+id);
  }
}
