import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Blog {
  @Prop()
  title: string;

  @Prop()
  authur: string;

  @Prop()
  content: string;
}

export const BlogScehma = SchemaFactory.createForClass(Blog);
