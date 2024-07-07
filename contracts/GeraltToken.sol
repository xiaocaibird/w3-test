// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract GeraltToken is ERC20 {
    address private _owner;

    constructor(uint256 initialSupply) ERC20('GeraltToken', 'GERALTTK') {
        _owner = msg.sender;
        _mint(_owner, initialSupply);
    }

    function mint(uint256 supply) public {
        require(msg.sender == _owner, 'must owner!!!');
        _mint(_owner, supply);
    }
}
