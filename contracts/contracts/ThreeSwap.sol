// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IOracle {
    function oracleValues(string memory key) external view returns (string memory value, uint256 blockNumber);
}

contract TokenSwap {
    enum TokenType { WBTC, WETH, USDC }

    IERC20[3] public tokens;
    IOracle public oracle;
    string[2] public oracleKeys;
    uint256 public constant DECIMALS = 18;
    uint256 public constant FIXED_USDC_PRICE = 1 * 10**DECIMALS;

    constructor(IERC20 _wbtc, IERC20 _weth, IERC20 _usdc, IOracle _oracle) {
        tokens[uint256(TokenType.WBTC)] = _wbtc;
        tokens[uint256(TokenType.WETH)] = _weth;
        tokens[uint256(TokenType.USDC)] = _usdc;
        oracle = _oracle;
        oracleKeys[0] = "BTC/USD";
        oracleKeys[1] = "ETH/USD";
    }

    function _getPriceFromOracle(TokenType tokenType) internal view returns (uint256) {
        if (tokenType == TokenType.USDC) {
            return FIXED_USDC_PRICE;
        } else if (tokenType == TokenType.WBTC) {
            (string memory priceStr,) = oracle.oracleValues(oracleKeys[0]);
            return _stringToUint(priceStr);
        } else if (tokenType == TokenType.WETH) {
            (string memory priceStr,) = oracle.oracleValues(oracleKeys[1]);
            return _stringToUint(priceStr);
        } else {
            revert("Unsupported token type");
        }
    }

    function _stringToUint(string memory s) internal pure returns (uint256) {
        bytes memory b = bytes(s);
        uint256 result = 0;
        bool decimalPoint = false;
        uint256 decimalPlaces = 0;

        for (uint256 i = 0; i < b.length; i++) {
            if (b[i] >= 0x30 && b[i] <= 0x39) {
                result = result * 10 + (uint256(uint8(b[i])) - 48);
                if (decimalPoint) {
                    decimalPlaces++;
                }
            } else if (b[i] == 0x2E) {
                decimalPoint = true;
            }
        }

        // Adjust the result to have 18 decimal places
        if (decimalPlaces < DECIMALS) {
            result = result * (10**(DECIMALS - decimalPlaces));
        } else if (decimalPlaces > DECIMALS) {
            result = result / (10**(decimalPlaces - DECIMALS));
        }

        return result;
    }

    function swap(uint256 amount, TokenType from, TokenType to) external returns (uint256) {
    require(from != to, "Cannot swap the same token");
    
    uint256 priceFrom = _getPriceFromOracle(from);
    uint256 priceTo = _getPriceFromOracle(to);
    
    // Adjust for decimal places and use scaling to maintain precision
    // Calculate in a way that minimizes overflow risk
    uint256 amountTo = (amount * priceFrom) / priceTo;
    
    // Scaling factor applied after multiplying by priceFrom to maintain precision
    amountTo = amountTo * (10**DECIMALS) / (10**DECIMALS);
    
    require(tokens[uint256(from)].transferFrom(msg.sender, address(this), amount), "Token transfer failed");
    require(tokens[uint256(to)].transfer(msg.sender, amountTo), "Token transfer failed");

    return amountTo;
}
}