import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto} from './dto/create-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { Profile } from '../profiles/entities/profile.entity';
import { JwtService } from '@nestjs/jwt';
import { PayloadJwt } from 'src/interfaces/payload-jwt';
import { ParameterValue } from '../parameter_values/entities/parameter_value.entity';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(ParameterValue)
    private parameterRepository: Repository<ParameterValue>,
    private readonly jwtServices: JwtService
  ) { }

  async create(createAuthDto: CreateAuthDto): Promise<any> {

    const user = await this.authRepository.findOne({ where: { email: createAuthDto.email} });
    if (user) throw new ConflictException(`Usuario con el correo ${createAuthDto.email} ya existe`);

    const parameter = await this.parameterRepository.findOne({where: {id_parameter: createAuthDto.document_type}});
    if(!parameter) throw new NotFoundException(`El parametro ${createAuthDto.document_type} no existe`) 

    const document = await this.authRepository.findOne({ where: { document: createAuthDto.document} });
    if (document) throw new ConflictException(`Usuario con la identificacion ${createAuthDto.document} ya existe`);

    const profile = await this.profileRepository.findOne({ where: { ID: createAuthDto.profile } });
    if (!profile) throw new NotFoundException(`perfil mandado no existente`);

    delete createAuthDto.profile;
    const new_created = this.authRepository.create(createAuthDto);

    new_created.profile = profile
    await this.authRepository.save(new_created);
    delete new_created.password;
    
    return {
      ...new_created,
      token: await this.getJwtToken({
        ID: new_created.ID, first_name: new_created.first_name
        , last_name: new_created.last_name, email: new_created.email,
        state: new_created.state = 1, profile:new_created.profile = profile
      })
    };
  }

  async show(): Promise<any> {
    let users = await this.authRepository.find({where:{state:1},relations: ['profile'] });
    console.log(users);
    users.map(user => {
      delete user.password
      return user;
    });

    return users;
  }

  async detail(id: string): Promise<any> {
    const user = await this.authRepository.findOne({ where: { ID:id }, relations: ['profile']
    ,select:["ID","first_name","last_name","document_type","document","email","state"]});

    if (!user) throw new NotFoundException(`El usuarios con el id ${id} no se encuentra`);

    return user;
  }

  async update(id: string, updateAuthDto: UpdateAuthDto): Promise<Auth> {
    const user = await this.authRepository.findOne( { where: { ID: id }} );

        if (!user) throw new NotFoundException('Usuario no encontrado');

        user.first_name = updateAuthDto.first_name;
        user.last_name = updateAuthDto.last_name;
        if (updateAuthDto.email != undefined ||updateAuthDto.email != null) user.email = updateAuthDto.email.toLowerCase();
        user.password = updateAuthDto.password;
        user.state = updateAuthDto.state;

        return this.authRepository.save(user);
  }

  async updatestate(id: string): Promise<any> {
    const user = await this.authRepository.findOne( { where: { ID: id }, 
      select:["ID","first_name","last_name","document_type","document","email","state"] } );

    if (!user) throw new NotFoundException('Usuario no encontrado');

    user.state = 0;

    return this.authRepository.save(user);
  }

  async login(loginData: LoginDto): Promise<any> {
    let email = loginData.email.toLowerCase();
    const user = await this.authRepository.findOne({where: { email }, relations:['profile']});
    const passwordValidated = user.validatePassoword(loginData.password);

    if (!user) throw new UnauthorizedException('Correo invalido');
    if (!passwordValidated) throw new UnauthorizedException('Contraseña invalida');

    delete user.password;

    const data = {
        ...user,
        token: await this.getJwtToken({
            ID: user.ID, 
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            state: user.state,
            profile: user.profile
        })
    };
    return data;
}

  private async getJwtToken(payload: PayloadJwt) {
    const token = await this.jwtServices.signAsync(payload);
    return token;
  }
}
