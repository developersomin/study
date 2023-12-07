import { Module } from '@nestjs/common';
import {BoardsModule} from "./api/boards/boards.module";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import {ProductsModule} from "./api/products/products.module";
import {ProductsCategoriesModule} from "./api/productsCategories/productsCategories.module";
import {UsersModule} from "./api/users/users.module";
import {AuthModule} from "./api/auth/auth.module";
import {PointsTransactionsModule} from "./api/pointsTransactions/pointsTransactions.module";
import {FilesModule} from "./api/files/files.module";
import {CacheModule} from "@nestjs/cache-manager";
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';

@Module({
  imports: [
      AuthModule,
      BoardsModule,
      FilesModule,
      PointsTransactionsModule,
      ProductsModule,
      ProductsCategoriesModule,
      UsersModule,
      ConfigModule.forRoot(),
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        autoSchemaFile: 'src/commons/graphql/schema.gql',
          context: ({req, res}) =>{
            return {
                req,
                res,
            }
          }
    }),
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '12345678',
          database: 'myproject',
          entities: [__dirname+'/api/**/*.entity.*'],
          synchronize: true,
          logging: true,
      }),
      CacheModule.register<RedisClientOptions>({
          store: redisStore,
          url: "redis://my-redis:6379",
          isGlobal: true,
      })
  ],
})
export class AppModule {}
