# Mimi English Study

영어회화 수업을 날짜별로 누적해서 복습하는 정적 웹사이트입니다.
GitHub Pages에 바로 배포할 수 있습니다.

## 파일 구조

```text
mimi-english-study/
├─ index.html
├─ styles.css
├─ app.js
├─ data/
│  └─ lessons.js
└─ lessons/
   └─ 2026-09-01.js
```

## 새 수업 추가 방법

### 1. lessons 폴더에 날짜 파일 추가

예:

```text
lessons/2026-09-02.js
```

기존 `2026-09-01.js`를 복사해서 내용만 바꾸면 됩니다.

### 2. data/lessons.js 에 수업 한 줄 추가

```js
window.LESSONS = [
  {
    date: "2026-09-02",
    label: "09.02",
    title: "Today's Topic",
    file: "./lessons/2026-09-02.js"
  },
  {
    date: "2026-09-01",
    label: "09.01",
    title: "Typhoon, Power Outage & Animals",
    file: "./lessons/2026-09-01.js"
  }
];
```

메뉴는 날짜를 기준으로 자동 생성되며 최신 수업이 위에 표시됩니다.

## GitHub Pages 배포

1. GitHub에서 새 repository 생성
2. 이 폴더 안의 파일 전체 업로드
3. Repository → Settings → Pages
4. Build and deployment에서 `Deploy from a branch`
5. Branch를 `main`, 폴더를 `/ (root)`로 선택
6. Save

이후 GitHub Pages 주소에서 사이트를 확인할 수 있습니다.
