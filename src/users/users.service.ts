import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateOnlyUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateOnlyUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOne(email: string): Promise<any> {
    return this.userModel.findOne({email: email}).exec();
  }

  async update(newInfo: User, oldEmail: string) {
    console.log(newInfo);
    return this.userModel.updateOne(
      { email: oldEmail },
      { $set: {lname: newInfo.lname, fname: newInfo.fname, email: newInfo.email, phone: newInfo.phone, gender: newInfo.gender} }
    ).exec();
  }
  
  async updateCategories(userEmail: string, categories: string[]) : Promise<any> {
    console.log(categories);
    return this.userModel.updateOne(
      { email: userEmail},
      {$set: {chosen_categories: [...categories]}}
    ).exec();
  }


          async saveProfilePicture(email: string, base64Image: string): Promise<User> {
            const user = await this.userModel.findOneAndUpdate(
              { email },
              { profilePicture: base64Image },
              { new: true }
            ).exec();
        
            return user;
          }


  

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
