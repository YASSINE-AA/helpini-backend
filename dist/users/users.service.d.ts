/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateOnlyUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    create(createUserDto: CreateOnlyUserDto): Promise<User>;
    findOne(email: string): Promise<any>;
    update(newInfo: User, oldEmail: string): Promise<import("mongoose").UpdateWriteOpResult>;
    updateCategories(userEmail: string, categories: string[]): Promise<any>;
    saveProfilePicture(email: string, base64Image: string): Promise<User>;
    findAll(): Promise<User[]>;
}
