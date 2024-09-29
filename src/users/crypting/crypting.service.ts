

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {genSalt, hash, compare} from 'bcrypt';

@Injectable()
export class CryptingService {
    
    async cryptPassword(password: string): Promise<string> {
        const saltRounds = 10;
        try {
          const salt = await genSalt(saltRounds);
          const hashedPassword = await hash(password, salt);
          return hashedPassword;
        } catch (error) {
          throw new Error('Error generating salt or hashing password: ' + error.message);
        }
      }
    comparePassword(original: string, hashed: string) {
        return compare(original, hashed);
    }
}
