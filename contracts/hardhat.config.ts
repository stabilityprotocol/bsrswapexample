import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ignition-ethers";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    stabletestnet: {
      url: "https://free.testnet.stabilityprotocol.com/zgt/othw108bixk1",
      accounts: [],
      hardfork: "shanghai",
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
};

export default config;
