import React, { useEffect, useState } from "react";
import Nav from "../components/Nav/Nav";
import Banner from "../components/Banner/Banner";
import Categories from "../components/Categories/Categories";
import Row from "../components/Row/Row.tsx";
import requests from "../utils/requests";
import PreFooter from '../common/PreFooter'
import Footer from "../common/Footer";

import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../state/user";
import FavoriteRow from "../components/FavoriteRow/FavoriteRow.tsx";

import LoadingSpinner from "../common/LoadingSpinner";
import { useTranslation } from "react-i18next";

export default function Home() {

  const [t,i18n] = useTranslation("global");

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
        <Banner />
        <Categories />
        <FavoriteRow title={t("home.fav")} />
        <Row title={t("home.trending")} fetchUrl={requests.fetchTrending} />
        <Row title={t("home.top")} fetchUrl={requests.fetchTopRated} />
        <Row title={t("home.western")} fetchUrl={requests.fetchWestern}/>
        <Row title={t("home.action")} fetchUrl={requests.fetchActionMovies} />
        <Row title={t("home.animation")} fetchUrl={requests.fetchAnimation} />
        <Row title={t("home.horror")} fetchUrl={requests.fetchHorrorMovies} />
        <Row title={t("home.romance")} fetchUrl={requests.fetchRomanceMovies} />
        <Row title={t("home.scifi")} fetchUrl={requests.fetchScifi} />
        <Row title={t("home.comedy")} fetchUrl={requests.fetchComedyMovies} />
        <Row title={t("home.documentaries")} fetchUrl={requests.fetchDocumantaries} />
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
