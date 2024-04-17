import { IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, MinLength,} from "class-validator";

export class CreateAuthDto {

    @IsString()
    @MaxLength(15)
    first_name: string;

    @IsString()
    @MaxLength(15)
    last_name: string;

    @IsEmail()
    email: string;
    
    @IsString()
    document_type: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
    
    @IsString()
    profile: number|any;

    @IsNumber()
    @IsPositive()
    state: number;
    
}

export class LoginDto {
    email: string;
    password: string;
}
