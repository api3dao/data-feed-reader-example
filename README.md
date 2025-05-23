# API3 data feed reader example

> An example project that reads an API3 data feed

## Instructions

- Install dependencies

```sh
yarn
```

- Create a `.env` file similar to `example.env`

```sh
echo 'MNEMONIC="bike north stone..."' > .env
```

- Go to [market.api3.org](https://market.api3.org) and find a data feed you like.
  If the data feed is not already activated, purchase a subscription.
  Refer to the [docs](https://docs.api3.org/dapps/integration/) for help.
- On the data feed page, click the `Integrate` button and copy the address of the communal Api3ReaderProxyV1.
  Alternatively, you can get the proxy address with the following command.

```sh
NETWORK=ethereum-sepolia-testnet DAPI_NAME=ETH/USD yarn print:communal-api3readerproxyv1-address
```

- Deploy `DataFeedReaderExample` by using the command below with your `NETWORK` and `PROXY` values.
  See the [supported networks section](#supported-networks) for valid `NETWORK` values.

```sh
NETWORK=ethereum-sepolia-testnet PROXY=0x5b0cf2b36a65a6BB085D501B971e4c102B9Cd473 yarn deploy
```

- Have `DataFeedReaderExample` read from the proxy by using the command below with your `NETWORK` value

```sh
NETWORK=ethereum-sepolia-testnet yarn read-data-feed
```

## Supported networks

Chains listed on [market.api3.org](https://market.api3.org/) are all supported.
You can run the following command to list them.

```sh
yarn print:supported-chains
```

## Local development and testing

`@api3/contracts` provides a `MockApi3ReaderProxy` contract for local development.
See the [tests](./test/DataFeedReaderExample.sol.js) for its usage, and run the tests with the following command.

```sh
yarn test
```

## AggregatorV2V3Interface example

`Api3ReaderProxyV1` also implements `AggregatorV2V3Interface`, which enables you to use it as a drop-in replacement for a Chainlink data feed.
See the [tests](./test/AggregatorV2V3InterfaceReaderExample.sol.js) for an example of how that is to be used, and refer to the [respective docs page](https://docs.api3.org/dapps/integration/aggregatorv2v3interface.html) for more information.

## More?

See the [advanced instructions](./scripts/README.md).
