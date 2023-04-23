import React, { useEffect } from "react";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import RegisterNav from "../components/RegisterForm/RegisterNav";
import { useDispatch, useSelector } from "react-redux";
import Home from "./Home";
import { checkLogin } from "../state/user";

function RegisterF() {

  const user = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkLogin())
  }, []);

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
