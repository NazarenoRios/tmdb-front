import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faNapster, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

import styled from "styled-components";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <PFooter className="p-4 bg-[transparent] rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
      <div className="text-sm text-gray-500 sm:text-center dark:text-gray-400 space-x-7">
        <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" className="hover:text-white">
          <FontAwesomeIcon icon={faNapster} />
        </a>

        <Link to="/contact"> <FontAwesomeIcon icon={faGoogle} /></Link>

        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="hover:text-white">
          <FontAwesomeIcon icon={faGithub} />
        </a>

        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="hover:text-white">
          <FontAwesomeIcon icon={faLinkedin} />
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
