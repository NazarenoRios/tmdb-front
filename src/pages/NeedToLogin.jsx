import React from "react";
import NeedToLogIn from "../components/NeedToLogin/NeedToLogIn";
import NeedToLoginNav from "../components/NeedToLogin/NeedToLoginNav";
import PreFooter from '../common/PreFooter'
import Footer from "../common/Footer";

function NeedToLogin() {
  return (
    <>
      <NeedToLoginNav />
      <NeedToLogIn />
      <PreFooter/>
      <Footer/>
    </>
  );
}

export default NeedToLogin;
