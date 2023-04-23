import React, { useEffect, useState } from "react";
import Nav from "../components/Nav/Nav";
import MyProfilePage from "../components/MyProfile/MyProfile";

import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../state/user";
import LoadingSpinner from "../common/LoadingSpinner";

function MyProfile() {

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
        <MyProfilePage />
      </>
    );
  }

  return (
    {toggleNeedToLogIn}
  );
}

export default MyProfile;
