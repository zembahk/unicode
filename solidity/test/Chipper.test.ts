
import {ethers, deployments, getNamedAccounts} from 'hardhat';
//TODO Write tests
describe("Chipper contract", function() {
  it("", async function() {
    const contracts = await deployments.fixture(["Chipper"]);
    const {owner} = await getNamedAccounts();
    const Chipper = await ethers.getContractAt("Chipper", contracts.Chipper.address);
  });
});
