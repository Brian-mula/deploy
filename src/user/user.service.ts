import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel:Model<User>){}
   async create(createUserDto: CreateUserDto) {
    try {
      const { username, phone_number } = createUserDto;
    const dbUser = await this.userModel.findOne({phone_number});
    if(dbUser){
      throw new HttpException('User already exists', 400);
    }
    const newUser = {
      username,
      phone_number,
    
    }
    return await this.userModel.create(newUser);

    // return newUser;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
