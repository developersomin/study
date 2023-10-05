import { Module } from '@nestjs/common';
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {BoardsModule} from "./apis/boards/boards.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import * as process from "process";
import {ConfigModule} from "@nestjs/config";
import {Board} from "./apis/boards/entities/board.entity";

@Module({
    imports: [
        BoardsModule,
        ConfigModule.forRoot(), // env 사용을 위해 Nest에서 제공하는 ConfigModule을 사용
                                // ConfigModule 사용을 위해선 yarn add @nestjs/config 를 통해 config module를 설치
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/commons/graphql/schema.gql',
        }),
        TypeOrmModule.forRoot({
            //.env 파일은 모두 string 형태로 인식이 됩니다. 따라서, type과 port에 추가 설정을 해주었습니다.
            type: process.env.DATABASE_TYPE as 'mysql',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
            entities: [Board],
            synchronize: true,
            logging: true,

        })
    ],
})
export class AppModule {}
