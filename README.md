# Sandrive

**Sandrive**는 Oasis 테마의 개인 파일 저장소 웹 애플리케이션입니다.  
사용자는 회원가입/로그인 후 파일을 업로드, 다운로드, 삭제할 수 있으며,  
다국어(한국어/영어) 지원과 직관적인 UI를 제공합니다.

## 주요 기능

- 회원가입 및 로그인 (JWT 인증)
- 파일 업로드/다운로드/삭제
- 파일 검색 및 정렬
- 업로드 진행률 표시
- 반응형 디자인 (모바일/PC)
- 한국어/영어 언어 전환 지원
- MongoDB Atlas 기반 파일/유저 관리
- Render 등 클라우드 배포 최적화

## 데모

> 배포 주소: https://sandrive.onrender.com/

## 기술 스택

- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Backend:** Node.js, Express
- **DB:** MongoDB Atlas (Mongoose)
- **인증:** JWT
- **파일 저장:** Multer (MongoDB GridFS 또는 로컬)
- **배포:** Render

## 설치 및 실행

### 1. 클론

```bash
git clone https://github.com/your-username/sandrive.git
cd sandrive
```

### 2. 환경 변수 설정

`.env` 파일을 프로젝트 루트에 생성하고 아래와 같이 작성하세요.

```
PORT=10000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=production
```

### 3. 의존성 설치

```bash
npm install
```

### 4. 실행 (로컬)

```bash
npm start
```

- 기본 포트: 10000 (또는 환경 변수 PORT)

### 5. 접속

브라우저에서 [http://localhost:10000](http://localhost:10000) 접속

## 배포 (Render 기준)

1. Render에서 새 Web Service 생성
2. 빌드 명령: `npm install`
3. 시작 명령: `node index.js`
4. 환경 변수 위와 같이 등록
5. (MongoDB Atlas에서 IP 화이트리스트에 0.0.0.0/0 추가)

## 폴더 구조

```
sandrive/
├── public/           # 프론트엔드 정적 파일 (HTML, CSS, JS)
├── routes/           # Express 라우터 (auth, files)
├── models/           # Mongoose 모델
├── index.js          # 서버 엔트리포인트
├── .env              # 환경 변수
└── README.md
```

## 환경 변수

| 변수명      | 설명                        |
| ----------- | -------------------------- |
| PORT        | 서버 포트 (Render는 10000)  |
| MONGO_URI   | MongoDB Atlas 연결 문자열   |
| JWT_SECRET  | JWT 토큰 암호화 키          |
| NODE_ENV    | `production` 권장           |

## 문제 해결

- **MongoDB Atlas 연결 오류:**  
  Atlas 대시보드에서 IP 화이트리스트에 `0.0.0.0/0` 또는 자신의 IP를 추가하세요.
- **API 요청 오류:**  
  API URL을 상대 경로(`/api/...`)로 사용하고, CORS 및 서버 라우트 순서를 확인하세요.
- **파일 업로드/다운로드 문제:**  
  JWT 토큰이 만료되었거나, 서버 환경 변수 설정을 확인하세요.

## 라이선스

MIT License

---

**Sandrive**  
개인 파일 저장의 오아시스  

# 클로드는 신이야
