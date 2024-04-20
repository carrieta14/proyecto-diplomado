import { ConflictException, ConsoleLogger, Injectable, NotFoundException, UnauthorizedException }from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Auth } from '../auth/entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {

constructor(
  @InjectRepository(Profile)
  private profileRepository: Repository<Profile>,
  @InjectRepository(Auth)
  private authRepository: Repository<Auth>
  
){}

  async create(createProfileDto: CreateProfileDto): Promise<any> {

    const profile = await this.profileRepository.findOne({where: {name: createProfileDto.name}});
    if (profile) throw new ConflictException(`Perfil con el nombre ${createProfileDto.name} ya existe`);

    const new_created = this.profileRepository.create(createProfileDto);

    await this.profileRepository.save(new_created);

    return {
      ...new_created
    };
  }

async show(): Promise<any> {

  let profiles = await this.profileRepository.find({relations: ['users']});

  profiles.map(profile => {
    return profile
  })

    return profiles;
  }

  async detail(id: number): Promise<any> {
    const profile = await this.profileRepository.findOne({where:{ ID:id }, relations:['users']});

    if(!profile) throw new NotFoundException(`El perfil con el id ${id} no se encuentra`);

    return profile;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto): Promise<any> {

    const profile = await this.profileRepository.findOne({where:{ID:id}});

    if(!profile) throw new NotFoundException('Perfil no encontrado');

    profile.name = updateProfileDto.name;
    profile.description = updateProfileDto.description;
    profile.state = updateProfileDto.state;

    return this.profileRepository.save(profile);
  }

  async updatestate(id: number): Promise<any> {
    const profile = await this.profileRepository.findOne({where:{ID:id}});

    if (!profile) throw new NotFoundException('Perfil no encontrado');

    profile.state = 0;

    return this.profileRepository.save(profile);
  }
}
