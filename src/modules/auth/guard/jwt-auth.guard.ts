import { UnauthorizedException, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class jwtAuthGuard extends AuthGuard('jwt'){

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
    
        if (err || !user) {
        throw err || new UnauthorizedException();
        }
    
        return user;
        
    }
    
}