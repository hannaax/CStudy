import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    vertical-align: middle;
    text-decoration: none;
  }
  
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  html {
    -webkit-overflow-scrolling: auto;
   font-size:62.5%
  }
  body {
    background-color: #fcfcfc;
    font-size: 16px;
  }
  ol, 
  ul,
  li {
    list-style: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button,
  input,
  a,
  textarea {
    font-family: 'Noto Sans CJK KR', sans-serif;
    /* font-size: 14px; */
  }
  button {
    cursor: pointer;
    background-color: transparent;
    border: none;
  }
  a:hover, a:visited, a:link, a:active
{
    text-decoration: none;
    color: #000;
  
}
`;
