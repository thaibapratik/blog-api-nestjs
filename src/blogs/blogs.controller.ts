import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import mongoose from 'mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Types.ObjectId) {
    return this.blogsService.findOne(id);
  }

  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  @Patch(':id')
  update(
    @Body() updateBlogDto: UpdateBlogDto,
    @Param('id') id: mongoose.Types.ObjectId,
  ) {
    return this.blogsService.update(id, updateBlogDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: mongoose.Types.ObjectId) {
    return this.blogsService.deleteOne(id);
  }

  @Delete()
  deleteAll() {
    return this.blogsService.deleteAll();
  }
}
