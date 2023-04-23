import React, { useEffect } from "react";
import Nav from "../components/Nav/Nav";
import UsersPage from "../components/Users/UsersPage";

import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../state/user";
import NeedToLogIn from "../pages/NeedToLogin";

function Users() {

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
        <UsersPage />
      </>
    );
  }

  return (
    <NeedToLogIn/>
  );
}

export default Users;
