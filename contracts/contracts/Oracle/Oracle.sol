// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Oracle {
    struct OracleData {
        string value;
        uint256 blockNumber;
    }

    mapping(string => OracleData) public oracleValues;

    event ValueSet(string key, string value, uint256 blockNumber);

    function setValue(string memory key, string memory value) public  {
        require(bytes(key).length > 0, "Key cannot be empty");
        require(bytes(value).length > 0, "Value cannot be empty");
        oracleValues[key] = OracleData(value, block.number);
        emit ValueSet(key, value, block.number);
    }
}