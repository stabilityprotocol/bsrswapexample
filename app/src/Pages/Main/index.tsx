import { Flex } from "@chakra-ui/react";
import { Box1 } from "./Components/Box1";
import { Box2 } from "./Components/Box2";
import { Box3 } from "./Components/Box3";
import { Box4 } from "./Components/Box4";

export const Main = () => {
  return (
    <Flex flexDir={"column"} alignItems={"center"} gap={4} mt={6} mb={10}>
      <Box1 />
      <Box2 />
      <Box3 />
      <Box4 />
    </Flex>
  );
};
