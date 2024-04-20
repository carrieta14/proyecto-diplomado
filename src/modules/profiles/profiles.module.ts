import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { Auth } from '../auth/entities/auth.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { JwtStrategies } from '../auth/strategies/jwt.strategy';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService,JwtStrategies],
  imports:[
    TypeOrmModule.forFeature([Auth, Profile]),
    PassportModule.register({defaultStrategy: 'jwt'}),
  ]
})
export class ProfilesModule {}
