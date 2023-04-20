import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchApi } from "../../config/axiosInstance";

import { useInput } from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { sendLoginRequest } from "../../state/user";

import { GoogleLogin } from "@react-oauth/google";

import videoloader from "../../assets/loader/video1.mp4";
import logo from "../../assets/logo/butterLogo3.png";
import styled from "styled-components";

import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  useBreakpointValue,
  IconProps,
  Icon,
  Image,
} from "@chakra-ui/react";

export default function LoginForm() {
  const email = useInput("email");
  const password = useInput("password");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => state.users)

  const fetchGoogleLogin = async (tokenResponse) => {
    const { status, data } = await fetchApi({
      method: "put",
      url: "/api/users/googlelogin",
      body: { credential: tokenResponse.credential },
    });

    if (status === 201) {
      localStorage.setItem("token", data.token);
    }

    const res = await fetchApi({
      method: 'get',
      url: `/api/users/persistence/${data.id}`,
    });

    const goHome = await navigate("/home")
    return res.data;
  };

  const sucessGoogleResponse = (tokenResponse) => {
    fetchGoogleLogin(tokenResponse)
  };

  // login with video
  const [loading, setLoading] = useState(false);
  const [toggleMute, setToggleMute] = useState(true);
  const [navState, setNavState] = useState(true);

  const changeState = () => {
    setLoading(true);
    setNavState(false);
    setTimeout(() => {
      setToggleMute(!toggleMute);
    }, 0);
    setTimeout(() => {
      dispatch(sendLoginRequest({ email, password }));
      setLoading(false);
    }, 6000);
  };

  useEffect(() => {
    if (user.id) navigate("/home");
  }, [user]);

  if (loading) {
    return (
      <div
        style={{ backgroundColor: "black", height: "100vh", width: "100vw" }}
      >
        <Trailer src={videoloader} autoPlay muted={toggleMute} />
      </div>
    );
  } else {
    return (
      <Box className="mt-52" position={"relative"}>
        <Nav>
          <a href="/">
            <Image
              className="nav__logo cursor-pointer object-contain"
              src={logo}
              width={200}
              height={200}
              alt="Butterflix Logo"
              marginTop={200}
            />
          </a>
        </Nav>
        <br></br>
        <Home>Home</Home>

        <Container as={SimpleGrid} py={{ base: 10, sm: 20, lg: 32 }}>
          <Stack
            className="bg-[#090b13]"
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
            // onSubmit={handleSubmit}
          >
            <Stack spacing={4}>
              <Heading
                className="text-white text-center"
                lineHeight={1.1}
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              >
                Login
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, blue.400,pink.400)"
                  bgClip="text"
                >
                  !
                </Text>
              </Heading>
              <Text color={"gray.400"} fontSize={{ base: "sm", sm: "md" }}>
                Login to access a wide variety of movies and series that you
                can`t miss!
              </Text>
            </Stack>
            <Box as={"form"} mt={10}>
              <Stack spacing={4}>
                <Input
                  placeholder="firstname@example.com"
                  type="email"
                  borderTop={0}
                  borderRight={0}
                  borderLeft={0}
                  className="placeholder:text-center"
                  _placeholder={{
                    color: "gray.500",
                  }}
                  {...email}
                />
                <Input
                  placeholder="Password..."
                  type="password"
                  borderTop={0}
                  borderRight={0}
                  borderLeft={0}
                  className="placeholder:text-center"
                  _placeholder={{
                    color: "gray.500",
                  }}
                  {...password}
                />
              </Stack>
              <Button
                type="submit"
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bgGradient="linear(to-r, blue.400,pink.400)"
                color={"white"}
                onClick={() => changeState()}
                _hover={{
                  bgGradient: "linear(to-r, red.400,pink.400)",
                  boxShadow: "xl",
                }}
              >
                Submit
              </Button>
            </Box>

            <div className="text-[gray] text-center">
              New to Butterflix?{" "}
              <Link to="/register">
                <button
                  className="cursor-pointer text-white hover:underline"
                  type="submit"
                >
                  Sign up now
                </button>
              </Link>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={sucessGoogleResponse}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
          </Stack>
        </Container>
        <Blur
          position={"absolute"}
          top={-10}
          left={-10}
          style={{ filter: "blur(70px)" }}
        />
      </Box>
    );
  }
}

export const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

const Trailer = styled.video`
  z-index: 1000;
  height: 100vh;
  width: 100vw;
`;

const Nav = styled.nav`
  height: 100px;
`;

const Home = styled.span`
  color: "white";
  font-size: 35px;
  margin-left: 2.5em;

  @media screen and (max-width: 1025px) {
    margin-left: 1.8em;
  }
`;
