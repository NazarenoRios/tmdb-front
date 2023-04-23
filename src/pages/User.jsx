import React, { useEffect } from "react";
import Nav from "../components/Nav/Nav";
import UserPage from "../components/Users/UserPage";

import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../state/user";
import NeedToLogIn from "../pages/NeedToLogin";

function User() {

  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin());
  }, []);

  const token = localStorage.getItem("token")

  if (token) {
    return (
      <>
        <Nav />
        <UserPage />
      </>
    );
  }

  return (
    <NeedToLogIn/>
  );
}

export default User;
