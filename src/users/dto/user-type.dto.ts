import { Field, ID, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class UserTypeDto {
  @Field(() => ID)
  readonly id : string
  @Field()
  readonly email : string
  @Field()
  readonly password : string

}

