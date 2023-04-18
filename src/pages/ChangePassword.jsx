import React, { useEffect } from "react";
import Nav from "../components/Nav/Nav";

import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../state/user";
import NeedToLogIn from "../pages/NeedToLogin";
import NewPassword from "../components/MyProfile/NewPassword";

function ChangePassword() {

  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin());
  }, []);

  if (user.id) {
    return (
      <>
        <Nav />
        <NewPassword />
      </>
    );
  }

  return (
    <NeedToLogIn/>
  );
}

export default ChangePassword;
