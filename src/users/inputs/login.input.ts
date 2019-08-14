import { Field, InputType } from 'type-graphql'
import { IsEmail, MaxLength, MinLength } from 'class-validator'

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  readonly email : string
  @Field()
  @MinLength(6)
  @MaxLength(30)
  readonly password : string

}