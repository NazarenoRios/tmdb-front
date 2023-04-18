import React from "react";
import styled from "styled-components";

function PreFooter() {
  return (
    <PFooter className="bg-[transparent]">
      <div className="footer-text">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 ml-8 ">
          © 2022{" "}
          <a
            href="https://flowbite.com/"
            className="hover:underline hover:text-white"
          >
            Butterflix™
          </a>
          . All Rights Reserved.
        </span>
      </div>

      <div className="list">
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="/" className="mr-4 hover:underline md:mr-6 hover:text-white">
              Privacy
            </a>
          </li>
          <li>
            <a href="/" className="mr-4 hover:underline md:mr-6 hover:text-white">
              Terms
            </a>
          </li>
          <li>
            <a href="/" className="mr-4 hover:underline md:mr-6 hover:text-white">
              Help
            </a>
          </li>
          <li>
            <a href="/" className="hover:underline hover:text-white">
              Contact
            </a>
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
