import { Controller, Get, Post, Body, Param, Put, Res, HttpStatus, Query, UseGuards, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { jwtProfileGuard } from './guard/jwt-profile.guard';
import { Profiles } from './decorators/profile.decorator';
import { jwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(jwtAuthGuard,jwtProfileGuard)
  @Profiles(1001)
  @Post('/create')
  create(@Body() createAuthDto: CreateAuthDto, @Res() response: any): Promise<void> {
    return this.authService.create(createAuthDto).then((user) => {
      response.status(HttpStatus.CREATED).json({ data: user, code: 201, message: 'usuario creado con exito' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }

  @UseGuards(jwtAuthGuard,jwtProfileGuard)
  @Profiles(1)
  @Get('/show')
  show(@Res() response:any) {
    return this.authService.show().then((users) => {
      response.status(HttpStatus.OK).json({ data: users, code: 200, message: 'Listado de usuarios existentes' });
    }).catch(() => {
      response.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontraron usuarios', code: 400 });
    });
  }

  @UseGuards(jwtAuthGuard,jwtProfileGuard)
  @Profiles(1001)
  @Get('/detail/:id')
  detail(@Query('id') id: string, @Res() response: any) {
    return this.authService.detail(id).then((user) => {
      response.status(HttpStatus.OK).json({ data: user, code: 200, message: 'Ususario encontrado' });
    }).catch(() => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: 'No se pudo encontrar el usuario' });
    });
  }

  @UseGuards(jwtAuthGuard,jwtProfileGuard)
  @Profiles(1001)
  @Put('/update/:id')
  update(@Query('id') id: string, @Body() user: UpdateAuthDto, @Res() response:any) {
    return this.authService.update(id, user).then((user) => {
      response.status(HttpStatus.OK).json({ data: user, code: 200, message: 'usuario actualizado con exito' });
    }).catch(() => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: 'No se pudo actualizar' });
    });
  }

  @UseGuards(jwtAuthGuard,jwtProfileGuard)
  @Profiles(1001)
  @Delete('/delete/:id')
  updatestate(@Query('id') id: string, @Res() response: any){
    return this.authService.updatestate(id).then((user) => {
      response.status(HttpStatus.OK).json({data: user, code: 200, message: 'usuario eliminado con exito'})
    }).catch(() => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: 'No se pudo eliminar' });
    })
  }

  @Post('/login')
  login(@Body() loginData: LoginDto, @Res() response){
      return this,this.authService.login(loginData).then((data) => {
        response.status(HttpStatus.OK).json({ data: data, code: 200, message: 'Bienvenido' });
      }).catch(() => {
        response.status(HttpStatus.BAD_REQUEST).json({ message: 'No se pudo ingresar' });
      });
  }

}
