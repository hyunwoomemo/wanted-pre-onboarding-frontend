import styled from "@emotion/styled";
import React from "react";

const Layout = ({ children }) => {
  return <Base>{children}</Base>;
};

const Base = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  box-sizing: border-box;
`;

export default Layout;
