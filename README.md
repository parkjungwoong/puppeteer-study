# puppeteer study

## 목차
- [개발환경 구성](#개발환경-구성)

## 개발환경 구성
- 디렉토리 생성, npm 구성
```
디렉토리 생성
gulp-simple/
   ├─ src/
   └─ dist/
   
# 프로젝트 root에서 실행  
npm init
```
- gulp, typescript 의존성 설치
```
# gulp-cli 없으면 글로벌로 설치
npm install -g gulp-cli

# 프로젝트 root에서 실행 typescript, gulp, gulp-typescript 의존성 설치
npm install --save-dev typescript gulp gulp-typescript
```
- tsconfig.json 생성
```
#root 디렉토리에 tsconfig.json 생성
{
  "files": [
    "src/*.ts"
  ],
  "compilerOptions": {
    "target": "es5",
    "sourceMap": false
  },
  "exclude": [
    "node_modules"
  ]
}
```
- gulpfile.js 생성
```
#root 디렉토리에 gulpfile.js 생성
var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});
```

- 노드 버전 설정
```
nvm 설치

프로젝트 내 노드 버전 명시
```
- puppeteer 의존성 설치
```
npm install puppeteer
```
- jest, 단위 테스트 의존성 설치
```
npm install --save-dev jest ts-jest @types/jest

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testMatch: [
    "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
  ],
  moduleFileExtensions: [
    "ts", "js"
  ],
  globals: {
    "ts-jest": {
      "diagnostics": false //컴파일 에러 무시 옵션 true로 하면 컴파일 오류시 테스트 불통
    }
  }
};
```


