## TypeScript 사용 이유 및 사용방법
타입스크립트는 자바스크립트에 타입을 부여한 언어이다. 타입스크립트는 자바스크립트와 달리 브라우저에서 실행하려면 파일을 한번 변환해 주어야 한다. 

타입스크립트를 쓰면 좋은 이유가 에러를 사전에 방지 할 수 있고 생산성을 항상 시킬 수 있다.

## Utility Types
### Partial Type
모든 속성을 선택사항으로 바꿔주는 역할
```javascript
interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

type aaa = Partial<IProfile>;
```
aaa의 타입들을 확인해 보면 모두 ? 가 붙은것을 확인 할 수 있다.

### Required Type
모든 속성을 필수사항으로 바꿔주는 역할(Partial Type과 반대)
```javascript
interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

type bbb = Required<IProfile>;
```
bbb 타입을 보면 hobby에 있던 ? 가 없어진 것을 확인 할 수 있다.

### Pick Type
원하는 속성만을 뽑아서 사용하고 싶을 때 사용
```javascript
interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

type ccc = Pick<IProfile, "name" | "age">;
```
ccc 타입들을 확인해 보면 name과 age에 대한 타입만 존재하는 것을 확인 할 수 있다.

### Omit Type
원하는 속성만 제거하여 사용하고 싶을 때 사용한다.
```javascript
interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

type ddd = Omit<IProfile, "school">;
```
ddd의 타입을 확인해 보면 name,age,hoddy에 대한 타입만 존쟇하는 것을 확인 할 수 있다.

### Record Type 
Record<Key, Type>으로 사용하며, Key로 들어온 타입을 Type 값을 가지는 타입으로 만들 수 있다.
```javascript
interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

type eee = "철수" | "영희" | "훈이"; // Union 타입
type fff = Record<eee, IProfile>; // Record 타입
```
