import { ethers } from "hardhat";

async function main() {
    console.log("Deploying TokenTreasure2025 contract...");

    const marketplace = await ethers.deployContract("Marketplace");
    await marketplace.waitForDeployment();

    const address = await marketplace.getAddress();
    console.log(`TokenTreasure2025 deployed to: ${address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 