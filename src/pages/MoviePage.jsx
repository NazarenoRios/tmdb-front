import React, { useEffect } from "react";
import Nav from "../components/Nav/Nav";
import MovieDetail from "../components/MoviePage/MovieDetail";

import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../state/user";
import NeedToLogIn from "../pages/NeedToLogin";


function MoviePage() {

  const user = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkLogin())
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
      <NeedToLogIn/>
    )
}

export default MoviePage;

