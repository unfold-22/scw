import { ethers } from "hardhat";

export async function deployEntryPoint() {
  const [deployer] = await ethers.getSigners();
  const entryPointFactory = await ethers.getContractFactory(
    "EntryPoint",
    deployer
  );
  const entryPoint = await entryPointFactory.deploy(
    ethers.utils.parseEther("0.01"),
    5
  );
  console.log("EntryPoint deployed at: ", entryPoint.address);
}

if (require.main === module) {
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  deployEntryPoint().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  console.log("required as a module");
}
