import { Address, createWalletClient, getContract, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { stbleTestnet } from "../lib/config";
import { TokenABI } from "../lib/ABI/Token";
import { waitForTransactionReceipt } from "viem/actions";

// 0x130cD1ab4eb857C6Ec878AB20637e26c8dA7a2c8
const PK =
  "0x2601a2b0e7d08accfbb4210edb6920e2d789d37cf2479bb2fae1a758a586424e" as const;

const account = createWalletClient({
  account: privateKeyToAccount(PK),
  chain: stbleTestnet,
  transport: http(),
});

const contract = getContract({
  address: "0x889bFD186352032376ECb29b115DE606Bb7B3fA6",
  abi: TokenABI,
  client: {
    wallet: account,
  },
});

export const useClaimTokens = () => {
  const claim = async (to: Address) => {
    const call = await contract.write.transfer([to, 1000000000000000000n], {
      gasPrice: 0n,
    });
    return waitForTransactionReceipt(account, {
      hash: call,
    });
  };

  return {
    claim,
  };
};
