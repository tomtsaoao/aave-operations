const { exit } = require("process");

const MyContract = artifacts.require("MyContract");
const IERC20 = artifacts.require("IERC20");

module.exports = async() => {
    const web3Accounts = await web3.eth.getAccounts(); 
    const account = web3Accounts[0];
    
    // For other ERC20 addresses: https://aave.github.io/aave-addresses/kovan.json
    const tokenAddress = "0x13512979ADE267AB5100878E2e0f485B568328a4";
    const aTokenAddress = "0xFF3c8bc103682FA918c954E84F5056aB4DD5189d";
    
    const token = await IERC20.at(tokenAddress);
    const aToken = await IERC20.at(aTokenAddress);

    const tokenBalance = parseInt((await token.balanceOf(account)).toString() / 1000000);
    const aTokenBalance = parseInt((await aToken.balanceOf(account)).toString() / 1000000);

    const contract = await MyContract.deployed();
    // Initialize MyContract with Aave LendingPoolAddressProvider address
    await contract.initialize("0x88757f2f99175387aB4C6a4b3067c77A695b0349");
    const amount = 10000000; // 10 USDT

    // Test Deposit
    console.log("Token balance before deposit: ", tokenBalance);
    console.log("aToken balance before deposit: ", aTokenBalance);
    console.log("Depositing ", (amount/1000000),  " USDT to Aave Lending Pool");
    
    const tokenSupply = await token.totalSupply();
    await token.approve(contract.address, tokenSupply);
    await contract.deposit(token.address, amount);

    console.log("Token balance after deposit: ", parseInt((await token.balanceOf(account)).toString() / 1000000));
    console.log("aToken balance after deposit: ", parseInt((await aToken.balanceOf(account)).toString() / 1000000), "\n");

    // Test Withdraw
    console.log("Token balance before withdrawal: ", parseInt((await token.balanceOf(account)).toString() / 1000000));
    console.log("aToken balance before withdrawal: ", parseInt((await aToken.balanceOf(account)).toString() / 1000000));
    console.log("Withdrawing ", (amount/1000000), " USDT from Aave Lending Pool");
    
    const aTokenSupply = await aToken.totalSupply();
    await aToken.approve(contract.address, aTokenSupply);
    await contract.withdraw(token.address, amount);

    console.log("Token balance after withdrawal: ", parseInt((await token.balanceOf(account)).toString() / 1000000));
    console.log("aToken balance after withdrawal: ", parseInt((await aToken.balanceOf(account)).toString() / 1000000), "\n");

    // Test Check Collateral Value in ETH
    console.log("Checking Collateral Value in ETH");
    const collateralInEth = await contract.checkCollateralValueInEth();
    console.log("Collateral Value in ETH: ", parseInt(collateralInEth.toString()), "\n");

    exit();
}