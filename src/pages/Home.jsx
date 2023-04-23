import React, { useEffect, useState } from "react";
import Nav from "../components/Nav/Nav";
import Banner from "../components/Banner/Banner";
import Categories from "../components/Categories/Categories";
import Row from "../components/Row/Row.tsx";
import requests from "../utils/requests";
import PreFooter from '../common/PreFooter'
import Footer from "../common/Footer";

import { useSelector } from "react-redux";
import FavoriteRow from "../components/FavoriteRow/FavoriteRow.tsx";

import NeedToLogIn from "../pages/NeedToLogin";
import { fetchApi } from "../config/axiosInstance";
import LoadingSpinner from "../common/LoadingSpinner";



export default function Home() {

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

    console.log(res)
  
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
        <Banner />
        <Categories />
        <FavoriteRow title="My Favorites" />
        <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
        <Row title="Western" fetchUrl={requests.fetchWestern}/>
        <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
        <Row title="Animation" fetchUrl={requests.fetchAnimation} />
        <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
        <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
        <Row title="Sci-Fi" fetchUrl={requests.fetchScifi} />
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
        <Row title="Documentaries" fetchUrl={requests.fetchDocumantaries} />
        <PreFooter/>
        <Footer/>
      </>
    );
  }

  return (
    <>
      {toggleNeedToLogIn}
    </>
  );
}
