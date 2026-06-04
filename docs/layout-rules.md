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
