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

- Browse [market.api3.org](https://market.api3.org/dapis) and find a data feed you like
- If the data feed is not being updated due to being unfunded, fund it and see that it starts updating
- Deploy a proxy to the data feed and copy its address
- Deploy DataFeedReaderExample.
  See the example below, but use your own `NETWORK` and `PROXY` values.
  See [the section below](#supported-networks) for the supported networks.

```sh
NETWORK=polygon-testnet PROXY=0x26690F9f17FdC26D419371315bc17950a0FC90eD yarn deploy
```

- Have DataFeedReaderExample read from the proxy.
  See the example below, but use your own `NETWORK` value.

```sh
NETWORK=polygon-testnet yarn read-data-feed
```

## Supported networks

See https://github.com/api3dao/chains for details about the chains

- arbitrum-goerli-testnet
- arbitrum
- avalanche-testnet
- avalanche
- bsc-testnet
- bsc
- ethereum-goerli-testnet
- ethereum-sepolia-testnet
- ethereum
- fantom-testnet
- fantom
- gnosis-testnet
- gnosis
- moonbeam-testnet
- moonbeam
- moonriver
- optimism-goerli-testnet
- optimism
- polygon-testnet
- polygon

## Local development and testing

`@api3/contracts` provides a MockProxy contract for local development testing.
See the tests for its usage, and run the tests with

```sh
yarn test
```
