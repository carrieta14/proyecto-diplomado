import { Profile } from "src/modules/profiles/entities/profile.entity";

export interface PayloadJwt {
    ID: string,
    first_name: string,
    last_name: string,
    email: string,
    state: number,
    profile: string
}