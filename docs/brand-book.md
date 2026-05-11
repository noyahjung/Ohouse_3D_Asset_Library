# Ohouse Brand Book

> Authenticity라는 브랜드 가치를 비주얼과 언어로 풀어내고, 그 결정·자산·시선을 외부에 공개적으로 정리해 둔 브랜드 진술 출판물.

---

## 1. 시스템의 목적

### Why

- "이렇게 살아보고 싶다"는 브랜드 약속을 시각·언어로 함께 풀어내기
- 사내 매뉴얼이 충족하지 못하는 외부 시각 정체성의 공개적 정리 영역을 만들기
- 흩어져 있던 그래픽·언어 자산을 동일한 원칙 위에서 묶고, 그 결정의 시선까지 함께 보여주기

### What — 그리고 무엇이 아닌가

Brand Book은 프로덕트 팀의 컴포넌트 매뉴얼과 다른 결의 출판물입니다.

| 비교 항목 | 프로덕트 컴포넌트 매뉴얼 (사내) | Brand Book (외부 공개) |
| --- | --- | --- |
| 무엇을 다루는가 | 컴포넌트의 사양·구현·사용 규칙 | 브랜드의 정체성·시선·원칙·결정의 맥락 |
| 누가 보는가 | 사내 빌더 (디자이너·엔지니어) | 브랜드팀 + 외부 (업계·지원자·파트너) |
| 어떻게 읽히는가 | 처방형 매뉴얼 (이렇게 쓰세요) | 진술형 출판물 (우리는 이렇게 봅니다) |
| 참조 결 | Material Design · Atlassian DS | eBay Playbook · Seed Design |

- Authenticity(진정성)라는 브랜드 가치를 비주얼·버벌·색·심볼 네 축으로 변환하는 진술의 묶음
- 디자이너·엔지니어가 같은 언어로 작업할 수 있도록 코드·자산·가이드·인터랙션이 함께 제공되는 살아있는 출판물
- 처방형 Do/Don't 항목은 의도적으로 사내 매뉴얼로 분리. 외부판에는 원칙·시선·결과물만 큐레이션
- 컴포넌트 스펙과의 통합은 후속 Phase의 영역. 현재는 정체성 출판물에 집중

3D 에셋 라이브러리는 **별도 프로젝트**로 운영되며, Brand Book의 Visual Principles 페이지(iframe 임베드)와 Assets/3D Assets 페이지(링크)에서만 참조됩니다.

### For Whom

브랜드 북은 오늘의집 브랜드팀이 소유하는 외부 공개 출판물이고, 두 가지 역할이 동시에 실립니다.

| 역할 | 의미 | 대상 |
| --- | --- | --- |
| 대외 PR | 오늘의집의 시각·언어 정체성을 외부에 공개적으로 전달 | 동종 업계 디자이너 · 입사 지원자 · 협업 파트너 |
| 내부 정체성 강화 | 브랜드의 결을 사내 구성원이 공통 언어로 확인하고 자기 작업에 끌어쓸 수 있는 진술 레퍼런스 | 오늘의집 전체 (디자인·엔지니어·마케팅·운영) |

사내 빌더가 참고하는 실무 컴포넌트 사양은 별도 매뉴얼로 존재 (프로덕트 팀 운영). Brand Book은 그 매뉴얼의 상위 원칙 레이어에 위치합니다.

---

## 2. 시스템의 정의

### 정보 구조 (사이드바)

```
About
  Mission

Brand                  ← 정체성 코어
  Symbol
  Visual Principles
  Tone of Voice
  Color

Assets
  Overview
  Graphic Assets
    Icon · 2D Assets · 3D Assets · Motion(개발예정) · Pattern/Background(개발예정)
  Image Assets
    Photographic Assets
```

- About — 브랜드 북의 왜·누구를 위해를 선언하는 진입점
- Brand — 브랜드 정체성의 4개 축. 형태(Symbol), 시각(Visual), 언어(Tone of Voice), 색(Color)
- Assets — 그 결정이 실제 형태화된 자산 카탈로그. 매뉴얼이 아니라 큐레이션된 갤러리

### 시각 자산의 분류

| 그룹 | 포맷 | 정의 | 주요 용처 |
| --- | --- | --- | --- |
| Brand | Symbol | 브랜드의 핵심 상징 단위 | 로고, 앱 아이콘 등 최상위 노출 |
| Graphic Assets | Icon | 사용자 행동·선택을 직관적으로 안내하는 벡터 그래픽 | UI 컨트롤, 안내 |
| Graphic Assets | 2D Assets (SVG) | 작은 용처에서 서비스 성격을 시각적으로 대표 | 숏컷, 카드 헤더 |
| Graphic Assets | 3D Assets (Still) | 큰 용처에서 시선을 끌고 브랜드 완성도를 강화 | 메인 비주얼, 캠페인 |
| Graphic Assets | Motion Assets (개발예정) | 행동 피드백·전환·학습 보조 | 인터랙션, 온보딩 |
| Graphic Assets | Pattern / Background (개발예정) | 화면 배경면 구성, 브랜드 결을 은은하게 깔아 밀도 보강 | 섹션 배경, 카드 후면 |
| Image Assets | Photographic Assets | 실제 상품·인테리어 신을 사실적으로 표현 | 커머스 컨텍스트 |

### 비주얼 4원칙 — Authenticity의 시각화

| 원칙 | 정서 | 의미 | 시각적 표현 |
| --- | --- | --- | --- |
| 01 Smoothing Line | 부드러움 | 브랜드 심볼의 외형을 닮은 곡선으로, 에셋에 부분적으로 풀어내는 조형적이고 부드러운 라운딩으로 표현 | 모서리·면의 라운딩, 각진 단면 지양 |
| 02 Dream | 다정함 | 유저의 꿈과 영감을 담아내고, 이를 다정한 시선으로 바라보는 정서를 은은한 그라디언트를 가진 질감으로 표현 | 은은한 Vertical Gradient + 몽환적인 질감 |
| 03 Clarity | 명확성 | 유저의 꿈을 분명한 현실로 실현해내는 의지를 군더더기 없는 실루엣과 단순한 매스로 표현 | 군더더기 없는 명확한 실루엣, 단순한 매스 |
| 04 Stability | 안정감 | 유저의 꿈을 진중하게 실현해 나가는 자세를 표현. 지면에 안정적으로 붙은 그림자와 단계별로 정돈된 에셋 구조 | 지면 그림자(Ground Shadow) + 단계별 에셋 구조 (Icon · Asset Small · Asset Large) |

### 버벌 4원칙 — Authenticity의 언어화 (Tone of Voice)

| 원칙 | 의미 | 말의 결 |
| --- | --- | --- |
| 01 Everyday | 일상의 언어로. 전문 용어보다 누구나 쓰는 말이 강하다 | 전문 용어·영업적 표현·군더더기 지양 |
| 02 Warmth | 다정한 거리. 차갑지도, 무리하게 가깝지도 않은 결 | 격식 < 환대, 친근 < 진심 |
| 03 Clarity | 분명한 약속. 모호함은 신뢰를 흐트러뜨린다 | 구체 > 추상, 약속 > 다짐 |
| 04 Encouragement | 응원하는 시선. 안내자가 아니라 일상을 함께 만드는 동료 | 명령 < 제안, 평가 < 응원 |

Visual·Verbal 두 축은 사이드바 Brand 카테고리 안에서 동등한 위계로 배치되어 있습니다.

---

## 3. 제작 과정

브랜드 북 자체가 만들어지는 흐름을 7단계로 정리합니다. 1–4단계는 완료, 5단계가 현재 진행 중, 6–7단계는 예정입니다.

### Phase 1 — 포지셔닝 정립 · 완료

목표: Brand Book이 무엇이고 무엇이 아닌지를 명확히 정의.

- 사내 컴포넌트 매뉴얼과의 결의 차이 정립 — 처방형 매뉴얼 vs 진술형 출판물
- 참조 사례 정립 — eBay Playbook, Seed Design
- 톤·결의 기준 — 시선·관점이 먼저, 사양·규칙은 후순위. 처방형 Do/Don't는 외부판에서 제외
- 대상자 정의 — 브랜드팀 owner / 대외 PR + 내부 정체성 강화 이중 역할

### Phase 2 — 정보 구조 설계 · 완료

목표: 외부 관람자가 따라가기 쉬운 위계로 콘텐츠 배치.

- 사이드바 IA 설계 — About / Brand / Assets 3단 구조 (여기어때 디자인 라이브러리 패턴 참조)
- Brand 카테고리 4축 정의 — Symbol / Visual Principles / Tone of Voice / Color
- 자산 분류 체계 정립 — Brand → Graphic → Image 위계
- Symbol을 자산 카테고리가 아닌 정체성 코어로 승격
- 자산 페이지의 섹션 구조 정립 — Overview → Form Principles → Workflow → Specs

### Phase 3 — 셸 + 페이지 골격 구축 · 완료

목표: 모든 페이지가 같은 골격 위에서 작동하도록 셸과 페이지 골격 만들기.

- v2 셸 신설 — 헤더(Ohouse Brand Book), 사이드바, 콘텐츠 영역
- About 페이지 신설 — Mission 진입점
- Brand 카테고리 4 페이지 신설 — Symbol, Visual Principles, Tone of Voice, Color
- Asset 페이지 7종 골격 작성 — Icon, 2D, 3D, Motion, Pattern, Photographic, (Symbol)
- Overview 페이지 — 전체 자산 분류 인덱스
- 페이지 간 일관된 hero footprint — 16:9, content-max 800px, soft border, 12px radius
- 루트 URL을 v2로 자동 redirect — 공유 URL 진입점 통일

### Phase 4 — 시각 자산 통합 · 완료

목표: 페이지에 들어갈 1차 시각 자산을 가벼운 무게로 준비.

- Brand 4 페이지의 hero 시각 자산 배치
    - About — 정적 풍경 이미지 (박공 지붕 + 노을)
    - Symbol — 심볼 마크
    - Visual Principles — 별도 운영 중인 3D 에셋 라이브러리를 iframe으로 임베드, 자동 재생
    - Tone of Voice — 정적 풍경 이미지 (편지 쓰는 손)
    - Color — 인터랙션 모션 스테이지 (적층식 무드보드)
- 이미지 파이프라인 — PNG → WebP 일괄 변환. 평균 90% 이상 용량 절감
- Visual Principles iframe 콜드 로드 안정화 — race condition 수정으로 첫 진입 시 빈 박스 문제 해결
- Asset 페이지 Form Principles — 2-컬럼 행 구조 (좌측 본문 + 우측 이미지 placeholder, 4:3)
- Asset 페이지 Showcase — 5×2 placeholder 갤러리 (실 자산 이미지를 끼울 자리)
- 본문 텍스트 폭을 hero 이미지와 정렬 (640–680px 캡 제거)
- GitHub Pages 자동 배포 라인 정립 — [https://noyahjung.github.io/Ohouse_3D_Asset_Library/](https://noyahjung.github.io/Ohouse_3D_Asset_Library/)

### Phase 5 — 콘텐츠 정리 · 현재 단계

목표: 골격만 있는 각 페이지에 실 본문·시각 자산을 채우기.

진행 절차:

1. 개발 상황 공유 — 현재 페이지 골격·placeholder 상태와 톤·결의 기준을 팀에 공유
2. 페이지별 담당자 지정 — 아래 페이지의 콘텐츠 정리 책임자를 배정

| 페이지 | 채워야 할 콘텐츠 | 담당 |
| --- | --- | --- |
| Symbol | 외부 공개용 사양의 추상 레이어, 4 결정의 실 본문·이미지 | TBD |
| Visual Principles | 4원칙(Smoothing Line/Dream/Clarity/Stability)별 세부 페이지, 카피 검수 | TBD |
| Tone of Voice | 톤 예시 카드의 실 카피·컨텍스트 검수, 4원칙 본문 보강 | TBD |
| Color | 4 색 원칙의 본문, 실 색 결정 시선 정리 | TBD |
| Icon | Form Principles 4 tenet 본문·이미지, Showcase 자산 | TBD |
| 2D Assets | Form Principles 4 tenet 본문·이미지, Showcase 자산 | TBD |
| 3D Assets | Form Principles 4 tenet 본문·이미지, Showcase 자산 | TBD |
| Photographic Assets | 사진 매체 고유의 결로 본문 검수, Showcase 자산 | TBD |
| Motion / Pattern | 개발예정. 4 tenet의 placeholder 톤 유지, 정리 시점에 본문 작성 | TBD |
| About / Overview | Mission 본문 검수, Overview 카피의 신규 분류 체계 반영 | TBD |

3. 담당자별 콘텐츠 채움 — 본문 카피, 예시 자산, 이미지 placeholder 교체
4. 검수 라운드 — 톤 일관성, 사실 관계, 외부 공개 적절성 검수

### Phase 6 — 디자인 통합 · 예정

목표: 콘텐츠가 채워진 후, 페이지 간 시각적 일관성을 단일 레이아웃으로 정리.

- 페이지 간 시각 차이 점검 — 타이포 위계, 컬러 사용, 간격, 인터랙션 패턴
- 단일 레이아웃 시스템으로 정렬 — 헤로 비주얼, 본문, 이미지 모듈의 통일된 사양
- 사용자 흐름 검수 — 외부 관람자가 자연스럽게 페이지를 이동하는 경험 점검
- 반응형 대응 점검 — 모바일·태블릿
- 외부 공개 직전 일관성 사후 점검

### Phase 7 — 컴포넌트 스펙 통합 · 후속

목표: 프로덕트 팀이 운영하는 컴포넌트 매뉴얼을 Brand Book의 원칙·시선과 cross-link.

- Brand Book의 원칙 레이어와 컴포넌트 사양의 구현 레이어를 단일 레퍼런스로 묶기
- 사내 컴포넌트 매뉴얼은 그대로 유지하되, 어떤 원칙을 어떤 결정으로 구현했는지 Brand Book에서 인덱싱
- 외부판에서는 원칙·결과만 노출. 사내 토큰에 한해 매뉴얼로 연결되는 링크 레이어 제공
- 진입 시점 — Phase 6 (외부 공개 가능 상태) 완성 이후

---

## 4. 현재까지의 산출물

### Brand Book 페이지

| 페이지 | 경로 | 상태 |
| --- | --- | --- |
| About / Mission | v2/index.html | 본문 작성됨, 검수 대기 |
| Symbol | v2/symbol.html | 골격 + placeholder 본문 |
| Visual Principles | v2/visual-principles.html | 4원칙 본문 + iframe 자동 재생 |
| Tone of Voice | v2/tone-of-voice.html | 4원칙 본문 + 톤 예시 카드 (검수 대기) |
| Color | v2/color.html | hero 모션 완성, 본문 placeholder |
| Overview | v2/overview.html | 기존 콘텐츠 재서빙 (분류 체계 갱신 필요) |
| Icon · 2D · 3D · Photographic | v2/assets/ | hero + 5×2 갤러리 + Form Principles + Workflow + Specs (placeholder 톤) |
| Motion · Pattern | v2/assets/motion.html, pattern.html | 개발예정 표기, 골격만 |

### 외부 공유 URL

- GitHub Pages — [https://noyahjung.github.io/Ohouse_3D_Asset_Library/](https://noyahjung.github.io/Ohouse_3D_Asset_Library/) (루트가 Brand Book으로 자동 redirect)

### 셸·운영 자산

- shared/shell-v2.css, shared/shell-v2.js — Brand Book 사이드바·헤더 셸
- 이미지 파이프라인 — PNG → WebP (q=85, RGBA→RGB 알파 드롭). 평균 90%+ 절감
- GitHub Pages 자동 배포 — feat/visual-system-shell 브랜치 루트
- 임베드 자산 — 별도 프로젝트인 3D 에셋 라이브러리(?embed=principles)를 Visual Principles 페이지에서 iframe으로 참조

---

## 5. Roadmap & 다음 단계

### 일정 가이드라인

| 시점 | 마일스톤 |
| --- | --- |
| 2026 Q2 마감 | Asset 페이지 그래픽 영역의 콘텐츠 정리 완료 (Form Principles 이미지·5×2 갤러리·본문) |
| 2026 Q3 마감 | Brand Book 전체 외부 공개 가능 상태 — About + Brand 4 페이지 본문·시각 자산까지 마감 + 디자인 통합(Phase 6) 완료 |
| 2026 Q4 이후 | 컴포넌트 스펙 통합(Phase 7) 진입 |

### Q2 안 — Phase 5의 그래픽 자산 영역 마감

- [ ]  페이지별 담당자 지정 완료
- [ ]  Asset 페이지 Form Principles 4 tenet의 이미지 placeholder를 실 이미지로 교체
- [ ]  Asset 페이지 5×2 갤러리에 실 자산 이미지 또는 큐레이션 컷 채우기
- [ ]  Visual Principles 4원칙별 세부 페이지 분리 (Dream · Clarity · Stability · Smoothing Line)
- [ ]  Asset (Small) 2D SVG 시리즈 본격 정의
- [ ]  Photographic Assets 본문 검수 (현재 일반론 placeholder)

### Q3 안 — Phase 5 마감 + Phase 6 디자인 통합

- [ ]  Color 4원칙을 실제 색 결정의 시선으로 채우기
- [ ]  Tone of Voice 톤 예시 카드의 실 카피·컨텍스트 검수, 본문 보강
- [ ]  Symbol 외부 공개용 사용 사양 정리
- [ ]  Motion Assets 브랜드 모션 원칙 수립 (Large 그래픽 / Icon 그래픽 두 트랙)
- [ ]  Pattern / Background 에셋 종류·활용 가이드 정리
- [ ]  Overview 카피를 신규 분류(Brand → Graphic → Image) 체계에 맞게 갱신
- [ ]  Visual Principles 명칭 후보 재검토 (Way of Seeing / Principles of Vision 등)
- [ ]  Phase 6 — 페이지 간 시각 차이 점검·정렬, 반응형 대응
- [ ]  외부 공개 전 일관성 사후 점검 (타이포·여백·톤)

### Q4 이후 — Phase 7 (컴포넌트 통합)

- [ ]  프로덕트 컴포넌트 스펙과 Brand Book의 단일 레퍼런스 통합 모델 설계
- [ ]  사내 매뉴얼과 Brand Book의 cross-link 방식 정의 (외부판은 링크 레이어만 노출)
- [ ]  Brand Book과 사내 컴포넌트 매뉴얼의 owner·운영 책임 분담 명문화
