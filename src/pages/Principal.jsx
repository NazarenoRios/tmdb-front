import React, { useEffect } from "react";
import styled from "styled-components";
import Footer from "../common/Footer";
import Devices from "../components/LoginPage/Devices";
import LoginBanner from "../components/LoginPage/LoginBanner";
import LoginNav from "../components/LoginPage/LoginNav";
import LoginPhotos from "../components/LoginPage/LoginPhotos";
import LoginStream from "../components/LoginPage/LoginStream";
import PreFooter from '../common/PreFooter'
import Home from "./Home";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../state/user";

function Principal() {

  const user = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkLogin())
  }, []);

  if (user.id) {
    return (
      <Home/>
    )
  }

  return (
    <>
      <Main>
        <LoginNav />
        <LoginBanner />
        <LoginStream />
        <LoginPhotos />
        <Devices />
        <PreFooter/>
        <Footer />
      </Main>
    </>
  );
}

const Main = styled.main`
  width: auto;
  height: auto;
  overflow: auto;
  background: #050714;
`;

export default Principal;
