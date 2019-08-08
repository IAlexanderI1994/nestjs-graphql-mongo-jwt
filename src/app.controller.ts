import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth/auth.service'

@Controller('api')
export class AppController {
  constructor (private readonly authService : AuthService) {}

  @Post('login')
  async login (@Request() req) {
    const { body: { ...user } } = req

    return this.authService.login(user)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile (@Request() req) {
    return req.user
  }
}
