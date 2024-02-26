import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<object> {
    const findUser = await this.userModel.findOne({
      username: username,
      password: password,
    });
    if (findUser) {
      const token = await this.jwtService.signAsync({ id: findUser._id });
      return {
        data: {
          token,
          username: findUser.username,
          created_at: findUser.createdAt,
        },
      };
    }
  }

  async getMe(id: string): Promise<object> {
    const findUser = await this.userModel.findById(id);
    return {
      data: {
        id: findUser._id,
        username: findUser.username,
      },
    };
  }

  async updateUser(
    id: string,
    username: string,
    password: string,
  ): Promise<object> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      {
        username: username,
        password: password,
      },
      { new: true },
    );
    return {
      data: updatedUser,
    };
  }
}
