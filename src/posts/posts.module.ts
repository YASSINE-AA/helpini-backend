import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostType, Postschema } from './schemas/postType.schema';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { RolesGuard } from 'src/users/roles.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: PostType.name, schema: Postschema }])],
  controllers: [PostsController],
  providers: [PostsService, JwtService],
  exports: [PostsService],
})
export class PostsModule {}
