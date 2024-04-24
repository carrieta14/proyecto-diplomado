import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateParameterDto } from './dto/create-parameter.dto';
import { UpdateParameterDto } from './dto/update-parameter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Parameter } from './entities/parameter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParametersService {

  @InjectRepository(Parameter)
  private parameterRepository: Repository<Parameter>

  async create(createParameterDto: CreateParameterDto): Promise<any> {

    const parameter = await this.parameterRepository.findOne({where:{name: createParameterDto.name}});
    if(parameter) throw new ConflictException(`Parametro con el nombre ${createParameterDto.name} ya existe`);

    const new_created = this.parameterRepository.create(createParameterDto);

    await this.parameterRepository.save(new_created);

    return {...new_created};
  }

  async show(): Promise<any> {

    let parameters = await this.parameterRepository.find({where:{state:1}});

    parameters.map(parameter => {
      return parameter
    })
    return parameters;
  }

  async detail(id: number): Promise<any> {


    const parameter = await this.parameterRepository.findOne({where: {ID: id}})
    
    if(parameter.state === 0) throw new NotFoundException(`El parametro con el id ${id} no existe`)

    if(!parameter) throw new NotFoundException(`El parametro con el id ${id} no se encuentra`)

    return parameter;
  }

  async update(id: number, updateParameterDto: UpdateParameterDto): Promise<any> {

    const parameter = await this.parameterRepository.findOne({where: {ID:id}})
    if(!parameter) throw new NotFoundException('Parametro no encontrado')

    parameter.name = updateParameterDto.name;
    parameter.description = updateParameterDto.description;

    return this.parameterRepository.save(parameter);
  }

  async updatestate(id: number): Promise<any> {

    const parameter = await this.parameterRepository.findOne({where: {ID:id}});
    if(!parameter) throw new NotFoundException('Parametro no encontrado')
    
    parameter.state = 0;

    return this.parameterRepository.save(parameter);
  }
}
