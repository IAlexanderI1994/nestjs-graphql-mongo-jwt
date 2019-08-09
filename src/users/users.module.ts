import { Module } from '@nestjs/common'
import { UserSchema } from './users.schema'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}