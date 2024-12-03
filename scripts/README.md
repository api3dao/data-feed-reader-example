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

The [instructions](../README.md#instructions) have you use the communal `Api3ReaderProxyV1`, which gets deployed automatically with a subscription purchase.
To deploy the same proxy programmatically, use the command below with your `NETWORK` and `PROXY` values.

```sh
NETWORK=ethereum-sepolia-testnet DAPI_NAME=ETH/USD yarn deploy:communal-api3readerproxyv1
```

You can also refer to the [`print:communal-api3readerproxyv1-address` script](./print-communal-api3readerproxyv1-address.js) to see how the `@api3/contracts` package can be used to derive the respective `Api3ReaderProxyV1` address without needing to make any RPC calls.

To deploy a proxy for a specific dApp, use the command below with your `DAPP_ALIAS` value.
Note that your dApp will need to have been assigned an alias at [`@api3/contracts`](https://github.com/api3dao/contracts/tree/main/data/dapps).
Refer to the [docs](https://docs.api3.org/dapps/oev-rewards/) for more information.

```sh
NETWORK=ethereum-sepolia-testnet DAPI_NAME=ETH/USD DAPP_ALIAS=lendle yarn deploy:dapp-specific-api3readerproxyv1
```

Similar to the above, you can refer to the [`print:dapp-specific-api3readerproxyv1-address` script](./print-dapp-specific-api3readerproxyv1-address.js) to see how the `@api3/contracts` package can be used to derive the dApp-specific `Api3ReaderProxyV1` address without needing to make any RPC calls.
