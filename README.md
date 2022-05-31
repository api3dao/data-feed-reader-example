# API3 data feed reader example

> An example project for reading API3 data feeds on Polygon testnet

API3 serves three kinds of data feeds:

- [Beacons](https://medium.com/api3/beacons-building-blocks-for-web3-data-connectivity-df6ad3eb5763): Single-source data
  feeds, addressed by the hash of their parameters
- Beacon sets: Aggregation of Beacons, addressed by the hash of the underlying Beacon IDs
- [dAPIs](https://medium.com/api3/dapis-apis-for-dapps-53b83f8d2493): A managed data feed that is pointed to a Beacon or
  a Beacon set, addressed by its human-readable name

All data feeds that API3 serves on a chain can be read from a single DapiServer contract using the ID for Beacons and
Beacon sets and the name for dAPIs. In this repo, we inherit the DapiReader contract to implement an example data feed
reader contract.

## About Polygon testnet

We duplicated all of our data feeds across all mainnets on a testnet. We chose the Polygon testnet for this, as it is
relatively stable and its faucet and RPC endpoints are reliable. Extending this to other testnets is not trivial, which
is why we are not planning to do it in the foreseeable future.

## Access control

Anyone can read an API3 data feed with an off-chain, static call. However, only contracts allowed by an authorized
account are allowed to read on-chain. For production use-cases on mainnet, you will need to pay for contract read
access. On Polygon testnet, there is a contract that you can call to allow your contract to do on-chain calls for free
for testing purposes, which we use in this repo.

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

## Reading data feeds off-chain

Use the scripts below to read the data feeds off-chain. You need to do the static call with a VoidSigner with address 0,
see the scripts for details.

```sh
DAPI_NAME=AVAX/USD yarn run:off-chain-read-with-name

DATA_FEED_ID=0x981fb212c961973cb0e36c2ba003ab0d43e61f01035284e8c9917a296b78dbcb yarn run:off-chain-read-with-id
```

## Reading dAPIs with name using a contract

First send a transaction to allow the deployed DataFeedReaderExample contract to read the dAPI. Note that you only need
to do this once, and you can only do this on Polygon testnet.

```sh
DAPI_NAME=AVAX/USD yarn run:allow-to-read-with-name
```

Then you can use the script below to have the DataFeedReaderExample contract read the dAPI.

```sh
DAPI_NAME=AVAX/USD yarn run:read-with-name
```

You can also omit reading the timestamp and only get the value.

```sh
DAPI_NAME=AVAX/USD yarn run:read-value-with-name
```

## Reading data feeds with ID using a contract

First send a transaction to allow the deployed DataFeedReaderExample contract to read the data feed. Note that you only
need to do this once, and you can only do this on Polygon testnet.

```sh
DATA_FEED_ID=0x981fb212c961973cb0e36c2ba003ab0d43e61f01035284e8c9917a296b78dbcb yarn run:allow-to-read-with-id
```

Then you can use the script below to have the DataFeedReaderExample contract read the data feed.

```sh
DATA_FEED_ID=0x981fb212c961973cb0e36c2ba003ab0d43e61f01035284e8c9917a296b78dbcb yarn run:read-with-id
```

You can also omit reading the timestamp and only get the value.

```sh
DATA_FEED_ID=0x981fb212c961973cb0e36c2ba003ab0d43e61f01035284e8c9917a296b78dbcb yarn run:read-value-with-id
```

## Local development and testing

A MockDapiServer contract is provided for local development and testing. See the tests for its usage, and run the tests
with

```sh
yarn test
```
