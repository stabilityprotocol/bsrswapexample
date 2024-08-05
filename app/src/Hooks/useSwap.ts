import { useWriteContract } from "wagmi";
import { SwapABI } from "../lib/ABI/Swap";
import { simulateContract } from "wagmi/actions";
import { config } from "../lib/config";

// const CONTRACT_ADDRESS = "0x826d40723C06D3cFC7dD1180fb4178711Caf27e2";
const CONTRACT_ADDRESS = "0xC26CeeFd4e58288e44CDC445D23D43D5202983f9";

export type Token = "stbleUSD" | "Bitcoin" | "Ethereum";

const tokenMap: Record<Token, number> = {
  stbleUSD: 0,
  Bitcoin: 1,
  Ethereum: 2,
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
