import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class TokenTypeDto {
  @Field()
  readonly access_token : string


}

