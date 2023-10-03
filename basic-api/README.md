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