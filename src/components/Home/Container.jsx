import React from "react";
import Home from ".";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import Container from "../common/Container";

const HomeContainer = () => {
  const navigate = useNavigate();
  const handleSignin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/todo");
    } else {
      navigate("/signin");
    }
  };
  const handleSignup = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/todo");
    } else {
      navigate("/signup");
    }
  };
  return (
    <Home>
      <Container gap={3}>
        <Home.Heading size="medium">원티드 프리온보딩 인턴십</Home.Heading>
        <ButtonWrapper>
          <Home.Button event={handleSignin}>Sign in</Home.Button>
          <Home.Button event={handleSignup}>Sign up</Home.Button>
        </ButtonWrapper>
      </Container>
    </Home>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export default HomeContainer;
