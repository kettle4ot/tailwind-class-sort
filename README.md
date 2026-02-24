# tailwind-class-sort

Tailwind CSS 클래스 문자열을 지정한 순서로 정렬하는 CLI 도구입니다.  
프로젝트 루트에 `tailwind-class-order.config.js` 를 두면 해당 설정을 사용하고, 없으면 내장 기본 순서를 사용합니다.

## 설치

```bash
npm install -D tailwind-class-sort
```

또는 매번 실행만 할 경우 (배포 후):

```bash
npx tailwind-class-sort --dir src
```

## 사용법

```bash
# 문자열 정렬 결과만 출력
npx tailwind-class-sort "flex p-4 bg-white"

# 디렉터리 내 파일들의 className / cn() 정렬 (기본: src)
npx tailwind-class-sort --dir src
npx tailwind-class-sort --dir app

# 특정 파일만 정렬
npx tailwind-class-sort --file src/App.tsx
```

## 커스텀 순서

프로젝트 루트에 `tailwind-class-order.config.js` 를 두고 `CLASS_CATEGORY_ORDER`, `MODIFIER_ORDER` 를 export 하면 이 설정이 적용됩니다.  
형식은 이 저장소의 `default-config.js` 를 참고하면 됩니다.

## 라이선스

MIT
