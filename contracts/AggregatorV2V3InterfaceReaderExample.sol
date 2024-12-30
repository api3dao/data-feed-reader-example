// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DataFeedReaderExample.sol";

// This is only a portion of AggregatorV2V3Interface. For its entirety, see
// https://github.com/api3dao/contracts/tree/main/contracts/vendor/%40chainlink/contracts%401.2.0/src/v0.8/shared/interfaces
interface AggregatorV2V3Interface {
    function latestAnswer() external view returns (int256);
}

contract AggregatorV2V3InterfaceReaderExample is DataFeedReaderExample {
    constructor(address proxy) DataFeedReaderExample(proxy) {}

    function readValue() external view returns (int256 value) {
        value = AggregatorV2V3Interface(proxy).latestAnswer();
        // If you have any assumptions about `value`, make sure to validate
        // them right after reading from the proxy. For example, if the value
        // you are reading is the spot price of an asset, you may want to reject
        // non-positive values.
        require(value > 0, "Value not positive");
        // After validation, you can implement your contract logic here.

        // Refer to https://docs.api3.org/dapps/integration/aggregatorv2v3interface.html
        // for more information about AggregatorV2V3Interface.
    }
}
