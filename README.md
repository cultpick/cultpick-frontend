# 🎭 컬픽 프론트엔드 (CultPick Frontend) 🎭

## 📚 프로젝트 소개 (Project Introduction)

컬픽은 사용자가 문화 이벤트를 발견하고, 탐색하고, 저장할 수 있도록 설계된 현대적인 웹 애플리케이션입니다. Next.js와 React로 구축된 이 플랫폼은 사용자에게 다음과 같은 기능을 제공합니다:

- 🔍 다가오는 문화 이벤트 탐색
- 🏷️ 카테고리별 이벤트 검색 및 필터링
- 👤 계정 생성 및 프로필 관리
- ❤️ 개인 픽리스트에 좋아하는 이벤트 저장

## 🛠️ 기술 스택 (Technology Stack)

- **프레임워크**: Next.js 14
- **UI 라이브러리**: React 18
- **상태 관리**:
  - 🔄 Recoil (전역 상태)
  - 📡 React Query (서버 상태 및 데이터 가져오기)
- **스타일링**: CSS Modules
- **HTTP 클라이언트**: Axios
- **폼 유효성 검사**: Zod
- **날짜 처리**: Day.js
- **캐러셀/슬라이더**: Swiper
- **타입스크립트**: 타입 안전성 및 개발자 경험 향상

## 📂 디렉토리 구조 (Directory Structure)

```
cultpick-frontend/
├── .github/                  # GitHub 설정 파일
├── .next/                    # Next.js 빌드 출력 (생성됨)
├── public/                   # 정적 자산
│   ├── fonts/                # 커스텀 폰트
│   ├── img/                  # 이미지
│   └── svgs/                 # SVG 파일
├── src/                      # 소스 코드
│   ├── api/                  # API 통합 및 서비스
│   ├── app/                  # Next.js 앱 라우터 페이지
│   │   ├── (top-bar)/        # 상단 네비게이션이 있는 라우트
│   │   │   ├── (search-bar)/ # 검색 기능 라우트
│   │   │   ├── login/        # 인증 라우트
│   │   │   ├── register/     # 사용자 등록 라우트
│   │   │   └── picklist/     # 저장된 이벤트 라우트
│   │   ├── globals.css       # 전역 스타일
│   │   ├── providers.tsx     # 앱 전체 프로바이더
│   │   └── reset.css         # CSS 리셋
│   ├── components/           # 재사용 가능한 UI 컴포넌트
│   │   ├── Category/         # 카테고리 선택 컴포넌트
│   │   ├── Home/             # 홈페이지 특정 컴포넌트
│   │   │   ├── EventItem.tsx # 이벤트 카드 컴포넌트
│   │   │   ├── MonthEvent.tsx# 월별 이벤트 뷰
│   │   │   ├── NonLogin.tsx  # 비인증 사용자 뷰
│   │   │   └── Underway.tsx  # 현재 활성 이벤트
│   │   ├── Login/            # 로그인 폼 컴포넌트
│   │   ├── Register/         # 등록 폼 컴포넌트
│   │   ├── SearchBar/        # 검색 기능 컴포넌트
│   │   ├── Button.tsx        # 재사용 가능한 버튼 컴포넌트
│   │   ├── InputBox.tsx      # 폼 입력 컴포넌트
│   │   ├── TopNav.tsx        # 상단 네비게이션 바
│   │   └── Footer.tsx        # 사이트 푸터
│   ├── constants/            # 애플리케이션 상수
│   ├── hooks/                # 커스텀 React 훅
│   ├── lib/                  # 유틸리티 라이브러리
│   ├── providers/            # 컨텍스트 프로바이더
│   ├── recoil/               # Recoil 상태 관리
│   ├── schemas/              # Zod 유효성 검사 스키마
│   ├── store/                # 상태 관리 스토어
│   └── utils/                # 유틸리티 함수
├── .env                      # 환경 변수
├── .eslintrc.json           # ESLint 설정
├── .gitignore               # Git 무시 규칙
├── .prettierrc              # Prettier 설정
├── next.config.js           # Next.js 설정
├── package.json             # 프로젝트 의존성
├── tsconfig.json            # TypeScript 설정
└── yarn.lock                # Yarn 잠금 파일
```

## 🚀 시작하기 (Getting Started)

### 📋 사전 요구 사항 (Prerequisites)

- Node.js 18.x 이상
- Yarn 또는 npm

### ⚙️ 설치 (Installation)

1. 저장소 복제:

   ```bash
   git clone https://github.com/your-username/cultpick-frontend.git
   cd cultpick-frontend
   ```

2. 의존성 설치:

   ```bash
   yarn install
   # 또는
   npm install
   ```

3. 환경 변수 설정:
   루트 디렉토리에 필요한 환경 변수가 포함된 `.env` 파일을 생성합니다.

4. 개발 서버 시작:

   ```bash
   yarn dev
   # 또는
   npm run dev
   ```

5. 브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인합니다.

## 📝 사용 가능한 스크립트 (Available Scripts)

- `yarn dev` - 증가된 메모리 할당으로 개발 서버 실행
- `yarn build` - 프로덕션용 애플리케이션 빌드
- `yarn start` - 프로덕션 서버 시작
- `yarn lint` - ESLint로 코드 이슈 확인
- `yarn format` - Prettier로 코드 포맷팅 확인
- `yarn format:fix` - 포맷팅 이슈 자동 수정

## 🏗️ 프로젝트 구조 개요 (Project Structure Overview)

### 🧭 앱 라우터 구조 (App Router Structure)

애플리케이션은 Next.js 앱 라우터를 사용하여 라우팅하며, 주요 라우트는 `src/app` 디렉토리 아래에 구성되어 있습니다:

- **상단 바 라우트**: 상단 네비게이션 바를 포함하는 페이지
  - **검색 바**: 검색 기능 및 결과
  - **로그인**: 사용자 인증
  - **등록**: 새 사용자 등록
  - **픽리스트**: 사용자의 저장된 이벤트

### 🧩 컴포넌트 구성 (Component Organization)

컴포넌트는 기능과 기능성에 따라 구성됩니다:

- **UI 컴포넌트**: Button, InputBox와 같은 재사용 가능한 UI 요소
- **기능 컴포넌트**: Category, Home, Login과 같은 기능에 특화된 컴포넌트
- **레이아웃 컴포넌트**: TopNav 및 Footer와 같은 구조적 컴포넌트

### 🔄 상태 관리 (State Management)

애플리케이션은 다음의 조합을 사용합니다:

- **Recoil**: 전역 애플리케이션 상태
- **React Query**: 서버 상태 및 데이터 가져오기

## 🤝 기여하기 (Contributing)

풀 리퀘스트를 제출하기 전에 기여 가이드라인을 읽어주세요.
