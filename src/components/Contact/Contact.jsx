import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import contactImg from "../../assets/contact/simpsons.gif";

export default function Contact() {
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Flex
      justifyContent={"center"}
      alignContent={"center"}
      height={"100vh"}
      width={"100vw"}
    >
      <Center py={6}>
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w={{ sm: "100%", md: "100%" }}
          height={{ sm: "476px", md: "30vh" }}
          direction={{ base: "column", md: "row" }}
          boxShadow={"2xl"}
          padding={4}
        >
          <Flex flex={1} bg="blue.200">
            <Image objectFit="cover" boxSize="100%" src={contactImg} />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}
          >
            <Heading fontSize={"2xl"} fontFamily={"body"} paddingBottom={5}>
              Nazareno Rios
            </Heading>

            <a
              href="https://www.linkedin.com/in/nazareno-rios/"
              target="_blank"
              rel="noreferrer"
            >
              <Text
                fontWeight={600}
                color={"white"}
                size="sm"
                mb={1}
                _hover={{ color: "blue.500", cursor: "pointer" }}
              >
                <FontAwesomeIcon color="#47f" icon={faLinkedin} /> nazareno-rios
              </Text>
            </a>

            <a
              href="https://api.WhatsApp.com/send?phone=2216567792"
              target="_blank"
              rel="noreferrer"
            >
              <Text
                fontWeight={600}
                color={"white"}
                size="sm"
                mb={1}
                _hover={{ color: "green.500", cursor: "pointer" }}
              >
                <FontAwesomeIcon color="lightgreen" icon={faWhatsapp} /> +54 9
                2216567792
              </Text>
            </a>

            <a
              href="mailto:nazarenolrios@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              <Text
                fontWeight={600}
                color={"white"}
                size="sm"
                mb={1}
                _hover={{ color: "red.500", cursor: "pointer" }}
              >
                <FontAwesomeIcon color="red" icon={faGoogle} />{" "}
                nazarenolrios@gmail.com
              </Text>
            </a>

            <br />
            <Text textAlign={"center"} color="white" px={3}>
              No dudes en contactarme, seguramente este codeando pero tambien
              leyendo emails 😁
            </Text>
            <br />

            <Stack
              width={"100%"}
              mt={"2rem"}
              direction={"row"}
              padding={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Button
                onClick={() => openInNewTab("https://api.WhatsApp.com/send?phone=2216567792")}
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                bg={"green"}
                _hover={{
                  bg: "green.500",
                }}
                _focus={{
                  bg: "green.500",
                }}
              >
                Whatssap
              </Button>
              <Button
                onClick={() => openInNewTab("mailto:nazarenolrios@gmail.com")}
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                bg={"blue.400"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "blue.500",
                }}
                _focus={{
                  bg: "blue.500",
                }}
              >
                Email
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Center>
    </Flex>
  );
}
