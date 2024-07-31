// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@openzeppelin/contracts/utils/math/Math.sol";

// interface IOracle {
//     function oracleValues(string memory key) external view returns (string memory value, uint256 blockNumber);
// }

// contract TokenSwap {

//     IERC20 public wbtc;
//     IERC20 public weth;
//     IERC20 public usdc;
//     IOracle public oracle;
//     string public constant ORACLE_KEY_BTC = "BTC/USD";
//     string public constant ORACLE_KEY_ETH = "ETH/USD";
//     uint256 public constant DECIMALS = 18;
//     uint256 public constant FIXED_USDC_PRICE = 1 * 10**DECIMALS;

//     constructor(IERC20 _wbtc, IERC20 _weth, IERC20 _usdc, IOracle _oracle) {
//         wbtc = _wbtc;
//         weth = _weth;
//         usdc = _usdc;
//         oracle = _oracle;
//     }

//     function _getPriceFromOracle(string memory key) internal view returns (uint256) {
//         (string memory priceStr,) = oracle.oracleValues(key);
//         return _stringToUint(priceStr);
//     }

//     function _stringToUint(string memory s) internal pure returns (uint256) {
//         bytes memory b = bytes(s);
//         uint256 result = 0;
//         bool decimalPoint = false;
//         uint256 decimalPlaces = 0;

//         for (uint256 i = 0; i < b.length; i++) {
//             if (b[i] >= 0x30 && b[i] <= 0x39) {
//                 result = result * 10 + (uint256(uint8(b[i])) - 48);
//                 if (decimalPoint) {
//                     decimalPlaces++;
//                 }
//             } else if (b[i] == 0x2E) {
//                 decimalPoint = true;
//             }
//         }

//         // Adjust the result to have 18 decimal places
//         if (decimalPlaces < DECIMALS) {
//             result = result * (10**(DECIMALS - decimalPlaces));
//         } else if (decimalPlaces > DECIMALS) {
//             result = result / (10**(decimalPlaces - DECIMALS));
//         }

//         return result;
//     }

//     function swapWBTCToUSDC(uint256 amountWBTC) external returns (uint256) {
//         uint256 priceWBTC = _getPriceFromOracle(ORACLE_KEY_BTC);
//         uint256 amountUSDC = amountWBTC.mul(priceWBTC).div(FIXED_USDC_PRICE);

//         require(wbtc.transferFrom(msg.sender, address(this), amountWBTC), "WBTC transfer failed");
//         require(usdc.transfer(msg.sender, amountUSDC), "USDC transfer failed");

//         return amountUSDC;
//     }

//     function swapWETHToUSDC(uint256 amountWETH) external returns (uint256) {
//         uint256 priceWETH = _getPriceFromOracle(ORACLE_KEY_ETH);
//         uint256 amountUSDC = amountWETH.mul(priceWETH).div(FIXED_USDC_PRICE);

//         require(weth.transferFrom(msg.sender, address(this), amountWETH), "WETH transfer failed");
//         require(usdc.transfer(msg.sender, amountUSDC), "USDC transfer failed");

//         return amountUSDC;
//     }

//     function swapUSDCToWBTC(uint256 amountUSDC) external returns (uint256) {
//         uint256 priceWBTC = _getPriceFromOracle(ORACLE_KEY_BTC);
//         uint256 amountWBTC = amountUSDC.mul(FIXED_USDC_PRICE).div(priceWBTC);

//         require(usdc.transferFrom(msg.sender, address(this), amountUSDC), "USDC transfer failed");
//         require(wbtc.transfer(msg.sender, amountWBTC), "WBTC transfer failed");

//         return amountWBTC;
//     }

//     function swapUSDCToWETH(uint256 amountUSDC) external returns (uint256) {
//         uint256 priceWETH = _getPriceFromOracle(ORACLE_KEY_ETH);
//         uint256 amountWETH = amountUSDC.mul(FIXED_USDC_PRICE).div(priceWETH);

//         require(usdc.transferFrom(msg.sender, address(this), amountUSDC), "USDC transfer failed");
//         require(weth.transfer(msg.sender, amountWETH), "WETH transfer failed");

//         return amountWETH;
//     }
// }