import React, { useState, useEffect } from "react";
import { Image } from "@chakra-ui/react";
import "./Nav.css";

import mainLogo from "../../assets/logo/butterLogo3.png";
import homeBtn from "../../assets/btnIcons/home-icon.svg";
import chatBtn from "../../assets/btnIcons/chat.svg";
import myListBtn from "../../assets/btnIcons/series-icon.svg";
import searchBtn from "../../assets/btnIcons/search-icon.svg";
import users from "../../assets/btnIcons/group-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { UserIcon , LogoutIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../state/user";

import { success } from "../../utils/logs";
import { getUser } from "../../state/updatedUser";
import { fetchApi } from "../../config/axiosInstance";


function Nav() {

  const [updatedUser,setUser] = useState({})

  const user = useSelector(state => state.users)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = function () {
    dispatch(logOut()).then(() => {
      success("logged out");
    navigate("/");
    })
  };

  //popup
  const [popUp, setPopUp] = useState(false);

  const togglePopUp = () => setPopUp(!popUp)

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

  //get updated user

  const fetchUser = async () => {
    const res = await fetchApi({
      method: "get",
      url: `/api/users/user/${user.id}`,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setUser(res.data)
    return res.data
  };

  useEffect(() => {
    fetchUser()
  },[])


  return (
    <nav className={`nav ${show && "bg-[#090b13]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10 sm:space-x-2">
        <a href="/home">
          <Image
            className="nav__logo cursor-pointer object-contain"
            src={mainLogo}
            width={45}
            height={45}
            alt="Butterflix Logo"
          />
        </a>

        <ul className="hidden space-x-4 md:flex">
          <Link to="/home">
            <li className="">
              <div className="btn">
                <img src={homeBtn} alt="" />
                <label>HOME</label>
              </div>
            </li>
          </Link>

          <Link to="/search">
            <li className="">
              <div className="btn">
                <img src={searchBtn} alt="" />
                <label>SEARCH</label>
              </div>
            </li>
          </Link>

          {/* <Link to="/chat"> */}
            <li className="">
              <div className="btn">
                <img src={chatBtn} alt="" />
                <label>CHAT</label>
              </div>
            </li>
          {/* </Link> */}

          <Link to="/users">
            <li className="">
              <div className="btn">
                <img src={users} alt="" />
                <label>USERS</label>
              </div>
            </li>
          </Link>

          <Link to="/favorites">
            <li className="">
              <div className="btn">
                <img src={myListBtn} alt="" />
                <label>MY LIST</label>
              </div>
            </li>
          </Link>
        </ul>
      </div>

      <UserProfile onClick={togglePopUp} ><img src={updatedUser.pic} style={{height:"50px"}} alt="profileIcon" /></UserProfile>

      <DropMenu activeState={popUp} >
        <div className="btn flex dropmenu">
        <UserIcon className="dropicons" />
          <Link to="/myprofile"><label>PROFILE</label></Link>
        </div>

        <div className="btn flex dropmenu">
          <LogoutIcon className="dropicons" />
          <label onClick={handleLogout}>LOG OUT</label>
        </div>
      </DropMenu>
    </nav>
  );
}

const UserProfile = styled.div`
  width: 50px;
  height: 50px;
  object-position: center;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 100px;
  }

  :hover {
    cursor: pointer;
  }
`;

const DropMenu = styled.div`
  background-color: #040714;
  border-radius: 0.345rem;
  border: 1.3px solid rgba(151,151,151,1);
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 0px 0px;
  opacity: .85;

  margin-top: 20px;
  
  display: ${event => event.activeState ? "flex" : "none"};
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  position: absolute;
  top: 4vh;
  right: .8rem;
`;

export default Nav;
