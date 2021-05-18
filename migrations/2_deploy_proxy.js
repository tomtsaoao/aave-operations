const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const MyContract = artifacts.require("MyContract");

module.exports = async function (deployer) {
  // Deploy Proxy and initialize contract with Aave LendingPoolAddressesProvider
  const instance = await deployProxy(MyContract, ["0x88757f2f99175387aB4C6a4b3067c77A695b0349"], { deployer });
  console.log('Deployed Contract Address', instance.address);
};
