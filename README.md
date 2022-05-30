# API3 data feed reader example

> An example project for reading API3 data feeds on Polygon testnet

API3 serves three kinds of data feeds:

- [Beacons](https://medium.com/api3/beacons-building-blocks-for-web3-data-connectivity-df6ad3eb5763): Single-source data
  feeds, addressed by the hash of their parameters
- Beacon sets: Aggregation of Beacons, addressed by the hash of the underlying Beacon IDs
- dAPIs: A managed data feed that is pointed to a Beacon or a Beacon set, addressed by its human-readable name

All data feeds that API3 serves on a chain can be read from a single DapiServer contract. In this repo, we inherit the
DapiReader contract to implement an example data feed reader contract.

## Polygon testnet

We wanted to duplicate all of our data feeds across all mainnets on a testnet for testing. We chose the Polygon testnet
for this, as it is relatively stable and its faucet and RPC endpoints are reliable. Extending this to other testnets is
not trivial, which is why we are not planning to do it in the foreseeable future.

## Access control

Anyone can read an API3 data feed with an off-chain, static call. However, only contracts allowed by an authorized
account (EOA or contract) are allowed to read on-chain. For production use-cases on mainnet, you will need to pay for
contract read access. On Polygon testnet, there is a contract that you can call to allow your contract to do on-chain
calls for free for testing purposes, which we use in this repo.

## Data feed IDs and dAPI names

Beacons and Beacon sets are read using their IDs. dAPIs are read using their names. You can find these IDs and names in
the main branch of the [API3 operations repo](https://github.com/api3dao/operations). While using the scripts, you will
need to specify the data feed IDs as the environment variable `DATA_FEED_ID` and dAPI names as the environment variable
`DAPI_NAME`.

## Installation instructions

- Install dependencies

```sh
yarn
```

- Enter credentials

```sh
cp credentials.example.json credentials.json
# Populate credentials.json with your mnemonic
```

- Get Mumbai MATIC from the [faucet](https://faucet.polygon.technology/)

- Deploy DataFeedReaderExample

```sh
yarn deploy
```

## Reading data feeds using an EOA

Use the scripts below to read the data feeds off-chain. You need to do the static call with a VoidSigner with address 0,
see the scripts for details.

```sh
DAPI_NAME=AVAX/USD yarn run:static-read-dapi-with-name

DATA_FEED_ID=0x1e455f28cd0c027f0894aa67b5883d78859c7b39d6977a16fbe1e25a61ab2a6c yarn run:static-read-data-feed-with-id
```

## Reading dAPIs with name using a contract

First send a transaction to allow the deployed DataFeedReaderExample contract to read the dAPI. Note that you only need
to do this once, and you can only do this on Polygon testnet.

```sh
DAPI_NAME=AVAX/USD yarn run:allow-to-read-dapi-with-name
```

Then you can use the script below to have the DataFeedReaderExample contract read the dAPI.

```sh
DAPI_NAME=AVAX/USD yarn run:read-dapi-with-name
```

You can also omit reading the timestamp and only get the value.

```sh
DAPI_NAME=AVAX/USD yarn run:read-dapi-value-with-name
```

## Reading data feeds with ID using a contract

First send a transaction to allow the deployed DataFeedReaderExample contract to read the data feed. Note that you only
need to do this once, and you can only do this on Polygon testnet.

```sh
DATA_FEED_ID=0x1e455f28cd0c027f0894aa67b5883d78859c7b39d6977a16fbe1e25a61ab2a6c yarn run:allow-to-read-data-feed-with-id
```

Then you can use the script below to have the DataFeedReaderExample contract read the data feed.

```sh
DATA_FEED_ID=0x1e455f28cd0c027f0894aa67b5883d78859c7b39d6977a16fbe1e25a61ab2a6c yarn run:read-data-feed-with-id
```

You can also omit reading the timestamp and only get the value.

```sh
DATA_FEED_ID=0x1e455f28cd0c027f0894aa67b5883d78859c7b39d6977a16fbe1e25a61ab2a6c yarn run:read-data-feed-value-with-id
```

## Local development and testing

A MockDapiServer contract is provided for local development and testing. See the tests for its usage, and run the tests
with

```sh
yarn test
```
