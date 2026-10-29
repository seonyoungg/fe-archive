---
title: 경고 한 줄을 어디까지 따라가봐야 할 까
description: 빌드 중에 뜬 @astrojs/sitemap 경고를 따라가다가, site 옵션 하나가 없을 때 실제로 빠지는 것이 네 군데였다는 걸 확인한 기록.
presentation:
  session: 54
  part: 1
  date: 2026-10-29
  speaker: sy-park
  topics:
    - astro
  tags:
    - astro
    - seo
    - metadata
    - sitemap
    - canonical
    - open-graph
---

## 1. 경고 문구

```bash
00:00:55 [WARN] [@astrojs/sitemap] The Sitemap integration requires the `site` astro.config option. Skipping.
00:00:56 [build] Complete!
```

## 2. Sitemap

- 공식 문서 확인 결과: sitemap을 생성하려면 `site` 옵션이 필요하고, 그 값은 `http` 또는 `https`로 시작하는 주소여야 함

🔗 [Astro — Sitemap 통합 가이드](https://cloudflare-next.previews.docs.astro.build/ko/guides/integrations-guide/sitemap/)

🔗 전이의존성 [Transitive dependency](https://en.wikipedia.org/wiki/Transitive_dependency)

그런데 `package.json`에 sitemap 관련 패키지를 작성한 적이 없었습니다.
어디서 들어왔는지 확인해 봤습니다.

```bash
$ npm ls @astrojs/sitemap

fe-archive@0.0.1
└─┬ @astrojs/starlight@0.42.7
  └── @astrojs/sitemap@3.7.4
```

| 구분            | 내용                                                                     |
| --------------- | ------------------------------------------------------------------------ |
| **직접 의존성** | `package.json`에 우리가 적은 것 — `astro`, `@astrojs/starlight`, `sharp` |
| **전이 의존성** | sitemap은 **Starlight가 데려온 패키지**                                  |

→ `package.json`에 적은 건 3개뿐인데 `node_modules`에는 훨씬 많이 깔려 있음
→ **우리가 설정한 적도 없는 기능이 우리 빌드에서 돌아가고 있음**

## 3. Site를 넣으면 생기는 일

```js
// astro.config.mjs
export default defineConfig({
  site: 'https://fe-archive.netlify.app',
  integrations: [starlight({/* … */})],
});
```

**`dist` 폴더에 파일 두 개가 생겼습니다.**

```text
dist/
├─ sitemap-index.xml   ← 새로 생김
└─ sitemap-0.xml       ← 새로 생김
```

```xml
<!-- sitemap-index.xml -->
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://fe-archive.netlify.app/sitemap-0.xml</loc>
  </sitemap>
</sitemapindex>
```

**그리고 `head` 안에 태그 세 개가 생김**

```html
<link rel="canonical" href="https://fe-archive.netlify.app/" />
<link rel="sitemap" href="/sitemap-index.xml" />
<meta property="og:url" content="https://fe-archive.netlify.app/" />
```

| 생긴 것                                   | 경고가 알려줬나 |
| ----------------------------------------- | --------------- |
| `sitemap-index.xml`, `sitemap-0.xml` 파일 | 알려줌          |
| `<link rel="sitemap">`                    | 안 알려줌       |
| `<link rel="canonical">`                  | 안 알려줌       |
| `<meta property="og:url">`                | 안 알려줌       |

→ **고친 건 한 줄, 결과는 네 곳**
→ 경고 하나만 보고 지나갔으면 **나머지 세 개는 계속 비어 있었을 것**

## 4. 용어 정리

### 4.1. Canonical

🔗 [요즘IT — 캐노니컬 태그](https://yozm.wishket.com/magazine/detail/1420/)

🔗 [Canonical 태그 가이드](https://weekerp.com/ko/blog/canonical-tag-guide)

> 캐노니컬 태그는 한 페이지를 가리키는 여러 개의 주소가 존재할 때 검색 엔진의 로봇이 어떤 주소가 원본인지 알 수 있도록 하기 위해 사용하는 태그

```text
https://www.example.com/index.html
https://example.com/index.html?page=1
https://m.example.com/index.html
```

- 같은 페이지가 여러 주소로 열릴 수 있음
  - 사람 눈 (모두 같은 글)
  - 검색 엔진 눈 (주소가 다르므로 다른 글, 다른 페이지)
- 안 골라주면 어떻게 될까
  - 똑같은 내용이 여러 개 떠 있는 상태가 되고, **구글이 그중 하나를 골라** 검색 결과에 올림

**우리 사이트에서 실제로 생기는 변형**

| 상황                  | 주소                                                |
| --------------------- | --------------------------------------------------- |
| 기본                  | `fe-archive.netlify.app/archive/`                   |
| 슬래시 누락           | `fe-archive.netlify.app/archive`                    |
| PR 미리보기 배포      | `deploy-preview-3--fe-archive.netlify.app/archive/` |
| 커스텀 도메인 연결 후 | netlify 주소와 새 도메인이 둘 다 살아 있음          |

### 4.2. OG:Url

🔗 [The Open Graph protocol](https://ogp.me/)

🔗 [Open Graph 프로토콜 정리](https://issuemaker99.tistory.com/275)

> Open Graph(OG) 프로토콜은 웹페이지가 소셜 미디어(예: Facebook, Twitter, LinkedIn, KakaoTalk 등)에서 공유될 때, 어떻게 표시될지를 제어하는 메타 태그 규칙

제목, 설명, 이미지, 주소를 적습니다. **그중 주소 칸이 `og:url`입니다.**

**"링크를 이미 붙였는데 주소를 왜 또 적지?"**

| 구분                                | 실제로 복사되는 주소(예시)                              |
| ----------------------------------- | ------------------------------------------------------- |
| 주소창에서 그대로 복사              | `n.news.naver.com/article/008/0005433905?ntype=RANKING` |
| 카카오에서 복사                     | `n.news.naver.com/article/008/0005433905?lfrom=kakao`   |
| 사이트의 **공유하기 버튼**으로 복사 | `n.news.naver.com/article/008/0005433905`               |
| **단축링크**로 복사                 | `bit.ly/a1b2c3` (예시)                                  |

- 누르면 전부 같은 기사
- 소셜 플랫폼 눈에는 글자가 다른 주소 네 개

→ 크롤러는 **어느 주소로 들어왔든**, 긁어온 결과를 그 주소가 아니라 **`og:url`에 적힌 주소 아래에 보관.** 그래서 흩어진 네 개가 한 페이지로 모임

:::caution[og:url이 꼬리를 떼주는 건 아니다]
공유된 링크는 꼬리가 붙은 그대로고, 누르면 그 주소로 가게됨. 리다이렉트가 아님.
**주소가 같아지는 게 아니라, 플랫폼 장부에서 한 줄로 합쳐지는 것.**
:::

### 4.3. canonical 과 og:url 의 차이

🔗 [og:url — Why the Open Graph URL Tag Matters for Shares](https://ogimage.info/learn/missing-og-url)

| 태그            | 읽는 주체            | 하는 말                    |
| --------------- | -------------------- | -------------------------- |
| `rel=canonical` | **검색 엔진** 크롤러 | 어떤 URL을 색인할지        |
| `og:url`        | **소셜** 크롤러      | 공유를 어떤 URL에 귀속할지 |

:::note[og:url은 rel=canonical과 같은 의미인가요?]
일반적으로 두 속성은 동일한 값을 가지지만, 읽는 주체가 다릅니다.

`rel=canonical`은 검색 엔진에 색인을 생성할 URL을 알려주고, `og:url`은 소셜 플랫폼에 공유 시 어떤 URL에 귀속해야 하는지 알려줍니다. **검색 크롤러는 `og:url`을 읽지 않고, 소셜 크롤러는 `rel=canonical`을 읽지 않으므로**, 둘 중 하나만 설정하면 다른 주체가 무엇을 읽어야 할지 알 수 없습니다.
:::

### 4.4. canonical 과 og:url 의 공통점

| 읽는 쪽                     | 상황                                                                    |
| --------------------------- | ----------------------------------------------------------------------- |
| **브라우저**                | 지금 어느 주소에 있는지 이미 안다 → `/archive/`만 줘도 앞을 스스로 붙임 |
| **검색 엔진 · 소셜 크롤러** | HTML만 떼어 자기 서버로 가져간다 → 앞에 붙일 게 없어 반쪽 주소는 무의미 |

## 5. 경고가 하나만 뜬 이유

- 서로 다른 시점에, 다른 주체가 돌아감 → 한쪽이 다른 쪽 사정을 알 수 없음

```bash
00:00:53 [build] 9 page(s) built      ← 페이지가 이미 다 만들어짐
00:00:55 [WARN] [@astrojs/sitemap] …  ← 그 다음에 경고
00:00:56 [build] Complete!
```

|                       | 언제 돌아가나                                | `site`가 없으면                |
| --------------------- | -------------------------------------------- | ------------------------------ |
| **canonical, og:url** | 페이지를 하나씩 그릴 때 Starlight가 넣음     | 그냥 안 넣고 넘어감            |
| **sitemap**           | 페이지를 다 만든 뒤 한 번 돌면서 목록을 만듦 | 만들 수 없다고 **경고를 띄움** |

→ canonical과 og:url이 빠진 HTML은 **경고가 뜨기 전에 이미 다 써져 있었음**
→ "경고가 하나만 말했다"가 아니라 **경고를 띄울 수 있는 쪽이 하나뿐이었다**가 정확

:::tip
**경고의 개수는 문제의 개수가 아니다.** 말할 수 있는 쪽의 개수
:::

### 5.1. 경고에도 안 뜨는 것

- `twitter:card`도 올바른 태그고 값도 올바름
- `og:image`가 없는 것도 그 자체로는 오류가 아님
- 각각은 다 정상이고, **둘을 같이 놓았을 때만 이상함**

| 항목           | 값                                            | 적은 주체            |
| -------------- | --------------------------------------------- | -------------------- |
| `twitter:card` | `summary_large_image`                         | **Starlight 기본값** |
| `og:image`     | **없음** (보여줄 이미지가 지정되어 있지 않음) | 우리가 채우는 자리   |

**왜 아무도 안 잡을까**

| 문제의 종류        | 기계가 아는 이유                                   |
| ------------------ | -------------------------------------------------- |
| 문법이 틀렸다      | 글자가 규칙에 안 맞는다 → 읽다가 바로 걸림         |
| 필요한 값이 없다   | 빈칸이다 → 있나 없나만 보면 됨                     |
| 선언끼리 안 맞는다 | 둘 다 멀쩡하다. 기계는 "왜 그렇게 적었는지"를 모름 |

→ 5번이 "말할 수 있는 쪽이 하나뿐"이었다면, 여기는 **말할 수 있는 쪽이 아예 없는 경우**

#### 5.1.1. 짝을 이루는 두 값을 서로 다른 쪽이 담당

- Starlight 입장: 카드 형식을 기본값으로 정해뒀을 뿐, 이미지는 사용자가 넣을 몫
- 우리 입장: 애초에 그런 선언이 있는 줄도 몰랐음

→ 책임이 나뉘어 있어, 아무도 전체를 보지 않게 됨
→ 2번의 전이 의존성과 같은 구조. **우리가 적지 않은 것이 우리 사이트에서 돌아가고 있었음**

#### 5.1.2. 깨지지도 않음

- `og:image`가 없으면 소셜 플랫폼은 **이미지 없는 작은 카드**로 보여줌
- 에러도 안 나고 빈칸도 안 뜸 — 우리가 원한 모습이 아닐 뿐
  → 차라리 깨졌으면 알아챘을 것. **조용히 작아지니까 모르고 지냈다**

:::note
Starlight에서 `og:image`를 어떻게 지정하는지는 아직 확인 못 한 상태😂😂
:::

## 6. 마무리

## 참고

- [Astro — Sitemap 통합 가이드](https://cloudflare-next.previews.docs.astro.build/ko/guides/integrations-guide/sitemap/)
- [요즘IT — 캐노니컬 태그](https://yozm.wishket.com/magazine/detail/1420/)
- [Canonical 태그 가이드](https://weekerp.com/ko/blog/canonical-tag-guide)
- [The Open Graph protocol](https://ogp.me/)
- [Open Graph 프로토콜 정리](https://issuemaker99.tistory.com/275)
- [og:url — Why the Open Graph URL Tag Matters for Shares](https://ogimage.info/learn/missing-og-url)
- [전이 의존성 (Transitive dependency)](https://en.wikipedia.org/wiki/Transitive_dependency)
- 49회차 — [FE Study Archive 구축](/sessions/049/fe-study-archive/)
