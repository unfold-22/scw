import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const ENTRY_POINT_CONTRACT = '0x8ADd98477E39569e15d807482FFDA67aAd347207'
const VERIFYING_ADDR = '0xfF23A09696522cAc320f076a164159b2568B046C'

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { ethers } = hre
    const { deploy } = hre.deployments
    const accounts = await hre.ethers.provider.listAccounts()
    console.log('Available accounts:', accounts)
    const deployer = accounts[0]
    console.log('Will deploy from account:', deployer)

    if (deployer == null) {
        throw new Error('no deployer. missing MNEMONIC_FILE ?')
    }
    await deploy('VerifyingPaymaster', {
        from: deployer,
        args: [ENTRY_POINT_CONTRACT, VERIFYING_ADDR],
        log: true,
        deterministicDeployment: true,
    })
}

export default func
func.tags = ['VerifyingPaymaster']
