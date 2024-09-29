import { Controller, Get, Post, Body, Put, HttpException, HttpStatus, UseGuards, Req, Delete, UseInterceptors, UploadedFile, Param, Res, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CryptingService } from './crypting/crypting.service';
import { User } from './schemas/user.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import { jwtDecode } from "jwt-decode";
import { FileInterceptor } from '@nestjs/platform-express';
import { upload } from 'src/config/multer.config';
import mongoose from 'mongoose';
import * as Grid from 'gridfs-stream';
import { Request, Response } from 'express';


@Controller('users')
export class usersController {
  constructor(private usersService: UsersService, private readonly cryptingService: CryptingService) {}

  @Post('register')
  async register(@Body() newUser: User) {
    try {
        console.log(newUser);
        newUser.password = await this.cryptingService.cryptPassword(newUser.password);
    	await this.usersService.create(newUser);
        return HttpStatus.CREATED;

    } catch (e) {
        throw new HttpException('Bad Request', e);
    }     
  }

  @UseGuards(AuthGuard)
  @Put('updateCategories')
  async updateCategories(@Body() categories, @Req() request: any) {
    try {
      
      const authToken = request.headers.authorization.replace('Bearer', '').trim();
      const decodedToken = jwtDecode(authToken) as any;
      console.log(authToken);
      await this.usersService.updateCategories(decodedToken.email, categories);
      return HttpStatus.OK;

      
    } catch (e) {
      throw new HttpException('Bad Request', e);
    }
  }




  @UseGuards(AuthGuard) 
  @Post('uploadProfilePicture')
  @UseInterceptors(FileInterceptor('picture'))
  async uploadProfilePicture(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const authToken = req.headers.authorization.replace('Bearer', '').trim();
    const decodedToken = jwtDecode(authToken) as any;
    const base64Image = file.buffer.toString('base64');
    return this.usersService.saveProfilePicture(decodedToken.email, base64Image);
  }
  
  @Get('profilePicture/:email')
  async getProfilePicture(@Param('email') email: string, @Res() res: Response) {
    try {
      const user = await this.usersService.findOne(email);
      if (user && user.profilePicture) {
        // Send the profile picture data directly as a response
        res.type('image/jpeg').send(user.profilePicture);
      } else {
        throw new NotFoundException('User not found or profile picture not available');
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch profile picture');
    }
  }

  @UseGuards(AuthGuard)
  @Put('updateInfo')
  async updateInfo(@Body() newInfo: User, @Req() request : any) {
    try {
      
      const authToken = request.headers.authorization.replace('Bearer', '').trim();
      const decodedToken = jwtDecode(authToken) as any;
      console.log(authToken);
      await this.usersService.update(newInfo, decodedToken.email);
      return HttpStatus.OK;

    } catch (e) {
      throw new HttpException('Bad Request', e);
    }
  }

}