import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { ethers } from 'hardhat'
import SimpleWalletArtifact from './abi/SimpleWallet.json'
import EntryPointArtifact from './abi/EntryPoint.json'
import Create2FactoryArtifact from './abi/Create2Factory.json'
import { hexConcat, hexlify, hexValue, hexZeroPad } from 'ethers/lib/utils'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 8080

const ENTRY_POINT_ADDR = '0xB08935DE8ef3e095b6EC863F7946B9Ec400C5ABE'
const CREATE_2_FACTORY_ADDR = '0xE900787363FEa4df99bf5BC70257643e0CBd0DF0'

app.get('/getScwAddress', async (req: Request, res: Response) => {
    const { address } = req.query
    if (!address) {
        res.sendStatus(400)
        return
    }
    const EntryPoint = new ethers.Contract(
        ENTRY_POINT_ADDR,
        EntryPointArtifact.abi
    )
    const factory = new ethers.Contract(
        CREATE_2_FACTORY_ADDR,
        Create2FactoryArtifact.abi
    )
    const salt = hexZeroPad(hexlify(0), 32)
    const SimpleWalletFactory = new ethers.ContractFactory(
        SimpleWalletArtifact.abi,
        SimpleWalletArtifact.bytecode
    )
    const initCodeTx = SimpleWalletFactory.getDeployTransaction(
        ENTRY_POINT_ADDR,
        address
    ).data

    const initCallData = factory.interface.encodeFunctionData('deploy', [
        initCodeTx,
        salt,
    ])
    const initCode = hexConcat([CREATE_2_FACTORY_ADDR, initCallData])
    const resp = await EntryPoint.getSenderAddress(initCode)
    res.json({
        resp,
    })
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
