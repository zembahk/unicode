pragma solidity ^0.8.0;

interface IChipper {
    function chip(address tokenAddress, uint256 tokenAmount) external;
    function getPrice(address tokenA, address tokenB) external;
}
