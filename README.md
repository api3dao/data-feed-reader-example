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
- Fund the data feed (unless it is already funded)
- Deploy the proxy to the data feed (unless it is already deployed)
- Copy the address of the proxy
- Deploy DataFeedReaderExample.
  See the command below, but use your own `NETWORK` and `PROXY` values.
  See the [supported networks section](#supported-networks) for valid `NETWORK` values.

```sh
NETWORK=polygon-testnet PROXY=0x26690F9f17FdC26D419371315bc17950a0FC90eD yarn deploy
```

- Have DataFeedReaderExample read from the proxy.
  See the command below, but use your own `NETWORK` value.

```sh
NETWORK=polygon-testnet yarn read-data-feed
```

## Supported networks

See https://github.com/api3dao/chains for details

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

# Advanced

## Deploy a DapiProxy programmatically

[Instructions](#instructions) have you use [API3 Market](https://market.api3.org/dapis) to deploy a DapiProxy.
To do it programmatically, see the command below, but use your own `NETWORK` and `DAPI_NAME` values.

```sh
NETWORK=polygon-testnet DAPI_NAME=ETH/USD yarn deploy-dapi-proxy
```

You can see the valid dAPI names on API3 Market.

## Deploy a DataFeedProxy programmatically

See the command below, but use your own `NETWORK` and `DATA_FEED_ID` values.

```sh
NETWORK=polygon-testnet DATA_FEED_ID=0x4385954e058fbe6b6a744f32a4f89d67aad099f8fb8b23e7ea8dd366ae88151d yarn deploy-data-feed-proxy
```

We will provide instructions for where to find data feed IDs in the future.
Until then, using DataFeedProxy is not recommended.

### Update the proxy address of DataFeedReaderExample

You can update the proxy that your DataFeedReaderExample reads from.

- Follow the [instructions](#instructions)
- Deploy a new proxy
- See the command below, but use your own `NETWORK` and `PROXY` values

```sh
NETWORK=polygon-testnet PROXY=0xe5Cf15fED24942E656dBF75165aF1851C89F21B5 yarn deploy
```
