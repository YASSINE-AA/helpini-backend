import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostType } from './schemas/postType.schema';
import { AuthGuard } from 'src/auth/auth.guard';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostType.name) private readonly PostModel: Model<PostType>,
  ) {}

  async create(createPostDto: any): Promise<PostType> {
    const createdPost = new this.PostModel(createPostDto);
    return createdPost.save();
  }

  async findAll(): Promise<PostType[]> {
    return this.PostModel.find().exec();
  }

  async findOne(id: string): Promise<PostType> {
    return this.PostModel.findById(id).exec();
  }

  async update(id: string, updatePostDto: any): Promise<PostType> {
    return this.PostModel.findByIdAndUpdate(id, updatePostDto, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.PostModel.findByIdAndDelete(id);
  }

  // Add a rating to a post
  async addRating(id: string, rating: number): Promise<PostType> {
    const post = await this.PostModel.findById(id);

    if (!post) {
      throw new Error('Post not found');
    }

    // Add the rating to the array
    post.ratings.push(rating);

    // Save the updated post
    return post.save();
  }

  // Calculate the average rating
  calculateAverageRating(post: PostType): number {
    if (post.ratings.length === 0) {
      return 0;
    }

    const sum = post.ratings.reduce((total, rating) => total + rating, 0);
    return sum / post.ratings.length;
  }
}
