import { Address, createWalletClient, getContract, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { stbleTestnet } from "../lib/config";
import { TokenABI } from "../lib/ABI/Token";
import { waitForTransactionReceipt } from "viem/actions";
import { tokenAddressMap } from "./useSwap";

// 0x130cD1ab4eb857C6Ec878AB20637e26c8dA7a2c8
const PK =
  "0x2601a2b0e7d08accfbb4210edb6920e2d789d37cf2479bb2fae1a758a586424e" as const;

const account = createWalletClient({
  account: privateKeyToAccount(PK),
  chain: stbleTestnet,
  transport: http(),
});

const contract = getContract({
  address: tokenAddressMap["stbleUSD"],
  abi: TokenABI,
  client: {
    wallet: account,
  },
});

export const useClaimTokens = () => {
  const claim = async (to: Address) => {
    const call = await contract.write.transfer([to, BigInt(100_000 * 1e18)], {
      gasPrice: 0n,
    });
    return waitForTransactionReceipt(account, {
      hash: call,
      confirmations: 2,
    });
  };

  return {
    claim,
  };
};
