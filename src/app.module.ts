import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module'; 
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { usersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { CryptingService } from './users/crypting/crypting.service';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { PostsModule } from './posts/posts.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './users/roles.guard';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/helpini'),
    UsersModule,
    PostsModule
  ],
  controllers: [AppController, AuthController, usersController, PostsController],  
  providers: [AppService, AuthModule, JwtService, AuthService, UsersModule, CryptingService,  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],  
})
export class AppModule {}
