import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { UserInput } from '../users/inputs/user.input'
import { RegisterUserInput } from '../users/inputs/register-user.input'
import { User } from '../users/interfaces/user.interface'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcryptjs'
import { LoginInput } from '../users/inputs/login.input'

@Injectable()
export class AuthService {

  constructor (
    @InjectModel('User') private readonly userModel : Model<User>,
    private readonly usersService : UsersService,
    private readonly jwtService : JwtService
  ) {}

  async login (user : LoginInput) {

    const userData = await this.usersService.findOne({ email: user.email })
    const payload  = { email: userData.email, id: userData._id}
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async register (payload : RegisterUserInput) : Promise<User> {

    const { password } = payload

    const createdUser = new this.userModel(payload)

    await new Promise(resolve =>
      bcrypt.genSalt(10, async (error, salt) => {
        createdUser.password = await bcrypt.hash(password, salt)
        resolve()
      })
    )

    return await createdUser.save()
  }


}