import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";





@Injectable()
export class jwtAuthGuard extends AuthGuard('jwt'){

    // canActivate(context: ExecutionContext): boolean {
    //     return true
    // }

    
}