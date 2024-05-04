import { Controller, Get, Post, Body, Param, HttpStatus, Res, Put } from '@nestjs/common';
import { ParameterValuesService } from './parameter_values.service';


@Controller('parameter-values')
export class ParameterValuesController {
  constructor(private readonly parameterValueService: ParameterValuesService){}

    @Post('/create/:id')
    create(@Body() new_parameter_value, @Param('id') id, @Res() response) {
        return this.parameterValueService.create(id, new_parameter_value).then((parameter_value)=>{
            response.status(HttpStatus.CREATED).json({data: parameter_value, code: 201, message: 'valor parametro creado con exito'});
        }).catch((error)=> {
            response.status(HttpStatus.BAD_REQUEST).json({message: error.message, code: '400'});
        });
    }

    @Put('/update/:id')
    update(@Body() update_parameter_value, @Param('id') id, @Res() response){
        return this.parameterValueService.update(id, update_parameter_value).then((parameter_value)=>{
            response.status(HttpStatus.OK).json({data: parameter_value, code: 200, message: 'valor parametro actualizado con exito'});
        }).catch(()=> {
            response.status(HttpStatus.BAD_REQUEST).json({message: 'No se pudo actualizar'});
        });
    }

    @Get('/show')
    show(@Res() response: any){
        return this.parameterValueService.show().then((parameter_value)=>{
            response.status(HttpStatus.OK).json({data: parameter_value, code: 200, message: 'Listado de valor parametro existentes'});
        }).catch(()=> {
            response.status(HttpStatus.NOT_FOUND).json({message: 'No se encontraron usuarios'});
        });
    }

    @Get('/filter/:id')
    filter(@Param('id') id, @Res() response){
        return this.parameterValueService.filter(id).then((parameter_value)=>{
            response.status(HttpStatus.OK).json({data: parameter_value, code: 200, message: 'Listado de valor parametro existentes'});
        }).catch(()=> {
            response.status(HttpStatus.NOT_FOUND).json({message: 'No se encontraron usuarios'});
        });
    }
}
