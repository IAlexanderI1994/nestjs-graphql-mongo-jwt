import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { UserTypeDto } from './dto/user-type.dto'


@Resolver()
export class UsersResolver {
  constructor (
    private readonly usersService : UsersService,
  ) {}

  @Query(() => [UserTypeDto])
  async users () {
    return this.usersService.findAll()
  }


}