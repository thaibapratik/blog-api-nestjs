import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Blog } from './schemas/blogs.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel('Blog')
    private blogModel: mongoose.Model<Blog>,
  ) {}

  async findAll(
    sortBy: 'createdAt' | 'updatedAt' = 'createdAt',
    order: 'asc' | 'desc' = 'desc',
    search?: string,
    page: number = 1,
  ) {
    const limit = 3;
    const sortOrder = order === 'asc' ? 1 : -1;

    let query = this.blogModel.find();

    const skip = (page - 1) * limit;

    if (search) {
      query = query.find({
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } },
        ],
      });
    }
    const blogs = await query
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    const totalBlogs = await this.blogModel.countDocuments();

    if (!blogs || blogs.length === 0) {
      throw new NotFoundException('No blogs found');
    }

    return {
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: page,
      blogs,
    };
  }

  async findOne(id: mongoose.Types.ObjectId) {
    const blog = await this.blogModel.findById(id);
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    return blog;
  }

  async create(createBlogDto: CreateBlogDto) {
    const newBlog = await this.blogModel.create(createBlogDto);

    return newBlog;
  }

  async update(id: mongoose.Types.ObjectId, updateBlogDto: UpdateBlogDto) {
    const updatedBlog = await this.blogModel.findByIdAndUpdate(
      id,
      {
        ...updateBlogDto,
      },
      { new: true },
    );

    if (!updatedBlog) {
      throw new NotFoundException('Blog not found');
    }

    return updatedBlog;
  }

  async deleteOne(id: mongoose.Types.ObjectId) {
    const deletedBlog = await this.blogModel.findByIdAndDelete(id);
    if (!deletedBlog) {
      throw new NotFoundException('Blog not found');
    }

    return { deletedBlog, message: 'Blog deleted' };
  }

  async deleteAll() {
    await this.blogModel.deleteMany();
    return { message: 'All blogs deleted' };
  }
}
