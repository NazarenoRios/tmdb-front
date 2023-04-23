import React from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import Home from "./Home";

function LoginF() {

  const token = localStorage.getItem("token")

  if (token) {
    return <Home />;
  }

  return (
    <>
      <LoginForm />
    </>
  );
}

export default LoginF;
