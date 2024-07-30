// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Interface for the Oracle contract
interface IOracle {
    struct OracleData {
        string value;
        uint256 blockNumber;
    }

    function oracleValues(string calldata key) external view returns (string memory value, uint256 blockNumber);
}

interface IUSDCToken is IERC20 {
    function mint(address to, uint256 amount) external returns (bool);
}

interface IBTCToken is IERC20 {
    function mint(address to, uint256 amount) external returns (bool);
}

contract OracleClient {
    IOracle public oracle;
    IUSDCToken public usdcToken;
    IBTCToken public btcToken;

    string constant BTC_USD = "BTC/USD";

    // Constructor to set the Oracle contract address
    constructor(address oracleAddress, address usdcAddress, address btcAddress) {
        oracle = IOracle(oracleAddress);
        usdcToken = IUSDCToken(usdcAddress);
        btcToken = IBTCToken(btcAddress);
    }

    // Function to fetch the BTC/USD value
    function fetchBTCValue() public view returns (uint256) {
        (string memory btcValueStr, ) = oracle.oracleValues(BTC_USD);
        uint256 btcValue = parseInt(btcValueStr);
        require(btcValue > 0, "Oracle returned invalid BTC value");
        return btcValue;
    }

    // Function to swap USDC to BTC
    function swapUSDCtoBTC(uint256 usdcAmount) public {
        uint256 btcValue = fetchBTCValue();
        require(btcValue > 0, "Invalid BTC value from Oracle");

        uint256 btcAmount = usdcAmount / btcValue;
        require(btcAmount > 0, "Insufficient USDC amount for swap");

        require(usdcToken.transferFrom(msg.sender, address(this), usdcAmount), "USDC transfer failed");

        bool mintSuccess = btcToken.mint(address(this), btcAmount);
        require(mintSuccess, "BTC mint to contract failed");

        require(btcToken.transfer(msg.sender, btcAmount), "BTC transfer to user failed");

        emit SwapUSDCtoBTC(msg.sender, usdcAmount, btcAmount);
    }

    // Function to swap BTC to USDC
    function swapBTCtoUSDC(uint256 btcAmount) public {
        uint256 btcValue = fetchBTCValue();
        require(btcValue > 0, "Invalid BTC value from Oracle");

        uint256 usdcAmount = btcAmount * btcValue;
        require(usdcAmount > 0, "Insufficient BTC amount for swap");

        require(btcToken.transferFrom(msg.sender, address(this), btcAmount), "BTC transfer failed");

        bool mintSuccess = usdcToken.mint(address(this), usdcAmount);
        require(mintSuccess, "USDC mint to contract failed");

        require(usdcToken.transfer(msg.sender, usdcAmount), "USDC transfer to user failed");

        emit SwapBTCtoUSDC(msg.sender, btcAmount, usdcAmount);
    }

    // Helper function to parse string to uint256
    function parseInt(string memory _a) internal pure returns (uint256) {
        bytes memory bresult = bytes(_a);
        uint256 mint = 0;
        for (uint i = 0; i < bresult.length; i++) {
            if ((uint8(bresult[i]) >= 48) && (uint8(bresult[i]) <= 57)) {
                mint = mint * 10 + (uint8(bresult[i]) - 48);
            }
        }
        return mint;
    }

    // Event logs for debugging
    event SwapUSDCtoBTC(address indexed user, uint256 usdcAmount, uint256 btcAmount);
    event SwapBTCtoUSDC(address indexed user, uint256 btcAmount, uint256 usdcAmount);
}