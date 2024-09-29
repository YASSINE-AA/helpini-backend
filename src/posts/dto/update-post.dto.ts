import { PartialType } from '@nestjs/mapped-types';
import { PostType } from './create-post.dto';

export class UpdatePostDto extends PartialType(PostType) {}
