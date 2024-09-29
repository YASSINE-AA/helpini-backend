import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CryptingService } from 'src/users/crypting/crypting.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private cryptingService;
    constructor(usersService: UsersService, jwtService: JwtService, cryptingService: CryptingService);
    signIn(email: string, password: string): Promise<{
        access_token: string;
    }>;
}
