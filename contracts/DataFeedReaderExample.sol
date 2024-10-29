// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "api3-contracts-v10/interfaces/IApi3ReaderProxy.sol";

contract DataFeedReaderExample is Ownable {
    // This contract reads from a single proxy. Your contract can read from
    // multiple proxies.
    address public proxy;

    constructor(address _proxy) {
        setProxy(_proxy);
    }

    // Updating the proxy address is a security-critical action. In this
    // example, only the owner is allowed to do so.
    // You may want to update your proxy to switch to another data feed, enable
    // OEV support, or even switch to another oracle solution. Implementing a
    // method to update proxies is highly recommended.
    function setProxy(address _proxy) public onlyOwner {
        proxy = _proxy;
    }

    function readDataFeed()
        external
        view
        returns (int224 value, uint256 timestamp)
    {
        (value, timestamp) = IApi3ReaderProxy(proxy).read();
        // If you have any assumptions about `value` and `timestamp`, make sure
        // to validate them right after reading from the proxy. For example,
        // if the value you are reading is the spot price of an asset, you may
        // want to reject non-positive values...
        require(value > 0, "Value not positive");
        // ...and if the data feed is being updated with a one day-heartbeat
        // interval, you may want to check for that.
        require(
            timestamp + 1 days > block.timestamp,
            "Timestamp older than one day"
        );
        // Try to be strict about validations, but be wary of:
        // (1) Overly strict validation that may invalidate valid values
        // (2) Mutable validation parameters that are controlled by a trusted
        // party (eliminates the trust-minimization guarantees of first-party
        // oracles)
        // (3) Validation parameters that need to be tuned according to
        // external conditions (if these are forgotten to be handled, it will
        // result in (1), look up the Venus Protocol exploit related to LUNA)

        // After validation, you can implement your contract logic here.
    }
}
