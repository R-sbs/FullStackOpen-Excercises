import React from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Tabs from "../components/Tabs";

const Authpage = () => {
  const tabsData = [
    { label: "Login", content: <LoginForm /> },
    { label: "Register", content: <RegisterForm /> },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold my-6">Authentication</h1>
      <Tabs tabs={tabsData} />
    </div>
  );
};

export default Authpage;
