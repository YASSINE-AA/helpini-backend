import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../enums/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  @Prop()
  profilePicture: string;

  @Prop({required: true})
  fname: string;

  @Prop({required: true})
  lname: string;

  @Prop({required: true})
  roles: Role[];

  @Prop({required: true})
  gender: 'M' | 'F';

  @Prop({required: true})
  email: string;
  
  @Prop({required: true})
  password: string;

  @Prop({required: true})
  phone: number;

}

export const UserSchema = SchemaFactory.createForClass(User);