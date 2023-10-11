## OOP (Object Oriented Programming)
프로그래밍에서 필요한 데이터를 추상화시켜 상태와 행위를 가진 객체로 만들고 객체들간의 상호 작용을 통해 로직을 구성하는 프로그래밍 방법이다.

4가지 특성으로 추상화, 캡슐화, 상속성, 다형성이 있다.

추상화는 사물들의 공통적인 특징, 즉 추상된 특징을 파악해 인식의 대상으로 삼는 행위를 말한다. 구체적인 사물들의 공통적인 특징을 파악해서 이를 하나의 개념(집합)으로 다루는 수단이다.

캡슐화란 하나의 객체에 대해 그 객체가 특정한 목적을 위한 필요한 변수나 메소드를 하나로 묶는 것을 의미한다. 정보은닉을 통해 높은 응집도와 낮은 결합력을 가지게 된다. 

상속이란 기존 상위 클래스에 근거하여 새롭게 클래스와 행위를 정의할 수 있게 도와주는 개념이다. 같은 특징이 있는 클래스를 그대로 물려받아 다시 작성할 필요 없이 재사용으로 효율성을 높여 다형성을 확보 할 수 있다.

다형성이란 상속을 통해 기능을 확장하거나 변경하는 것을 가능하게 해준다.


## NestJs?
NestJs는 타입스크립트를 지원하는 효율적이고 확장 가능한 Node.js의 서버 애플리케이션 프레임워크이다. 

node로 백엔드를 만드는 것은 마치 레고 와같다. 레고처럼 조립할 수 있는 부품이 있고 그 작은 부품들을 차근차근 조립하다 보면 거대한 완성품을 만들수 있다. 규칙과 제약 없이도 자유롭게 거대한 것을 창조하는 과정이 매우 훌륭한 경험이 될 수 있다.

하지만 문제는 너무 제약이 없고 자유롭다는 점에서 프로젝트로 협업을 진행할 경우 개발자마다 다양한 아키텍처 패턴을 가지고 있고 개인의 구조와 스타일이 다름으로 인해 협업 과정에 드는 소통 비용이 증가한다. 이는 생산성 저하와 유지 보수 비용이 많이 든다.

이 문제점을 NestJs가 해결한다. 규칙과 구조 없이 자유분방한 node 를 순식간에 java+Spring 수준으로 만들어 준다. 아키텍처를 통일하고 소통비용을 절감하며 확장성 있고 효율적인 개발을 할 수 있게 된다.


## NestJS 설치
```
npx @nestjs/cli new qqq
```
nestjs 를 만들게 되면 typescript 파일 등 여러 파일들과 함께 .git 파일도 자동으로 만들어 지게 된다 (숨긴 파일로 .git 존재). 따라서 .git 파일이 2개 이상 존재하게 되며 나중에 에러가 발생되므로 자동 생성된 .git 파일을 삭제해주어야 한다.

```
rm -rf .git
```
위 명령어로 .git 삭제된 것을 볼 수 있다.

## Schema First(스키마 우선) vs code First(코드 우선)
Schema First 는 graphql 의 스키마를 먼저 정의하고 그 스키마 정의에 맞게 코드를 작성하는 방식이다.

```javascript
const typeDefs= `#graphql 

    type MyResult{
        number: Int
        writer: String
        title: String
        contents: String
    }
    
    type Query {
        fetchBoards: [MyResult]
    }
`
```

위 방식과 같이 typeDefs를 하나하나 작성했다. 하지만 NestJS는 code first 방식으로 resolvers 를 작성하면 자동으로 typeDefs 를 생성 한다.

https://github.com/nestjs/nest/tree/master/sample/23-graphql-code-first

NestJS 공식 홈페이지 깃허브 샘플코드를 보고 구조를 확인해보자. app.service.ts, app.controller.ts 가 없이 app.moudule.ts 와 main.ts 파일, 폴더들이 있는 것을 확인 할 수있다. 

폴더들은 각각의 api 폴더라 생각하면 된다.(User, Board 등) 위  폴더 안에 api 각각의 서비스, 컨트롤러, 모듈이 있고 서비스와 컨트롤러는 모듈이라는 파일에 합쳐진다. 각각의 api의 모듈들이 최종적으로 app.module.ts에 합쳐지게 되고 main.ts에 불러져서 실행되는 구조이다. 

그리고 우리는 이제 graphql를 쓰기 때문에 controller 대신 resolver을 사용하면 된다.
```javascript
yarn add @nestjs/graphql @nestjs/apollo graphql apollo-server-express @apollo/server
```
https://docs.nestjs.com/graphql/quick-start

공식문서를 보면서 graphql를 설치 후 제대로 GraphQL 셋팅을 해보자

## Typeorm을 활용한 NestJs와 MySQL 연결 실습 - TypeORM 설치
```
$ yarn add @nestjs/typeorm typeorm mysql2
```
<li>@nestjs/typeorm : NestJS 용 TypeORM.</li>
<li>typeorm : typeorm 최신 버전으로 설치.</li>
<li>mysql2 : TypeORM 을 MySQL 로 연결하기 위한 프로그램 설치. </li>

```javascript
@Module({
  imports: [
    BoardModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',            // 데이터 베이스 타입
      host: 'localhost',        // local 환경으로 진행
      port: 3306,               // mysql은 기본 port는 3306
      username: 'root',         // mysql은 기본 user는 root로 지정
      password: 'root',         // 본인의 mysql password 
      database: 'myproject',    // 연결할 데이터 베이스명
      entities: [Board],        // 데이터 베이스와 연결할 entity
      synchronize: true,        // entity 테이블을 데이터베이스와 동기화할 것인지
      logging: true,            // 콘솔 창에 log를 표시할 것인지
    }),
  ],
})
export class AppModule {}
```
위 방식으로 TypeORM을 활용해서 NestJs와 MySQL를 연결해보자.

