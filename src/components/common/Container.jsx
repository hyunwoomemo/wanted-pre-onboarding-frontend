import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

const Container = ({ children, gap, position = "center" }) => {
  return (
    <Base gap={`${gap}rem`} position={position}>
      {children}
    </Base>
  );
};

const Base = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) =>
    gap
      ? css`
          ${gap}
        `
      : undefined};

  ${({ position }) =>
    position === "center"
      ? css`
          align-items: center;
        `
      : css`
          align-items: start;
        `}
`;

export default Container;
