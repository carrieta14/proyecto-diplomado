import { SetMetadata } from "@nestjs/common";

export const Profiles = (...Profile) => SetMetadata('Profiles', Profile);