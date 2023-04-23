import React from "react";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import RegisterNav from "../components/RegisterForm/RegisterNav";
import Home from "./Home";

function RegisterF() {

  const token = localStorage.getItem("token")

  if (token) {
    return <Home />;
  }

  return (
    <>
      <RegisterNav />
      <RegisterForm />
    </>
  );
}

export default RegisterF;
