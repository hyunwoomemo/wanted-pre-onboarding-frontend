import React, { createContext, useState } from "react";
import Layout from "../common/Layout";
import Heading from "../common/Heading";
import Button from "../common/Button";

export const HomeContext = createContext();

const Home = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <HomeContext.Provider value={{ open, setOpen }}>
      <Layout>{children}</Layout>
    </HomeContext.Provider>
  );
};

Home.Heading = Heading;
Home.Button = Button;

export default Home;
