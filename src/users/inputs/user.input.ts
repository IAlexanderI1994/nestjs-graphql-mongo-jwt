import { Field, InputType } from 'type-graphql'

@InputType()
export class UserInput {
  @Field()
  readonly email : string
  @Field()
  readonly password : string

}