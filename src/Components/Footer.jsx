import { Avatar, Box, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";


const avatarSrc = "https://avatars.githubusercontent.com/u/102795772?s=400&u=fc58d434e01e8117c9015f6669172c6bf0f9611e&v=4";

const Footer = () => {
  return (
    <Box
      bgColor={"blackAlpha.900"}
      color={"whiteAlpha.700"}
      minH={"48"}
      px={"16"}
      py={["16", "8"]}
    >
      <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
        <VStack w={"full"} alignItems={["center", "flex-start"]}>
          <Text fontWeight={"bold"}>About Us</Text>
          <Text
            fontSize={"sm"}
            letterSpacing={"widest"}
            textAlign={["center", "left"]}
          >
            We are the best Crypto trading app in India, we provide our guidance
            at a very Reasonable price.
          </Text>
          
        </VStack>

        <VStack >
          <Avatar boxSize={"28"} mt={["4", "2"] } src={avatarSrc} />
          <Text>Our Founder -- Chandan Jha</Text>
        </VStack>
      </Stack>

      <Stack direction={["column" , "row"]} >
        <Text>Copyright reserved @ 2023 </Text> 

      </Stack>
    </Box>
  );
};

export default Footer;