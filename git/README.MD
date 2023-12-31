
이번에 원티드 백엔드 인턴십이라는 좋은 기회가 생 처음으로 팀 협업을 해보게 되었다. 

팀 규칙을 정하는 중 `"git barnch strategy"` 은 어떤 것으로 할까요? 라는 질문이 있었다.
나로써는 항상 commit push 두개만 했었기 때문에 깃 브런치 전략이 무엇인지 몰랐고 뒤 늦께 공부를 하게 되었다.

## Git 브랜치 전략
브랜치 전략이란 여러 개발자가 하나의 저장소를 사용하는 환경에서 저장소를 효과적으로 활용하기 위한 work-flow다.
즉, 브랜치 생성에 규칙을 만들어 협업을 유연하게 하는 방법론이다. 

## Git Flow?

Git flow 전략은 소스코드를 관리하고 출시하기 위한 브랜치 관리 전략 중 하나이다. 많은 기업에서 git으로 개발을 할 때 표준으로 사용하는 개발 전략이다.

브랜치가 크게 5가지로 나뉜다.

- feature : 기능을 개발하는 브랜치
- develop : 다음 출시 버전을 대비하여 개발하는 브랜치
- release : 다음 버전 출시를 준비하는 브랜치
- hotfix : 출시 버전에서 발생한 버그를 수정하는 브랜치 
- master : 제품으로 출시될 수 있는 브랜치

## Gitflow workflow 이해
![image.png](..%2F..%2F..%2F%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%2Fimage.png)
나는 계속 master(main) 브랜치 한곳에만 작업을 했었다.

![image (1).png](..%2F..%2F..%2F%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%2Fimage%20%281%29.png)

이제 master 브랜치는 배포할 준비가 된 상태에서만 올리도록 하고 master 브랜치에서 나온 dev 브랜치에서 개발을 하자.
개발을 마치고, 배포할 준비가 되면 master 브랜치와 다시 합친다.(merge)

![image (2).png](..%2F..%2F..%2F%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%2Fimage%20%282%29.png)

dev 브랜치에서 feature 브랜치를 빼서 기능별로 개발하고 기능 개발이 완료되면 dev 브랜치에 합친다.

## Gitflow 실습
![이름 없는 노트북 (4)-3.jpg](..%2F..%2F..%2F%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%2F%EC%9D%B4%EB%A6%84%20%EC%97%86%EB%8A%94%20%EB%85%B8%ED%8A%B8%EB%B6%81%20%284%29-3.jpg)