/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CryptingService } from './crypting/crypting.service';
import { User } from './schemas/user.schema';
import { Request, Response } from 'express';
export declare class usersController {
    private usersService;
    private readonly cryptingService;
    constructor(usersService: UsersService, cryptingService: CryptingService);
    register(newUser: User): Promise<HttpStatus>;
    updateCategories(categories: any, request: any): Promise<HttpStatus>;
    uploadProfilePicture(file: Express.Multer.File, req: Request): Promise<User>;
    getProfilePicture(email: string, res: Response): Promise<void>;
    updateInfo(newInfo: User, request: any): Promise<HttpStatus>;
}
