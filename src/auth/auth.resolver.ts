import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserTypeDto } from '../users/dto/user-type.dto'
import { TokenTypeDto } from '../users/dto/token-type.dto'
import { UserInput } from '../users/inputs/user.input'
import { RegisterValidationPipe } from '../pipes/register-validation.pipe'
import { LoginValidationPipe } from '../pipes/login-validation.pipe'
import { RegisterUserInput } from '../users/inputs/register-user.input'
import { AuthService } from './auth.service'
import { LoginInput } from '../users/inputs/login.input'

@Resolver()
export class AuthResolver {
  constructor (
    private readonly authService : AuthService,
  ) {}

  @Mutation(() => UserTypeDto)
  async register (@Args('input', RegisterValidationPipe) input : RegisterUserInput) {

    return this.authService.register(input)
  }

  @Mutation(() => TokenTypeDto)
  async login (@Args('input', LoginValidationPipe) input : LoginInput) {

    return this.authService.login(input)
  }

}
