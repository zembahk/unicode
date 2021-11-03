//import 'hardhat-deploy-ethers';
import { task } from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-deploy';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import { resolve } from "path";
import { config as dotenvConfig } from "dotenv";
//import 'hardhat-typechain';
import { HardhatUserConfig } from 'hardhat/config';

dotenvConfig({ path: resolve(__dirname, "./.env") });
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task(
  "accounts",
  "Prints the list of accounts",
  async (taskArgs, { ethers }) => {
    const accounts = await ethers.getSigners();
    for (const account of accounts) {
      console.log(account.address);
    }
  }
);

task(
  "namedAccounts",
  "Prints the list of named accounts",
  async (taskArgs, { getNamedAccounts }) => {
    const accounts = await getNamedAccounts();
    for (const [key, value] of Object.entries(accounts)) {
      console.log(`${key}: ${value}`);
    }
  }
);
const mnemonic: string | undefined = process.env.MNEMONIC;
if (!mnemonic) {
  throw new Error("Please set your MNEMONIC in a .env file");
}
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.0",

    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/solidity-template/issues/31
        bytecodeHash: "none",
      },
      // Disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
	},
  networks: {
    hardhat: {
      accounts: {
        mnemonic 
      },
    },
  },
	namedAccounts: {
	deployer: 0,
    owner: 1,
    recipient: 2,
    test1: 3,
    test2: 4,
    test3: 5,
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
};

export default config;
