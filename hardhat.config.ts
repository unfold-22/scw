import { HardhatUserConfig } from "hardhat/config";
import { config } from "dotenv";
import "@nomicfoundation/hardhat-toolbox";
import '@nomiclabs/hardhat-ethers'
import 'hardhat-deploy'

config()

const hardharConfig: HardhatUserConfig = {
  solidity: "0.8.12",
  networks: {
    hardhat: {
      accounts: {
        mnemonic:
          process.env.MNEMONIC,
      },
    },
  },
};

export default hardharConfig;
