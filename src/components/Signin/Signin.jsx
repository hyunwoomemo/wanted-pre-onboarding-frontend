import React, { createContext, useContext, useState } from "react";
import Input from "../common/Input";
import Heading from "../common/Heading";
import Layout from "../common/Layout";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  return <Input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}></Input>;
};

const SigninPasswordInput = () => {
  const { password, setPassword } = useContext(SigninContext);
  return <Input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>;
};

const SigninBackButton = ({ children }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };
  return <Button event={handleNavigate}>{children}</Button>;
};

const SigninSubmitButton = ({ children }) => {
  const url = "http://localhost:3030";
  const navigate = useNavigate();
  const { email, password } = useContext(SigninContext);
  const disabled = () => {
    return email.indexOf("@") > -1 && password.length > 7 ? false : true;
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${url}/auth/signin`, { email, password });

      if (response.status === 200) {
        const { token } = response.data;
        // JWT를 로컬 스토리지에 저장
        localStorage.setItem("token", token);
        // 로그인 성공 시 /todo 경로로 이동
        navigate("/todo");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button event={handleSubmit} disabled={disabled()}>
      {children}
    </Button>
  );
};

Signin.EmailInput = SigninEmailInput;
Signin.PasswordInput = SigninPasswordInput;
Signin.Heading = SigninHeading;
Signin.BackBtn = SigninBackButton;
Signin.SubmitBtn = SigninSubmitButton;
