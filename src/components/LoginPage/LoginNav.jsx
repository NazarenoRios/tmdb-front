import React from "react";
import { useState , useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkLogin, logOut } from "../../state/user";

import { success } from "../../utils/logs";


function LoginNav() {

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
  // const user = useSelector(state => state.users)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(checkLogin())
  // }, []);
  
  const handleLogout = function () {
    dispatch(logOut())
    success("logged out");
    navigate("/");
  };

  const user = localStorage.getItem("token");

  // console.log(user)

  if (user) {
    return (
      <>
        <nav className={`nav ${show && "bg-[#050714]"}`} >
          <a 
            type="button" 
            onClick={handleLogout}
            href="/"
            className="text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6] hover:text-color hover:text-[#050714] ml-auto cursor-pointer"
            >
            <span className="uppercase font-medium tracking-wide">LOG OUT</span>
          </a>
        </nav>
      </>
    );
  }

  return (
    <>
      <nav className={`nav ${show && "bg-[#050714]"}`} >
        <a 
          type="button" 
          href="/login"
          className="text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6] hover:text-color hover:text-[#050714] ml-auto cursor-pointer"
          >
          <span className="uppercase font-medium tracking-wide">LOG IN</span>
        </a>
      </nav>
    </>
  );
}




export default LoginNav;
