# Ohouse 3D Asset Library — 프로젝트 가이드

> 최종 업데이트: 2026-04-21

---

## 1. 프로젝트 개요

오늘의집 브랜드 3D 에셋을 웹 브라우저에서 실시간으로 커스터마이즈하고 PNG로 내보내는 정적 웹 애플리케이션.

| 항목 | 내용 |
|---|---|
| 엔트리 | `index.html` (docs-shell 메인) + `3Dassetlibrary.html` (3D 라이브러리 커스터마이저) |
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
├── index.html                     ← docs-shell 진입 (Overview)
├── visual-language.html           ← 조형 원칙 페이지
├── assets/icon.html               ← Icon 카테고리
├── assets/2d.html                 ← 2D Assets 카테고리
├── assets/3d.html                 ← 3D Assets 인트로 (라이브러리로 링크)
├── assets/motion.html             ← Motion Assets (개발예정 placeholder)
├── shared/shell.css, shell.js     ← 공통 헤더/사이드바
├── logo.svg                       ← 브랜드 심볼
│
├── 3Dassetlibrary.html            ← 3D 라이브러리 커스터마이저 (UI + 씬 + 로직 전부)
├── materials.js                   ← 재질 정의 (프로스티드, 블프, 크롬 등)
│
├── Botanical_Gardens_2_quarter.hdr  ← HDR 환경맵 (8MB, 실사용)
│
├── box.gltf + box_simplified_1~2.bin           ← 이사박스
├── gift.gltf + gift_welded_1~6.bin             ← 선물상자
├── Coupon.gltf                                  ← 쿠폰
├── waterpurifier.gltf + waterpurifier_simplified_1~4.bin  ← 정수기
├── basket3.glb                                  ← 바구니
├── clock.glb                                    ← 시계
├── camera6.glb                                  ← 카메라
├── packagebox.glb                               ← 패키지 박스
├── lightning.glb                                ← 라이트닝
│
├── librarythumbnail/*.png         ← 랜딩 썸네일 (배포 필수)
│
├── CLAUDE.md                      ← Claude Code 설정
├── docs/                          ← 문서
└── *.png, *.c4d, 정수기레퍼런스.png, ohousevisuallanguage_ver1.pdf  ← 레퍼런스 (배포 불필요)
```

### 배포 대상 파일

배포 파일의 단일 진실 공급원(single source of truth)은 [§5-3의 sync include 패턴](#5-3-전체-sync-권장-배포-방법)이며, 현재 배포되는 파일 목록은 [§5-4](#5-4-현재-배포-대상-파일-2026-04-21-기준)에 정리되어 있다.

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

> **자동 최적화 — 명시 요청 없이 항상 거치는 단계**
>
> 새 에셋(`*.gltf` 또는 `*.glb`)이 추가되면 *사용자가 따로 지시하지 않더라도* 아래 4-1·4-2를 무조건 수행한 뒤 4-3 등록으로 넘어간다. "에셋을 추가했어"라는 한 마디면 4-1 → 4-2 → 4-3 → 4-4 전체 흐름을 자동으로 실행한다.

### 4-1. glTF 파일 준비

- Cinema 4D에서 모델링 후 **glTF (.gltf + .bin)** 또는 **GLB (.glb)** 포맷으로 익스포트 (최근 에셋은 GLB 단일 파일을 사용 — `basket.glb`, `clock.glb`, `packagebox.glb`)
- 메시 이름 규칙으로 재질 분류:
  - 바디(컬러 변경 대상) → 별도 명명 불필요 (기본값이 `body`)
  - 리본/액센트 → 이름에 `ribbon` 포함
  - 로고/라벨 → 이름에 `logo` 포함
  - 유리 파츠 → 이름에 `cup` 또는 `glass` 포함
  - 금속 파츠 → 이름에 `cylinder` 포함

### 4-2. 파일 용량 최적화 (필수, 자동)

원본 glTF/GLB는 그대로 커밋하지 않고 항상 `gltfpack`으로 한 번 정리해서 단일 GLB로 만든다. 이 단계는 명시 지시가 없어도 4-1 직후 자동으로 실행한다.

```bash
cd "/Users/luka.jung/Desktop/ai frontire/Ohouse_3D_Asset_Library"

# meshopt 압축 OFF, 노드 이름·머티리얼 이름 보존
npx -y -p gltfpack@0.20 gltfpack -i <원본>.gltf -o <에셋ID>.glb -kn -km

# 검증: 노드 이름이 살아있는지 (materialFor의 메시 매칭이 이름 기반)
python3 -c "import json,struct;f=open('<에셋ID>.glb','rb');f.read(12);n=struct.unpack('<I',f.read(4))[0];f.read(4);j=json.loads(f.read(n).decode());print([x.get('name','?') for x in j.get('nodes',[])])"
```

플래그 의미:
- `-kn` — 노드 이름 보존. **반드시 켤 것.** 미사용 시 모든 이름이 `?`로 치환되어 `materialFor`의 메시 매칭이 전부 깨진다.
- `-km` — 머티리얼 이름 보존. 디버깅/추후 매칭에 유용.
- `-cc` (meshopt 압축) — **사용 금지.** 프로젝트 GLTFLoader에 `MeshoptDecoder`가 연결되어 있지 않아 로드 실패. 추가하려면 별도 작업 필요.

확인 사항:
- 압축된 GLB가 원본 대비 **50–80% 작아져야 정상**. 거의 변화가 없으면 옵션 점검.
- 작업이 끝나면 원본 `.gltf`/`.bin`은 삭제하고 `.glb` 단일 파일만 리포에 남긴다.
- `ASSETS`의 `url`도 새 `.glb` 파일명으로 갱신.

### 4-3. ASSETS 레지스트리에 등록

`3Dassetlibrary.html`의 `ASSETS` 객체에 항목 추가:

```javascript
newAsset: {
  url: 'newAsset.glb',           // 4-2에서 최적화해 만든 단일 GLB
  label: 'New Asset',             // UI에 표시할 이름
  rootName: 'root_node_name',     // glTF 내 루트 노드 이름
  recommended: 'frostedBlue',     // 추천 컬러 ID

  // ── 면 정리 (둘 중 하나는 *반드시* 명시) ──
  weldVertices: true,             // 기본 권장: C4D의 UV/머티리얼 분할로 같은 위치에
                                  //   생긴 중복 정점을 weld 후 normal 재계산 → 이음새의
                                  //   faceted 면 자동 제거. 새 에셋은 이걸 켜는 것이 default.
  // keepOriginalNormals: true,   // C4D에서 normal을 정밀 작성한 케이스(basket·clock).
                                  //   weldVertices와 충돌하므로 둘 중 하나만.

  // ── 선택적 옵션 ──
  // rotationY: Math.PI,          // 초기 Y축 회전 (라디안)
  // modelScale: 2.0,             // 모델 스케일 배율
  // frameScale: 1.8,             // 카메라 프레이밍 (기본 2.2)
  // yOffset: 0.1,                // 수직 위치 보정 (높이 비율)
  // bevelComp: 0.04,             // 둥근 바닥 에셋의 그림자 평면 미세 lift (기본 0)
  // useFullGradientBox: true,    // body 외 파츠 포함하여 그라데이션 범위 계산
  // viewOverrides: { '3': [0.25, 0.05, 1.00] },  // 특정 뷰 각도 오버라이드

  materialFor(name, parentName) {
    const n  = (name || '').toLowerCase();
    const pn = (parentName || '').toLowerCase();
    // *반드시* name과 parentName을 함께 검사한다. gltfpack이 최적화 과정에서
    // 원래 Mesh였던 노드를 Group + 이름 없는 자식 Mesh로 감싸기 때문에,
    // traverse가 도는 실제 Mesh의 obj.name은 비고 식별 이름은 obj.parent.name에 있다.
    if (/ribbon/.test(n) || /ribbon/.test(pn)) return 'ribbonGray';
    if (/logo/.test(n)   || /logo/.test(pn))   return 'luminance';
    return 'body';
    // 반환 가능 값: 'body' | 'luminance' | 'ribbonGray' | 'glass' | 'chrome' | 'cameraLens' | 'harmony2'
  },
},
```

### 4-4. HTML에 에셋 버튼 추가

`#assets` 영역에 버튼 추가:

```html
<button class="asset-chip" data-asset="newAsset">New Asset</button>
```

### 4-5. 면 처리 파이프라인 (자동, 런타임)

`loadAsset()`이 4-3의 등록 옵션을 보고 자동으로 다음 중 하나를 적용합니다:

1. **`weldVertices: true`** → 위치 기반 weld(UV/normal/material 분할 무시) → `computeVertexNormals` → `smoothNormalsByAngle`(75° 이하 평균화 / 90° 하드엣지 보존). 이음새의 faceted 면이 사라짐. **새 에셋의 기본 권장 경로.**
2. **`keepOriginalNormals: true`** → C4D 소스의 normal을 그대로 보존. 정밀 normal 작성된 에셋용.
3. **둘 다 없음** → 단일 메시면 `computeVertexNormals`만, 다중 메시면 병합 후 `smoothNormalsByAngle`. 이음새가 살짝 각질 수 있음 → 가능하면 (1)을 명시.

---

## 5. S3 배포

### 5-1. 배포 경로와 라이브 URL

| 항목 | 값 |
|---|---|
| S3 경로 | `s3://bucketplace-data-static/prod/branddesign/3Dassetlibrary/` |
| 라이브 URL | `https://static-contents.datapl.datahou.se/v2/branddesign/3Dassetlibrary/3Dassetlibrary.html` |
| AWS 계정 | `534193482673` (Athena-Mgmt SSO — `luka.jung@bucketplace.net`) |

> ⚠️ 경로 맨 끝의 `3Dassetlibrary/` 프리픽스를 빠뜨리면 `branddesign/` 루트에 덮어써져 다른 프로젝트 자산과 섞이므로 주의.

### 5-2. 배포 전 안전 체크

공용 prod 버킷이므로 실행 전 반드시 확인:

```bash
pwd                                # 프로젝트 루트인지
aws sts get-caller-identity        # 계정 534193482673인지
aws s3 ls s3://bucketplace-data-static/prod/branddesign/3Dassetlibrary/
```

### 5-3. 전체 sync (권장 배포 방법)

로컬의 배포 대상 파일만 골라서 S3와 동기화. 동일 파일은 자동으로 skip되고, 변경·신규 파일만 올라간다.

```bash
cd "/Users/luka.jung/Desktop/ai frontire/Ohouse_3D_Asset_Library"

# 1) 드라이런으로 어떤 파일이 올라갈지 먼저 확인
aws s3 sync . s3://bucketplace-data-static/prod/branddesign/3Dassetlibrary/ \
  --exclude "*" \
  --include "3Dassetlibrary.html" \
  --include "*.glb" \
  --include "*.gltf" \
  --include "*.bin" \
  --include "Botanical_Gardens_2_quarter.hdr" \
  --include "materials.js" \
  --include "librarythumbnail/*" \
  --dryrun

# 2) 문제 없으면 --dryrun 빼고 실제 실행
aws s3 sync . s3://bucketplace-data-static/prod/branddesign/3Dassetlibrary/ \
  --exclude "*" \
  --include "3Dassetlibrary.html" \
  --include "*.glb" \
  --include "*.gltf" \
  --include "*.bin" \
  --include "Botanical_Gardens_2_quarter.hdr" \
  --include "materials.js" \
  --include "librarythumbnail/*"
```

**include 패턴 설계 원칙** — 이 화이트리스트가 곧 "배포 대상 파일 정의"다. 새로운 확장자/폴더가 생기면 이 목록에도 반드시 추가해야 한다. 제외해야 할 대상(절대 올리면 안 되는 것):

- `.c4d` 원본 소스, 레퍼런스 PNG (`01.png`, `view01.png`, `정수기레퍼런스.png` 등)
- `.git/`, `.DS_Store`, `.claude/`, `CLAUDE.md`, `docs/`
- `ohousevisuallanguage_ver1.pdf` (Visual Language 레퍼런스 문서)

### 5-4. 현재 배포 대상 파일 (2026-04-21 기준)

| 파일/폴더 | 용도 |
|---|---|
| `3Dassetlibrary.html` | 앱 엔트리 (현재 메인) |
| `materials.js` | 재질 모듈 |
| `Botanical_Gardens_2_quarter.hdr` | HDR 환경맵 (8MB, EXR에서 다운그레이드됨) |
| `box.gltf` + `box_simplified_*.bin` (2) | 이사박스 |
| `gift.gltf` + `gift_welded_*.bin` (6) | 선물상자 |
| `Coupon.gltf` | 쿠폰 |
| `waterpurifier.gltf` + `waterpurifier_simplified_*.bin` (4) | 정수기 |
| `basket.glb` | 바구니 |
| `clock.glb` | 시계 |
| `librarythumbnail/*.png` (6) | 랜딩 썸네일 |

> 참고: `Botanical_Gardens_2.exr` (83MB)는 과거 S3에 올라간 잔재로, 현재 HTML은 `_quarter.hdr`만 로드하므로 삭제해도 무방하지만 실사용 영향은 없음.

### 5-5. 배포 후 확인

```bash
# S3 반영 확인
aws s3 ls s3://bucketplace-data-static/prod/branddesign/3Dassetlibrary/

# 라이브 URL에서 최신 파일 확인
open "https://static-contents.datapl.datahou.se/v2/branddesign/3Dassetlibrary/3Dassetlibrary.html"
```

CDN 캐시 때문에 라이브에 반영이 늦을 수 있음 → 강력 새로고침(`Cmd+Shift+R`) 또는 쿼리스트링(`?v=타임스탬프`)으로 우회.

### 5-6. 새 에셋 추가 시

1. 로컬에 `.glb` 또는 `.gltf`+`.bin`을 추가하고 `3Dassetlibrary.html`의 `ASSETS`에 등록
2. 썸네일 PNG를 `librarythumbnail/<id>.png` 로 저장
3. 위 5-3의 sync 명령 그대로 실행 — include 패턴이 `*.glb`/`*.gltf`/`*.bin`/`librarythumbnail/*`를 이미 커버하므로 자동 포함됨
4. 새 확장자(예: `.ktx2`, `.draco`)를 도입한 경우에만 include 패턴에 추가하고 이 문서도 갱신할 것

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
open http://localhost:8765/3Dassetlibrary.html
```
