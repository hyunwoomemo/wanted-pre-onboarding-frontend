import styled from "@emotion/styled";
import React from "react";

const Form = ({ children }) => {
  return <Base>{children}</Base>;
};

const Base = styled.form`
  display: flex;
  gap: 1rem;
`;

export default Form;
