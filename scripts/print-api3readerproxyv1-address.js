const hre = require('hardhat');
const api3Contracts = require('@api3/contracts');

async function main() {
  const dapiName = process.env.DAPI_NAME;
  if (!dapiName) {
    throw new Error('Environment variable DAPI_NAME is not defined');
  }
  const chainId = hre.network.config.chainId;
  const dappId = process.env.DAPP_ID ? process.env.DAPP_ID : 1;
  const api3ReaderProxyV1Address = api3Contracts.computeApi3ReaderProxyV1Address(chainId, dapiName, dappId, '0x');
  console.log(`The address of Api3ReaderProxyV1 for ${dapiName} with dApp ID ${dappId} is ${api3ReaderProxyV1Address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
