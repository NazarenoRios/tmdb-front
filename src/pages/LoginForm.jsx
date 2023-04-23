import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm/LoginForm";

function LoginF() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (token) {
      navigate("/home")
    }
  },[token])

  return (
    <>
      <LoginForm />
    </>
  );
}

export default LoginF;
