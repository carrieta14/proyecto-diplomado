import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateParameterDto {
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    @MinLength(1)
    name: string;

    @IsString()
    @MaxLength(255)
    description?: string;
}
