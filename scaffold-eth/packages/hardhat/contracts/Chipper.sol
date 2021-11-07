pragma solidity ^0.8.0;

import './interfaces/IUniswapV2Factory.sol';
import './interfaces/IUniswapV2Pair.sol';
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Chipper {

    address public uniswapFactory;
    address public uniswapRouter;

    /*event Chipped*/

    constructor(address _uniFactory, address _uniRouter, address _hoge) {
        uniswapFactory = _uniFactory;
        uniswapRouter = _uniRouter;
        hoge = _hoge;
    }

    function chip(address tokenAddress, uint256 tokenAmount) public {

        uint256 half = (tokenAmount / 2) - 1;

        // Transfer coins to contract
        IERC20Metadata(tokenAddress).transferFrom(msg.sender, this);
        // Approve router
        IERC20Metadata(tokenAddress).approve(uniswapRouter, tokenAmount);

        // Convert tokens to eth
        address[] memory path = new address[](2);
        path[0] = tokenAddress;
        path[1] = UniswapV2Router02.WETH();

        uint amountMinOut = UniswapV2Library.getAmountsOut(tokenAmount, path);
        UniswapV2Router02.swapExactTokensForETH(tokenAmount, amountMinOut, path, address(this), block.timestamp);


    }

    function getPrice(address tokenA, address tokenB) public {
        string memory nameA = IERC20Metadata(tokenA).name();
        string memory nameB = IERC20Metadata(tokenB).name();
        address pair = IUniswapV2Factory(uniswapFactory).getPair(tokenA, tokenB);
        require(pair != address(0x0), "Invalid pair specified");
        (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast) = IUniswapV2Pair(pair).getReserves();

    }
}
