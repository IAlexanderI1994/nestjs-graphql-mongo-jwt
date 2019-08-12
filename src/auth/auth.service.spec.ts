import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
import { UserSchema } from '../users/users.schema'
import * as mongoose from 'mongoose'
import { getModelToken } from '@nestjs/mongoose'
import { JwtStrategy } from './jwt.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

const userModel = mongoose.model('User', UserSchema)

describe('AuthService', () => {
  let service : AuthService

  beforeEach(async () => {
    const module : TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secretOrPrivateKey: process.env.SECRETKEY || 'secretKey',
          signOptions: {
            expiresIn: 3600,
          },
        }),
      ],

      providers: [
        AuthService,
        UsersService,
        JwtStrategy,
        {
          provide: getModelToken('User'),
          useValue: userModel
        },
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
