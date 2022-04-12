# 프로젝트 설명
## 음료 전문 브랜드
---
> 밀크티 브랜드 커버한 음료 전문 브랜드

### 배포 주소
[https://mybackend.gyeoriii.shop](https://mybackend.gyeoriii.shop)

### 기술 스택
`nodejs`, `typescript`, `mysql`, `elasticsearch`, `kubernetes`,`redis`, `Docker`

### ERD 설계
![](https://images.velog.io/images/hgyu0830/post/23c59a65-9d04-4b7e-875e-99c46a1cdc7c/Screen%20Shot%202022-02-17%20at%209.47.02%20AM.png)

### 파이프라인
![](https://images.velog.io/images/hgyu0830/post/c92d47df-23ae-404c-85de-f5f7443bf46c/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-03-13%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.54.25.png)


## 프로젝트 설치 방법 & 실행 방법
> 1. git clone https://github.com/yuhangyeol0/codecamp-backend-01.git
2. yarn install

### 폴더 구조
```
├── Dockerfile
├── README.md
├── docker-compose.dev.yaml
├── docker-compose.prod.yaml
├── docker-compose.stage.yaml
├── docker-compose.yaml
├── elk
│   ├── elasticsearch
│   ├── kibana
│   └── logstash
│       ├── logstash.conf
│       └── mysql-connector-java-8.0.28.jar
├── functions
│   ├── generateThumbnail.js
│   └── helloGCS.js
├── hangyeol-e78136b738cc.json
├── nest-cli.json
├── package-lock.json
├── package.json
├── src
│   ├── apis
│   │   ├── allergy
│   │   │   └── entities
│   │   │       └── allergy.entity.ts
│   │   ├── auth
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.resolver.ts
│   │   │   └── auth.service.ts
│   │   ├── cart
│   │   │   └── entities
│   │   │       └── cart.entity.ts
│   │   ├── file
│   │   │   ├── file.module.ts
│   │   │   ├── file.resolver.ts
│   │   │   └── file.service.ts
│   │   ├── iamport
│   │   │   └── iamport.service.ts
│   │   ├── image
│   │   │   ├── entities
│   │   │   │   └── image.entity.ts
│   │   │   ├── image.module.ts
│   │   │   ├── image.resolver.ts
│   │   │   └── image.service.ts
│   │   ├── mainCategory
│   │   │   └── entities
│   │   │       └── productSubCategory.entity.ts
│   │   ├── order
│   │   │   └── entities
│   │   │       └── order.entity.ts
│   │   ├── payment
│   │   │   └── entities
│   │   │       └── payment.entity.ts
│   │   ├── pointTransaction
│   │   │   ├── entities
│   │   │   │   └── pointTransaction.entity.ts
│   │   │   ├── pointTransaction.module.ts
│   │   │   ├── pointTransaction.resolver.ts
│   │   │   └── pointTransaction.service.ts
│   │   ├── product
│   │   │   ├── dto
│   │   │   │   ├── createProduct.input.ts
│   │   │   │   └── updateProduct.input.ts
│   │   │   ├── entities
│   │   │   │   └── product.entity.ts
│   │   │   ├── product.module.ts
│   │   │   ├── product.resolver.ts
│   │   │   └── product.service.ts
│   │   ├── status
│   │   │   └── entities
│   │   │       └── status.entity.ts
│   │   ├── subCategory
│   │   │   ├── entities
│   │   │   │   └── productSubCategory.entity.ts
│   │   │   ├── productSubCategory.module.ts
│   │   │   ├── productSubCategory.resolver.ts
│   │   │   └── productSubCategory.service.ts
│   │   └── user
│   │       ├── dto
│   │       │   ├── createUser.input.ts
│   │       │   └── updateUser.input.ts
│   │       ├── entities
│   │       │   └── user.entity.ts
│   │       ├── user.module.ts
│   │       ├── user.resolver.ts
│   │       └── user.service.ts
│   ├── app.module.ts
│   ├── common
│   │   ├── auth
│   │   │   ├── gql-auth.guard.ts
│   │   │   ├── gql-user.param.ts
│   │   │   ├── jwt-access.strategy.ts
│   │   │   ├── jwt-refresh.strategy.ts
│   │   │   ├── jwt-social-google.strategy.ts
│   │   │   ├── jwt-social-kakao.strategy.ts
│   │   │   └── jwt-social-naver.strategy.ts
│   │   ├── filter
│   │   │   └── http-exception.filter.ts
│   │   ├── graphql
│   │   │   └── schema.gql
│   │   └── libraries
│   │       └── utils.ts
│   └── main.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock
```

### API 설계

<!--table-->
|api기능|request|respose|
|--|--|--|
|Create|Mutation{API name:contents}{request col}|등록 성공 or 실패메시지|
|Update|Mutation{API name:contents}{request col}|등록 성공 or 실패메시지|
|Delete|Mutation{API name:contents}{request col}|등록 성공 or 실패메시지|
|Fetch|Query{API name}{request col}|조회 성공 or 실패메시지|
|login/logout|Query{API name}{request col}|성공 or 실패메시지|

## .env
- GOOGLE_ID , GOOGLE_SECRET
- NAVER_ID , NAVER_SECRET
- KAKAO_ID , KAKAO_SECRET
- IAMPORT_API_KEY , IAMPORT_SECRET
- STORAGE_KEY , PROJ_ID
- BUCKET_ID
- ACC_TOKEN , REF_TOKEN

## Contact
유한결 - hgyu0830@gmail.com
git - https://github.com/yuhangyeol0/codecamp-backend-01.git
velog - https://velog.io/@hgyu0830/README.md
