## 로그인의 역사

로그인을 하게 되면 백엔드 서버로 loginAPI 요청이 날아가게 되고 백엔드 서버에서는 해당 유저를 백엔드 세션에 저장하게 된다. 그 후 특정한 세션 ID 를 부여해서 브라우저로 보내준다.

이 세션 ID는 로그인을 해야지만 사용가능한 서비스들을 이용할때 넣어서 백엔드 서버에 들어오게 된다. 서버에서 세션 ID를 확인하여 유저가 맞다면 이 서비스를 이용할 수 있게 브라우저에 보내게 된다.

이렇게 유저의 정보를 백엔드 서버로 받다보니 한번에 여러명의 정보를 받기에는 한계가 있고 메모리가 부족해지며 서버가 터지게 된다. 이것을 보완하기 위해 `scale-up`을 해주어야한다. (컴퓨터 성능을 올림)

이렇게 성능을 올려도 접속자 수가 많아지면 서버의 부하를 초래하게 된다. 이 문제도 해결법이 있다. `scale-out` 을 이용해 컴퓨터를 복사하는 것이다. 하지만 이 역시 문제가 있다. 복사 할 때 session까지 `scale-out`을 하지 않아 기존의 로그인 정보를 가지고 있던 컴퓨터가 아니면 로그인 정보가 없다. 그렇다고 session 까지 `scale-out`을 하게 되면 백엔드 서버에는 더욱 부하가 심해지기 때문에 다른 방법을 이용해야 한다.

__따라서 `stateless` 상태로 백엔드 컴퓨터를 확장하는 것이 가장 좋은 방법이다.__

> stateless : session에 로그인한 유저 정보가 없는 상태


## JWT
가장 대표적인 stateless 

기본적으로는 클라이언트가 인증 정보를 관리하기 때문에 쿠키 인증 방식과 비슷하다. 쿠키 인증 방식은 유저의 인증 정보를 직접적으로 관리 하기 때문에 보안상의 문제점이 많은 방식이다.

JWT는 사용자의 정보를 담은 객체를 암호화를 통해 문자열로 만들어 암호화된 키를 브라우저로 전달해준다.  

> JWT 구성
> 1. header: 토큰의 타입, 암호화 할때 언떤 알고리즘이 사용되었는지
> 2. payload: 사용자의 정보, 토큰 언제 발행 되는지 , 토큰 언제 만료되는지
> 3. signature: 토큰의 비밀번호


로그인을 하게 되면 accessToken을 받아 온다. 
이 과정을 `인증`이라고 한다. 
유저의 정보가 확인해야하는 API 를 사용할때 받아온 
accessToken을 첨부해서 요청하게 되면 accessToken을 통해 복호화하여 유저정보를 검증하는 과정을 하게된다. 이것을 `인가`라고 한다.

여기서 서버는 accessToken을 발급해 주는 로직과 그 accessToken를 검증하는 로직을 만들어야한다.

## JWT 모듈 적용

passport-jwt(인가에 필요한 모듈) 모듈을 사용하여 accessToken을 만들어 볼 것이다.

```Shell
$ yarn add @nestjs/jwt passport-jwt
$ yarn add --dev @types/passport-jwt
```
https://docs.nestjs.com/recipes/passport를

Docs를 보면 authModule에 JwtModule.register을 통해서 import 해주어야 한다.

```javascript
@Module({
    imports: [JwtModule.register({}), UserModule],
    providers: [AuthResolver, AuthService],
})
export class UserModule {}
```

`register({})` : {} 사이에는 JWT 토큰을 만들때 필요한 설정 내용들(만료시간 등)을 넣어주는 곳

```javascript
getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: '나의비밀번호', expiresIn: '1h' },
    );
  }
```

JWT은 누군든지 열어볼 수 있기 떄문에 많은 데이터를 저장하지 않아야 한다.

`expiresIn` : 토큰 만료시간으로 짧게 해주어야 안전성이 보장된다. 만료시간이 지나면 해당 토큰이 무효화 되어 사용 불가능

토큰이 바로 생성되기 때문에 async await을 사용하지 않는다.

<img width="457" alt="스크린샷 2022-01-25 오전 10 14 36 (1)" src="https://github.com/developersomin/study/assets/127207131/db625ed1-01fa-4ad3-b90c-52368d66b7b7">

sign 메서드를 통해 토큰 발급이 가능하다.

`json data` : 유저의 정보가 담긴 payload 를 의미

`secretKey` : 서명된 JWT를 생성할 때 사용하는 키( 암호화와 복호화에서 사용됨 )

`option` : 해싱 알고리즘, 토큰 휴효기간 및 발행자 지정 가능 


## 인가

사용자 인증이 필요한 경우 Request Header(HTTP Header)에 실어 같이 보내 준다. Backend는 JWT를 받고 Guard를 통해 JWT Strategy를 실행하고 Secret Key를 통해 JWT를 복호화 한다.

인가 과정은 `passport` 라이브러리를 사용해서 진행 할 것이다.

```javascript
@UseGuards(AuthGuard('access'))
@Query(() => String)
fetchUser(): string {
    console.log('인가에 성공하였습니다');
    return '인가에 성공하였습니다.';
}
```
`UseGards` : 로그인을 한 유저면 API를 실행시키고 로그인을 하지 않은 유저면 실항하지 못하게 할 방어막이다


```javascript
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: '나의비밀번호',
        });
    }

    validate(payload) {
        console.log(payload);
        return {
            id: payload.sub,
        };
    }
}
```
`super` 를 사용하여 부모클래스 ( `passportStrategy` ) 의 생성자 함수를 호출하여 JWT 옵션값을 넣어준다. 부모 클래스의 생성자 함수 내에서는 유효한 토큰인지 토큰 만료시간이 남았는지 등을 파악하는 검증 로직이 들어있다. 

`jwtFromRequest` : 프론트로부터 받은 요청 내에(header) 존재하는 jwt 토큰을 추출해 준다. 

`validate` : 인가에 성공한다면 payload 를 열어서 사용자의 정보를 반환 , 실패하면 validate가 실행 되지 않고 에러 반환

`validate` 의 `return` : context 안의 req에 user라는 이름으로 email 과  id 정보가 덤긴 객체를 user 안으로  리턴된다. (passport에서 user를 자동으로 만들어)


```javascript
jwtFromRequest: (req) => {
    console.log(req);
    const temp = req.headers.Authorization; // Bearer sdaklfjqlkwjfkljas
    const accessToken = temp.toLowercase().replace('bearer ', '');
    return accessToken;줌
},
```
`fromAuthHeaderAsBearerToken` 직접 사용하지 않고 만들 수 있다.

GraphQL에서 guard를 사용하기 위해서는 한 단계 더 거쳐야 한다.
```javascript
export class GqlAuthAccessGuard extends AuthGuard('access') {
    getRequest(context: ExecutionContext) {
        const gqlContext = GqlExecutionContext.create(context);
        return gqlContext.getContext().req;
    }
}

```


