import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const deployment = buildModule("TokenSwap", (m) => {
  const usdc = m.contract("USDC", []);
  const wbtc = m.contract("WBTC", []);
  const weth = m.contract("WETH", []);
  // Fixed Oracle address
  const oracleAddress = "0xC26CeeFd4e58288e44CDC445D23D43D5202983f9";

  // Deploy TokenSwap
  const threeSwap = m.contract("Swap", [wbtc, weth, usdc, oracleAddress]);

  // Mint 1,000,000,000 tokens and send to TokenSwap
  const mintAmount = parseInt("1000000000", 18); // 1,000,000,000 with 18 decimals

  m.call(usdc, "mint", [threeSwap, mintAmount]);
  console.log("Minted USDC");
  m.call(wbtc, "mint", [threeSwap, mintAmount]);
  console.log("Minted WBTC");
  m.call(weth, "mint", [threeSwap, mintAmount]);
  console.log("Minted WETH");
  console.log("Deployment complete");
  return { threeSwap };
});

export default deployment;
