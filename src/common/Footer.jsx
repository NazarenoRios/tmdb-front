import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

function Footer() {
  return (
    <PFooter className="p-4 bg-[transparent] rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
      <div className="text-sm text-gray-500 sm:text-center dark:text-gray-400 space-x-7">
        <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" className="hover:text-white">
          <FontAwesomeIcon icon={faYoutube} />
        </a>

        <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="hover:text-white">
          <FontAwesomeIcon icon={faTwitter} />
        </a>

        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="hover:text-white">
          <FontAwesomeIcon icon={faFacebook} />
        </a>

        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="hover:text-white">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
      
    </PFooter>
  );
}

const PFooter = styled.footer`
  float: left;
  margin-left: 50px;

  @media screen and (max-width: 582px) {
    margin-left: 200px;
    margin-top: 50px;
    margin-bottom: 50px;
  }

  @media screen and (max-width: 450px) {
    margin-left: 130px;
    margin-top: 50px;
    margin-bottom: 50px;
  }
`;

export default Footer;
