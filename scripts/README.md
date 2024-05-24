# Advanced instructions

## Deploying proxy contracts programmatically

### DapiProxyWithOev and DapiProxy

[Instructions](../README.md#instructions) have you use [API3 Market](https://market.api3.org) to deploy a `DapiProxyWithOev` contract.
To do it programmatically, see the command below, but use your own `NETWORK` and `DAPI_NAME` values. The OEV beneficiary address defauls to a gnosis safe multisig address managed by API3, which in this example is `0x55Cf1079a115029a879ec3A11Ba5D453272eb61D`.

```sh
NETWORK=ethereum-sepolia-testnet DAPI_NAME=BTC/USD yarn deploy-dapi-proxy-with-oev
```

If you'd like to set your own OEV beneficiary address then use the `OEV_BENEFICIARY` environment variable.

```sh
NETWORK=ethereum-sepolia-testnet DAPI_NAME=BTC/USD OEV_BENEFICIARY=0x55Cf1079a115029a879ec3A11Ba5D453272eb61D yarn deploy-dapi-proxy-with-oev
```

To deploy a dAPI proxy programmatically, see the command below, but use your own `NETWORK` and `DAPI_NAME` values.

```sh
NETWORK=ethereum-sepolia-testnet DAPI_NAME=BTC/USD yarn deploy-dapi-proxy
```

You can see the valid dAPI names on API3 Market.

### DataFeedProxyWithOev and DataFeedProxy

> **WARNING:** DapiProxy reads a data feed whose composition is managed by API3, and using it is essentially outsourcing data feed curation to API3.
> DataFeedProxy reads a data feed whose composition is immutable, which is fully trust-minimized when used with first-party oracles.
> However, this also means when there is something wrong with the composition of the DataFeedProxy you are using, you will need to deploy a new one and switch to that, i.e., you will need to do your own data feed curation.
> Do not prefer DataFeedProxy over DapiProxy unless you understand the distinction and are capable of managing your own data feeds.

See the command below, but use your own `NETWORK` and `DATA_FEED_ID` values. The OEV beneficiary address defauls to a gnosis safe multisig address managed by API3, which in this example is `0x55Cf1079a115029a879ec3A11Ba5D453272eb61D`.

```sh
NETWORK=ethereum-sepolia-testnet DATA_FEED_ID=0xd888b92f9d71afedd0a012622c0d1d5368fc0dc0ff1d30bb16266afcd49c2c17 yarn deploy-data-feed-proxy-with-oev
```

If you'd like to set your own OEV beneficiary address then use the `OEV_BENEFICIARY` environment variable.

```sh
NETWORK=ethereum-sepolia-testnet DATA_FEED_ID=0xd888b92f9d71afedd0a012622c0d1d5368fc0dc0ff1d30bb16266afcd49c2c17 OEV_BENEFICIARY=0x55Cf1079a115029a879ec3A11Ba5D453272eb61D yarn deploy-data-feed-proxy-with-oev
```

To deploy a data feed proxy programmatically, see the command below, but use your own `NETWORK` and `DATA_FEED_ID` values.

```sh
NETWORK=ethereum-sepolia-testnet DATA_FEED_ID=0xd888b92f9d71afedd0a012622c0d1d5368fc0dc0ff1d30bb16266afcd49c2c17 yarn deploy-data-feed-proxy
```

See https://github.com/nodaryio/examples for a more detailed example.

## DataFeedReaderExample contract

This is a very simple contract that demonstrates how to read the value of a data feed or dAPI from the proxy.

It is composed of a constructor that receives the proxy contract address and a setter function to be able to update this address in the future see [Update the proxy address of DataFeedReaderExample](#update-the-proxy-address-of-datafeedreaderexample).

Then there is a `readDataFeed()` function that reads the value of the data feed or dAPI by calling `read()` on the proxy contract that implements the `IProxy` interface see [IProxy.sol](https://github.com/api3dao/contracts/blob/main/contracts/api3-server-v1/proxies/interfaces/IProxy.sol). In this case the function returns a the data feed or dAPI value along with the timestamp of when it was last updated but any logic could be applied here based on your specific use case.

## Update the proxy address of DataFeedReaderExample

You can update the proxy that your DataFeedReaderExample reads from.

- Follow the [instructions](#../README.md#instructions)
- Deploy a new proxy
- See the command below, but use your own `NETWORK` and `PROXY` values

```sh
NETWORK=ethereum-sepolia-testnet PROXY=0x08506208E776ecbdF4cE9DB69C08Aa90A06825C0 yarn update-proxy
```
