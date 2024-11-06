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

- Go to [market.api3.org](https://market.api3.org) and find a data feed you like
- If the data feed is not already activated, purchase a subscription
- On the data feed page, click the `Integrate` button and copy the address of the proxy.
  Alternatively, you can get the proxy address with the following command

```sh
NETWORK=ethereum-sepolia-testnet DAPI_NAME=ETH/USD yarn print-api3readerproxyv1-address
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
yarn print-supported-chains
```

## Local development and testing

`@api3/contracts` provides a `MockApi3ReaderProxy` contract for local development.
See the [tests](./test/DataFeedReaderExample.sol.js) for its usage, and run the tests with the following command.

```sh
yarn test
```

## More?

See the [advanced instructions](./scripts/README.md).
