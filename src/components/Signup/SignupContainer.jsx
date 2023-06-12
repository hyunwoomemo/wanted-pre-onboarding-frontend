import React from "react";
import { Signup } from "./Signup";
import Container from "../common/Container";
import styled from "@emotion/styled";

const SignupContainer = () => {
  return (
    <Signup>
      <Container gap={2}>
        <Signup.Heading>회원가입</Signup.Heading>
        <Signup.EmailInput />
        <Signup.PasswordInput />
        <ButtonWrapper>
          <Signup.BackBtn>Back</Signup.BackBtn>
          <Signup.SubmitBtn>Sign up</Signup.SubmitBtn>
        </ButtonWrapper>
      </Container>
    </Signup>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export default SignupContainer;
