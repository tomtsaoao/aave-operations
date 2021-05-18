// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import './Interfaces/ILendingPool.sol';
import './Interfaces/IDataTypes.sol';
import './Interfaces/IMyContract.sol';

/**
 * @title MyContractUpgraded - upgradeable Aave Protocol operations contract
 * @dev Deposit, Withdraw and Check Collateral Value in Aave Protocol
 * @author Tom Tsao
 */
contract MyContractUpgraded is IMyContract, Initializable {
    ILendingPoolAddressesProvider addressProvider;
    ILendingPool aaveLendingPool;
    
    address public owner;
    address public addrProviderLP;
    
    // Initialize - set Aave Lending Pool and assign owner
    function initialize(address _addressProvider) public initializer {
        addressProvider = ILendingPoolAddressesProvider(_addressProvider);
        addrProviderLP = addressProvider.getLendingPool();
        aaveLendingPool = ILendingPool(addrProviderLP);
        owner = msg.sender;
    }

    function deposit(address _erc20Contract, uint256 _amount) external override returns (bool success) {
        success = IERC20(_erc20Contract).approve(addrProviderLP, _amount);
        require(success == true, "Deposit Failed");

        IERC20(_erc20Contract).transferFrom(owner, address(this), _amount);
        aaveLendingPool.deposit(_erc20Contract, _amount, owner, 0);
        
        return success;
    }

    function withdraw(address _erc20Contract, uint256 _amount) external override returns (uint256 amountWithdrawn) {
        ReserveData memory aTokenAddr = ILendingPool(aaveLendingPool).getReserveData(_erc20Contract);
        IERC20(aTokenAddr.aTokenAddress).transferFrom(owner, address(this), _amount);

        bool success = IERC20(aTokenAddr.aTokenAddress).approve(addrProviderLP, _amount);
        require(success == true, "Withdrawal Failed");
        aaveLendingPool.withdraw(_erc20Contract, _amount, owner);
        
        return _amount;
    }

    function checkCollateralValueInEth() external override view returns (uint256 amountInEth) {
        uint256 totalCollateralETH;
        uint256 totalDebtETH;
        uint256 availableBorrowsETH;
        uint256 currentLiquidationThreshold;
        uint256 ltv;
        uint256 healthFactor;
        (
            totalCollateralETH,
            totalDebtETH,
            availableBorrowsETH,
            currentLiquidationThreshold,
            ltv,
            healthFactor
        ) = aaveLendingPool.getUserAccountData(owner);

        return totalCollateralETH;
    }

    // Upgrade - added extra function on top of original MyContract
    function paused() external pure returns (bool) {
        return false;
    }
}


