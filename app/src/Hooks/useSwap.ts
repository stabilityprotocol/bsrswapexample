import { useWriteContract } from "wagmi";
import { SwapABI } from "../lib/ABI/Swap";
import { simulateContract } from "wagmi/actions";
import { config } from "../lib/config";

const CONTRACT_ADDRESS = "0x3b587D5921745E6E772A4a6C78E20E3803365b0b";

export type Token = "stbleUSD" | "Bitcoin" | "Ethereum";

const tokenMap: Record<Token, number> = {
  stbleUSD: 0,
  Bitcoin: 1,
  Ethereum: 2,
};

export const tokenAddressMap = {
  stbleUSD: "0x85A923fb1d9FbC590B9615038217e117C790Bcb5",
  Bitcoin: "0xdF86b1D12C34fBCC1b6D2A307B96Bdb4bf979c44",
  Ethereum: "0xDECb0221A80602f621ae3B771B28423496a2CC2a",
};

export const useSwap = () => {
  const { writeContract } = useWriteContract();

  const staticSwap = async (
    amount: bigint,
    fromToken: Token,
    toToken: Token
  ) => {
    const call = await simulateContract(config, {
      abi: SwapABI,
      address: CONTRACT_ADDRESS,
      functionName: "swap",
      args: [amount, tokenMap[fromToken], tokenMap[toToken]],
    });
    return call;
  };

  const swap = async (amount: bigint, fromToken: Token, toToken: Token) => {
    const call = await writeContract({
      abi: SwapABI,
      address: CONTRACT_ADDRESS,
      functionName: "swap",
      args: [amount, tokenMap[fromToken], tokenMap[toToken]],
    });
    return call;
  };

  return { swap, staticSwap };
};
