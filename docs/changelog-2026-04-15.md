# 3D Asset Library — 업데이트 정리 (2026-04-15)

## 1. 환경·인프라

- **Git/GitHub 셋업** — Homebrew 설치, gh CLI 인증, `noyahjung` 계정 연결
- **자매 프로젝트 분리** — 컬러 팔레트 R&D를 위한 `3d_graphic_customize_test` 별도 레포 생성 (private)
- **혼동 방지 가드 3중 적용**
  - 시각: 각 프로젝트에 고유 favicon · 탭 제목 · 우하단 배지
  - 문서: 각 폴더에 `CLAUDE.md` (스코프·교차편집 금지)
  - 운영: 커밋/푸시 직전 `pwd` + `git remote -v` + `branch` 자동 출력

---

## 2. 에셋 & 머티리얼

### 신규 에셋 추가

- **Gift Box (선물상자)** glTF 추가, 리본은 시스템 컬러 고정

### 컬러 팔레트 확장 (총 7개)

| 이름 | HEX |
| --- | --- |
| Genuine Blue | `#00A1FF` |
| Jade Green | `#19BD86` |
| Mango Orange | `#FF752C` |
| Coral Red | `#FF4747` |
| Violet | `#C475F5` |
| Dark Blue | `#2C65CF` |
| Candy Pink | `#FF6E92` |

### 머티리얼 시스템 개선

- **Frosted Preset 통합 튜닝** — Transmission 0.50 / Roughness 0.60 / Thickness 2.30 / IOR 1.70 / Clearcoat 0.39 / Coat Roughness 0.50 / Attenuation 4.50 / Gradient 0.85
- **Glass 빌트인 재조정** — Clearcoat 0, Env Intensity 3.0
- **Harmony 액센트 컬러 시스템** — 메인 컬러 변경 시 리본/액센트 컬러가 자동으로 톤온톤 컴패니언 컬러로 전환

### 메쉬 안정화

- 모든 로드 메쉬에 `computeVertexNormals()` 적용 → C4D→glTF 변환 시 깨진 법선 정리
- Body 메쉬 자동 병합 → 패널 경계 솔기·간극 제거
- 정수기 자동 180° 회전 → 정면이 카메라에 노출되도록 기본값 설정

---

## 3. 카메라 & 그림자 시스템

### 디자이너 추천 카메라 뷰 3종

- **View 1** Isometric (기본 아이소)
- **View 2** Slight Top-Down (살짝 부감)
- **View 3** Side (45° 사이드, 부감 없음)

### 동적 그림자 (Shadow System)

- ShadowMaterial + intensity 0 라이트 → **에셋 라이팅에 영향 없는** 순수 cast shadow
- Body 컬러를 따라가는 **컬러 틴트**
- 중심 → 가장자리로 페이드되는 자연스러운 falloff
- 광원 방향 조정 → 그림자 길이·방향 튜닝
- **ON / OFF 토글** (기본 OFF)

---

## 4. 사용자 인터페이스

### 다크 카드 테마 리디자인

- Inter 폰트 적용
- `#00A1FF` 액센트 컬러 (활성 칩 좌측 인디케이터, 슬라이더 등)
- 카드형 UI (rounded 14px, blur backdrop)
- 화면 하단 BG 컬러 선택기 (White / Light Gray / Black)
- View 1/2/3 프리셋 버튼

### 추천 컬러 시스템

- 에셋별 디자이너 추천 컬러 자동 적용
  - Moving Box → Genuine Blue
  - Water Purifier → Genuine Blue
  - Gift Box → Coral Red
- 추천 컬러 칩에 **RECOMMENDED 태그** 표시

---

## 5. 랜딩 페이지 (에셋 라이브러리 진입화면)

- 페이지 1 — **에셋 선택 그리드** 신설
- 각 에셋의 추천 컬러 + View 3 앵글로 **실시간 썸네일** 자동 생성
- **검색 기능** (실시간 부분 일치, 클리어 버튼, no-result 메시지)
- 카드 클릭 → 커스터마이저 페이지로 전환
- 커스터마이저에서 **← Library** 버튼으로 다시 에셋 선택 화면 진입 가능

---

## 6. PNG 출력

- **투명 배경 알파 PNG**
- 그림자 ON 시 **1480 × 1080** (그림자 잘림 방지)
- 그림자 OFF 시 **1080 × 1080**
- 현재 View · 컬러 · 그림자 상태 그대로 캡처

---

## 7. 문서화

`docs/` 폴더에 두 개의 마크다운 추가:

- `overview.md` — 프로젝트 전체 개요 (OKR 맥락, 기술 선택의 타당성, 파이프라인)
- `threejs-explained.md` — 비개발자 대상 Three.js 설명용 가이드 (영화 촬영장 비유)
