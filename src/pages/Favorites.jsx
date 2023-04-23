import React, { useEffect } from "react";
import Nav from "../components/Nav/Nav";
import FavPage from "../components/FavPage/FavPage";

import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../state/user";
import NeedToLogIn from "../pages/NeedToLogin";

function Favorites() {

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
        <FavPage />
      </>
    );
  }

  return (
    <NeedToLogIn/>
  );
}

export default Favorites;
