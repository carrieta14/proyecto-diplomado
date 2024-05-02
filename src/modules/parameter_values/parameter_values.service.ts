import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParameterValueDto } from './dto/create-parameter_value.dto';
import { UpdateParameterValueDto } from './dto/update-parameter_value.dto';
import { ParameterValue } from './entities/parameter_value.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Parameter } from '../parameters/entities/parameter.entity';

@Injectable()
export class ParameterValuesService {
  constructor(
    @InjectRepository(Parameter)
    private parameterRepository: Repository<Parameter>,
    @InjectRepository(ParameterValue)
    private parameterValueRepository: Repository<ParameterValue>
  ) { }

  async show(): Promise<ParameterValue[]> {
    const parameters_values = await this.parameterValueRepository.find();
    console.log('aa')
    return parameters_values;
  }

  async create(ID: number, new_parameterValue: CreateParameterValueDto): Promise<ParameterValue> {
    const parameter = await this.parameterRepository.findOne({ where: { ID } });

    if (!parameter) throw new NotFoundException('parametro no encontrado');

    const parameterValue = this.parameterValueRepository.create(new_parameterValue);
    parameterValue.parameter = parameter;
    return this.parameterValueRepository.save(parameterValue);
  }

  async update(id_parameter: number, update_parameterValue: UpdateParameterValueDto): Promise<ParameterValue> {
    const parameter_value = await this.parameterValueRepository.findOneOrFail({ where: { id_parameter } });

    if (!parameter_value) throw new NotFoundException('valor parametro no encontrado');

    parameter_value.name = update_parameterValue.name;
    parameter_value.short = update_parameterValue.short;
    parameter_value.state = update_parameterValue.state;

    //Comprueba que el dato sea existente
    if (update_parameterValue.parameter) {
      //Revisa cual fue el padre que le enviaron y lo asigna a una variable con el nombre de la columna de la relacion
      const ID: number = update_parameterValue.parameter;
      //Consulta en base de datos si existe esa relacion
      const parameter = await this.parameterRepository.findOne({ where: { ID } });
      if (!parameter) throw new NotFoundException('parametro no encontrado');
      //si existe cambia los datos de la relacion
      parameter_value.parameter = parameter;
    }
    return this.parameterValueRepository.save(parameter_value);
  }

  async filter(ID: number): Promise<ParameterValue[]> {
    try {
      // Utiliza la función find para obtener autores relacionados con el parametro específico
      const parameters_values = await this.parameterValueRepository.find({
        relations: ['parameter'],
        where: {
          parameter: { ID: ID },
        },
      });

      return parameters_values;
    } catch (error) {
      throw new NotFoundException(`Valores parametros relacionados con el parametro con ID ${ID} no encontrados`);
    }
  }
}
