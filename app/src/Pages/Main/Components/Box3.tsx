import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Text,
  Link,
  Flex,
  InputGroup,
  Input,
  InputRightAddon,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { useSwap } from "../../../Hooks/useSwap";

export const Box3 = () => {
  const [swapValue, setSwapValue] = useState("");
  console.log("🚀 ~ Box3 ~ swapValue:", swapValue);
  const { address } = useAccount();
  const token0 = useBalance({
    token: "0x889bFD186352032376ECb29b115DE606Bb7B3fA6",
    address,
  });
  const token1 = useBalance({
    token: "0x2D88E769f1C7D1b37E30657f55d158EF394EBDBa",
    address,
  });
  const { staticSwap } = useSwap();

  useEffect(() => {
    if (!address) return;
    token0.refetch();
    token1.refetch();
  }, [address, token1, token0]);

  useEffect(() => {
    staticSwap(100000000n, "stbleUSD", "Bitcoin").then((value) => {
      console.log("🚀 ~ staticSwap ~ value:", value);
      setSwapValue(value.toString());
    });
  }, [staticSwap]);

  return (
    <Box p={4} w={["100vw", "xl"]} bg={"gray.700"} borderRadius={4}>
      <Heading size="md">Swap</Heading>
      <Text mt={2}>
        You can swap your stbleUSD for any other token in the network. The swap
        will be done at the current market rate, you can check the prices in our{" "}
        <Link href="https://oracles.stabilityprotocol.com" isExternal>
          Oracle demo <ExternalLinkIcon mx="2px" />
        </Link>
        .
      </Text>
      <Box mt={4}>
        <Flex justifyContent={"space-between"}>
          <Text fontSize={"sm"}>You will send</Text>
          <Text fontSize={"sm"}>
            Your {token0.data?.symbol} balance:{" "}
            <b>{token0.data?.formatted ?? 0}</b>
          </Text>
        </Flex>
        <InputGroup>
          <Input
            variant={"filled"}
            color={"gray.300"}
            placeholder="Amount of stbleUSD"
            value={"1"}
          />
          <InputRightAddon>stbleUSD</InputRightAddon>
        </InputGroup>
      </Box>
      <Box mt={6}>
        <Flex justifyContent={"space-between"}>
          <Text fontSize={"sm"}>You will receive</Text>
          <Text fontSize={"sm"}>
            Your {token1.data?.symbol} balance:{" "}
            <b>{token1.data?.formatted ?? 0}</b>
          </Text>
        </Flex>
        <InputGroup>
          <Input
            variant={"filled"}
            color={"gray.300"}
            value={"65000"}
            placeholder="You will receive"
          />
          <InputRightAddon>Bitcoin</InputRightAddon>
        </InputGroup>
      </Box>
      <Box mt={4}>
        <Button colorScheme="teal" w={"100%"}>
          Swap stbleUSD for Bitcoin
        </Button>
      </Box>
    </Box>
  );
};
