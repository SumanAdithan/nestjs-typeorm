import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreatwUserProfile.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.findUsers();
  }

  @Post()
  createUsers(@Body() createUserDto: CreateUserDto) {
    this.userService.createUser(createUserDto);
  }

  @Patch(':userId')
  updateUserById(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, updateUserDto);
  }

  @Delete(':userId')
  deleteUserById(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.deleteUser(userId);
  }

  @Post(':userId/profile')
  createUserProfile(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.userService.createUserProfile(userId, createUserProfileDto);
  }

  @Post(':userId/posts')
  createUserPost(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() CreateUserPostDto: CreateUserPostDto,
  ) {
    return this.userService.createUserPost(userId, CreateUserPostDto);
  }
}
