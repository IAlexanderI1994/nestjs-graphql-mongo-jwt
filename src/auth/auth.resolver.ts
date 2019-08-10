import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserTypeDto } from '../users/dto/user-type.dto'
import { UserInput } from '../users/inputs/user.input'
import { RegisterUserInput } from '../users/inputs/register-user.input'
import { AuthService } from './auth.service'

@Resolver()
export class AuthResolver {
  constructor (
    private readonly authService : AuthService,
  ) {}

  @Mutation(() => UserTypeDto)
  async register (@Args('input' /*, new JoiValidationPipe(REGISTER_SCHEMA) */) input : RegisterUserInput) {

    return this.authService.register(input)
  }

}
