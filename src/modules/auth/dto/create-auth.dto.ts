import { IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, MinLength,Matches,Min,Max} from "class-validator";

export class CreateAuthDto {

    @IsString()
    @MaxLength(15)
    @MinLength(1)
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @MaxLength(15)
    @MinLength(1)
    @IsNotEmpty()
    last_name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    document_type: string;

    @IsNumber()
    @Min(10000000,{message:'La cedula no puede ser menor de 8 digitos'})
    @Max(9999999999,{message:'La cedula no puede ser mayor de 10 digitos'})
    @IsPositive()
    @IsNotEmpty()
    document: number
    
    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, { message: 'La contraseña debe tener al menos una letra mayúscula, una minúscula y un número' })
    password: string;
    
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    profile: number|any;

    state: number;
    
}
