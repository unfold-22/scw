import { HardhatUserConfig } from 'hardhat/config'
import { config } from 'dotenv'
import '@nomicfoundation/hardhat-toolbox'
import '@nomiclabs/hardhat-ethers'
import 'hardhat-deploy'
import { ethers } from 'hardhat'
import '@tenderly/hardhat-tenderly'

config()

const hardharConfig: HardhatUserConfig = {
    solidity: '0.8.12',
    networks: {
        polygon: {
            chainId: 137,
            url: process.env.POLYGON_RPC,
            accounts: [process.env.PRIVATE_KEY || ''],
        },
        mumbai: {
            chainId: 80001,
            url: process.env.MUMBAI_RPC,
            accounts: [process.env.PRIVATE_KEY || ''],
        },
        hardhat: {
            chainId: 31337,
        },
    },
    etherscan: {
        apiKey: {
            polygon: process.env.ETHERSCAN_API_POLYGON || '',
            polygonMumbai: process.env.ETHERSCAN_API_MUMBAI || '',
        },
    },
}

export default hardharConfig
