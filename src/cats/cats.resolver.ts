import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CatsService } from './cats.service'
import { CatTypeDto } from './dto/cat-type.dto'
import { CatInput } from './inputs/cat.input'

@Resolver()
export class CatsResolver {
  constructor (
    private readonly catsService : CatsService,
  ) {}

  @Query(() => [CatTypeDto])
  async cats () {
    return this.catsService.findAll()
  }

  @Mutation(() => CatTypeDto)
  async createCat (@Args('input') input : CatInput) {
    return this.catsService.create(input)
  }

}