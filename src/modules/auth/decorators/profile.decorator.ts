import { SetMetadata } from "@nestjs/common";

export const Profiles = (profile) => SetMetadata('profiles', profile);