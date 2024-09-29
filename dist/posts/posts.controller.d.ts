import { PostsService } from './posts.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { PostType } from './schemas/postType.schema';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll(): Promise<PostType[]>;
    findOne(id: string): Promise<PostType>;
    addRating(id: string, createRatingDto: CreateRatingDto): Promise<PostType>;
    update(id: string, updatePostDto: any): Promise<PostType>;
    delete(id: string): Promise<void>;
    getAverageRating(id: string): Promise<number>;
}
