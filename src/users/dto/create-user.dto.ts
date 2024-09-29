// create-user.dto.ts
import { IsString, IsEmail, IsIn, IsNumber } from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateOnlyUserDto {

  @IsString()
  readonly profilePicture: string;

  @IsString()
  readonly fname: string;

  @IsString()
  readonly lname: string;

  @IsIn([Role.Admin, Role.User])
  readonly roles: Role[];

  @IsIn(['M', 'F'])
  readonly gender: 'M' | 'F';

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsNumber()
  readonly phone: number;
}
