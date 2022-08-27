import { HardhatUserConfig } from 'hardhat/config'
import { config } from 'dotenv'
import '@nomicfoundation/hardhat-toolbox'
import '@nomiclabs/hardhat-ethers'
import 'hardhat-deploy'
import { ethers } from 'hardhat'

config()

const hardharConfig: HardhatUserConfig = {
    solidity: '0.8.12',
    networks: {
        hardhat: {
            chainId: 31337,
            accounts: {
                mnemonic: process.env.MNEMONIC,
            },
        },
    },
}

export default hardharConfig
