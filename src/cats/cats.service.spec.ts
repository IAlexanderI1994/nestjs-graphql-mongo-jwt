import { Test, TestingModule } from '@nestjs/testing'
import { CatsService } from './cats.service'
import * as mongoose from 'mongoose'
import { Cat } from './interfaces/cat.interface'
import { CatSchema } from './cats.schema'
import { getModelToken } from '@nestjs/mongoose'

const catModel = mongoose.model('Cat', CatSchema)

describe('Cats service', () => {
  let service : CatsService


  beforeEach(async () => {
    const module : TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getModelToken('Cat'),
          useValue: catModel
        },

      ],

    }).compile()

    service = module.get<CatsService>(CatsService)
  })

  it('should be defined', () => {

    expect(service).toBeDefined()
  })
})