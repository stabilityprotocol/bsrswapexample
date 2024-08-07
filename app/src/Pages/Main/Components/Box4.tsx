import {
  Box,
  Heading,
  InputGroup,
  Input,
  Text,
  InputRightAddon,
} from "@chakra-ui/react";
import { useBSR } from "../../../Hooks/useBSR";
import { useEffect, useMemo } from "react";

export const Box4 = () => {
  const { getUsdRewards } = useBSR();

  const rewards = useMemo(() => {
    const currRewards = getUsdRewards?.data ?? 0n;
    if (currRewards === 0n) return "0";
    return (Number(currRewards) / 1e18).toString();
  }, [getUsdRewards]);

  useEffect(() => {
    const fn = (ev: MessageEvent) => {
      try {
        const data = JSON.parse(ev.data) as { type: string };
        if (data.type !== "update") return;
        setTimeout(() => {
          getUsdRewards.refetch();
        }, 2_000);
      } catch (e) {
        // do nothing
      }
    };
    window.addEventListener("message", fn);

    return () => {
      window.removeEventListener("message", fn);
    };
  }, [getUsdRewards]);

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
          <Input variant={"filled"} color={"gray.300"} value={rewards} />
          <InputRightAddon>stbleUSD</InputRightAddon>
        </InputGroup>
      </Box>
    </Box>
  );
};
