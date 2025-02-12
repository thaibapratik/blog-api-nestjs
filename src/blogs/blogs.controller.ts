import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Types } from 'mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiQuery } from '@nestjs/swagger';
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: ['createdAt', 'updatedAt'],
  })
  @ApiQuery({
    name: 'order',
    required: false,
    enum: ['asc', 'desc'],
  })
  @ApiQuery({
    name: 'search',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  findAll(
    @Query('sortBy') sortBy?: 'createdAt' | 'updatedAt',
    @Query('order') order?: 'asc' | 'desc',
    @Query('search') search?: string,
    @Query('page') page?: number,
  ) {
    return this.blogsService.findAll(sortBy, order, search, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(new Types.ObjectId(id));
  }

  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  @Patch(':id')
  update(@Body() updateBlogDto: UpdateBlogDto, @Param('id') id: string) {
    return this.blogsService.update(new Types.ObjectId(id), updateBlogDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.blogsService.deleteOne(new Types.ObjectId(id));
  }

  @Delete()
  deleteAll() {
    return this.blogsService.deleteAll();
  }
}
