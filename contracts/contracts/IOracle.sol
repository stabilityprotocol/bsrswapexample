// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IOracle {
    struct OracleData {
        string value;
        uint256 blockNumber;
    }

    event ValueSet(string key, string value, uint256 blockNumber);

    function oracleValues(
        string calldata key
    ) external view returns (string memory value, uint256 blockNumber);

    function setValue(string calldata key, string calldata value) external;
}
