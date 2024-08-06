import { dedicatedWalletConnector } from "@magiclabs/wagmi-connector";
import { defineChain } from "viem";
import { http, createConfig } from "wagmi";

export const stbleTestnet = defineChain({
  id: 20180427,
  name: "Stability Testnet",
  network: "stability-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "FREE",
    symbol: "FREE",
  },
  testnet: true,
  blockExplorers: {
    default: {
      name: "Stability Testnet",
      url: "https://stability-testnet.blockscout.com/",
    },
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.stabilityprotocol.com"],
    },
    public: {
      http: ["https://testnet.stabilityprotocol.com"],
    },
  },
  contracts: {
    multicall3: {
      // https://raw.githubusercontent.com/mds1/multicall/main/src/Multicall3.sol
      address: "0xE7a1350378C3f6E5DcEA9084120894bA86784CFd",
      blockCreated: 6534150,
    },
  },
});

export const freeStbleTestnet = defineChain({
  ...stbleTestnet,
  rpcUrls: {
    default: {
      http: ["https://free.testnet.stabilityprotocol.com"],
    },
    public: {
      http: ["https://free.testnet.stabilityprotocol.com"],
    },
  },
});

export const config = createConfig({
  chains: [stbleTestnet],
  transports: {
    [stbleTestnet.id]: http(),
  },
  connectors: [
    dedicatedWalletConnector({
      chains: [stbleTestnet],
      options: {
        isDarkMode: true,
        apiKey: "pk_live_A7D553780EB5FC1A",
        magicSdkConfiguration: {
          network: {
            rpcUrl: stbleTestnet.rpcUrls.public.http[0],
            chainId: stbleTestnet.id,
          },
        },
      },
    }),
  ],
});
