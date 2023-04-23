import React from "react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function ContactNav() {

  const [t,i18n] = useTranslation("global");

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

  return (
    <>
      <nav className={`nav ${show && "bg-[#050714]"}`}>
        <Link
          to="/"
          className=" float-left text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] py-2.5 px-6 rounded hover:bg-[#c6c6c6] hover:text-color hover:text-[#050714] cursor-pointer"
        >
          <span className="uppercase font-medium tracking-wide">{t("home-nav.home")} </span>
        </Link>
      </nav>

    </>
  );
}

export default ContactNav;
