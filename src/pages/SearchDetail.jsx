import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../common/Footer";
import NeedToLogIn from "../pages/NeedToLogin";
import PreFooter from "../common/PreFooter";
import Nav from "../components/Nav/Nav";
import SearchFound from "../components/SearchDetail/SearchFound";
import { fetchApi } from "../config/axiosInstance";
import LoadingSpinner from "../common/LoadingSpinner";

function SearchDetail() {
  const [toggleNeedToLogIn, setToggleNeedToLogIn] = useState(<LoadingSpinner/>);

  const user = useSelector((state) => state.users);

  const checkLogin = async () => {
    const res = await fetchApi({
      method: "get",
      url: "/api/users/me",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    if (res.status !== 200) {
      setToggleNeedToLogIn(<NeedToLogIn />);
    }

    const { data } = await fetchApi({
      method: "get",
      url: `/api/users/persistence/${res.data.id}`,
    });

    return data;
  };

  useEffect(() => {
    checkLogin();
  }, []);

  if (user.id) {
    return (
      <>
        <Nav />
        <SearchFound />
        <PreFooter />
        <Footer />
      </>
    );
  }

  return { toggleNeedToLogIn };
}

export default SearchDetail;
