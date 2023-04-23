import React from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import Home from "./Home";

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
