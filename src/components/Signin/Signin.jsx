import React, { createContext, useContext, useState } from "react";
import Input from "../common/Input";
import Heading from "../common/Heading";
import Layout from "../common/Layout";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "@emotion/styled";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { css } from "@emotion/react";

const SigninContext = createContext();

export const Signin = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const providerValue = {
    email,
    setEmail,
    password,
    setPassword,
  };

  return (
    <SigninContext.Provider value={{ ...providerValue }}>
      <Layout>{children}</Layout>
    </SigninContext.Provider>
  );
};

const SigninHeading = ({ children }) => {
  return <Heading>{children}</Heading>;
};

const SigninEmailInput = () => {
  const { email, setEmail } = useContext(SigninContext);
  return (
    <InputWrapper>
      <Input data="email-input" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
      {email.length > 0 && email.indexOf("@") < 0 && <span>@가 포함되어야합니다.</span>}
      <CheckBtn active={email.indexOf("@") > -1}>
        <AiOutlineCheckCircle />
      </CheckBtn>
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 10px;
  align-items: center;

  > input {
    height: 100%;
  }

  > span {
    font-size: 10px;
    position: absolute;
    top: 120%;
    left: 0;
  }
`;
const CheckBtn = styled.div`
  position: absolute;
  left: 105%;
  font-size: 20px;
  ${({ active }) =>
    active
      ? css`
          color: green;
        `
      : css`
          color: gray;
        `}
`;

const SigninPasswordInput = () => {
  const { password, setPassword } = useContext(SigninContext);
  return (
    <InputWrapper>
      <Input data="password-input" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
      {password.length > 0 && password.length < 8 && <span>8자리 이상이어야합니다.</span>}
      <CheckBtn active={password.length > 7}>
        <AiOutlineCheckCircle />
      </CheckBtn>
    </InputWrapper>
  );
};

const SigninBackButton = ({ children }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };
  return <Button event={handleNavigate}>{children}</Button>;
};

const SigninSubmitButton = ({ children }) => {
  const url = "https://www.pre-onboarding-selection-task.shop";
  const navigate = useNavigate();
  const { email, password } = useContext(SigninContext);
  const disabled = () => {
    return email.indexOf("@") > -1 && password.length > 7 ? false : true;
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${url}/auth/signin`, { email, password });

      if (response.status === 200) {
        const { access_token } = response.data;
        // JWT를 로컬 스토리지에 저장
        localStorage.setItem("token", access_token);
        // 로그인 성공 시 /todo 경로로 이동
        navigate("/todo");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button data="signin-button" event={handleSubmit} disabled={disabled()}>
      {children}
    </Button>
  );
};

Signin.EmailInput = SigninEmailInput;
Signin.PasswordInput = SigninPasswordInput;
Signin.Heading = SigninHeading;
Signin.BackBtn = SigninBackButton;
Signin.SubmitBtn = SigninSubmitButton;
