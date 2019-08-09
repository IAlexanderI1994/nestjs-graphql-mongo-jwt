import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'
import { AuthResolver } from './auth.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from '../users/users.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}