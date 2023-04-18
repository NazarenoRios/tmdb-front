import React, { useEffect } from "react";
import Nav from "../components/Nav/Nav";
import MyProfilePage from "../components/MyProfile/MyProfile";

import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../state/user";
import NeedToLogIn from "../pages/NeedToLogin";


function MyProfile() {

  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin());
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
    <NeedToLogIn/>
  );
}

export default MyProfile;
