import React, { useEffect, useState } from "react";
import Nav from "../components/Nav/Nav";
import FavPage from "../components/FavPage/FavPage";

import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../state/user";
import LoadingSpinner from "../common/LoadingSpinner";

function Favorites() {

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
        <FavPage />
      </>
    );
  }

  return (
    <>
      {toggleNeedToLogIn}
    </>
  );
}

export default Favorites;
