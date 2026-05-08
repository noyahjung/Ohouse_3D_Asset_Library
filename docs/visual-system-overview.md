# Ohouse Visual System

> Authenticity를 비주얼 요소로 정의하고, 프로덕트 전반의 그래픽 자산을 일관된 언어로 묶어내는 디자인 시스템.

---

## 1. 시스템의 목적

### Why
- "이렇게 살아보고 싶다"는 브랜드 약속을 시각 언어로 풀어내기
- 프로덕트 전반에 흩어진 그래픽 자산을 공통의 조형 원칙으로 묶기
- 자산 제작·운영의 일관성과 확장성을 보장하는 web 형태 디자인 시스템의 토대 구축

### What
- Authenticity(진정성)이라는 브랜드 가치를 시각으로 변환하는 정의 + 가이드 + 실물 자산 + 제작 도구의 묶음
- 디자이너·엔지니어가 같은 언어로 작업할 수 있도록 코드와 가이드가 함께 제공되는 살아있는 시스템

### For Whom
- 오늘의집 디자이너 (자산 제작/적용)
- 프로덕트 엔지니어 (자산 통합)
- 외부 협업자·사용자 (브랜드 표현 일관성)

---

## 2. 시스템의 정의

### 시각 자산의 분류

오늘의집 시각 자산은 두 갈래 — Graphic Assets(설계된 그래픽)와 Image Assets(촬영/픽셀 기반 이미지) — 로 묶이고, 그 위에 Symbol이 별도 카테고리로 위치합니다.

| 그룹 | 포맷 | 정의 | 주요 용처 |
| --- | --- | --- | --- |
| Symbol | Symbol | 브랜드의 핵심 상징 단위 | 로고, 앱 아이콘 등 최상위 노출 |
| Graphic Assets | Icon | 사용자 행동·선택을 직관적으로 안내하는 벡터 그래픽 | UI 컨트롤, 안내 |
| Graphic Assets | 2D Assets (SVG) | 작은 용처에서 서비스 성격을 시각적으로 대표 | 숏컷, 카드 헤더 |
| Graphic Assets | 3D Assets (Still) | 큰 용처에서 시선을 끌고 브랜드 완성도를 강화 | 메인 비주얼, 캠페인 |
| Graphic Assets | Motion Assets (개발예정) | 행동 피드백·전환·학습 보조 | 인터랙션, 온보딩 |
| Graphic Assets | Pattern / Background Assets | 화면 배경면을 구성, 브랜드 결을 은은하게 깔아 밀도 보강 | 섹션 배경, 카드 후면 |
| Image Assets | Photographic Assets | 실제 상품·인테리어 신을 객관·구체적으로 표현 | 커머스 컨텍스트 |

### 조형 4원칙 — Authenticity의 시각화

Visual Language 페이지에 노출되는 순서·카피 그대로.

| 원칙 | 정서 | 의미 | 시각적 표현 |
| --- | --- | --- | --- |
| 01 Smoothing Line | 부드러움 | 브랜드 심볼의 외형을 닮은 곡선으로, 에셋에 부분적으로 풀어내는 조형적이고 부드러운 라운딩으로 표현합니다. | 모서리·면의 라운딩, 각진 단면 지양 |
| 02 Dream | 다정함 | 유저의 꿈과 영감을 담아내고, 이를 다정한 시선으로 바라보는 정서를 은은한 그라디언트를 가진 질감으로 표현합니다. | 은은한 Vertical Gradient + 몽환적인 질감 |
| 03 Clarity | 명확성 | 유저의 꿈을 분명한 현실로 실현해내는 의지를 군더더기 없는 실루엣과 단순한 매스로 표현합니다. | 군더더기 없는 명확한 실루엣, 단순한 매스 |
| 04 Stability | 안정감 | 유저의 꿈을 진중하게 실현해 나가는 자세를 표현합니다. 지면에 안정적으로 붙은 그림자와 단계별로 정돈된 에셋 구조를 통해 시각적으로 드러납니다. | 지면에 안정적으로 붙은 그림자(Ground Shadow) + 단계별로 정돈된 에셋 구조 (Icon · Asset Small · Asset Large) |

---

## 3. 제작 과정

### Phase 1 — 3D 에셋 라이브러리 (개념 검증)

목표: Authenticity의 시각적 해석을 3D 에셋 한 종에서 시연

- Frosted material 시스템: vertical gradient + 반투명 질감으로 "Dream"을 구현
- 8종 에셋 등록: 이사박스, 쿠폰, 선물상자, 정수기, 바스켓, 시계, 카메라, 패키지박스
- 공유 머터리얼 팔레트: 색상·재질을 단일 소스(materials.js)에서 관리
- HDR 환경 + IBL: 자산이 어떤 배경에서도 일관된 라이팅으로 보이도록
- Built-in 머터리얼: Glass, Chrome, Lens Glass, Camera Lens — 특수 표현용

### Phase 2 — 시스템화 (재사용성 확보)

목표: 단일 자산을 넘어 자산군이 같은 규칙으로 작동

- Asset registry 패턴: 에셋마다 materialFor, gradientYShift, frameScale, yOffset/zOffset, modelScale 등 선언적 규칙 (Coupon modelScale 1.5 — 바디 크기 정규화 사례)
- HARMONY 색상 시스템: 바디 컬러마다 짝지어진 Accent 컬러가 자동으로 따라옴
- HARMONY 2 도입: 기존 harmony보다 10% 어두운 보조 색상 — 리세스/안쪽 면 같은 미세 위계 표현
- Designer-preset 카메라 뷰: 자산별 3개 추천 앵글 저장 → 디자이너가 의도한 프레이밍으로 즉시 출력
- Black Friday 모드: 시즌성 머터리얼을 단일 토글로 전체 라이브러리에 적용

### Phase 3 — 운영·출력 파이프라인

목표: 자산을 만든 후 빠르게 산출물로 변환

- PNG 2-pass export: 실루엣 + 일반 렌더 합성으로 어떤 배경 위에도 깔끔한 불투명 출력
- 라이브러리 썸네일 시스템: 정적 PNG 우선 + 라이브 렌더 폴백
- Contact-AO shadow: 직사 그림자에 max() 합성으로 접지면 헤일로 제거 (bevelComp 수동 튜닝 대체)
- Auto-optimize 파이프라인: 새 에셋 업로드 시 gltfpack -kn -km이 자동 실행, 50–80% 용량 절감
- De-interleave + GLB 변환: C4D 인터리브 버퍼 분리, 미사용 NORMAL/UV 제거 → 카메라 에셋 832KB → 393KB (52.8%↓)

### Phase 4 — Visual System Shell (디자인 시스템화)

목표: 자산·가이드·도구를 단일 웹 라이브러리로 통합

- Visual Asset Library shell: 헤더 + 사이드바 + 페이지 네비게이션 골격, 사이드바 위계는 Symbol → Graphic Assets(5종) → Image Assets(Photographic) 3단 구조로 정돈
- Visual Language 페이지: Smoothing Line → Dream → Clarity → Stability 4원칙을 16:9 인터랙티브 시퀀스로 안내 (랜딩)
- Principles 모듈 분리: 슬라이드 콘텐츠를 principles/slides.js로 추출 — 본 라이브러리와 walkthrough 콘텐츠를 분리해 유지보수 단순화
- 재질(Variants) 모드: ?mode=variants — A~E재질 × Blue/Red 슬롯에서 5에셋을 동시에 비교하며 머티리얼 튜닝, hex 입력·per-slot 기본값 저장·PNG 일괄 export·그림자 On/Off 토글 지원
- 자산 분류 페이지: Icon / 2D / 3D / Motion / Pattern·Background / Photographic / Symbol — 각각 정의·용처·Do/Don't 가이드 (작성 중)
- 3D 커스터마이저 진입: 디자이너가 컬러·각도를 변경해 즉시 PNG로 추출
- Cloudflare Workers 배포 경로 추가: wrangler.toml + pass-through Worker로 정적 자산 바인딩

---

## 4. 현재까지의 산출물

### 코드 자산

- 3Dassetlibrary.html — 3D 에셋 커스터마이저 + 라이브러리 + 재질모드(?mode=variants)
- index.html — Visual Language (4원칙 인터랙티브, 라이브러리 랜딩)
- overview.html, assets/*.html — 자산 분류 가이드 (작성 중)
- principles/slides.js — Visual Language walkthrough 슬라이드 정의
- materials.js — 공유 머터리얼·색상 팔레트
- shared/shell.css, shared/shell.js — 공통 헤더/사이드바 셸
- wrangler.toml, worker.js — Cloudflare Workers 정적 배포

### 등록된 자산

- 3D Still: 이사박스, 쿠폰, 선물상자, 정수기, 바스켓, 시계, 카메라, 패키지박스 (8종)
- 컬러 팔레트: Frosted 7종 (Blue / Green / Orange / Red / Violet / DarkBlue / Pink) + Black Friday
- Built-in 머터리얼: Glass, Chrome, Lens Glass, Camera Lens, Ribbon Gray, Luminance White, Harmony 2

### 운영 파이프라인

- gltfpack 자동 최적화 (-kn -km 강제)
- S3 배포 가이드 (docs/project-guide.md §5)
- Cloudflare Workers 정적 자산 배포 옵션
- 라이브 URL: https://static-contents.datapl.datahou.se/v2/branddesign/3Dassetlibrary/3Dassetlibrary.html

---

## 5. 다음 단계 (예정)

- [ ] Asset (Small) 2D SVG 시리즈 본격 정의
- [ ] Motion Assets 브랜드 모션 원칙 수립 (Large 그래픽 모션 / Icon 그래픽 모션 두 트랙)
- [ ] 각 자산 페이지의 Do/Don't 본문 채움 (현재 placeholder)
- [ ] Photographic Assets 영역 정의 확장 (커머스 컨텍스트) — Image Assets 그룹 보강
- [ ] 4원칙별 세부 페이지 분리 (Dream · Clarity · Stability · Smoothing Line)
- [ ] Pattern / Gradient 에셋 종류·활용 가이드 정리
- [ ] overview.html 카피를 신규 분류(Symbol / Graphic / Image) 체계에 맞게 갱신
