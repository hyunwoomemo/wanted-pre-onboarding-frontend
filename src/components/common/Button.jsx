import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

const Button = ({ event, children, disabled, data, size = "medium" }) => {
  return (
    <Base size={size} onClick={event} data-testid={data} disabled={disabled}>
      {children}
    </Base>
  );
};

const Base = styled.button`
  background-color: #376db5;
  padding: 7px 15px;
  color: #fff;
  border: 0;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: gray;
  }

  &:hover {
    background-color: #196edd;
  }

  ${({ size }) =>
    size === "small"
      ? css`
          padding: 5px 10px;
          font-size: 12px;
        `
      : undefined}
`;

export default Button;
