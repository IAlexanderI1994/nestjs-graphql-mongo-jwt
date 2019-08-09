import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { CatsModule } from './cats/cats.module'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req })
    }),
    MongooseModule.forRoot('mongodb://root:root@localhost:27017/nest?authSource=admin', { useNewUrlParser: true }),
    CatsModule,
    AuthModule,
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
