# 🍷 **와인 등록 및 리뷰 사이트** [ WHYNE ]

- 배포 주소 : https://whyne.vercel.app/
- **Test ID**: wine25@whyne.com
- **Test PW**: 12341234

---
## **1. 프로젝트 소개**

- **사용자가 다양한 와인에 대한 리뷰를 보고, 구매 여부를 판단해볼 수 있는 웹 사이트**
- 와인의 종류, 맛, 가격대, 별점을 기반으로 리뷰를 작성할 수 있으며, 다양한 필터를 적용해서 와인을 골라서 볼 수 있는 기능도 포함됩니다.
- 공급자 중심의 소개 사이트가 아닌, 사용자 중심으로 제품이 등록됩니다.

![image](https://github.com/user-attachments/assets/caadcf88-6824-415d-987b-b84db6109774)


## **2. 개발 환경**

### 기술 스택

- **Frontend:** `JavaScript(ES6+)` `TypeScript` `React` `Next.js`
- **Styling** : `HTML` `CSS` `TailwindCSS`
- **Code Quality & Formatting** : `ESLint` `Prettier`
- **Communication & Project Management**: `GitHub` `Notion` `Discord`
- **Version Control & Collaboration** : `Git` `GitHub`

*Backend는 코드잇 측에서 지원해줬으며, API 연동 과정에서 Swagger 활용했습니다.

## **3. 개발 기간: 15일(크리스마스, 일요일 제외)**

- 2024.12.12(목) ~ 2024.12.30(월)<br>

![image](https://github.com/user-attachments/assets/847f62f9-5856-4da0-b9f0-591ae1d2e065)

![image](https://github.com/user-attachments/assets/a718f122-c447-4a4c-8e06-fdc68986b21e)



## **4. 프로젝트 구조**

```jsx
project-root/
│
├── public/                     # 정적 파일 (이미지, 폰트 등)
│
├── src/                        # 소스 코드
│   ├── components/             # 재사용 가능한 컴포넌트
│   │   ├── auth/               # 카카오 로그인, 회원가입용 폼 입력
│   │   ├── common/             # 버튼, 드롭다운 등 공통 컴포넌트
│   │   ├── modal/              # 모달 관련 컴포넌트
│   │   ├── wines/              # 와인 관련 컴포넌트 (리뷰 등록, 수정 등)
│   │   └── myprofile/          # 유저 정보 및 등록 정보 컴포넌트
│   │
│   ├── app/                    # Next.js 앱 라우트
│   │   ├── api/                # API 라우트
│   │   ├── signup/             # 회원가입 페이지
│   │   ├── signin/             # 로그인 페이지
│   │   ├── wines/              # 와인 목록 및 상세 페이지
│   │   ├── myprofile/          # 내 프로필 페이지
│   │   └── page.tsx            # 메인 페이지
│   │   └── layout.tsx          # 모든 페이지 공통 설정
│   │
│   ├── contexts/               # Context API 관련 파일
│   ├── lib/                    # 유틸리티 함수, API 호출 함수
│   ├── styles/                 # 전역 스타일 또는 컴포넌트 스타일
│   └── types/                  # TypeScript 타입 정의
│
├── .env.local                  # 환경 변수
├── next.config.js              # Next.js 설정 파일
├── tsconfig.json               # TypeScript 설정 파일
└── package.json                # 프로젝트 설정 파일 (필요시 추가)
```

## 5. 트러블 슈팅(수정 중)

---

## 6. 프로젝트 팀 구성 및 역할

![image](https://github.com/user-attachments/assets/0795cf6b-8343-4526-a575-ea272c061bfc)


## 7. 자체 평가

![image](https://github.com/user-attachments/assets/46d6752b-a073-43fb-ade5-62fc6c372e80)
