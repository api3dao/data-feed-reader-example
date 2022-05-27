// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@api3/airnode-protocol-v1/contracts/dapis/DapiReader.sol";

contract DataFeedReaderExample is DapiReader {
    constructor(address _dapiServer) DapiReader(_dapiServer) {}

    function readDataFeedWithId(bytes32 dataFeedId)
        external
        view
        returns (int224 value, uint256 timestamp)
    {
        (value, timestamp) = IDapiServer(dapiServer).readDataFeedWithId(
            dataFeedId
        );
    }

    function readDataFeedValueWithId(bytes32 dataFeedId)
        external
        view
        returns (int224 value)
    {
        value = IDapiServer(dapiServer).readDataFeedValueWithId(dataFeedId);
    }

    function readDataFeedWithDapiName(bytes32 dapiName)
        external
        view
        returns (int224 value, uint256 timestamp)
    {
        (value, timestamp) = IDapiServer(dapiServer).readDataFeedWithDapiName(
            dapiName
        );
    }

    function readDataFeedValueWithDapiName(bytes32 dapiName)
        external
        view
        returns (int224 value)
    {
        value = IDapiServer(dapiServer).readDataFeedValueWithDapiName(dapiName);
    }
}
