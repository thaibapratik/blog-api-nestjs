import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogScehma } from './schemas/blogs.schema';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Blog', schema: BlogScehma }])],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
