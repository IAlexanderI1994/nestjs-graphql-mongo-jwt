import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserTypeDto } from '../users/dto/user-type.dto'
import { TokenTypeDto } from '../users/dto/token-type.dto'
import { UserInput } from '../users/inputs/user.input'
import { RegisterValidationPipe } from '../pipes/register-validation.pipe'
import { LoginValidationPipe } from '../pipes/login-validation.pipe'
import { RegisterUserInput } from '../users/inputs/register-user.input'
import { AuthService } from './auth.service'
import { LoginInput } from '../users/inputs/login.input'
import { CurrentUser } from '../decorators/current-user.decorator'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from './auth.guard'
import { UsersService } from '../users/users.service'

@Resolver()
export class AuthResolver {
  constructor (
    private readonly authService : AuthService,
    private readonly userService : UsersService,
  ) {}

  @Query(returns => UserTypeDto)
  @UseGuards(GqlAuthGuard)
  currentUser (@CurrentUser() user) {
    return this.userService.findById(user.id)
  }

  @Mutation(() => UserTypeDto)
  async register (@Args('input', RegisterValidationPipe) input : RegisterUserInput) {
    return this.authService.register(input)
  }

  @Mutation(() => TokenTypeDto)
  async login (@Args('input', LoginValidationPipe) input : LoginInput) {

    return this.authService.login(input)
  }

}
