import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`
*, *::before, *::after { box-sizing: border-box; }
html, body, #root { height: 100%; }
body {
margin: 0;
font-family: system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", sans-serif;
color: ${({ theme }) => theme.colors.text};
background: ${({ theme }) => theme.colors.bg};
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
}
a { color: inherit; text-decoration: none; }
ul { list-style: none; padding: 0; margin: 0; }
button { font: inherit; }
`;