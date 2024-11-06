# Advanced instructions

## Update the proxy address of `DataFeedReaderExample`

You can update the data feed that your `DataFeedReaderExample` reads by updating its proxy address.

- Follow the [instructions](../README.md#instructions)
- Find a new data feed on [market.api3.org](https://market.api3.org/) and copy the address of its proxy
- Use the command below with your `NETWORK` and `PROXY` values

```sh
NETWORK=ethereum-sepolia-testnet PROXY=0xCAc4d304032a46C8D0947396B7cBb07986826A36 yarn update-proxy
```

- Use the command below to confirm that `DataFeedReaderExample` now reads the new data feed

```sh
NETWORK=ethereum-sepolia-testnet yarn read-data-feed
```

## Deploying proxy contracts programmatically

The [instructions](../README.md#instructions) have you use a `Api3ReaderProxyV1` contract that gets deployed automatically with a subscription purchase.
To deploy the same proxy programmatically, use the command below with your `NETWORK` and `PROXY` values.

```sh
NETWORK=ethereum-sepolia-testnet DAPI_NAME=ETH/USD yarn deploy-api3readerproxyv1
```

You can also refer to the [`print-api3readerproxyv1-address` script](./print-api3readerproxyv1-address.js) to see how the `@api3/contracts` package can be used to derive the respective `Api3ReaderProxyV1` address without needing to make any RPC calls.

The dApp ID of the proxy above is `1`.
To deploy a proxy with an arbitrary dApp ID, use the command below with your `DAPP_ID` value.
Note that the OEV functionalities of proxies with custom dApp IDs are not supported by default.

```sh
NETWORK=ethereum-sepolia-testnet DAPI_NAME=ETH/USD DAPP_ID=1337 yarn deploy-api3readerproxyv1
```
