import { Role } from '../enums/role.enum';
export declare class CreateOnlyUserDto {
    readonly profilePicture: string;
    readonly fname: string;
    readonly lname: string;
    readonly roles: Role[];
    readonly gender: 'M' | 'F';
    readonly email: string;
    readonly password: string;
    readonly phone: number;
}
