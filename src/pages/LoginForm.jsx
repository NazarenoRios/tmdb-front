import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import Home from "./Home";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../state/user";

function LoginF() {

  const user = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkLogin())
  }, []);

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
