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

  @Prop({ required: true })
  category: string;

  @Prop({ type: [Number], default: [] })
  ratings: number[];
}

export const Postschema = SchemaFactory.createForClass(PostType);
