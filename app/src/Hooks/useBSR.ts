import { useReadContract } from "wagmi";
import { FeeRewardsVaultStoreABI } from "../lib/ABI/BSR";
import { CONTRACT_ADDRESS as SwapAddress, tokenAddressMap } from "./useSwap";

const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000807";

export const useBSR = () => {
  const getUsdRewards = useReadContract({
    abi: FeeRewardsVaultStoreABI,
    address: CONTRACT_ADDRESS,
    functionName: "getClaimableReward",
    args: [SwapAddress, tokenAddressMap["stbleUSD"]],
  });

  return { getUsdRewards };
};
