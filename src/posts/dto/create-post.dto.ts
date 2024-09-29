import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PostType extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  contact: string;

  @Prop({ default: [] }) 
  ratings: number[];
}

export const PostTypeSchema = SchemaFactory.createForClass(PostType);