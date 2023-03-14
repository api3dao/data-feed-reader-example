// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@api3/contracts/contracts/v0.8/interfaces/IProxy.sol";

contract DataFeedReaderExample is Ownable {
    // This contract reads from a single proxy. Your contract can read from multiple proxies.
    address public proxy;

    constructor(address _proxy) {
        setProxy(_proxy);
    }

    // Updating the proxy address is a security-critical action. In this example, only
    // the owner is allowed to do so.
    function setProxy(address _proxy) public onlyOwner {
        proxy = _proxy;
    }

    function readDataFeed()
        external
        view
        returns (int224 value, uint256 timestamp)
    {
        (value, timestamp) = IProxy(proxy).read();
        // If you have any assumptions about `value` and `timestamp`, make sure
        // to validate them right after reading from the proxy.
    }
}
