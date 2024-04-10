import { Module } from '@nestjs/common';
import { ParameterValuesService } from './parameter_values.service';
import { ParameterValuesController } from './parameter_values.controller';

@Module({
  controllers: [ParameterValuesController],
  providers: [ParameterValuesService],
})
export class ParameterValuesModule {}
