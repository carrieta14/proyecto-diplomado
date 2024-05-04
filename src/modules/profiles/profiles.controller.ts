import { Controller, Get, Post, Body, Param, Put, Res, HttpStatus, Query, UseGuards, Delete  } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profiles } from '../auth/decorators/profile.decorator';
import { jwtProfileGuard } from '../auth/guard/jwt-profile.guard';
import { jwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @UseGuards(jwtAuthGuard,jwtProfileGuard)
  @Profiles(1001)
  @Post('/create')
  create(@Body() CreateProfileDto: CreateProfileDto, @Res() response: any) {
    return this.profilesService.create(CreateProfileDto).then((profile) => {
      response.status(HttpStatus.CREATED).json({ data: profile, code: 201, message: 'Perfil creado con exito' });
    }).catch((error) => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: error.message, code: '400' });
    });
  }

  @UseGuards(jwtAuthGuard,jwtProfileGuard)
  @Profiles(1001)
  @Get('/show')
  show(@Res() response: any) {
    return this.profilesService.show().then((profiles) => {
      response.status(HttpStatus.OK).json({ data: profiles, code: 200, message: 'Listado de perfiles existentes' });
    }).catch(() => {
      response.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontraron perfiles', code: 400 });
    });
  }

  @UseGuards(jwtAuthGuard,jwtProfileGuard)
  @Profiles(1001)
  @Get('/detail/:id')
  detail(@Query('id') id: number,@Res() response: any) {
    return this.profilesService.detail(id).then((profile) => {
      response.status(HttpStatus.OK).json({ data: profile, code: 200, message: 'Perfil encontrado' });
    }).catch(() => {
      response.status(HttpStatus.NOT_FOUND).json({ message: 'No se pudo encontrar el perfil', code: 400 });
    });
  }

  @UseGuards(jwtAuthGuard,jwtProfileGuard)
  @Profiles(1001)
  @Put('/update/:id')
  update(@Query('id') id: number, @Body() profile: UpdateProfileDto, @Res() response:any) {
    return this.profilesService.update(id, profile).then((profile) => {
      response.status(HttpStatus.OK).json({ data: profile, code: 200, message: 'Perfil actualizado con exito' });
    }).catch(() => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: 'No se pudo actualizar' });
    });
  }

  @UseGuards(jwtAuthGuard,jwtProfileGuard)
  @Profiles(1001)
  @Delete('/delete/:id')
  updatestate(@Query('id') id: number, @Res() response: any) {
    return this.profilesService.updatestate(id).then((profile)=> {
      response.status(HttpStatus.OK).json({data: profile, code: 200, message: 'Perfil eliminado con exito'})
    }).catch(() => {
      response.status(HttpStatus.BAD_REQUEST).json({ message: 'No se pudo eliminar' });
    });
  }
}
