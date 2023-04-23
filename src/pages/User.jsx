import React, { useEffect, useState } from "react";
import Nav from "../components/Nav/Nav";
import UserPage from "../components/Users/UserPage";

import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../state/user";
import LoadingSpinner from "../common/LoadingSpinner";

function User() {

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
        <UserPage />
      </>
    );
  }

  return (
    {toggleNeedToLogIn}
  );
}

export default User;
