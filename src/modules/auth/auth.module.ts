import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Auth } from './entities/auth.entity';
import { UserBook } from './entities/authbooks.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../config/jwt.constants';
import { Parameter } from '../parameters/entities/parameter.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([Auth,UserBook, Profile, Parameter]),
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
    JwtStrategy,
    PassportModule,
    JwtModule
  ]
})
export class AuthModule {}