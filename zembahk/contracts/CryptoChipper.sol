// contracts/CryptoChipper.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";



contract CryptoChipper is ERC1155, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    struct NFT {
        uint256 index;
        address creator;
        bytes32 blockMade;
    }

    NFT[] private madeNfts;
      
    event newMint(uint256 token_id, address creator, bytes32 blockMade);
    event chipped(address creator, uint256 token_type, uint256 amount);
    
    constructor () ERC1155("https://zbmeaegcn0vy.usemoralis.com/json/{id}.json") { }
      
    function createNFT(address account) internal {
        require(msg.sender == account, "Sender not authorized.");
        _tokenIds.increment();
        uint256 newId = _tokenIds.current();
        _mint(account, newId, 1, "");
        madeNfts.push(NFT(newId, account, blockhash(block.number - 1)));
        emit newMint(newId, account, blockhash(block.number - 1));
      }
    
    function chipper(address account, uint256 id, uint256 amount) public {
        require(msg.sender == account, "Sender not authorized.");
        require(balanceOf(account, id) > 0, "No tokens found");
        _burn(account, id, amount);
        emit chipped(account, id, amount);
        createNFT(account);
    }
    
    function getCreator(uint256 index) external view returns (address) {
        return madeNfts[index].creator;
    } 
    
    function getBlockMade(uint256 index) external view returns (bytes32) {
        return madeNfts[index].blockMade;
    } 
 
}