import {
  Body,
  Injectable,
  Options,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CryptingService } from 'src/users/crypting/crypting.service';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private cryptingService: CryptingService,
  ) {}

  async signIn(
    @Body()
    email: string,
    @Body() password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    if (
      user == null ||
      !(await this.cryptingService.comparePassword(password, user.password))
    ) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user._id,
      email: user.email,
      fname: user.fname,
      lname: user.lname,
      phone: user.phone,
      gender: user.gender,
      roles: user.roles,
    };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: 'test',
      }),
    };
  }
}
