# Docker 란?
도커는 개발 환경 요소들이 설치된 모습을 이미지로 저장하고 저장한 이미지를 클라우드에 올린다. 이미지들이 서로 연결되어 동작하는 설정을 Dockerfile로 저장하고 새 컴퓨터에 가서 복사한 문서의 내용대로 이미지를 다운받아 설치한다.

리눅스의 컨테이너 기술을 이용해서 가상화를 하지 않고 프로세스만 격리해서 빠르게 실행시키는 기술이며, 가상 머신처럼 독립된 실행환경을 만들어 주는 도구라고 할 수 있다. 단 가상머신은 아니며 다치 운영체제를 설치하는 것처럼 실행 된다. 하지만 운영체제는 실제로 설치되지 않으므로 설치 용량이 적고 빠르다는 장점이 있다.


<img width="70%" src="https://github.com/developersomin/study/assets/127207131/09530ad5-4733-4c77-93c6-b5c31a6302fc">

## Docker를 사용하는 이유

팀원 및 서버와 개발 환경을 쉽게 동기화 할 수 있다.

개발을 하다보면 팀원들과 언어나 프레임워크 버전이 달라 오류가 나는 경우가 있다. 도커를 사용하면 도커 이미지에 언어나 프레임워크 버전을 미리 모두 정해놓을 수 있고 해당 이미지를 컨테이너화 시키면 그 컨테이너는 로컬 환경의 간섭 없이 독립적으로 구동하기 때문에 위 걱정을 안해도 된다.
 
또한 Dockerfile을 사용하면 설치할 언어, 프레임워크, 패키지 등을 미리 코드 형태로 명시하고 어느 컴퓨터에서든 쉽게 자동으로 설치할 수 있다.

## Dockerfile

컨테이너를 실행하기 전에 먼저 해줘야할 것은 이미지를 만드는 것이다. Dockerfile 이라는 이름의 파일을 만들고 이미지를 만들기 위한 명령어를 입력한다. 그리고 docker build 명령어를 통해 이미지를 만들게 된다.

```
#1.운영체제 및 프로그램 설치(이미 리눅스 ,node , npm , yarn 까지 한꺼번에 다운받는 방식)
FROM node:14

#2. 내컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안에 복사하기
COPY index.js /index.js

#3. 도커안에서 index.js 실행시키기 RUN은 이미지화 할때 다 같이 저장되지만 cmd는 이미지화 할때 저장이 안됨
#   CMD는 저장된 컴퓨터를 실행시킬때 cmd가 실행된다. (마지막 한번만 쓸 수 있음)
CMD node index.js
```

## docker build
이제 만들어진 설명서를 가지고 하나로 묶여진 이미지로 이미지로 만들어준다. 이것을 build 라 하고 터미널에서 __docker build .__  명령어를 입력해 준다.

빌드가 완료되면 __docker images__ 명령어로 이미지가 잘 생성 되었는지 확인한다.

## docker run

docker run 이미지ID 명령어를 이용해 이미지를 실행할 수 있다. 이렇게 이미지를 실행시키면 가상 컴퓨터 하나가 만들어 진 것이고 도커로 만들어진 가상의 컴퓨터를 컨테이너라고 부른다.

docker ps 는 실행 중인 컨테이너를 확인 할 수 있는 명령어이다.

docker ps -a 는 종료된 컨테이너 까지 모두 보여준다.

docker rm 컨테이너ID 명령어를 통해 컨테이너를 완전히 지워줄 수 있다.

docker exec -it 컨테이너_아이디 /bin/bash 명령어를 입력하면, 화면이 bash 쉘로 바뀌게 된다. 도커에서 돌아가고 있는 가상 컴퓨터의 터미널로 들어온 것이다. pwd , ls 명령어를 통해 모든 소스코드들이 잘 복사 되어 있는지 확인 할 수 있다.

## 포트 포워딩
호스트 머신의 포트를 컨테이너 포트와 연결해 컨테이너 밖에서 온 통신을 컨테이너 포트로 전달한다. 이 기능 덕분에 컨테이너 포트를 컨테이너 외부에서도 이용 할 수 있다.

docker run -p 8000:3000 이미지_아이디 명령어를 입력한다.

호스트 포트 8000을 컨테이너 포트 3000에 연결하여 포트 포워딩 적용한다.


## MongoDB 특징
MongoDB는 문서지향 저장소를 제공하는 NoSQL 데이터베이스 시스템이다. 

데이터를 Document 로 불리며, 이 데이터의 집합을 collection 이라고 한다. (이것을 RDB에서는 테이블이라고 한다.)

스키마 제약 없이 자유롭고, Binary JSON 형태로 각 문서가 저장되며 배열이나 날짜 등 기존 RDMS에서 지원하지 않던 형태로도 저장할 수 있기 때문에 관계를 연결하는 조인이 필요 없이 한 문서에 좀 더 이해하기 쉬운 형태 그대로 정보를 저장 할 수 있다는 것이 특징이다.

## 터미널에서 mongoDB 연결

상태 확인: sudo systemctl status mongodb
구동: sudo systemctl start mongodb
정지: sudo systemctl stop mongodb
MongoDB 접속: mongosh

## Docker-compose
복수 개의 컨테이너를 실행시키는 도커 애플리케이션을 통합적으로 만들고 각각의 컨테이너를 시작 및 중지하는 작업을 더 쉽게 수행할 수 있도록 도와주는 도구이다. 

YAML 파일로 여러개의 도커 내부 속성을 설정하고 YAML 파일을 실행시켜 마치 도커를 일괄적으로 한번에 실행시키는 것과 같다.

## Docker-compose를 활용한 MongoDB 연결

Dockerfile 을 작성하여 백엔드 서버 연결을 위한 하나의 가상 컴퓨터를 만들었다. 이번에는 Dockerfile.mongo 파일을 만들어 데이터베이스 연결을 위한 하나의 가상 컴퓨터를 만들어 보자.  (Dockerfile.mongo 파일에 FROM mongo:5 작성)

그 후 Express와 MongoDB의 서버를 한번에 실행시키기 위해 YAML 파일을 정의해주어야 한다. docker-compose.yaml 파일을 생성하여 코드를 작성해보자

```yaml
version: '3.7'

#컴퓨터들
services:
  #컴퓨터이름
  my-backend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - 4000:4000
  #컴퓨터이름
  my-database:
    build:
      context: .
      dockerfile: Dockerfile.mongo
    ports:
      - 27017:27017
```

 터미널에서 __docker-compose build__ 입력하여 image를 build 하고 __docker-compose up__ 을 입력하여 컨테이너를 실행시켜준다.
 

```yaml
  my-database:
    image: mongo:5
    ports:
      - 27017:27017
```
 Dockerfile.mongo 파일로 빌드 했던 것을 image 로 변경할 수 있다. 
 
## Docker-compose의 volumes
로컬 파일을 변경하여도 docker 내의 파일이 변경되지 않는다. 이 문제를 Volumes로 해결할 수 있다.
내컴퓨터와 도커 컴퓨터의 저장 공간을 공유해주는 것이 Volumes이다.
```yaml
  my-backend:
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - ./index.js:/myfolder/index.js
    ports:
      - 4000:4000
```

## Docker 패키징
```yaml
version: '3.7'

#컴퓨터들
services:

  my-backend:
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - ./src:/myfolder/src
    ports:
      - 3000:3000
    env_file:
      - ./.env.docker

  my-database:
    image: mysql:latest
    environment:
      MYSQL_DATABASE: 'mydocker'
      MYSQL_ROOT_PASSWORD: '12345678'
    ports:
      - 3306:3306

```

```javascript
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
```