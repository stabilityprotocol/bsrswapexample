import { useClient, useWriteContract } from "wagmi";
import { SwapABI } from "../lib/ABI/Swap";
import { Address, parseGwei } from "viem";
import { TokenABI } from "../lib/ABI/Token";
import { waitForTransactionReceipt } from "viem/actions";

export const CONTRACT_ADDRESS = "0x37238DBA48b66EF982b40245483C16B9fd164BEE";

export type Token = "stbleUSD" | "Bitcoin" | "Ethereum";

const tokenMap: Record<Token, number> = {
  stbleUSD: 2,
  Bitcoin: 0,
  Ethereum: 1,
};

export const tokenAddressMap: Record<Token, Address> = {
  stbleUSD: "0x73138793af75b21682af47DDCD1d078F2E570D2A",
  Bitcoin: "0x9Bc447B589Fa4Fbde8d0037e472a1AFba1Cf8a48",
  Ethereum: "0x02FA900A4b0eBBe3660d9B7EAdf1397C3E464F08",
};

export const useSwap = () => {
  const { writeContractAsync } = useWriteContract();
  const publicClient = useClient();

  const approve = async (amount: bigint, token: Address) => {
    if (!publicClient) throw new Error("Client not initialized");
    return writeContractAsync({
      abi: TokenABI,
      address: token,
      functionName: "approve",
      args: [CONTRACT_ADDRESS, amount],
      maxFeePerGas: parseGwei("1"),
    }).then((tx) => {
      return waitForTransactionReceipt(publicClient, {
        hash: tx,
        confirmations: 2,
      });
    });
  };

  const swap = async (amount: bigint, fromToken: Address, toToken: Address) => {
    if (!publicClient) throw new Error("Client not initialized");
    const toTokenName = Object.keys(tokenAddressMap).find((key) => {
      const k = key as Token;
      return tokenAddressMap[k] === toToken;
    }) as Token;
    const fromTokenName = Object.keys(tokenAddressMap).find((key) => {
      const k = key as Token;
      return tokenAddressMap[k] === fromToken;
    }) as Token;
    return writeContractAsync({
      abi: SwapABI,
      address: CONTRACT_ADDRESS,
      functionName: "swap",
      args: [amount, tokenMap[fromTokenName], tokenMap[toTokenName]],
      maxFeePerGas: parseGwei("1"),
    }).then((tx) => {
      return waitForTransactionReceipt(publicClient, {
        hash: tx,
        confirmations: 2,
      });
    });
  };

  return { swap, approve };
};
