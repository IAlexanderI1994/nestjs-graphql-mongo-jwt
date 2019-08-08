import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor (
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
}