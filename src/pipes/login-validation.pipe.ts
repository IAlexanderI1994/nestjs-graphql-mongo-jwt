import { ArgumentMetadata, BadRequestException, Injectable, NotFoundException, PipeTransform } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class LoginValidationPipe implements PipeTransform {

  constructor (
    private readonly usersService : UsersService,
  ) {}

  async transform (target : any, metadata : ArgumentMetadata) {

    const { email, password } = target
    const errors              = []
    const user                = await this.usersService.findOne({ email })

    if (!user) {
      errors.push({
        target,
        constraints: {
          userNotFound: 'Пользователь не найден'
        }
      })
      throw new NotFoundException(errors)
    }
    const isCompare = await (async () => await bcrypt.compare(password, user.password))()
    console.log(isCompare)
    if (!isCompare) {
      errors.push({
        target,
        constraints: {
          badCredentials: 'Логин/пароль не совпадают'
        }
      })
      throw new BadRequestException(errors)
    }

    return target
  }
}
