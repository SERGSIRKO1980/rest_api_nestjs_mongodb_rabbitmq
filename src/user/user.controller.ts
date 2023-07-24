import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/api')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/users')
  public postUser(@Body() user: UserDto) {
    return this.userService.postUser(user);
  }

  @Get('/user/:id')
  public async getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Get('/user/:id/avatar')
  public async getUserAvatarById(@Param('id') id: number) {
    return this.userService.getUserAvatarById(id);
  }

  @Post('/users/avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      dest: './src/user/avatars',
    }),
  )
  uploadSingle(@UploadedFile() file) {
    return file;
  }

  @Delete('/user/:id/avatar')
  public async deleteAvatarById(@Param('id') id: number) {
    this.userService.deleteAvatarById(id);
  }
}
