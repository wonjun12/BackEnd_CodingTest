## 설문지 API 작성  
  
  
### 사용 기술  
```
NestJS
TypeORM
PostgreSQL
```
  
  
### 파일 경로  
  
```
src
 └ db  
    └ config
        └ typeorm.config.ts
    ㄴ custom-repository
        └ typeorm.decorator.ts
        └ typeorm.module.ts
    └ entity
        └ survey.ts
 └ survey
    └ pipes
        └ survey-question.pipe.ts
    └ survey.controller.ts
    └ survey.module.ts
    └ survey.repository.ts
    └ survey.service.ts
 └ app.module.ts
 └ main.ts
```
  
  
### URL 경로
```
└기본 경로
    └ localhost:4000/survey
└ Get
    └ /:id
        └ 설문지 생성하고 보여줍니다.
        └ 이미 설문지가 있다면 해당 설문지를 보여줍니다.
    └ /:id/complete
        └ 완료된 설문지를 확인합니다. 미응답이 있을 경우 에러를 보냅니다.
└ Post
    └ /:id/complete
        └ 설문지를 완료하면서 점수를 측정합니다. 미응답이 있을 경우 에러를 보냅니다.
    └ /:id/select
        └ 문항의 선택지를 선택하면 실행됩니다.
└ Delete
    └ /:id
        └ 설문지를 삭제합니다.
```
  
  
### DataBase 
```
└ id
  └ number
  └ primaryKey
  └ 설문지 id
└ planning
  └ number
  └ 1번째 문항 (여행 갈 것인지)
└ variety
  └ number
  └ 2번째 문항 (희망 여행 종류)
└ destination
  └ number
  └ 3번째 문항 (희망 여행지)
└ amount
  └ number
  └ 5번째 문항 (1인당 금액)
└ matters
  └ number []
  └ 6번째 문항 (고려해야할 사항)
└ preference
  └ number
  └ 7번째 문항 (선호도)
└ gender
  └ number
  └ 7번째 문항 (성별)
└ totalCount
  └ number
  └ 점수 측정
  
└ 컬럼 값 기준
  └ -1 : 미응답
  └ null : 1번 아니오 선택시 응답불가로 셋팅
```


### 설명
```
└ DB
    └ type : postgres
    └ port : 5432
    └ username : postgres
    └ password : 0000
    └ database : survey-travel

└ 설치 및 실행
    └ npm i
    └ npm run start
    
└ 값 보내는 기준
    └ /:id 는 숫자로 아무거나 보내도 가능 (숫자만 가능)
    └ Body
        └ question
            └ 숫자로 보내야 한다.
            └ 아래의 설문지의 객관식 문항 순서대로 해서 숫자로 변환했다.
                (0번 ~ 6번으로 보내야 한다.)
        └ selected
            └ 숫자로 보내야 한다.
            └ 각 문항의 선택지의 갯수를 숫자로 받았다.
            └ 6번의 중복응답의 경우 배열로 보내야 한다.
        └ ex) 1번 문항, 2번 선택지 => question = 0, selected = 1

    
```
![image](https://user-images.githubusercontent.com/108748094/213206867-458b308e-dfa6-4a12-850b-0b460305c3fc.png)

