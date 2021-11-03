pragma solidity ^0.8.0;

import './interfaces/IUniswapV2Factory.sol';
import './interfaces/IUniswapV2Pair.sol';
import './interfaces/IERC20.sol';

contract Chipper {
    constructor() {

    }

    function chip(address tokenAddress, uint256 tokenAmount) public {

    }

    function getPrice(address tokenA, address tokenB) public {
        string memory nameA = IERC20(tokenA).name();
        string memory nameB = IERC20(tokenB).name();
        address pair = IUniswapV2Factory(0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f).getPair(tokenA, tokenB);
        require(pair != address(0x0), "Invalid pair specified");
        (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast) = IUniswapV2Pair(pair).getReserves();

    }
}
