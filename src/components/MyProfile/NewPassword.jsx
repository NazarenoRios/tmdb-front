import React from "react";
import { useNavigate } from "react-router-dom";
import aside from "../../assets/background/aside.mp4"
import { ExclamationCircleIcon } from "@heroicons/react/solid";

import { useInput } from "../../hooks/useInput";
import { logOut } from "../../state/user";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useState } from "react";

import { VolumeUpIcon, VolumeOffIcon } from '@heroicons/react/outline'

import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';

import "./Btns2.css"
import { fetchApi } from "../../config/axiosInstance";
import { useTranslation } from "react-i18next";


export default function NewPassword() {

  const [t,i18n] = useTranslation("global");

  const password = useInput("password");
  const confirmPassword = useInput("confirmPassword");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users);

  //same password message
  const [message, setMessage] = useState(false);

  const toggleMessage = () => setMessage(true);

  //change PW
  const fetchChangePw = async () => {
    const res = await fetchApi({
      method: "put",
      url: `/api/users/changePassword/${user.id}`,
      body: { password: password.value },
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data;
  };

  //submit
  const submitHandler = (e) => {
    e.preventDefault();

    if (password.value.length > 0) {
      if (password.value === confirmPassword.value) {
        fetchChangePw();
        dispatch(logOut());
        navigate("/");
      }
    }
  };

  // trailer sound toggle
  const [toggleMute, setToggleMute] = useState(true);

  const handleMute = (e) => {
    e.preventDefault()
    setToggleMute(!toggleMute)
  }

  return (
    <Stack className="" minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex flex={1}>
        <Trailer src={aside} autoPlay loop muted={toggleMute} className="videoBg" />
        {toggleMute? (
          <VolumeOffIcon type="button" onClick={handleMute} className="upBtn2"/>
        ): (
          <VolumeUpIcon type="button" onClick={handleMute} className="downBtn2"/>
        )}
      </Flex>

      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack as={'form'} spacing={4} w={'full'} maxW={'md'} onSubmit={submitHandler} >
          <Heading fontSize={'2xl'}>{t("profile.pwchange")}</Heading>
          <FormControl id="name">
            <FormLabel>{t("profile.onlpw")}</FormLabel>
            <Input type="password" {...password} />
          </FormControl>
          <FormControl id="lastname">
            <FormLabel>{t("profile.pwconfirm")}</FormLabel>
            <Input type="password" {...confirmPassword} />
          </FormControl>

          <Meesage activeState={message}>
            {" "}
            <ExclamationCircleIcon
              style={{ height: "25px", width: "25px" }}
            />{" "}
            {t("profile.pwsame")}
          </Meesage>

          <Stack spacing={6}>
            <button
              className="w-full rounded bg-[#02468a] py-3 font-semibold hover:bg-[#051e51]"
              type="submit"
              onClick={toggleMessage}
            >
              {t("profile.Confirm")}
            </button>
          </Stack>
        </Stack>
      </Flex>

    </Stack>
  );
}


const Trailer = styled.video`
  height: 100%;
  width: 48.5vw;
  position: absolute;
  object-fit: cover;

  @media screen and (max-width: 768px) {
    height: 34.5vh;
    width: 100%;
  }
`;

const Meesage = styled.p`
  display: ${(event) => (event.activeState ? "flex" : "none")};

  font-size: 17px;
  text-align: center;

  letter-spacing: 1px;
`;