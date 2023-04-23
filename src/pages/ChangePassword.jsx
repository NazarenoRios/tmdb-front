import React, { useEffect, useState } from "react";
import Nav from "../components/Nav/Nav";

import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../state/user";
import NewPassword from "../components/MyProfile/NewPassword";
import LoadingSpinner from "../common/LoadingSpinner";

function ChangePassword() {

  const [toggleNeedToLogIn, setToggleNeedToLogIn] = useState(<LoadingSpinner/>);

  const user = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkLogin(setToggleNeedToLogIn))
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
    <>
      {toggleNeedToLogIn}
    </>
  );
}

export default ChangePassword;
