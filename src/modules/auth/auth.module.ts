import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategies } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Auth } from './entities/auth.entity';
import { UserBook } from './entities/authbooks.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../config/jwt.constants';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategies],
  imports: [
    TypeOrmModule.forFeature([Auth,UserBook, Profile]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
        imports:[],
        inject:[],
        useFactory: () => {
          return {
            secret: jwtConstants().secret,
            signOptions: {
              expiresIn: jwtConstants().expireIn,
              algorithm: 'HS512'
            }
          }
        }
      })
  ],
  exports: [
    AuthService,
    TypeOrmModule,
    JwtStrategies,
    PassportModule,
    JwtModule
  ]
})
export class AuthModule {}