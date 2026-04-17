# Ohouse 3D Asset Library — 프로젝트 가이드

> 최종 업데이트: 2026-04-17

---

## 1. 프로젝트 개요

오늘의집 브랜드 3D 에셋을 웹 브라우저에서 실시간으로 커스터마이즈하고 PNG로 내보내는 정적 웹 애플리케이션.

| 항목 | 내용 |
|---|---|
| 엔트리 | `material-test.html` (SPA) |
| 기술 스택 | Three.js r160 (CDN), 순수 HTML/CSS/JS |
| 백엔드 | 없음 — 100% 정적 파일 |
| 빌드 도구 | 없음 — importmap 기반 ES Module |
| 배포 | AWS S3 정적 호스팅 |
| GitHub | `https://github.com/noyahjung/Ohouse_3D_Asset_Library` |
| 로컬 서버 | `python3 -m http.server 8765` |

---

## 2. 디렉토리 구조

```
Ohouse_3D_Asset_Library/
│
├── material-test.html          ← 엔트리 (UI + 씬 + 로직 전부)
├── materials.js                ← 재질 정의 (프로스티드, 블프, 크롬 등)
│
├── Botanical_Gardens_2.exr     ← HDR 환경맵 (83MB)
│
├── box.gltf                    ← 이사박스 에셋
├── box_simplified_1.bin
├── box_simplified_2.bin
│
├── gift.gltf                   ← 선물상자 에셋
├── gift_welded_1~6.bin
│
├── Coupon.gltf                 ← 쿠폰 에셋
│
├── waterpurifier.gltf          ← 정수기 에셋
├── waterpurifier_simplified_1~4.bin
│
├── CLAUDE.md                   ← Claude Code 설정
├── docs/                       ← 문서
└── *.png, *.c4d                ← 레퍼런스 (배포 불필요)
```

### 배포 대상 파일 (17개)

| 파일 | 용도 |
|---|---|
| `material-test.html` | 앱 엔트리 |
| `materials.js` | 재질 모듈 |
| `Botanical_Gardens_2.exr` | HDR 환경맵 |
| `box.gltf` + `box_simplified_*.bin` (2) | 이사박스 |
| `gift.gltf` + `gift_welded_*.bin` (6) | 선물상자 |
| `Coupon.gltf` | 쿠폰 |
| `waterpurifier.gltf` + `waterpurifier_simplified_*.bin` (4) | 정수기 |

---

## 3. 재질 시스템

### 3-1. 기본 재질 (Frosted) — 7종

반투명 프로스티드 글래스 느낌. 상단→하단 수직 그라데이션.

| ID | 라벨 | 상단 색상 | 하단 색상 |
|---|---|---|---|
| `frostedBlue` | Genuine Blue | `#EBEFFF` | `#00a1ff` |
| `frostedGreen` | Jade Green | `#EDFFF4` | `#19BD86` |
| `frostedOrange` | Mango Orange | `#FFF4EC` | `#FF752C` |
| `frostedRed` | Coral Red | `#FFEFEF` | `#FF4747` |
| `frostedViolet` | Violet | `#F7EFFD` | `#C475F5` |
| `frostedDarkBlue` | Dark Blue | `#E8EEFB` | `#2C65CF` |
| `frostedPink` | Candy Pink | `#FFF0F4` | `#FF6E92` |

공통 프리셋: `transmission 0.50 / roughness 0.60 / thickness 2.30 / ior 1.70 / clearcoat 0.39`

### 3-2. 블랙프라이데이 재질 — 1종

불투명 메탈릭 퍼플 크롬.

```
Color: R 0.02 / G 0.00 / B 0.32 (linear)
Roughness 0.70 / Metalness 0.65
Clearcoat 0.30 / Coat Roughness 0.25
Env Intensity 2.99 / Emissive 0.50
Reflectivity 0.68 / Sheen 0.36 / Sheen Roughness 0.58
```

### 3-3. 빌트인 재질 (자동 적용)

| 재질 | 용도 | 사용자 변경 |
|---|---|---|
| Luminance White | 로고, 라벨 (순백, 조명 무관) | 불가 |
| Ribbon Gray (Harmony) | 리본 액센트 (바디 컬러에 연동) | 불가 |
| Glass | 투명 유리 (정수기 컵) | ⚙ 설정 가능 |
| Chrome | 금속 반사 (정수기 노즐) | ⚙ 설정 가능 |

---

## 4. 에셋 등록 방법

### 4-1. glTF 파일 준비

- Cinema 4D에서 모델링 후 **glTF (.gltf + .bin)** 포맷으로 익스포트
- 메시 이름 규칙으로 재질 분류:
  - 바디(컬러 변경 대상) → 별도 명명 불필요 (기본값이 `body`)
  - 리본/액센트 → 이름에 `ribbon` 포함
  - 로고/라벨 → 이름에 `logo` 포함
  - 유리 파츠 → 이름에 `cup` 또는 `glass` 포함
  - 금속 파츠 → 이름에 `cylinder` 포함

### 4-2. ASSETS 레지스트리에 등록

`material-test.html`의 `ASSETS` 객체에 항목 추가:

```javascript
newAsset: {
  url: 'newAsset.gltf',        // glTF 파일명
  label: 'New Asset',           // UI에 표시할 이름
  rootName: 'root_node_name',   // glTF 내 루트 노드 이름
  recommended: 'frostedBlue',   // 추천 컬러 ID

  // ── 선택적 옵션 ──
  // rotationY: Math.PI,        // 초기 Y축 회전 (라디안)
  // modelScale: 2.0,           // 모델 스케일 배율
  // frameScale: 1.8,           // 카메라 프레이밍 (기본 2.2)
  // yOffset: 0.1,              // 수직 위치 보정 (높이 비율)
  // useFullGradientBox: true,  // body 외 파츠 포함하여 그라데이션 범위 계산
  // viewOverrides: { '3': [0.25, 0.05, 1.00] },  // 특정 뷰 각도 오버라이드

  materialFor(name, parentName) {
    const n = (name || '').toLowerCase();
    // 메시 이름 패턴 매칭으로 재질 유형 반환
    if (/ribbon/.test(n)) return 'ribbonGray';
    if (/logo/.test(n))   return 'luminance';
    return 'body';
    // 반환 가능 값: 'body' | 'luminance' | 'ribbonGray' | 'glass' | 'chrome'
  },
},
```

### 4-3. HTML에 에셋 버튼 추가

`#assets` 영역에 버튼 추가:

```html
<button class="asset-chip" data-asset="newAsset">New Asset</button>
```

### 4-4. 면 처리 파이프라인 (자동)

새 에셋은 `loadAsset()` 함수에서 자동으로 다음 처리를 받습니다:

1. **단일 바디 메시** → `computeVertexNormals()` (indexed 정점 공유 기반 스무싱)
2. **다중 바디 메시** → 각 메시 `computeVertexNormals()` → 병합 → `toNonIndexed()` → `smoothNormalsByAngle()` (이음새 스무싱, 75° 이하 평균화 / 90° 하드엣지 보존)

별도 설정 없이 어떤 glTF를 넣어도 동일한 품질로 렌더링됩니다.

---

## 5. S3 배포

### 5-1. 배포 경로

```
s3://bucketplace-data-static/prod/branddesign/
```

### 5-2. 전체 파일 업로드 (최초 또는 전체 갱신)

```bash
cd "/Users/luka.jung/Desktop/ai frontire/Ohouse_3D_Asset_Library"

# 코어 파일
aws s3 cp material-test.html s3://bucketplace-data-static/prod/branddesign/
aws s3 cp materials.js s3://bucketplace-data-static/prod/branddesign/
aws s3 cp Botanical_Gardens_2.exr s3://bucketplace-data-static/prod/branddesign/

# 이사박스
aws s3 cp box.gltf s3://bucketplace-data-static/prod/branddesign/
aws s3 cp box_simplified_1.bin s3://bucketplace-data-static/prod/branddesign/
aws s3 cp box_simplified_2.bin s3://bucketplace-data-static/prod/branddesign/

# 선물상자
aws s3 cp gift.gltf s3://bucketplace-data-static/prod/branddesign/
aws s3 cp gift_welded_1.bin s3://bucketplace-data-static/prod/branddesign/
aws s3 cp gift_welded_2.bin s3://bucketplace-data-static/prod/branddesign/
aws s3 cp gift_welded_3.bin s3://bucketplace-data-static/prod/branddesign/
aws s3 cp gift_welded_4.bin s3://bucketplace-data-static/prod/branddesign/
aws s3 cp gift_welded_5.bin s3://bucketplace-data-static/prod/branddesign/
aws s3 cp gift_welded_6.bin s3://bucketplace-data-static/prod/branddesign/

# 쿠폰
aws s3 cp Coupon.gltf s3://bucketplace-data-static/prod/branddesign/

# 정수기
aws s3 cp waterpurifier.gltf s3://bucketplace-data-static/prod/branddesign/
aws s3 cp waterpurifier_simplified_1.bin s3://bucketplace-data-static/prod/branddesign/
aws s3 cp waterpurifier_simplified_2.bin s3://bucketplace-data-static/prod/branddesign/
aws s3 cp waterpurifier_simplified_3.bin s3://bucketplace-data-static/prod/branddesign/
aws s3 cp waterpurifier_simplified_4.bin s3://bucketplace-data-static/prod/branddesign/
```

### 5-3. 코드만 수정한 경우 (빠른 배포)

재질이나 UI 수정 시 HTML/JS만 업로드:

```bash
aws s3 cp material-test.html s3://bucketplace-data-static/prod/branddesign/
aws s3 cp materials.js s3://bucketplace-data-static/prod/branddesign/
```

### 5-4. 새 에셋 추가 시

```bash
# 새 에셋 파일 업로드
aws s3 cp newAsset.gltf s3://bucketplace-data-static/prod/branddesign/
aws s3 cp newAsset_1.bin s3://bucketplace-data-static/prod/branddesign/
# ... (bin 파일이 여러 개면 모두)

# 코드에 에셋을 등록했으므로 HTML도 업로드
aws s3 cp material-test.html s3://bucketplace-data-static/prod/branddesign/
```

### 5-5. 업로드 확인

```bash
aws s3 ls s3://bucketplace-data-static/prod/branddesign/
```

---

## 6. 외부 의존성

| 라이브러리 | 버전 | CDN | 용도 |
|---|---|---|---|
| Three.js | r160 | unpkg.com | 3D 렌더링 |
| Pretendard | v1.3.9 | jsdelivr | 한글 타이포그래피 |
| Inter | — | Google Fonts | 영문 타이포그래피 |

모두 CDN 로드이며, 별도 설치(npm 등) 불필요.

---

## 7. 주요 기능

### 재질 모드
- **기본 재질** — 7가지 프로스티드 컬러 (각 에셋의 추천 컬러 자동 적용)
- **블랙프라이데이 재질** — 퍼플 크롬 (에셋 전환 시 재질 유지, 배경 자동 블랙)

### UI
- **좌측 팔레트** — 재질 선택 + ⚙ 세부 조절 슬라이더
- **우측 에셋** — 에셋 전환 + PNG 출력
- **하단** — 뷰 프리셋 (1/2/3, 트윈 애니메이션) + 배경색 + 그림자 토글
- **랜딩 페이지** — 에셋 썸네일 그리드 + 검색
- **브랜드 원칙** — 4단계 슬라이드쇼 (부드러움→다정함→명확성→안정감)

### 출력
- **PNG 출력** — 1080×1080 (그림자 ON 시 1480×1080), 투명 배경, HDR 반사 포함

---

## 8. 로컬 개발

```bash
cd "/Users/luka.jung/Desktop/ai frontire/Ohouse_3D_Asset_Library"
python3 -m http.server 8765
open http://localhost:8765/material-test.html
```
