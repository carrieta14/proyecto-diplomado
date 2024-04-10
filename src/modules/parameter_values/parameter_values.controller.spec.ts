import { Test, TestingModule } from '@nestjs/testing';
import { ParameterValuesController } from './parameter_values.controller';
import { ParameterValuesService } from './parameter_values.service';

describe('ParameterValuesController', () => {
  let controller: ParameterValuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParameterValuesController],
      providers: [ParameterValuesService],
    }).compile();

    controller = module.get<ParameterValuesController>(ParameterValuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
