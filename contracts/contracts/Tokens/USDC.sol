// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract USDC is ERC20, Ownable {
    uint256 public constant FIFTY_USDC = 50 * 10**18;

    constructor() ERC20("USDC", "USDC") Ownable(msg.sender) {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // Public mint function to mint $50 USDC
    function mintFiftyUSDC() external {
        _mint(msg.sender, FIFTY_USDC);
    }
}