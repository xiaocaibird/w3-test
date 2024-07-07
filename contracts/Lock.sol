// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {
    bool public isLockAndAllowAdd = true;
    address payable public owner;

    event Withdrawal(uint amount, uint when);
    event UnLock(uint amount, uint when);

    constructor() payable {
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(!isLockAndAllowAdd, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }

    function unlock() public {
        require(isLockAndAllowAdd, 'is not lock!!!');
        require(msg.sender == owner, "You aren't the owner");

        emit UnLock(address(this).balance, block.timestamp);

        isLockAndAllowAdd = false;
    }

    function add() public payable {
        require(isLockAndAllowAdd, 'can not add!!!');
    }
}
