import { Field, InputType } from 'type-graphql'

@InputType()
export class RegisterUserInput {
  @Field()
  readonly email : string

  @Field()
  readonly password : string
  //{ nullable: true }
  @Field()
  readonly password2 : string

}