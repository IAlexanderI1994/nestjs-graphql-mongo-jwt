import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { UsersService } from '../users/users.service'

@Injectable()
export class RegisterValidationPipe implements PipeTransform {

  constructor (
    private readonly usersService : UsersService,
  ) {}

  transform (target : any, metadata : ArgumentMetadata) {

    const { email, password, password2 } = target
    const errors                         = []
    if (password !== password2) errors.push({
      target,
      constraints: {
        'passwordCompare': 'Пароли не совпадают'
      }
    })

    const user = this.usersService.findOne({ email })

    if (user) errors.push({
      target,
      constraints: {
        'userAlreadyExists': 'Пользователь с таким email уже существует'
      }
    })

    if (errors.length > 0) throw new BadRequestException(errors)

    return target
  }
}
