import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../state/user";
import { success } from "../../utils/logs";

import { useTranslation } from "react-i18next";

function LoginNav() {

  //translation
  const [t,i18n] = useTranslation("global");

  const toggleLenguague = (e) => {
    
    if (e.target.value === "es") {
      i18n.changeLanguage("es")
    }

    if (e.target.value === "en") {
      i18n.changeLanguage("en")
    }
  }

  //scroll
  const [show, handleShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //logout
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = function () {
    dispatch(logOut());
    success("logged out");
    navigate("/");
  };

  const user = localStorage.getItem("token");

  if (user) {
    return (
      <>
        <nav className={`nav ${show && "bg-[#050714]"}`}>
          <a
            type="button"
            onClick={handleLogout}
            href="/"
            className="text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6] hover:text-color hover:text-[#050714] ml-auto cursor-pointer"
          >
            <span className="uppercase font-medium tracking-wide">{t("nav.LogOut")}</span>
          </a>
        </nav>
      </>
    );
  }

  return (
    <>
      <nav className={`nav ${show && "bg-[#050714]"}`}>
        <select className=" float-left text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] py-2.5 px-6 rounded hover:bg-[#c6c6c6] hover:text-color hover:text-[#050714] cursor-pointer"
        onChange={(e) => toggleLenguague(e)}
        >
          <option value="es">{t("nav.Spanish")}</option>
          <option value="en">{t("nav.English")}</option>
        </select>

        <Link
          to="/login"
          className="text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6] hover:text-color hover:text-[#050714] ml-auto cursor-pointer"
        >
          <span className="uppercase font-medium tracking-wide">{t("nav.LogIn")}</span>
        </Link>
      </nav>
    </>
  );
}

export default LoginNav;
