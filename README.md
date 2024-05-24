# API3 data feed reader example

> An example project for reading API3 data feeds

## Instructions

- Install dependencies

```sh
yarn
```

- Create a `.env` file similar to `example.env`

```sh
echo 'MNEMONIC="bike north stone..."' > .env
```

- Browse [market.api3.org](https://market.api3.org) and find a data feed you like
- Fund the data feed (unless it is already funded)
- Deploy the proxy to the data feed (unless it is already deployed)
- Copy the address of the proxy
- Deploy DataFeedReaderExample.
  See the command below, but use your own `NETWORK` and `PROXY` values.
  See the [supported networks section](#supported-networks) for valid `NETWORK` values.

```sh
NETWORK=ethereum-sepolia-testnet PROXY=0x51097c0ed085958897fb2B062961E54B1D4d5771 yarn deploy
```

- Have DataFeedReaderExample read from the proxy.
  See the command below, but use your own `NETWORK` value.

```sh
NETWORK=ethereum-sepolia-testnet yarn read-data-feed
```

## Supported networks

Chains listed in https://market.api3.org/ are the only ones that are supported. Alternatively, you can run the following command to list all the supported chains

```sh
yarn print-supported-chains
```

## Local development and testing

`@api3/contracts` provides a MockProxy contract for local development testing.
See the tests for its usage, and run the tests with

```sh
yarn test
```

For more advance instructions see the [Advanced instructions](./scripts/README.md) README file.
