import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../../config/axiosInstance";

import { useInput } from "../../hooks/useInput";

import { log, success, error } from "../../utils/logs";

import Loading from "../../common/Loading"


import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  Center
} from '@chakra-ui/react';

const avatars = [
  {
    name: 'Ryan Florence',
    url: 'https://bit.ly/ryan-florence',
  },
  {
    name: 'Segun Adebayo',
    url: 'https://bit.ly/sage-adebayo',
  },
  {
    name: 'Kent Dodds',
    url: 'https://bit.ly/kent-c-dodds',
  },
  {
    name: 'Prosper Otemuyiwa',
    url: 'https://bit.ly/prosper-baba',
  },
  {
    name: 'Christian Nwamba',
    url: 'https://bit.ly/code-beast',
  },
];

export default function RegisterForm() {

  const email = useInput("email");
  const password = useInput("password");
  const name = useInput("name");
  const lastname = useInput("lastname");

  const [invalidAccount, setInvalidAccount] = useState("");

  const [showLoading,setShowLoading] = useState(null)
  const [showLoadingText,setShowLoadingText] = useState(null)

  const navigate = useNavigate();

  // login with db Acc
  const fetchRegister = async () => {
    const res = await fetchApi({
      method: 'post',
      url: "/api/users/register",
      body: {
        email: email.value,
        password: password.value,
        name: name.value,
        lastname: lastname.value,
        },
    }).catch(err => {
      if (err.response.status === 401) {
        setShowLoading(null)
        setShowLoadingText(null)
        setInvalidAccount("Email already registered, try another");
      }
    })
    
    console.log(res)
 
    return res.data;
  };

  const handleRegister = (e) => {
    e.preventDefault()
    setShowLoading(<Loading/>)
    setShowLoadingText(`Loading..`)
    log("register attempt...");
    fetchRegister()
    .then(() => {
      success(`new user registered`)
      navigate("/login")
    })
    .catch((res) => error(res.status, res.statusText))
  }



  return (
    <Box className='mt-52' position={'relative'}>
      <Center>{showLoading}</Center>
      <Center fontWeight='bold' color='#5ddcff'>{showLoadingText}</Center>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}>
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
            <Text className='text-white'>Register Now</Text>
            <Text
              as={'span'}
              bgGradient="linear(to-r, blue.400,pink.400)"
              bgClip="text">
              &
            </Text>{' '}
            <Text className='text-white' >Access to All Our Catalogue</Text>
          </Heading>
          <Stack direction={'row'} spacing={4} align={'center'}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  position={'relative'}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: 'full',
                    height: 'full',
                    rounded: 'full',
                    transform: 'scale(1.125)',
                    bgGradient: 'linear(to-bl, blue.400,pink.400)',
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text className='text-white' fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
              +
            </Text>
            <Flex
              align={'center'}
              justify={'center'}
              fontFamily={'heading'}
              fontSize={{ base: 'sm', md: 'lg' }}
              bg={'gray.800'}
              color={'white'}
              rounded={'full'}
              width={useBreakpointValue({ base: '44px', md: '60px' })}
              height={useBreakpointValue({ base: '44px', md: '60px' })}
              position={'relative'}
              _before={{
                content: '""',
                width: 'full',
                height: 'full',
                rounded: 'full',
                transform: 'scale(1.125)',
                bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                position: 'absolute',
                zIndex: -1,
                top: 0,
                left: 0,
              }}>
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          className="bg-[#06070c]"
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}
          onSubmit={handleRegister}
          >
          <Stack spacing={4}>
            <Heading
              className='text-white'
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
              Register for Free
              <Text
                as={'span'}
                bgGradient="linear(to-r, blue.400,pink.400)"
                bgClip="text">
                !
              </Text>
            </Heading>
            <Text color={'gray.400'} fontSize={{ base: 'sm', sm: 'md' }}>
              After registering, you will be able to access a wide variety of movies and series that you can`t miss!
            </Text>
          </Stack>
          <Box as={'form'} mt={10}>
            <Stack spacing={4}>
              <Input
                placeholder="Firstname"
                type="text"
                borderTop={0}
                borderRight={0}
                borderLeft={0}
                className="placeholder:text-center"
                _placeholder={{
                  color: 'gray.500',
                }}
                {...name}
              />
              <Input
                placeholder="Lastname"
                type="text"
                borderTop={0}
                borderRight={0}
                borderLeft={0}
                className="placeholder:text-center"
                _placeholder={{
                  color: 'gray.500',
                }}
                {...lastname}
              />
              <Input
                placeholder="firstname@example.com"
                type="email"
                borderTop={0}
                borderRight={0}
                borderLeft={0}
                className="placeholder:text-center"
                _placeholder={{
                  color: 'gray.500',
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
                  color: 'gray.500',
                }}
                {...password}
              />
              <Center color="red">{invalidAccount}</Center>
            </Stack>
            <Button
              type="submit"
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bgGradient="linear(to-r, blue.400,pink.400)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, blue.400,pink.400)',
                boxShadow: 'xl',
              }}>
              Submit
            </Button>
          </Box>
        </Stack>
      </Container>
      <Blur
        position={'absolute'}
        top={-10}
        left={-10}
        style={{ filter: 'blur(70px)' }}
      />
    </Box>
  );
}


export const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
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