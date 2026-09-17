---
title: FE Study Archive 가이드
description: Fe Study Archive 활용 가이드
---

> 발표 기록을 추가하거나 사이트를 수정할 때 지키는 약속입니다. 이름을 일정하게 지어두면 사이드바 순서, URL, 검색, 통계가 모두 깔끔하게 유지됩니다.

## 한눈에 보기

| 대상      | 규칙                 | 예시                                           |
| --------- | -------------------- | ---------------------------------------------- |
| 회차 폴더 | 세 자리 숫자         | `049/`                                         |
| 발표 파일 | 영문 소문자 + 하이픈 | `fe-study-archive.md`                          |
| 멤버 ID   | `이름이니셜-성`      | `sy-park`                                      |
| 주제 ID   | 영문 소문자 + 하이픈 | `study-archive`                                |
| 브랜치    | `종류/내용`          | `docs/049-sy-park`                             |
| 커밋      | `종류: 설명`         | `docs: 49회차 FE Study Archive 구축 발표 기록` |

---

## 1. 발표 기록 파일

### 위치

```
src/content/docs/sessions/<회차 세 자리>/<발표-slug>.md
```

- 회차 폴더는 **세 자리**로 씁니다. `49/`가 아니라 `049/`입니다.
- 발표 1개 = 파일 1개입니다. 같은 회차의 두 발표자는 같은 폴더에 각자 파일을 만듭니다.

### 파일 이름(slug)

파일 이름이 곧 URL이 됩니다. `049/fe-study-archive.md` → `/sessions/049/fe-study-archive/`

- **영문 소문자, 숫자, 하이픈(`-`)만** 사용합니다.
- 발표 주제를 2~5개 단어로 요약합니다.
- 회차 번호, 날짜, 발표자 이름은 넣지 않습니다. 폴더와 frontmatter에 이미 있습니다.

| 좋은 예                      | 피할 예                      | 이유                                    |
| ---------------------------- | ---------------------------- | --------------------------------------- |
| `react-server-components.md` | `React Server Components.md` | 대문자와 공백은 URL이 지저분해집니다    |
| `next-cache.md`              | `넥스트캐시.md`              | 한글은 URL에서 `%EB%84...`로 바뀝니다   |
| `browser-rendering.md`       | `049-sy-park-browser.md`     | 회차와 발표자는 다른 곳에 이미 있습니다 |

<!-- ### 이미지

발표 파일과 **같은 회차 폴더**에 두고, 파일 이름은 `<발표-slug>-<설명>.png` 형식으로 짓습니다.

```
src/content/docs/sessions/049/
├── fe-study-archive.md
└── fe-study-archive-example.png
```

본문에서는 상대 경로로 넣고, 대체 텍스트를 꼭 씁니다.

```md
![fe-study-example이미지](./fe-study-archive-example.png)
``` -->

---

## 2. frontmatter

```yaml
---
title: FE Study Archive 구축
description: 노션으로 쌓아온 스터디 기록을 Git + Markdown + Astro로 직접 아카이브해보기
presentation:
  session: 49
  date: 2026-09-17
  speaker: sy-park
  topics: [astro]
  tags: [Astro, Starlight, Islands]
---
```

| 항목           | 규칙                                                          |
| -------------- | ------------------------------------------------------------- |
| `title`        | 발표 제목. 한글 가능                                          |
| `description`  | 한 문장 요약. 검색 결과와 링크 미리보기에 쓰입니다            |
| `presentation` | 아래 항목은 **반드시 두 칸 들여쓰기**                         |
| `session`      | 숫자. **폴더와 달리 0을 붙이지 않습니다** (`049` 아니고 `49`) |
| `date`         | `YYYY-MM-DD` 형식                                             |
| `speaker`      | `src/data/members.yaml`에 있는 멤버 ID                        |
| `topics`       | `src/data/topics.yaml`에 있는 주제 ID. 1~3개                  |
| `tags`         | 자유롭게 적되 **공식 표기**를 따릅니다. 5개 안팎              |

- `tags` 표기 예시: `React`, `TypeScript`, `Next.js`, `CSS`
  (`react`, `타입스크립트`, `nextjs`처럼 섞어 쓰지 않습니다)

---

## 3. ID 규칙

ID는 URL과 데이터 연결에 쓰이므로 **한 번 정하면 바꾸지 않습니다.**

### 멤버 ID (`src/data/members.yaml`)

- 형식: `이름이니셜-성` (예: `sy-park`, `yj-choi`)
- 이미 정해진 ID(`yj-jeong`, `ws-jeong` 등)는 형식과 달라도 그대로 씁니다.

### 주제 ID (`src/data/topics.yaml`)

- 영문 소문자와 하이픈만 사용합니다.
- 점(`.`)은 빼고 붙여 씁니다: `Next.js` → `nextjs`
- 여러 단어는 하이픈으로 잇습니다: `Web Performance` → `web-performance`
- 화면에 보이는 공식 표기는 `name`에 적습니다.

---

## 4. 브랜치(예정)

```
<종류>/<내용>
```

| 종류       | 언제                            | 예시                          |
| ---------- | ------------------------------- | ----------------------------- |
| `docs`     | 발표 기록 추가·수정             | `docs/049-sy-park`            |
| `feat`     | 새 기능, 새 페이지, 새 컴포넌트 | `feat/topic-pages`            |
| `fix`      | 버그, 깨진 링크, 잘못된 표시    | `fix/sidebar-order`           |
| `refactor` | 동작은 같고 코드 구조만 변경    | `refactor/presentation-utils` |
| `chore`    | 설정, 의존성, 빌드              | `chore/upgrade-astro`         |

- 발표 기록 브랜치는 `docs/<회차>-<멤버 ID>`로 짓습니다.
  같은 회차의 두 발표자가 동시에 작업해도 이름이 겹치지 않습니다.
- 소문자와 하이픈만 사용합니다.

---

## 5. 커밋 메시지

```
<종류>: <무엇을 했는지 한국어로>
```

종류는 브랜치와 같습니다(`docs`, `feat`, `fix`, `refactor`, `chore`).

```
docs: 49회차 FE Study Archive 구축 발표 기록
feat: 주제별 발표 목록 페이지 추가
fix: 사이드바 회차 정렬 오류 수정
chore: Astro 7.4로 업그레이드
```

- 설명은 "~추가", "~수정"처럼 **무엇을 했는지**로 끝냅니다.
- 한 커밋에는 한 가지 일만 담습니다.

---
