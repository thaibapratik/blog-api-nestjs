import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Blog {
  @Prop({ required: true, index: 'text' })
  title: string;

  @Prop({ required: true, index: 'text' })
  author: string;

  @Prop({ required: true, index: 'text' })
  content: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

// Create a compound text index with weights
BlogSchema.index(
  {
    title: 'text',
    content: 'text',
    author: 'text',
  },
  {
    weights: {
      title: 10,
      author: 5,
      content: 1,
    },
    name: 'BlogSearchIndex',
  },
);
