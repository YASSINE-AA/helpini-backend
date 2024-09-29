import { Controller, Get, Post, Param, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { PostType } from './schemas/postType.schema';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(): Promise<PostType[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostType> {
    return this.postsService.findOne(id);
  }

  @Put(':id/rate')
  async addRating(
    @Param('id') id: string,
    @Body() createRatingDto: CreateRatingDto,
  ): Promise<PostType> {
    return this.postsService.addRating(id, createRatingDto.rating);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: any,
  ): Promise<PostType> {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.postsService.delete(id);
  }

  @Get(':id/rating')
  async getAverageRating(@Param('id') id: string): Promise<number> {
    const post = await this.postsService.findOne(id);
    return this.postsService.calculateAverageRating(post);
  }
}
