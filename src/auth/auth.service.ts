import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { UserInput } from '../users/inputs/user.input'
import { RegisterUserInput } from '../users/inputs/register-user.input'
import { User } from '../users/interfaces/user.interface'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {

  constructor (
    @InjectModel('User') private readonly userModel : Model<User>,
    private readonly usersService : UsersService,
    private readonly jwtService : JwtService
  ) {}

  async validateUser (username : string, pass : string) : Promise<any> {
    const user = await this.usersService.findOne(username)

    if (user && user.password === pass) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login (user : any) {

    const { username, password } = user
    const userData               = await this.validateUser(username, password)
    if (!userData) return null
    const payload = { username: userData.username, sub: userData.userId }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async register (payload : RegisterUserInput) : Promise<User> {

    const { email, password } = payload

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