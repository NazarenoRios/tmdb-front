import React from "react";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import RegisterNav from "../components/RegisterForm/RegisterNav";
import { useSelector } from "react-redux";
import Home from "./Home";

function RegisterF() {
  const user = useSelector((state) => state.users);

  if (user.id) {
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
