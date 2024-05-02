import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PayloadJwt } from "../../../interfaces/payload-jwt";
import { Auth } from "../entities/auth.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy, 'jwt' ) {
    
    constructor(
        @InjectRepository(Auth)
        private userRepository: Repository<Auth>

    ) {
        super({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate(payload: PayloadJwt): Promise<Auth> {

        const { ID } = payload;
        const user = await this.userRepository.findOne( { where:{ID}, relations:['profile'] });

        if( !user ) throw new UnauthorizedException( `Token no valido` );
        if( user.state != 1 ) throw new UnauthorizedException(`usuario esta inactivo, comunicarse con IT`);

        return user; 
    }

}