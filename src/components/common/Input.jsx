import styled from "@emotion/styled";
import React from "react";

const Input = ({ placeholder, type, onChange, data, value }) => {
  return <Base type={type} value={value} data-testid={data} placeholder={placeholder} onChange={onChange} />;
};

const Base = styled.input``;

export default Input;
