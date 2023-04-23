import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function PreFooter() {
  return (
    <PFooter className="bg-[transparent]">
      <div className="footer-text">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 ml-8 ">
          © 2022{" "}
          <a
            href="https://nazareno-rios.vercel.app/"
            className="hover:underline hover:text-white"
          >
            Nazareno Rios
          </a>
          . All Rights Reserved.
        </span>
      </div>

      <div className="list">
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <span className="mr-4 hover:underline md:mr-6 hover:text-white">
              Privacy
            </span>
          </li>
          <li>
            <span className="mr-4 hover:underline md:mr-6 hover:text-white">
              Terms
            </span>
          </li>
          <li>
            <span className="mr-4 hover:underline md:mr-6 hover:text-white">
              Help
            </span>
          </li>
          <li>
            <Link to="/contact" className="hover:underline hover:text-white">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </PFooter>
  );
}

const PFooter = styled.div`
  float: right;
  margin-right: 50px;
`;

export default PreFooter;
