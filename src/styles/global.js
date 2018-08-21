import { injectGlobal } from 'emotion'
import CustomFont from '../assets/fonts/31FF25_0_0.woff2'

injectGlobal`
  *, *:before, *:after {
    box-sizing: inherit;
  }
  html {
    background: #FAFAFA;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
    box-sizing: border-box;
    -ms-overflow-style: scrollbar;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  @font-face {
    font-family: "CustomFont";
    font-style: normal;
    font-weight: normal;
    src: local("CustomFont"), local("CustomFont"), url(${CustomFont}) format("ttf"), url(${CustomFont}) format("woff");
  }
  
  blockquote {
    font-style: italic;
    position: relative;
  }

  body, #___gatsby {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;

    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
  }
  .react-reveal {
    height: 100%;
  }
  .visible {
    oapcity: 1;
  }
  .hide {
    opacity: 0;
  }
  .gatsby-image-outer-wrapper {
    width: 100%;
  }
`
