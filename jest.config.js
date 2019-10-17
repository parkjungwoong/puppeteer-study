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



