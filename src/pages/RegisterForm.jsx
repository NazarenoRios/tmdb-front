import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import RegisterNav from "../components/RegisterForm/RegisterNav";

function RegisterF() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (token) {
      navigate("/home")
    }
  },[token])

  return (
    <>
      <RegisterNav />
      <RegisterForm />
    </>
  );
}

export default RegisterF;
