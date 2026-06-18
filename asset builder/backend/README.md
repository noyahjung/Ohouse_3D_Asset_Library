# 에셋 빌더 백엔드 — 키 숨김 프록시

프론트(`../asset-builder.html`)에서 OpenAI API 키를 완전히 제거하고, 키는 이 백엔드에만 둔다.
코어 로직(`handler.mjs`)은 로컬 프록시와 AWS Lambda 양쪽에서 동일하게 동작한다.

```
backend/
├── handler.mjs   ← 코어: 레퍼런스 첨부 + 키 주입 + OpenAI images/edits 호출
├── server.mjs    ← 로컬 개발/검증용 Node 프록시 (의존성 0)
├── lambda.mjs    ← 팀 배포용 AWS Lambda 어댑터 (Function URL)
└── .env.example  ← 키 환경변수 템플릿
```

요청 흐름: 브라우저 → `POST /generate {prompt,size}` → 백엔드가 키 주입·레퍼런스 2장 첨부 → OpenAI → `{b64_json}` 반환. **키는 브라우저로 내려가지 않는다.**

---

## 1. 로컬에서 검증 (지금 바로)

```bash
cd "asset builder/backend"
OPENAI_API_KEY=sk-사내공용키 node server.mjs
#  → ✓ 에셋 빌더 프록시 실행 중 → http://localhost:8787
```

다른 터미널에서 프론트를 띄운다 (정적 서버 아무거나):

```bash
cd "asset builder"
python3 -m http.server 5500
#  → http://localhost:5500/asset-builder.html
```

브라우저에서 키워드+색상 → **에셋 생성**. 프론트 기본 `BACKEND_URL`이 `http://localhost:8787/generate`라 추가 설정 불필요.
다른 백엔드로 테스트하려면 `asset-builder.html?backend=https://...` 쿼리로 덮어쓴다.

---

## 2. 팀 배포 (AWS Lambda + Function URL)

메모의 재개 계획(S3 정적 프론트 + Lambda 백엔드)과 일치.

1. **Lambda 함수 생성** — 런타임 Node.js 20+, 핸들러 `lambda.handler`.
   `handler.mjs` + `lambda.mjs` 두 파일만 zip 해서 업로드(의존성 없음).
   ```bash
   cd "asset builder/backend"
   zip asset-builder-fn.zip handler.mjs lambda.mjs
   ```
2. **환경변수** — `OPENAI_API_KEY`(암호화), 선택 `OPENAI_MODEL`, `ALLOW_ORIGIN`
   (= asset-builder.html을 서빙하는 S3/CDN origin). 더 엄격히 하려면 Secrets Manager.
3. **Function URL 활성화** — Auth: NONE(사내 한정이면 IAM/조직망 제한 권장), CORS allow-origin = 프론트 origin.
4. **타임아웃/메모리** — 이미지 생성이 길어 timeout ≥ 60s, memory ≥ 512MB 권장.
5. **프론트 연결** — `asset-builder.html`의 `BACKEND_URL`을 발급된 Function URL(`.../generate`가 아니라 함수 URL 루트; 라우팅은 메서드로 처리하므로 URL 그대로)로 교체하거나 `?backend=` 쿼리로 지정.
6. **프론트 배포** — `asset-builder.html`을 S3 정적으로 올린다(키 없음이라 안전). 단, 메인 3D 라이브러리 배포 prefix와 섞지 말 것.

> ⚠️ 전제: 키가 속한 OpenAI **조직이 Organization Verification 완료** 상태여야 `gpt-image` 계열 호출 가능. 콘솔에서 월 usage limit 설정 권장.

---

## 주의

- `.env` / 실제 키 파일은 **절대 커밋 금지**. (`.gitignore` 처리됨)
- `gpt-image-2` 계열은 transparent 배경 미지원일 수 있음 — 모델 바꾸면 재확인.
- 모델명·엔드포인트는 변동 가능(2026-06 확인 기준). 실패 시 `OPENAI_MODEL=gpt-image-1`로 폴백.
