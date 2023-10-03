## 모듈이란?
하나의 큰 기능을 문제 해결을 쉽게하기 위하여 여러 작은 기능으로 분리하는데 이 작은 기능을 모듈이라고 한다. 

## module 장점
유지보수가 용이

## 자바스크립트 모듈
애플리케이션의 크기가 커지면 언젠간 파일을 여러 개로 분리해야 하는 시점이 온다. 

이때 분리된 파일 각각을 모듈이라고 하고  export와 import를 적용하면 공유가 가능하다.

**yarn init** 명령어를 입력하면 이를 통해 **package.json** 파일이 생성된다. 

import  명령어를 사용하기 위해 package.json 파일에 "type": "module"을 추가한다.

## Nodemon 적용
지금까지 코드를 수정 할때마다 서버를 종료하고 다시 시작하기를 무수히 반복해왔다. __nodemon 으로 refresh 문제를 해결할 수 있다.__
```
"scripts": {
    "start:dev": "nodemon index.js"
  }
```
package.json 파일에 scripts 부분을 작성하여 아래와 같이 실행 명령어를 작성한다. 

이제부터 터미널에서 yarn start:dev를 이용해 별도의 서버 종료, 재시작 없이 변화가 바로 반영되는 것을 확인 할 수 있다.

## Rest-API
```
app.post('/boards', (req, res)=>{

    console.log(req);
    console.log("--------------------------");
    console.log(req.body);

    res.send("게시물 등록에 성공");
});
```
게시물 등록하는 API이다. postman으로 body 값을 넣어 잘 작동하는지 확인해 보자.

콘솔 출력 값으로 확인해보니 req 값은 잘 나오지만 req.body 값은 undefined가 출력된다. 

그 이유는 express 프레임워크에 json형태를 지원하지 않기 때문이다. 해결하는 방법으로서 서버에서 json을 읽어오기 위해 **app.use(express.json())** 라는 미들웨어를 사용하여 json 데이터를 파싱하여 자바스크립트 객체로 사용할 수 있게 한다.

## Swagger를 활용한 API-Docs 만들기
Node.js로 구현한 API를 swagger와 연결하기 위해 swagger-ui-express, ewagger-jsdoc를 설치해야 한다. 

https://www.npmjs.com/package/swagger-ui-express?activeTab=readme
https://www.npmjs.com/package/swagger-jsdoc


```
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
    definition: {
        openapi: '3.0.0',
        info: {
            title: '나만의 미니프로젝트 API',
            version: '1.0.0',
        },
    },
    apis: ['./swagger/*.swagger.js'],
};

export const openapiSpecification = swaggerJsdoc(options);
```

swagger 폴더 안에 config.js 생성 후 swagger-jsdoc 문서를 활용하여 설정파일을 작성한다.

```
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
```
Swagger UI Express 공식문서를 활용하여 미들웨어를 작성한다.

https://swagger.io/docs/specification/basic-structure/

swagger 공식문서를 통해 swagger 작성방법를 익힌다.





### ajax
**ajax**란 javascript의 라이브러리중 하나이다. 전체 페이지를 새로 고치지 않고도 페이지의 일부만을 위한 데이터를 로드하는 기법이며 JavaScript를 사용한 비동기 통신, 클라이언트와 서버간에 XML 데이터를 주고받는 기술이다.

### 비동기 방식
**비동기 방식**은 웹페이지를 리로드하지 않고 데이터를 불러오는 방식이다. Ajax를 통해서 서버에 요청을 한 후 멈추어 있는 것이 아니라 그 프로그램은 계속 돌아간다는 의미를 내포하고 있다.

## Axios 연동하기
backend 와 frontend 통신을 쉽게 하기 위해 Ajax와 더불어 사용한다.

HTML 파일에서는 axios를 이용하려면 <script> 태그를 사용해서 다운 받는 방법이 있다. 이러한 방식을 CDN(Contents Delevery Network)이라고 부른다.

```
 <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

## CORS 란?
Cross-Origin Resource Sharing의 약자로 리소스를 요청하는 cross-origin HTTP 요청 방식이다. Origin의 Resource에 공유할 때 안전한지 판단하기 위해 브라우저가 서버와 통신하는 방법이다. 권한을 HTTP Header에 넣어 부여한다. Header에 권한 부여가 없는 경우 요청이 제한된다.

## CORS 문제 해결하기
CORS 에러를 해결하기 위해 직접 응답 헤더에 Origin을 적어주는 방식도 가능하지만, 조금 더 간편한 cors 미들웨어 라이브러리를 설치하도록 한다. (yarn add cors)

app.use(cors()) 같이 입력해주면 모든 origin에서 들어오는 요청을 허용하게 된다.

추후, 보안과 관련해 특정 origin만을 허용해야 한다면, app.use(cors({origin: })) 과 같이 작성하여 특정 origin만을 허용하도록 설정 할 수 있다.

## 환경변수 분리
github 같은 공유 저장소에 본인만의 key값이 올라가게되면 도용 위험이 발생하기 때문에 환경변수로 분리하여 관리해주어야 한다.

환경변수 파일을 읽어오기 위해 라이브를 설치해주어야한다. 

yarn add dotenv

index.js 파일로 이동하여 설치된 dotenv를 import 해오는 코드를 추가한다. 

import 'dotenv/config'

process.env 라는 명령어를 사용하여 변수를 선언하게 되면 해당 명령어가 .env의 파일의 키값을 찾아 읽어준다.

## 인증 번호 전송 API 만들어보기
외부 API Coolsms 을 활용하여 문자로 인증하는 API를 만들어 보겠다.

yarn add coolsms-node-sdk 설치를 해준다.
https://console.coolsms.co.kr/sdk
https://www.npmjs.com/package/coolsms-node-sdk

공식문서를 통해 coolsms 연동하는 코드를 작성해 보자.

