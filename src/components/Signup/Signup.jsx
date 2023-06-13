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

const SignupContext = createContext();

export const Signup = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const providerValue = {
    email,
    setEmail,
    password,
    setPassword,
  };

  return (
    <SignupContext.Provider value={{ ...providerValue }}>
      <Layout>{children}</Layout>
    </SignupContext.Provider>
  );
};

const SignupHeading = ({ children }) => {
  return <Heading>{children}</Heading>;
};

const SignupEmailInput = () => {
  const { email, setEmail } = useContext(SignupContext);
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

const SignupPasswordInput = () => {
  const { password, setPassword } = useContext(SignupContext);
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

const SignupBackButton = ({ children }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };
  return <Button event={handleNavigate}>{children}</Button>;
};

const SignupSubmitButton = ({ children }) => {
  const url = "https://www.pre-onboarding-selection-task.shop";
  const { email, password } = useContext(SignupContext);
  const disabled = () => {
    return email.indexOf("@") > -1 && password.length > 7 ? false : true;
  };
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      await axios.post(`${url}/auth/signup`, { email, password });
      navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button data="signup-button" event={handleSubmit} disabled={disabled()}>
      {children}
    </Button>
  );
};

Signup.EmailInput = SignupEmailInput;
Signup.PasswordInput = SignupPasswordInput;
Signup.Heading = SignupHeading;
Signup.BackBtn = SignupBackButton;
Signup.SubmitBtn = SignupSubmitButton;
