pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";

contract NFT is ERC721PresetMinterPauserAutoId {
  
    constructor(string memory name_, string memory symbol_, string memory baseTokenURI_) public ERC721PresetMinterPauserAutoId (name_, symbol_, baseTokenURI_) {}
}
