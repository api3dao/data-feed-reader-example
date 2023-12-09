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
NETWORK=polygon-testnet PROXY=0x009E9B1eec955E9Fe7FE64f80aE868e661cb4729 yarn deploy
```

- Have DataFeedReaderExample read from the proxy.
  See the command below, but use your own `NETWORK` value.

```sh
NETWORK=polygon-testnet yarn read-data-feed
```

## Supported networks

See https://github.com/api3dao/chains for details

### Mainnets

- arbitrum
- avalanche
- base
- bsc
- ethereum
- fantom
- gnosis
- kava
- linea
- mantle
- moonbeam
- moonriver
- optimism
- polygon-zkevm
- polygon
- rsk

### Testnets

- arbitrum-goerli-testnet
- avalanche-testnet
- base-goerli-testnet
- bsc-testnet
- cronos-testnet
- ethereum-goerli-testnet
- ethereum-sepolia-testnet
- fantom-testnet
- gnosis-testnet
- kava-testnet
- linea-goerli-testnet
- mantle-goerli-testnet
- moonbeam-testnet
- optimism-goerli-testnet
- polygon-testnet
- polygon-zkevm-goerli-testnet
- rsk-testnet
- scroll-goerli-testnet

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

> **WARNING:** DapiProxy reads a data feed whose composition is managed by API3, and using it is essentially outsourcing data feed curation to API3.
> DataFeedProxy reads a data feed whose composition is immutable, which is fully trust-minimized when used with first-party oracles.
> However, this also means when there is something wrong with the composition of the DataFeedProxy you are using, you will need to deploy a new one and switch to that, i.e., you will need to do your own data feed curation.
> Do not prefer DataFeedProxy over DapiProxy unless you understand the distinction and are capable of managing your own data feeds.

See the command below, but use your own `NETWORK` and `DATA_FEED_ID` values.

```sh
NETWORK=polygon-testnet DATA_FEED_ID=0x4385954e058fbe6b6a744f32a4f89d67aad099f8fb8b23e7ea8dd366ae88151d yarn deploy-data-feed-proxy
```

See https://github.com/nodaryio/examples for a more detailed example.

### Update the proxy address of DataFeedReaderExample

You can update the proxy that your DataFeedReaderExample reads from.

- Follow the [instructions](#instructions)
- Deploy a new proxy
- See the command below, but use your own `NETWORK` and `PROXY` values

```sh
NETWORK=polygon-testnet PROXY=0xba7892c114743bFd39F7A76180CacC93bAcC67e0 yarn update-proxy
```
