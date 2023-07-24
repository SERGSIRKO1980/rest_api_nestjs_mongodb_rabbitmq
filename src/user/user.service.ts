import { HttpException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { NotFounUserException } from './exceptions/not-found-exception.exception';

const userProjection = {
  __v: false,
  _id: false,
};

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  public async postUser(newUser: UserDto) {
    const user = await new this.userModel(newUser);
    return user.save();
  }

  public async getUserById(id: number): Promise<UserDto> {
    const user = await this.userModel.findOne({ id }, userProjection).exec();
    if (!user) {
      throw new NotFounUserException();
    }
    return user;
  }

  public async getUserAvatarById(id: number): Promise<string> {
    const avatar = (await this.userModel.findOne({ id }, userProjection).exec())
      .avatar;
    if (!avatar) {
      throw new HttpException('Not Found', 404);
    }
    return avatar;
  }

  public async deleteAvatarById(id: number): Promise<any> {
    const avatar = await this.userModel
      .deleteOne({ id }, userProjection)
      .exec();
    if (!avatar) {
      throw new HttpException('Not Found', 404);
    }
    return avatar;
  }
}

