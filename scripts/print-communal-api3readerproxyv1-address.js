const hre = require('hardhat');
const api3Contracts = require('@api3/contracts');

async function main() {
  const dapiName = process.env.DAPI_NAME;
  if (!dapiName) {
    throw new Error('Environment variable DAPI_NAME is not defined');
  }
  const chainId = hre.network.config.chainId;
  const api3ReaderProxyV1Address = api3Contracts.computeCommunalApi3ReaderProxyV1Address(chainId, dapiName);
  console.log(`The address of the communal Api3ReaderProxyV1 for ${dapiName} is ${api3ReaderProxyV1Address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
