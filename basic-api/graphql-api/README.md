## Apollo Server
GraphQL-API를 사용하기 위해 @apollo/server와 graphql을 섪치해야 한다.( yarn add @apollo/server graphql )

https://www.npmjs.com/package/@apollo/server

위 공식문서를 통해 설정해보자.

### typeDefs
타입들의 정의가 선언되는 객체이다. typeDefs에 정의를 해놓은대로 GraphQL 서버에 요청을 하면 그에 맞는 데이터를 응답받을 수 있다. 

express의 경우 swagger를 통해 api-docs를 직접 작성해주었는데 graphql의 경우 해당 부분을 typeDefs에서 swagger와 같은 api-docs를 자동으로 생성해주는 것이다.


### Resolver

resolvers는 express 서버를 사용할 때 보았던 api와 같은 역할을 한다.(app.get('/qqq, (req,res)=> res.send("asd"))

### Mutation
```
const resolvers = {
  Mutation: {
    createBoard: (parent, args, context, info) => {
     
    },
  },
};
```
<li>parent: 부모 타입 resolver에서 반환된 결과를 가진 객체</li>
<li>args: 쿼리 요청 시 전달된 parameter를 가진 객체</li>
<li>context: GraphQL의 모든 resolver가 공유하는 객체로서 로그인 인증, 데이터베이스 접근 권한 등에 사용</li>
<li>info: 명령 실행 상태 정보를 가진 객체</li>

Rest-API에서는 요청 데이터를 확인하기 위해 매개변수로 req를 사용했지만 GraphQL-API에서는 요청 데이터를 확인 가능한 args를 사용하여 입력값을 가져온다. (사용하지 않는 매개변수는 _(언더바) 를 선언)

typeDefs 에서 객체를 정의 할 때는 Query에서는 type을 사용했지만 Mutation에서는 input으로 사용해야한다.



