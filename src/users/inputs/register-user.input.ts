import { Field, InputType } from 'type-graphql'
import { IsEmail, MaxLength, MinLength } from 'class-validator'

@InputType()
export class RegisterUserInput {
  @Field()
  @IsEmail()
  readonly email : string

  @Field()
  @MinLength(60)
  @MaxLength(200)
  readonly password : string

  @Field({ nullable: true })
  @MinLength(60)
  @MaxLength(200)
  readonly password2? : string

}