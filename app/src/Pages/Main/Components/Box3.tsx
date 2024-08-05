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
  useToast,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import {
  useAccount,
  useBalance,
  useConnect,
  useReadContract,
  useToken,
} from "wagmi";
import {
  CONTRACT_ADDRESS,
  tokenAddressMap,
  useSwap,
} from "../../../Hooks/useSwap";
import { SwapABI } from "../../../lib/ABI/Swap";
import { Address, zeroAddress } from "viem";
import { TokenABI } from "../../../lib/ABI/Token";

export const Box3 = () => {
  const { address } = useAccount();
  const [amount0, setAmount0] = useState("1000");
  const [from, setFrom] = useState<Address>(tokenAddressMap["stbleUSD"]);
  const [to, setTo] = useState<Address>(tokenAddressMap["Bitcoin"]);
  const { swap, approve } = useSwap();
  const toast = useToast();
  const { connect, connectors } = useConnect();

  const token0 = useBalance({
    token: from,
    address,
  });

  const token1 = useBalance({
    token: to,
    address,
  });

  const tokenInfo0 = useToken({
    address: from,
  });

  const tokenInfo1 = useToken({
    address: to,
  });

  const amountsOut = useReadContract({
    abi: SwapABI,
    address: CONTRACT_ADDRESS,
    functionName: "amountsOut",
    args: [BigInt(Number(amount0) * 1e18), 2, 0],
  });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    abi: TokenABI,
    address: from,
    functionName: "allowance",
    args: [address ?? zeroAddress, CONTRACT_ADDRESS],
  });

  const normalizedAmountsOut = useMemo(() => {
    if (!amountsOut.data) return "Loading...";
    return (Number(amountsOut.data) / 1e18).toString();
  }, [amountsOut]);

  const hasAllowance = useMemo(() => {
    if (!allowance) return false;
    return allowance >= BigInt(Number(amount0) * 1e18);
  }, [allowance, amount0]);

  useEffect(() => {
    if (!address) return;
    token0.refetch();
    token1.refetch();
  }, [address, token1, token0]);

  const onApprove = async () => {
    if (!address) {
      connect({
        connector: connectors[0],
      });
      toast({
        title: "Please connect your wallet",
        description: "You need to connect your wallet to approve",
      });
      return;
    }
    const p = approve(BigInt(Number(amount0) * 1e18), from);
    toast.promise(p, {
      loading: { title: "Approving...", description: "Please wait." },
      success: {
        title: "Approved",
        description: "You can now swap.",
      },
      error: { title: "Error", description: "Could not approve." },
    });

    await p.then(() => {
      refetchAllowance();
    });
  };

  const onSwap = async () => {
    if (!address) {
      connect({
        connector: connectors[0],
      });
      toast({
        title: "Please connect your wallet",
        description: "You need to connect your wallet to swap",
      });
      return;
    }
    const p = swap(BigInt(Number(amount0) * 1e18), from, to);
    toast.promise(p, {
      loading: { title: "Swapping...", description: "Please wait." },
      success: {
        title: "Swapped",
        description: "You have successfully swapped your tokens.",
      },
      error: { title: "Error", description: "Could not swap." },
    });
    await p.then(() => {
      token0.refetch();
      token1.refetch();
    });
  };

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
          <Text
            fontSize={"sm"}
            onClick={() => setAmount0(token0.data?.formatted ?? "0")}
            cursor={"pointer"}
          >
            Your {tokenInfo0.data?.symbol} balance:{" "}
            <b>{token0.data?.formatted ?? 0}</b>
          </Text>
        </Flex>
        <InputGroup>
          <Input
            variant={"filled"}
            color={"gray.300"}
            placeholder="Amount of stbleUSD"
            value={amount0}
            onChange={(e) => setAmount0(e.target.value)}
          />
          <InputRightAddon>{tokenInfo0.data?.symbol}</InputRightAddon>
        </InputGroup>
      </Box>
      <Box mt={6}>
        <Flex justifyContent={"space-between"}>
          <Text fontSize={"sm"}>You will receive</Text>
          <Text fontSize={"sm"}>
            Your {tokenInfo1.data?.symbol} balance:{" "}
            <b>{token1.data?.formatted ?? 0}</b>
          </Text>
        </Flex>
        <InputGroup>
          <Input
            variant={"filled"}
            color={"gray.300"}
            value={normalizedAmountsOut}
            placeholder="You will receive"
          />
          <InputRightAddon>{tokenInfo1.data?.symbol}</InputRightAddon>
        </InputGroup>
      </Box>
      <Box mt={4}>
        {hasAllowance ? (
          <Button colorScheme="teal" w={"100%"} onClick={() => onSwap()}>
            Swap
          </Button>
        ) : (
          <Button colorScheme="teal" w={"100%"} onClick={() => onApprove()}>
            Approve
          </Button>
        )}
      </Box>
    </Box>
  );
};
