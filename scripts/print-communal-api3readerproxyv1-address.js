const api3Contracts = require('@api3/contracts');
const { network } = require('hardhat');
const { validateDapiName } = require('./utils');

async function main() {
  const dapiName = process.env.DAPI_NAME;
  if (!dapiName) {
    throw new Error('Environment variable DAPI_NAME is not defined');
  }
  validateDapiName(dapiName);
  const { chainId } = network.config;
  const api3ReaderProxyV1Address = api3Contracts.computeCommunalApi3ReaderProxyV1Address(chainId, dapiName);
  console.log(`The address of the communal Api3ReaderProxyV1 for ${dapiName} is ${api3ReaderProxyV1Address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
