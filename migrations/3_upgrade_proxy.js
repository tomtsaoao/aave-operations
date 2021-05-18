const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const MyContract = artifacts.require("MyContract");
const MyContractUpgraded = artifacts.require("MyContractUpgraded");

module.exports = async function (deployer, network, accounts) {
    const deployedContract = await MyContract.deployed();
    const deployedAddress = deployedContract.address;

    const upgradeContract = await upgradeProxy(deployedAddress, MyContractUpgraded, { deployer });
    const upgradedAddress = upgradeContract.address;

    // Deployed and Upgraded Contract Addresses should match
    console.log("Deployed Contract Address", deployedAddress);
    console.log("Upgraded Contract Address", upgradedAddress);
};
