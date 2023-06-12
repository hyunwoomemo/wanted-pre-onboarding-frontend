import { Global, css } from "@emotion/react";
import React from "react";

const defaultStyle = css`
  html,
  body,
  ul {
    margin: 0;
    padding: 0;
  }
`;

const GlobalStyle = () => {
  return <Global styles={defaultStyle}></Global>;
};

export default GlobalStyle;
