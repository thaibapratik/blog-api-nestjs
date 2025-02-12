import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Introduction to Nest.js' })
  title: string;

  @IsString()
  @ApiProperty({
    example:
      'Nest.js is a fast, unopinionated, minimalist web framework for Node.js that is widely used for building APIs and web applications.',
  })
  content: string;

  @IsString()
  @ApiProperty({ example: 'Michael Clark' })
  author: string;
}
