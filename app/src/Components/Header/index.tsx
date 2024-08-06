import StabilityWhite from "../../assets/stability-white.svg";
import { Flex, Box } from "@chakra-ui/react";
import { AccountWidget } from "../AccountWidget";

export const Header = () => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      p={4}
      w={"100vw"}
      borderBottom={1}
      borderColor="gray.700"
      borderStyle={"solid"}
    >
      <Box width={"100%"}>
        <img src={StabilityWhite} alt="Stability White" />
      </Box>
      <Box width={"100%"} display={"flex"} justifyContent={"flex-end"}>
        <AccountWidget />
      </Box>
    </Flex>
  );
};
