# 패키지 관리 가이드

이 문서는 `@kettle4ot/tailwind-class-sort` npm 패키지의 버전 관리 및 배포 방법을 설명합니다.

## Git과 npm의 관계

**중요**: `git push`만으로는 npm 패키지가 자동으로 배포되지 않습니다.

- **Git**: 소스 코드 버전 관리 (GitHub 저장소)
- **npm**: 패키지 배포 및 버전 관리 (npm 레지스트리)

두 저장소는 별개로 관리되며, npm에 배포하려면 `npm publish` 명령어를 별도로 실행해야 합니다.

## 버전 관리 규칙 (SemVer)

패키지 버전은 [Semantic Versioning](https://semver.org/lang/ko/) 규칙을 따릅니다:

- **패치 버전** (1.0.0 → 1.0.1): 버그 수정
- **마이너 버전** (1.0.0 → 1.1.0): 새 기능 추가 (하위 호환)
- **메이저 버전** (1.0.0 → 2.0.0): 호환성을 깨는 변경

## 배포 워크플로우

### 1. 코드 수정 및 커밋

```bash
# 코드 수정 후
git add .
git commit -m "기능 설명"
```

### 2. 버전 업데이트

`npm version` 명령어를 사용하면 다음이 자동으로 수행됩니다:
- `package.json`의 버전 자동 증가
- Git 커밋 생성 (예: "1.0.1")
- Git 태그 생성 (예: "v1.0.1")

```bash
# 패치 버전 업데이트 (버그 수정)
npm version patch

# 마이너 버전 업데이트 (새 기능)
npm version minor

# 메이저 버전 업데이트 (호환성 깨는 변경)
npm version major
```

### 3. Git에 푸시 (태그 포함)

```bash
# 일반 푸시
git push

# 태그도 함께 푸시
git push --follow-tags
# 또는
git push && git push --tags
```

### 4. npm에 배포

스코프 패키지(`@kettle4ot/tailwind-class-sort`)는 기본적으로 비공개이므로, 공개 배포 시 `--access public` 플래그가 필요합니다.

```bash
npm publish --access public
```

## 전체 워크플로우 예시

### 패치 버전 배포 (버그 수정)

```bash
# 1. 코드 수정 및 커밋
git add .
git commit -m "버그 수정: 클래스 정렬 로직 개선"

# 2. 버전 업데이트 (자동 커밋 및 태그 생성)
npm version patch

# 3. Git에 푸시
git push --follow-tags

# 4. npm에 배포
npm publish --access public
```

### 마이너 버전 배포 (새 기능)

```bash
# 1. 코드 수정 및 커밋
git add .
git commit -m "새 기능: 커스텀 정렬 규칙 지원"

# 2. 버전 업데이트
npm version minor

# 3. Git에 푸시
git push --follow-tags

# 4. npm에 배포
npm publish --access public
```

## 배포 전 확인사항

### 1. 배포될 파일 확인

```bash
npm pack --dry-run
```

이 명령어는 실제로 배포될 파일 목록과 패키지 크기를 보여줍니다.

### 2. package.json 확인

- `version`: 올바른 버전인지 확인
- `files`: 배포에 포함할 파일 목록 확인
- `bin`: CLI 명령어 경로 확인

### 3. 테스트

배포 전에 로컬에서 테스트:

```bash
# 로컬에서 패키지 빌드
npm pack

# 다른 프로젝트에서 테스트
npm install /path/to/tailwind-class-sort-1.0.0.tgz
```

## npm 인증

### 2FA (2단계 인증) 활성화

npm에서 패키지를 배포하려면 다음 중 하나가 필요합니다:

1. **2FA 활성화** (권장)
   - https://www.npmjs.com → Account Settings → Two-Factor Authentication
   - Authenticator 앱 또는 SMS로 활성화

2. **Granular Access Token 사용**
   - https://www.npmjs.com → Access Tokens → Generate New Token
   - Token type: Granular Token
   - Permissions: Automation 또는 Publish
   - 생성된 토큰으로 로그인

### 로그인 확인

```bash
# 현재 로그인 상태 확인
npm whoami

# 로그인 필요 시
npm login
```

## 버전 롤백

실수로 잘못된 버전을 배포한 경우:

### 1. npm에서 버전 삭제 (24시간 이내)

```bash
npm unpublish @kettle4ot/tailwind-class-sort@1.0.1
```

**주의**: 24시간 이내에만 가능하며, 다른 사람이 이미 설치한 경우 문제가 될 수 있습니다.

### 2. 새 버전으로 수정

```bash
# 버전 수정 후 재배포
npm version patch
npm publish --access public
```

## 자동화 (선택사항)

### package.json 스크립트 추가

`package.json`에 다음 스크립트를 추가하면 배포를 더 편리하게 할 수 있습니다:

```json
{
  "scripts": {
    "version:patch": "npm version patch && git push --follow-tags",
    "version:minor": "npm version minor && git push --follow-tags",
    "version:major": "npm version major && git push --follow-tags",
    "release:patch": "npm run version:patch && npm publish --access public",
    "release:minor": "npm run version:minor && npm publish --access public",
    "release:major": "npm run version:major && npm publish --access public"
  }
}
```

사용 예시:

```bash
# 버전 업데이트 + Git 푸시만
npm run version:patch

# 버전 업데이트 + Git 푸시 + npm 배포 (한 번에)
npm run release:patch
```

### CI/CD 자동화

GitHub Actions 등을 사용하면 `git push` 시 자동으로 배포할 수 있습니다. 자세한 내용은 GitHub Actions 문서를 참고하세요.

## 문제 해결

### 403 Forbidden 오류

```
npm error 403 Two-factor authentication or granular access token required
```

**해결**: npm 계정에 2FA를 활성화하거나 Granular Access Token을 생성하세요.

### 패키지 이름 충돌

```
npm error 403 Package name already exists
```

**해결**: 다른 패키지 이름을 사용하거나, 스코프 패키지(`@username/package-name`)를 사용하세요.

### 버전 이미 존재

```
npm error 403 You cannot publish over the previously published versions
```

**해결**: `package.json`의 버전을 더 높은 버전으로 업데이트하세요.

## 참고 자료

- [npm 공식 문서](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/lang/ko/)
- [npm 패키지 배포 가이드](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
