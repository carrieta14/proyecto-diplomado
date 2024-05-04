
import { Controller, Get, Post, Body, Delete, UseGuards, Res, Query, HttpStatus, Put } from '@nestjs/common';
import { ParametersService } from './parameters.service';
import { CreateParameterDto } from './dto/create-parameter.dto';
import { UpdateParameterDto } from './dto/update-parameter.dto';
import { Profiles } from '../auth/decorators/profile.decorator';
import { jwtProfileGuard } from '../auth/guard/jwt-profile.guard';
import { jwtAuthGuard } from '../auth/guard/jwt-auth.guard';


@Controller('parameters')
export class ParametersController {
  constructor(private readonly parametersService: ParametersService) {}

  @UseGuards(jwtAuthGuard,jwtProfileGuard)
  @Profiles(1001)
  @Post('/create')
  create(@Body() createParameterDto: CreateParameterDto,@Res() response:any) {
    return this.parametersService.create(createParameterDto).then((parameter)=> {
      response.status(HttpStatus.CREATED).json({ data: parameter, code: 201, message: 'Parametro creado con exito' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' })});
  }

  @UseGuards(jwtAuthGuard,jwtProfileGuard)
  @Profiles(1001)
  @Get('/show')
  show(@Res() response: any) {
    return this.parametersService.show().then((parameters)=> {
      response.status(HttpStatus.OK).json({ data: parameters, code: 200, message: 'Listado de parametros existentes' });
    }).catch(() => {
      response.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontraron parametros', code: 400 });
    });
  }

  @UseGuards(jwtAuthGuard,jwtProfileGuard)
  @Profiles(1001)
  @Get('/detail/:id')
  detail(@Query('id') id: number,@Res() response:any) {
    return this.parametersService.detail(id).then((parameter)=> {
      response.status(HttpStatus.OK).json({ data: parameter, code: 200, message: 'Parametro encontrado'});
    }).catch(() => {
      response.status(HttpStatus.NOT_FOUND).json({ message: 'No se pudo encontrar el parametro', code: 400 });
    });
  }

  @UseGuards(jwtAuthGuard,jwtProfileGuard)
  @Profiles(1001)

  @Put('/update')
  update(@Query('id') id: number, @Body() updateParameterDto: UpdateParameterDto,@Res() response:any) {
    return this.parametersService.update(id, updateParameterDto).then((parameter)=> {
      response.status(HttpStatus.OK).json({ data: parameter, code: 200, message: 'Parametro actualizado con exito' });
    }).catch(() => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: 'No se pudo actualizar' });
    });
  }

  @UseGuards(jwtAuthGuard,jwtProfileGuard)
  @Profiles(1001)
  @Delete('/delete/:id')
  updatestate(@Query('id') id: number,@Res() response:any) {
    return this.parametersService.updatestate(id).then((parameter)=> {
      response.status(HttpStatus.OK).json({data: parameter, code: 200, message: 'Parametro eliminado con exito'})
    }).catch(() => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: 'No se pudo eliminar' });
    } );
  }
}
