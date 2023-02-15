import 'styled-components';

// 스타일 컴포넌트 테마 정의 확장
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
}
