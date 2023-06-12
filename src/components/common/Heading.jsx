import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

const Heading = ({ children, ...resProps }) => {
  return <Base {...resProps}>{children}</Base>;
};

const Base = styled.div`
  font-weight: bold;

  ${({ size }) =>
    size === "large"
      ? css`
          font-size: 24px;
        `
      : size === "medium"
      ? css`
          font-size: 20px;
        `
      : css``}
`;

export default Heading;
