const hre = require('hardhat');

async function main() {
  const DataFeedReaderExample = await hre.deployments.get('DataFeedReaderExample');
  const dataFeedReaderExample = new hre.ethers.Contract(
    DataFeedReaderExample.address,
    DataFeedReaderExample.abi,
    hre.ethers.provider
  );
  const dapiName = process.env.DAPI_NAME;
  if (!dapiName) {
    throw new Error('dAPI name not defined');
  }
  const encodedDapiName = hre.ethers.utils.formatBytes32String(dapiName);
  const dapiValue = await dataFeedReaderExample.readDataFeedValueWithDapiName(encodedDapiName);
  console.log(
    `DataFeedReaderExample at ${
      DataFeedReaderExample.address
    } read dAPI value with name ${dapiName} as \n  value: ${dapiValue.toString()}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
