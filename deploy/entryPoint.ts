import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

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
    await deploy('EntryPoint', {
        from: deployer,
        args: [ethers.utils.parseEther('0.05'), 5],
        log: true,
        deterministicDeployment: true,
    })
}

export default func
func.tags = ['EntryPoint']
