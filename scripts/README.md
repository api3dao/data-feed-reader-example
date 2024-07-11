# Advanced instructions

## Update the proxy address of `DataFeedReaderExample`

You can update the data feed that your `DataFeedReaderExample` reads by updating its proxy address.

- Follow the [instructions](../README.md#instructions)
- Find a new data feed on [market.api3.org](https://market.api3.org/) and copy the address of its proxy
- Use the command below with your `NETWORK` and `PROXY` values

```sh
NETWORK=ethereum-sepolia-testnet PROXY=0x3f16e1a6b915C42f6442bF59b092FaBb7d5eBB82 yarn update-proxy
```

- Use the command below to confirm that `DataFeedReaderExample` now reads the new data feed

```sh
NETWORK=ethereum-sepolia-testnet yarn read-data-feed
```

## Deploying proxy contracts programmatically

The [instructions](../README.md#instructions) have you use a `DapiProxyWithOev` contract that gets deployed automatically with a subscription purchase.
To deploy the same proxy programmatically, use the command below with your `NETWORK` and `PROXY` values.

```sh
NETWORK=ethereum-sepolia-testnet DAPI_NAME=ETH/USD yarn deploy-dapi-proxy-with-oev
```

You can also refer to the [`print-proxy-address` script](./print-proxy-address.js) to see how the `@api3/contracts` package can be used to derive the respective `DapiProxyWithOev` address without needing to make any RPC calls.

The OEV beneficiary of the proxy above is the API3 _manager multisig_ on that chain.
To deploy a proxy with an arbitrary OEV beneficiary, use the command below with your `OEV_BENEFICIARY` value.
Note that the OEV functionalities of proxies with custom beneficiaries are not supported by default.

```sh
NETWORK=ethereum-sepolia-testnet DAPI_NAME=ETH/USD OEV_BENEFICIARY=0x55Cf1079a115029a879ec3A11Ba5D453272eb61D yarn deploy-dapi-proxy-with-oev
```

## Self-funded feeds

See https://github.com/api3dao/nodary-examples
