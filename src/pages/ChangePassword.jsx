import React, { useEffect, useState } from "react";
import Nav from "../components/Nav/Nav";

import { useSelector } from "react-redux";
import NeedToLogIn from "../pages/NeedToLogin";
import NewPassword from "../components/MyProfile/NewPassword";

import LoadingSpinner from "../common/LoadingSpinner";
import { fetchApi } from "../config/axiosInstance";

function ChangePassword() {

  const [toggleNeedToLogIn, setToggleNeedToLogIn] = useState(<LoadingSpinner/>);

  const user = useSelector((state) => state.users);

  const checkLogin = async () => {

    const res = await fetchApi({
      method: 'get',
      url: "/api/users/me",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
    })

    if (res.status !== 200) {
      setToggleNeedToLogIn(<NeedToLogIn/>)
    } 
  
    const { data } = await fetchApi({
      method: 'get',
      url: `/api/users/persistence/${res.data.id}`
    });
  
    return data;
  }

  useEffect(() => {
    checkLogin()
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
    {toggleNeedToLogIn}
  );
}

export default ChangePassword;
