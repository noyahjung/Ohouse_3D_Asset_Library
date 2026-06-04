# Layout Rules — Ohouse 3D Asset Library

브랜드북(`../ohouse-brand-book/`)의 `.shell-content` 사양을 기반으로,
이 프로젝트의 콘텐츠 페이지(`prototype.html` 등)에서 공통으로 따르는
레이아웃·여백 규칙 모음. 새 페이지를 추가하거나 카피/이미지를 다듬을
때 이 파일을 기준으로 한다.

---

## 1. 본문 액션 버튼 — 직전 요소에 따른 `margin-top`

본문 영역 안의 단독 액션 버튼(`.content-download`, `.content-link` 등)은
**바로 위에 무엇이 오는지로 상단 여백을 다르게 둔다.** 텍스트와 버튼 사이는
한 호흡 더 두어 액션이 본문에 묻히지 않게 한다.

| 직전 요소 | `margin-top` | 의도 |
|---|---|---|
| `.about-banner` (이미지) | **8px** (기본) | 이미지 캡션처럼 바로 따라붙음 |
| `p` (본문 단락) | **24px** | 텍스트→액션 전환에서 시각적 단락 분리 |

```css
/* 본문 텍스트 직후 버튼은 24px 위 여백 */
.prototype-content p + .content-download,
.prototype-content p + .content-link {
  margin-top: 24px;
}
```

같은 규칙을 브랜드북(`../ohouse-brand-book/docs/layout.md` → `.content-download`
섹션의 "여백 규칙")에도 동일하게 두고, 두 프로젝트가 같은 시각적 호흡을 유지한다.

### 적용 예시

`prototype.html` 주의사항 섹션:

```html
<p>AI 생성 이미지는 ...</p>
<a class="content-link" href="...">그래픽 제작 요청 채널</a>
                ↑ 위 단락과의 간격: 24px
```

`prototype.html` 인트로 섹션:

```html
<figure class="about-banner"><img src="..."></figure>
<a class="content-download" href="...">GPT 이미지 빌더로 이동</a>
                ↑ 위 이미지와의 간격: 8px (기본 .content-download 사양)
```

> 참고: 현재 `prototype.html`의 primary CTA(`.content-download`)는 이미지 직후이지만
> 강조 목적상 `margin-top: 24px`로 별도 오버라이드되어 있다.
> 같은 컴포넌트라도 시각적 위계(primary / secondary)에 따라 위 여백을 조정할 수 있다.

---

## 2. 본문 액션 버튼 위계 — 중요 / 일반

본문 영역의 액션 버튼은 시각적 위계에 따라 두 카테고리로 구분.
**크기(폰트·패딩·모양)는 동일하게 유지**하고, 차이는 색상만으로 표현해
사용자가 한 페이지 안에서 무엇이 우선 액션인지 즉시 인지하게 한다.

| 카테고리 | 용도 | 클래스 | 배경 | 텍스트 색 |
|---|---|---|---|---|
| **중요 버튼** | 페이지의 핵심 액션 (예: "GPT 이미지 빌더로 이동") | `.content-download` | `#08131A` | `#ffffff` |
| **일반 버튼** | 보조·참조 액션 (예: "그래픽 제작 요청 채널") | `.content-link` | `#F5F5F5` | `#08131A` |

공통 스펙:

```css
display: inline-flex;
align-items: center;
justify-content: center;
border-radius: 12px;
padding: 12px 20px;
font-size: 16px;
font-weight: 500;
letter-spacing: -0.3px;
line-height: 1.4;
margin-top: 24px;       /* §1 텍스트 직후 규칙 */
```

운용 원칙:

- **한 페이지에 중요 버튼은 1개를 원칙**으로 두고, 나머지 보조 액션은 모두 일반 버튼.
- 두 버튼이 연속으로 올 때 중요 → 일반 순서가 자연스럽다 (시선 우선순위).
- hover: 중요 `#1f2937`, 일반 `#EDEDED`.

브랜드북(`../ohouse-brand-book/docs/layout.md` → "버튼 위계")에도
같은 원칙(다크 = 중요 / 라이트 = 일반, 페이지당 중요 1개)이 기록되어 있다.
프로젝트별 모양(이 프로젝트는 둥근 사각, 브랜드북은 `.cta-btn`이 pill)은 다를 수 있으나
**색상 위계는 공통**.
