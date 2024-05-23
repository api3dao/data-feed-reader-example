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

# Advanced

## Deploy a DapiProxy programmatically

[Instructions](#instructions) have you use [API3 Market](https://market.api3.org/dapis) to deploy a DapiProxy.
To do it programmatically, see the command below, but use your own `NETWORK` and `DAPI_NAME` values.

```sh
NETWORK=ethereum-sepolia-testnet DAPI_NAME=BTC/USD yarn deploy-dapi-proxy
```

You can see the valid dAPI names on API3 Market.

## Deploy a DataFeedProxy programmatically

> **WARNING:** DapiProxy reads a data feed whose composition is managed by API3, and using it is essentially outsourcing data feed curation to API3.
> DataFeedProxy reads a data feed whose composition is immutable, which is fully trust-minimized when used with first-party oracles.
> However, this also means when there is something wrong with the composition of the DataFeedProxy you are using, you will need to deploy a new one and switch to that, i.e., you will need to do your own data feed curation.
> Do not prefer DataFeedProxy over DapiProxy unless you understand the distinction and are capable of managing your own data feeds.

See the command below, but use your own `NETWORK` and `DATA_FEED_ID` values.

```sh
NETWORK=ethereum-sepolia-testnet DATA_FEED_ID=0xd888b92f9d71afedd0a012622c0d1d5368fc0dc0ff1d30bb16266afcd49c2c17 yarn deploy-data-feed-proxy
```

See https://github.com/nodaryio/examples for a more detailed example.

### Update the proxy address of DataFeedReaderExample

You can update the proxy that your DataFeedReaderExample reads from.

- Follow the [instructions](#instructions)
- Deploy a new proxy
- See the command below, but use your own `NETWORK` and `PROXY` values

```sh
NETWORK=ethereum-sepolia-testnet PROXY=0x08506208E776ecbdF4cE9DB69C08Aa90A06825C0 yarn update-proxy
```
