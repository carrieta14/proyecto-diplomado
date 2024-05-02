import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";



@Injectable()
export class jwtProfileGuard implements CanActivate {
constructor(private readonly reflector: Reflector){}
    canActivate(context: ExecutionContext): boolean{


        const profiles = this.reflector.getAllAndOverride('Profiles',[
            context.getHandler(),
            context.getClass()
        ])
        if(!profiles){
            return true;
        }

        const {user} = context.switchToHttp().getRequest();

        return Number(profiles) === user.profile.ID

    }

    
}