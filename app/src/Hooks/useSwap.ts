import { useClient, useWriteContract } from "wagmi";
import { SwapABI } from "../lib/ABI/Swap";
import { Address } from "viem";
import { TokenABI } from "../lib/ABI/Token";
import { waitForTransactionReceipt } from "viem/actions";

export const CONTRACT_ADDRESS = "0xE22718ab9bceCBC12aEfB276C813f590CFA6a982";

export type Token = "stbleUSD" | "Bitcoin" | "Ethereum";

const tokenMap: Record<Token, number> = {
  stbleUSD: 2,
  Bitcoin: 0,
  Ethereum: 1,
};

export const tokenAddressMap: Record<Token, Address> = {
  stbleUSD: "0x85A923fb1d9FbC590B9615038217e117C790Bcb5",
  Bitcoin: "0xdF86b1D12C34fBCC1b6D2A307B96Bdb4bf979c44",
  Ethereum: "0xDECb0221A80602f621ae3B771B28423496a2CC2a",
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
    }).then((tx) => {
      return waitForTransactionReceipt(publicClient, {
        hash: tx,
        confirmations: 3,
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
    }).then((tx) => {
      return waitForTransactionReceipt(publicClient, {
        hash: tx,
        confirmations: 3,
      });
    });
  };

  return { swap, approve };
};
