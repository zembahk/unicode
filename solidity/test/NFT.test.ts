import {ethers, deployments, getNamedAccounts} from 'hardhat';
//TODO Write tests
describe("NFT contract", function() {
  it("", async function() {
    const contracts = await deployments.fixture(["NFT"]);
    const {owner} = await getNamedAccounts();
    const NFT = await ethers.getContractAt("NFT", contracts.NFT.address);
  });
});
