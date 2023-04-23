import React, { useEffect, useState } from "react";
import Nav from "../components/Nav/Nav";
import MovieDetail from "../components/MoviePage/MovieDetail";

import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../state/user";
import LoadingSpinner from "../common/LoadingSpinner";

function MoviePage() {

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
          <MovieDetail />
        </>
      );
    }

    return (
      <>
        {toggleNeedToLogIn}
      </>
    );
}

export default MoviePage;

