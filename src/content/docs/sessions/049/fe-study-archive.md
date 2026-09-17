---
title: FE Study Archive 구축
description: 노션으로 쌓아온 스터디 기록을 Git + Markdown + Astro로 직접 아카이브해보기
presentation:
  session: 49
  date: 2026-09-17
  speaker: sy-park
  topics: [astro]
  tags: [Astro, Starlight, SSG, Notion]
---

## 발표 요약

48회차까지 노션으로 관리해 온 스터디 기록을 앞으로 어떻게 관리하면 좋을지 고민해보고,
**Git + Markdown + Astro(Starlight)** 를 이용해 직접 스터디 아카이브 사이트를 만들어보기로 했습니다.

이번 발표에서는 단순히 "Astro를 사용해 사이트를 만들었습니다"가 아니라,

- 왜 기존 노션 방식에서 다른 방법을 고민하게 되었는지
- 여러 가지 선택지 중 Astro + Starlight를 선택한 이유
- Next.js를 주로 사용해 온 입장에서 Astro가 어떻게 다르게 느껴졌는지
- hydration 같은 Astro의 기초 개념
- 실제 아카이브 사이트를 어떤 구조로 설계하고, 어떤 약속으로 함께 관리할지

를 중심으로 공유했습니다.

:::note
이번 발표는 기초 위주로 간단히 정리했습니다.
Islands Architecture와 Content Collections의 자세한 내용은 다음 발표에서 다룰 예정입니다.
:::

---

## 1. 왜 스터디 아카이브를 만들게 되었을까?

우리 스터디는 매주 2명씩 발표하면서 지금까지 48회차를 진행했습니다.

처음에는 노션으로 기록하는 것이 가장 편했습니다.
작성하고 공유하기 쉽고, 별도의 개발 환경도 필요하지 않았기 때문입니다.

그런데 회차가 계속 쌓이다 보니 조금씩 아쉬운 점이 생겼습니다.

| 고민             | 내용                                                          |
| ---------------- | ------------------------------------------------------------- |
| 찾기 어려움      | 회차가 많아질수록 원하는 발표 내용을 찾기 어려워짐            |
| 모아 보기 어려움 | 발표자나 주제별로 기록을 모아서 보기 어려움                   |
| 활용하기 어려움  | 기록을 추가하는 것 외에, 기록을 활용하는 기능을 만들기 어려움 |
| 오래 남기기      | 스터디가 끝난 뒤에도 계속 남겨둘 수 있는 구조가 필요함        |

결국 "기록을 잘하는 것"에서 한 단계 더 나아가
**스터디 기록 자체를 하나의 프론트엔드 프로젝트로 만들어보면 어떨까?**라는 생각에서 시작했습니다.

---

## 2. 어떤 방법이 있을까?

처음부터 Astro를 정해놓고 시작한 것은 아니었습니다.

지금 쓰는 노션, 평소 익숙한 Next.js, 새로 배울 Astro를 비교해봤습니다.

| 방법                         | 콘텐츠 관리        | 목록·통계 자동화   | 유지 부담       | 학습 가치 |
| ---------------------------- | ------------------ | ------------------ | --------------- | --------- |
| 노션 유지                    | 가장 쉬움          | 일부 가능          | 거의 없음       | 낮음      |
| Next.js + MDX                | Markdown + Git     | 직접 구현          | 문서 UI도 직접  | 높음      |
| **Astro + Starlight (선택)** | **Markdown + Git** | **빌드할 때 계산** | **비교적 낮음** | **높음**  |

우리에게 중요했던 건 크게 세 가지였습니다.

1. **기록을 쉽게 추가할 수 있을 것**
2. **나중에 데이터를 활용할 수 있을 것**
3. **만드는 과정 자체가 프론트엔드 공부가 될 것**

이 기준으로 봤을 때 Astro + Starlight가 가장 잘 맞았습니다.

---

## 3. 왜 Astro + Starlight였을까?

### 3.1 문서 사이트에 필요한 기능이 이미 있다

Starlight를 사용하면 문서 사이트에 필요한 기본 기능을 갖춘 상태에서 시작할 수 있습니다.

사이드바, 목차, 검색, 다크 모드, SEO 관련 기능 등을 처음부터 직접 만들 필요가 없습니다.

즉, **문서 사이트를 만드는 것 자체보다 콘텐츠 구조와 우리가 필요한 기능에 집중할 수 있다는 점**이 좋았습니다.

### 3.2 콘텐츠를 데이터처럼 다룰 수 있다

Markdown 파일을 단순한 텍스트 파일로만 사용하는 것이 아니라
frontmatter와 Content Collections를 이용해 일정한 구조의 데이터처럼 관리할 수 있습니다.

예를 들어 발표자, 회차, 날짜, 주제 등을 정해진 형식으로 관리할 수 있습니다.

### 3.3 유지보수가 비교적 단순하다

이번 프로젝트에서는 별도의 서버나 데이터베이스를 운영하지 않습니다.

Markdown 파일을 Git으로 관리하고, 빌드해서 정적인 사이트로 배포하는 구조입니다.

그래서 스터디가 끝난 뒤에도 별도의 서버를 계속 관리해야 하는 부담이 적습니다.

### 3.4 새로운 프론트엔드 개념을 경험할 수 있다

평소 Next.js를 주로 사용하는 방식에서 **필요한 곳에만 JavaScript를 보낸다**는 Astro의 접근 방식이
React 기반 프레임워크와 어떻게 다른지 직접 확인할 수 있습니다.

---

## 4. Astro와 Next.js는 무엇이 다를까?

둘 다 SSG와 SSR을 지원하기 때문에 처음에는 비슷하게 느껴질 수 있습니다.

하지만 **기본값**이 서로 반대입니다.

| 항목               | Next.js                            | Astro                                          |
| ------------------ | ---------------------------------- | ---------------------------------------------- |
| 출발점             | React 애플리케이션                 | HTML 문서                                      |
| 브라우저로 가는 JS | React 런타임과 클라이언트 컴포넌트 | `client:*`를 붙인 컴포넌트만                   |
| UI 프레임워크      | React                              | 없어도 됨. 필요하면 React, Vue, Svelte 중 선택 |
| 잘 맞는 곳         | 로그인, 대시보드 같은 앱           | 문서, 블로그, 아카이브                         |

### Next.js

Next.js에서는 React 컴포넌트를 중심으로 페이지를 구성합니다.

상호작용이 없는 컴포넌트라도 React 트리 안에서 페이지를 구성하고, 필요한 경우 서버 컴포넌트와 클라이언트 컴포넌트를 구분해서 사용합니다.
페이지에는 React 런타임이 함께 전송됩니다.

### Astro

Astro는 **HTML을 기본으로 생각합니다.**

정적인 콘텐츠는 HTML로 렌더링하고, 실제로 JavaScript가 필요한 컴포넌트에만 `client:*` 지시어를 사용해 브라우저에서 동작하도록 만들 수 있습니다.

그래서 Astro를 공부하면서 자연스럽게

**"이 UI에 정말 JavaScript가 필요한가?"**

라는 질문을 하게 됩니다.

---

## 5. hydration은 무엇일까?

React를 사용하면서도 자주 접했던 개념이지만, 이번에 Astro를 공부하면서 hydration을 조금 더 명확하게 이해하게 되었습니다.

서버에서 HTML이 만들어져 브라우저에 전달되었다고 해서
그 HTML이 바로 React 애플리케이션처럼 동작하는 것은 아닙니다.

브라우저에서 JavaScript가 실행되면서 기존 HTML에 이벤트와 상태 등을 연결해주는 과정이 hydration입니다.

Astro에서는 이 hydration을 컴포넌트마다 선택적으로 적용할 수 있습니다.

| 지시어           | 동작 시점                            | 예시                           |
| ---------------- | ------------------------------------ | ------------------------------ |
| 없음             | hydration하지 않음                   | 대부분의 정적 콘텐츠           |
| `client:load`    | 페이지 로드 직후                     | 바로 사용해야 하는 UI          |
| `client:idle`    | 브라우저가 한가해진 후               | 급하지 않은 위젯               |
| `client:visible` | 화면에 나타났을 때                   | 스크롤 아래의 인터랙션         |
| `client:media`   | 미디어 조건이 맞을 때                | 모바일 전용 UI                 |
| `client:only`    | 서버 렌더링 없이 브라우저에서만 실행 | `window` 등이 반드시 필요한 UI |

:::caution[React 컴포넌트를 쓴다고 자동으로 동작하지 않습니다]
Astro에서 React 컴포넌트를 `client:*` 없이 사용하면 서버에서 HTML로만 렌더링됩니다.
버튼을 눌러도 아무 일도 일어나지 않으므로, 브라우저에서 동작해야 하는 컴포넌트에는 반드시 `client:*`를 지정해야 합니다.
:::

### 우리 사이트에서 JS가 필요한 곳

| 기능             | 방법                                                    | 상태                |
| ---------------- | ------------------------------------------------------- | ------------------- |
| 검색             | Starlight에 내장된 Pagefind 사용                        | 이미 있음           |
| 태그·발표자 필터 | 필요해지면 React 컴포넌트 + `client:visible`            | 필요할 때 (Phase 4) |
| 그 밖의 모든 것  | 회차 목록, 통계, 발표 본문을 빌드할 때 정적 HTML로 생성 | JS 없음             |

---

## 6. Islands Architecture (추가 예정)

페이지 전체를 하나의 큰 JavaScript 애플리케이션으로 보는 대신,
**정적인 HTML을 기본으로 만들고, 상호작용이 필요한 부분만 작은 Island로 만드는 방식**입니다.

앞에서 본 hydration이 바로 이 Island를 동작하게 만드는 과정입니다.

:::note[추가 예정]
Islands Architecture의 자세한 내용은 다음 발표에서 정리해 추가하겠습니다.
:::

---

## 7. Starlight는 무엇을 해주는가?

Starlight는 Astro를 기반으로 한 문서 사이트용 통합(integration)입니다.

문서 사이트를 만들면서 필요한

- 문서 레이아웃
- 사이드바
- 목차
- 검색
- 다크 모드
- SEO 관련 기본 설정

등을 제공해줍니다.

```js title="astro.config.mjs"
export default defineConfig({
  integrations: [
    starlight({
      title: 'FE Study Archive',
      defaultLocale: 'root',
      locales: { root: { label: '한국어', lang: 'ko' } },
      sidebar: [
        {
          label: '시작하기',
          items: [
            { label: 'Archive 이해하기', slug: 'guides' },
            { label: '스터디 소개', slug: 'guides/about' },
          ],
        },
        {
          label: '스터디 회차',
          items: [{ autogenerate: { directory: 'sessions', collapsed: true } }],
        },
      ],
    }),
  ],
});
```

덕분에 우리가 직접 문서 사이트의 기본 UI를 만드는 대신
**스터디 기록을 어떻게 구조화하고 보여줄 것인지에 집중할 수 있었습니다.**

또한 `src/content/docs/`에 Markdown 파일을 추가하면 문서 페이지로 연결되는 구조라서 스터디 기록을 추가하기에도 잘 맞았습니다.
프로젝트에 `src/pages/` 폴더가 없어도 페이지가 생기는 이유는, Starlight가 이 파일들을 페이지로 만드는 라우트를 대신 추가해 주기 때문입니다.

:::tip
사이드바의 `slug`는 `src/content/docs/` 기준 경로에서 확장자를 뺀 값입니다.
`guides/index.md`처럼 `index` 파일은 폴더 이름이 slug가 됩니다. (`guides/index`가 아니라 `guides`)
:::

---

## 8. Content Collections

콘텐츠에 **규칙(스키마)** 을 정해두는 Astro 기능입니다.
코드의 타입 검사를 Markdown에 적용한다고 생각하면 쉽습니다.

```yaml
presentation:
  session: 49
  date: 2026-09-17
  speaker: sy-park
  topics: [astro]
```

예를 들어 `session`은 숫자, `date`는 날짜, `speaker`와 `topics`는 목록에 있는 ID여야 한다고 정해두면,
규칙에 맞지 않는 기록이 있을 때 **배포 전에 빌드가 멈춥니다.**

:::note[추가 예정]
자세한 내용은 다음 발표에서 정리하겠습니다.
:::

---

## 9. Markdown과 MDX

| 형식             | 특징                                       | 우리 사이트에서                     |
| ---------------- | ------------------------------------------ | ----------------------------------- |
| Markdown (`.md`) | 텍스트와 frontmatter만 사용                | 발표 기록, 스터디 소개              |
| MDX (`.mdx`)     | Markdown 안에서 컴포넌트를 import해서 사용 | 홈 화면, 코드 비교, 인터랙티브 데모 |

MDX 안의 Astro 컴포넌트도 빌드할 때 HTML이 됩니다. JavaScript가 필요할 때만 `client:*`를 붙입니다.

컴포넌트가 필요 없는 발표 기록은 `.md`로 쓰는 편이 단순하고 안전합니다.
MDX에서는 `{ }`와 `<`가 문법으로 해석되기 때문입니다.

---

## 10. 빌드하면 무엇이 남을까?

`npm run build`를 실행하면 모든 페이지가 **요청 전에 완성된 HTML 파일**로 만들어집니다. (Static Site Generation)

```text
dist/
├── index.html
├── guides/index.html
├── guides/about/index.html
├── sessions/049/fe-study-archive/
│   └── index.html
├── _astro/              # CSS와 JS
├── pagefind/            # 검색 인덱스
└── sitemap-index.xml    # SITE_URL을 설정했을 때
```

`_astro/`의 JavaScript는 검색, 목차, 코드 복사 같은 Starlight 기본 기능용입니다.
**우리가 직접 작성한 JavaScript도, React 런타임도 없습니다.**

---

## 11. 발표 기록은 어떻게 관리할까?

이번 프로젝트에서는 **발표 1개를 Markdown 파일 1개로 관리**하기로 했습니다.

매주 발표자가 2명이기 때문에 한 회차에 발표 기록이 2개씩 생깁니다.

구조는 다음과 같이 생각하고 있습니다.

```text
src/
└── content/
    └── docs/
        └── sessions/
            ├── 048/
            │   ├── topic-a.md
            │   └── topic-b.md
            └── 049/
                └── fe-study-archive.md
```

회차 폴더는 `049`처럼 세 자리 숫자로 관리합니다.

파일이나 폴더 이름이 문자열 기준으로 정렬될 때

`1 → 10 → 11 → 2`

처럼 정렬되는 문제를 피하기 위해서입니다.

---

## 12. 멤버와 주제는 사전으로 관리하기

발표자와 주제는 Markdown 파일마다 이름을 직접 적는 대신 **ID**를 사용합니다.
실제 이름이나 설명은 `src/data/` 폴더의 YAML 파일에서 관리합니다.

```yaml title="src/data/members.yaml (11명)"
- id: sy-park
  name: 박선영
- id: yj-choi
  name: ...
```

```yaml title="src/data/topics.yaml (15개)"
- id: astro
  name: Astro
  description: Islands, 콘텐츠 컬렉션, 정적 사이트 생성 등 Astro 전반
```

데이터베이스로 비유하면 두 파일은 **테이블**이고, 발표 기록의 `speaker`와 `topics`는 그 테이블을 가리키는 **외래 키**입니다.

이렇게 하면

- 표시 이름을 바꿀 때 사전 한 곳만 고치면 모든 페이지에 반영되고
- 특정 발표자의 발표 목록, 발표 횟수
- 주제별 발표 목록

등을 데이터 기반으로 만들 수 있습니다.

Phase 2 구조로 미리 실험해 보니, `src/pages/members/[member].astro` 파일 하나로 **멤버 11명의 페이지**(`/members/sy-park/` 등)가 만들어졌습니다.
`getStaticPaths()`가 멤버 목록을 읽어 만들 페이지를 정하기 때문입니다.

주제는 스펙의 13개에 **Astro**와 **extra**를 더해 15개입니다.
맞는 주제가 없을 때만 `extra`를 쓰고, 같은 분야가 반복해서 등장하면 새 주제로 추가합니다.

:::note
ID는 URL과 데이터 연결에 쓰이므로 **한 번 정하면 바꾸지 않습니다.**
저장소를 공개하면 멤버 파일도 공개되므로, 공개해도 되는 정보만 넣습니다.
:::

---

## 13. 콘텐츠와 화면을 분리하기

### 우리가 직접 작성하는 것

```text
src/content/docs/
```

→ 실제 스터디 발표 기록, 스터디 소개, 홈 화면
(`/`, `/guides/`, `/guides/about/`, `/sessions/049/fe-study-archive/`)

### 데이터를 이용해 만들어지는 것

```text
src/pages/
```

→ 주제별 목록(`/topics/astro/`), 멤버별 목록(`/members/sy-park/`) 등

홈 화면과 회차 목록 페이지는 `src/content/docs/`의 MDX 파일 안에 컴포넌트를 넣고,
그 컴포넌트가 빌드할 때 발표 데이터를 읽어 최신 발표와 통계를 보여주도록 만들 예정입니다.

즉,

**"기록하는 페이지"와 "기록을 활용해서 보여주는 페이지"를 분리**

하는 구조입니다.

이렇게 해두면 나중에 새로운 기능을 추가하더라도 기존 발표 기록을 수정하지 않고 데이터를 활용해 새로운 화면을 만들 수 있습니다.

---

## 14. 새 발표를 추가하는 방법

새로운 발표가 있을 때는 최대한 단순하게 만들려고 합니다.

### ① Markdown 파일 추가

```text
src/content/docs/sessions/050/react-server-components.md
```

### ② frontmatter 작성

회차, 날짜, 발표자, 주제 등의 정보를 입력합니다.
`presentation` 아래 항목은 반드시 두 칸 들여쓰기를 해야 합니다.

### ③ 빌드로 확인

```bash
npm run build
```

Content Collections의 규칙에 맞지 않는 값이 있으면 빌드 단계에서 오류를 확인할 수 있습니다.

### ④ 브랜치에서 커밋하고 PR 올리기

```bash
git switch -c docs/050-sy-park
git add src/content/docs/sessions/050
git commit -m "docs: 50회차 React Server Components 발표 기록 추가"
git push -u origin docs/050-sy-park
```

Git이 익숙하지 않은 사람은 GitHub 웹에서도 파일을 추가하고 PR을 만들 수 있습니다.

### ⑤ Merge

---

## 15. 함께 쓰기 위한 이름짓기 약속

여러 명이 같은 저장소에 기록을 올리기 때문에 이름 규칙을 정했습니다.
전체 규칙은 저장소의 `CONTRIBUTING.md`에 있고, PR을 만들면 확인 목록이 자동으로 채워집니다.

| 대상                  | 규칙                     | 예시                          |
| --------------------- | ------------------------ | ----------------------------- |
| 회차 폴더             | 세 자리 숫자             | `049/`                        |
| frontmatter `session` | 0을 붙이지 않은 숫자     | `49`                          |
| 발표 파일 이름        | 영문 소문자와 하이픈     | `fe-study-archive.md`         |
| 멤버·주제 ID          | 한 번 정하면 바꾸지 않기 | `sy-park`, `astro`            |
| 브랜치                | `docs/<회차>-<멤버 ID>`  | `docs/049-sy-park`            |
| 커밋 메시지           | `종류: 한 일`            | `docs: 49회차 발표 기록 추가` |

:::caution
가장 헷갈리는 곳: **폴더 이름은 `049`, frontmatter의 `session`은 `49`** 입니다.
:::

---

## 16. 2026년 9월 기준 버전과 주의할 점

| 도구       | 버전 | 알아둘 것                                               |
| ---------- | ---- | ------------------------------------------------------- |
| Astro      | 7.3  | Node.js 22.12 이상이 필요합니다                         |
| Starlight  | 0.42 | 0.41부터 Astro 7 전용입니다                             |
| TypeScript | 6.0  | 7이 나왔지만 `@astrojs/check`가 아직 6까지만 지원합니다 |

Starlight 0.39부터 사이드바 `autogenerate` 문법이 바뀌었습니다.
오래된 블로그 예제를 그대로 따라 하면 빌드 오류가 나므로 주의합니다.

```js
items: [{ autogenerate: { directory: 'sessions' } }];
```

---

## 17. 앞으로 어떻게 만들어갈까?

처음부터 모든 기능을 만들기보다는 필요한 것부터 단계적으로 추가하려고 합니다.

| 단계    | 내용                                                 | 일정        |
| ------- | ---------------------------------------------------- | ----------- |
| Phase 1 | Astro + Starlight 초기 설정, TypeScript, 한국어 설정 | 완료        |
| Phase 2 | 발표 스키마, 멤버·주제 컬렉션, 목록 페이지, 홈 통계  | 9/23 ~ 9/25 |
| Phase 3 | 색상·글꼴, 발표 카드, 홈 화면 디자인                 | 예정        |
| Phase 4 | 검색 및 태그 필터                                    | 예정        |
| Phase 5 | Vercel 또는 Cloudflare Pages 배포, CI 구성           | 예정        |
| Phase 6 | 실제 사용하면서 필요한 기능 추가                     | 필요할 때   |

중요한 건 처음부터 완성된 서비스를 만드는 것이 아니라,

**스터디에서 실제로 사용해보고 불편한 부분을 발견하면 하나씩 개선하는 것**

을 목표로 하고 있습니다.

---

## 참고자료

- [Astro 공식 문서 - Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro 공식 문서 - Framework Components](https://docs.astro.build/en/guides/framework-components/)
- [Starlight 공식 문서](https://starlight.astro.build/)
- [Starlight - Frontmatter Reference](https://starlight.astro.build/reference/frontmatter/)
