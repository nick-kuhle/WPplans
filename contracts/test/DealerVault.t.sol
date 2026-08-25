// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {DealerVault} from "../src/DealerVault.sol";
import {MockERC20} from "../src/mocks/MockERC20.sol";

contract DealerVaultTest {
    MockERC20 usdc;
    MockERC20 weth;
    DealerVault vault;

    function setUp() public {
        usdc = new MockERC20("USD Coin", "USDC", 6);
        weth = new MockERC20("Wrapped Ether", "WETH", 18);
        vault = new DealerVault(usdc, weth);
        usdc.mint(address(this), 1_000_000e6);
        weth.mint(address(this), 100 ether);
        usdc.approve(address(vault), type(uint256).max);
        weth.approve(address(vault), type(uint256).max);
        vault.deposit(100 ether, 400_000e6);
    }

    function testWriteCallCovered() public view {
        require(vault.ethBal() == 100 ether, "deposit eth");
    }

    function testWriteCallAndCover() public {
        vault.writeCall(10 ether);
        require(vault.reservedEth() == 10 ether, "reserved");
    }

    function testWriteCallNakedReverts() public {
        try vault.writeCall(101 ether) {
            revert("expected naked revert");
        } catch {}
    }

    function testUtilCapOnLong() public {
        vault.openLong(40 ether);
        try vault.openLong(1 ether) {
            revert("expected util cap");
        } catch {}
    }

    function testWritePutCashSecured() public {
        vault.writePut(1 ether, 4000e6);
        require(vault.reservedUsdc() == 4000e6, "put lock");
    }

    function testWritePutNakedReverts() public {
        try vault.writePut(200 ether, 4000e6) {
            revert("expected naked put");
        } catch {}
    }

    function testPause() public {
        vault.pause(true);
        try vault.openLong(1 ether) {
            revert("expected pause");
        } catch {}
    }

    function testOpenShortSellsEth() public {
        uint256 e0 = vault.ethBal();
        vault.openShort(1 ether, 4000e6);
        require(vault.ethBal() == e0 - 1 ether, "sold eth");
    }
}
