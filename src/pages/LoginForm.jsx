import React from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import Home from "./Home";
import { useSelector } from "react-redux";

function LoginF() {
  const user = useSelector((state) => state.users);

  if (user.id) {
    return <Home />;
  }

  return (
    <>
      <LoginForm />
    </>
  );
}

export default LoginF;
