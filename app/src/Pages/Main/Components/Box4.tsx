import {
  Box,
  Heading,
  InputGroup,
  Input,
  Text,
  InputRightAddon,
} from "@chakra-ui/react";

export const Box4 = () => {
  return (
    <Box p={4} w={["100vw", "xl"]} bg={"gray.700"} borderRadius={4}>
      <Box>
        <Heading size="md">Swap Contract Rewards</Heading>
        <Text mt={2}>
          These are the rewards that the Smart Contract is accruing with every
          interaction. The owner of the Smart Contract could claim them anytime.
          Do a swap to check how the rewards are changing.
        </Text>

        <InputGroup mt={4}>
          <Input variant={"filled"} color={"gray.300"} value={"1000.32"} />
          <InputRightAddon>stbleUSD</InputRightAddon>
        </InputGroup>
      </Box>
    </Box>
  );
};
