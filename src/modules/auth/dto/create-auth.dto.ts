export class CreateAuthDto {

    first_name: string;
    last_name: string;
    email: string;
    document_type: string;
    password: string;
    profile: number|any;
    state: number;
    
}

export class LoginDto {
    email: string;
    password: string;
}
