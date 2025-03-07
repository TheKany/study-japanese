import { createGlobalStyle } from "styled-components";

const NormalizeCss = createGlobalStyle`
  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    background-color: #c8c4c41c;
  }

  
  input,
  textarea {
    -webkit-appearance: none;
    appearance: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    border-style: none;
    max-width: 100%;
    height: auto;
  }

  button, input, textarea {
    font-family: inherit;
    background: none;
    border: none;
    outline: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

export default NormalizeCss;
