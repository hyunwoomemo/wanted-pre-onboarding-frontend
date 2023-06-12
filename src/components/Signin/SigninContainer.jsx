import React from "react";
import { Signin } from "./Signin";
import Container from "../common/Container";
import styled from "@emotion/styled";

const SigninContainer = () => {
  return (
    <Signin>
      <Container gap={2}>
        <Signin.Heading>로그인</Signin.Heading>
        <Signin.EmailInput />
        <Signin.PasswordInput />
        <ButtonWrapper>
          <Signin.BackBtn>Back</Signin.BackBtn>
          <Signin.SubmitBtn>Sign up</Signin.SubmitBtn>
        </ButtonWrapper>
      </Container>
    </Signin>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export default SigninContainer;
