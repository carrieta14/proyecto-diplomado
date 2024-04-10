import { Test, TestingModule } from '@nestjs/testing';
import { ParameterValuesService } from './parameter_values.service';

describe('ParameterValuesService', () => {
  let service: ParameterValuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParameterValuesService],
    }).compile();

    service = module.get<ParameterValuesService>(ParameterValuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
