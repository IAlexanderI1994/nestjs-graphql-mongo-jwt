import { Field, ID, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class CatTypeDto {
  @Field(() => ID)
  readonly id : string
  @Field()
  readonly name : string
  @Field(() => Int)
  readonly age : number
  @Field()
  readonly breed : string

}

