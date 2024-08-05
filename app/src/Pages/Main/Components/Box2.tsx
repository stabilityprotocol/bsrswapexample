import { Box, Text, Heading, Button, useToast } from "@chakra-ui/react";
import { useClaimTokens } from "../../../Hooks/useClaimTokens";
import { useAccount } from "wagmi";

export const Box2 = () => {
  const { address } = useAccount();
  const { claim } = useClaimTokens();
  const toast = useToast();

  return (
    <Box p={4} w={["100vw", "xl"]} bg={"gray.700"} borderRadius={4}>
      <Heading size="md">Claim your Gas Token</Heading>
      <Text mt={2}>
        These transactions are not free. You need to pay gas fees to claim your
        rewards. To help you with that, we have created <b>stbleUSD</b>, our gas
        token for this demo. You can claim your Gas Token by clicking the button
        below.
      </Text>
      <Box mt={4} textAlign={"center"}>
        <Button
          colorScheme="teal"
          onClick={() => {
            if (!address) {
              toast({
                title: "Connect your wallet",
                description:
                  "Please connect your wallet first to claim stbleUSD",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
              return;
            }
            const p = claim(address);
            toast.promise(p, {
              loading: {
                title: "Claiming stbleUSD",
                description: "Please wait...",
              },
              success: {
                title: "stbleUSD claimed",
                description:
                  "You have successfully claimed stbleUSD, your balance will be updated soon",
              },
              error: {
                title: "Error claiming stbleUSD",
                description: "There was an error claiming stbleUSD",
              },
            });
          }}
        >
          Claim stbleUSD
        </Button>
      </Box>
    </Box>
  );
};
