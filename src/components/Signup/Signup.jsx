import React, { createContext, useContext, useState } from "react";
import Input from "../common/Input";
import Heading from "../common/Heading";
import Layout from "../common/Layout";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  return <Input data="email-input" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}></Input>;
};

const SignupPasswordInput = () => {
  const { password, setPassword } = useContext(SignupContext);
  return <Input data="password-input" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>;
};

const SignupBackButton = ({ children }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };
  return <Button event={handleNavigate}>{children}</Button>;
};

const SignupSubmitButton = ({ children }) => {
  const url = "http://localhost:3030";
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
