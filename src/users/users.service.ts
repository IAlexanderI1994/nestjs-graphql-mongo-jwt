import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './interfaces/user.interface'
import { Model } from 'mongoose'

export type User = any;

@Injectable()
export class UsersService {

  constructor (@InjectModel('User') private readonly userModel : Model<User>) {}

  async findAll () : Promise<User | null> {
    return await this.userModel.find().exec()
  }

  async findOne (data) : Promise<User | null> {
    return await this.userModel.findOne(data)
  }

  async findById (id) : Promise<User | null> {

    const user = await this.userModel.findById(id).exec()
    console.log(user, id)
    return user
  }

}