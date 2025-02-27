import { createGlobalStyle } from "styled-components";

const ResetCss = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, p, ul, ol, li, figure, blockquote {
    margin: 0;
    padding: 0;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button, input, textarea {
    font-family: inherit;
    border: none;
    outline: none;
    background: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default ResetCss;
