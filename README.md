# API3 data feed reader example

> An example project for reading API3 data feeds on the Polygon testnet

API3 serves three kinds of data feeds:

- [Beacon](https://medium.com/api3/beacons-building-blocks-for-web3-data-connectivity-df6ad3eb5763): A single-source
  data feed, addressed by the hash of its parameters
- Beacon set (not offered yet): Aggregation of multiple Beacons, addressed by the hash of the underlying Beacon IDs
- [dAPI](https://medium.com/api3/dapis-apis-for-dapps-53b83f8d2493): A managed data feed that is pointed to a Beacon or
  a Beacon set, addressed by its human-readable name

All data feeds that API3 serves on a chain can be read from a single DapiServer contract using the name for dAPIs and
the ID for Beacons and Beacon sets. In this repo, we inherit the DapiReader contract to implement an example data feed
reader contract that does both.

## About Polygon testnet

We duplicated all of our data feeds across all mainnets on the Polygon testnet, as it is relatively stable and its
faucet and RPC endpoints are reliable. Extending this to other testnets is not trivial, which is why we are not planning
to do so in the foreseeable future.

## Access control

Anyone can read an API3 data feed with an off-chain, static call. However, only contracts allowed by an authorized
account are allowed to read on-chain. For production use-cases on mainnet, you will need to pay for contract read
access. On Polygon testnet, there is a contract that you can call to allow your contract to do on-chain reads for free
for testing purposes, which we use in this repo.

## dAPI names and data feed IDs

dAPIs are read using their names. You can find the dAPIs available on the Polygon testnet
[here](https://docs.api3.org/dapis/reference/dapi-browser.html) or
[here](https://github.com/api3dao/operations/blob/main/data/dapis/polygon-testnet.json). While using the scripts in this
repo, you will need to specify dAPI names as the environment variable `DAPI_NAME`.

Beacons and Beacon sets are read using their IDs. You can find the Beacons available on the Polygon testnet
[here](https://github.com/api3dao/operations/tree/main/data/apis), in `beacons/` under the respective API provider's
directory. While using the scripts in this repo, you will need to specify data feed ID as the environment variable
`DATA_FEED_ID`.

## Installation instructions

- Install dependencies

```sh
yarn
```

- Enter credentials

```sh
cp credentials.example.json credentials.json

# ..and populate credentials.json with your mnemonic
```

## Reading data feeds off-chain

Use the scripts below to read the data feeds off-chain. You need to do the static call with a VoidSigner with address 0,
see the scripts for details.

```sh
DAPI_NAME=AVAX/USD yarn run:off-chain-read-with-name

DATA_FEED_ID=0x981fb212c961973cb0e36c2ba003ab0d43e61f01035284e8c9917a296b78dbcb yarn run:off-chain-read-with-id
```

## Deploying DataFeedReaderExample

- Get Mumbai MATIC from the [faucet](https://faucet.polygon.technology/)

- Deploy DataFeedReaderExample

```sh
yarn deploy
```

## Reading dAPIs with name using DataFeedReaderExample

First, send a transaction to allow the deployed DataFeedReaderExample contract to read the dAPI. Note that you only need
to do this once, and you can only do this on Polygon testnet.

```sh
DAPI_NAME=AVAX/USD yarn run:allow-to-read-with-name
```

Then, you can use the script below to have the DataFeedReaderExample contract read the dAPI.

```sh
DAPI_NAME=AVAX/USD yarn run:read-with-name
```

You can also omit the timestamp and only read the value.

```sh
DAPI_NAME=AVAX/USD yarn run:read-value-with-name
```

## Reading data feeds with ID using DataFeedReaderExample

First send a transaction to allow the deployed DataFeedReaderExample contract to read the data feed. Note that you only
need to do this once, and you can only do this on Polygon testnet.

```sh
DATA_FEED_ID=0x981fb212c961973cb0e36c2ba003ab0d43e61f01035284e8c9917a296b78dbcb yarn run:allow-to-read-with-id
```

Then, you can use the script below to have the DataFeedReaderExample contract read the data feed.

```sh
DATA_FEED_ID=0x981fb212c961973cb0e36c2ba003ab0d43e61f01035284e8c9917a296b78dbcb yarn run:read-with-id
```

You can also omit the timestamp and only read the value.

```sh
DATA_FEED_ID=0x981fb212c961973cb0e36c2ba003ab0d43e61f01035284e8c9917a296b78dbcb yarn run:read-value-with-id
```

## Local development and testing

A MockDapiServer contract is provided for local development and testing. See the tests for its usage, and run the tests
with

```sh
yarn test
```
