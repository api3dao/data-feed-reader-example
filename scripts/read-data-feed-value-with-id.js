const hre = require('hardhat');

async function main() {
  const DataFeedReaderExample = await hre.deployments.get('DataFeedReaderExample');
  const dataFeedReaderExample = new hre.ethers.Contract(
    DataFeedReaderExample.address,
    DataFeedReaderExample.abi,
    hre.ethers.provider
  );
  const dataFeedId = process.env.DATA_FEED_ID;
  if (!dataFeedId) {
    throw new Error('Data feed ID not defined');
  }
  const dataFeedValue = await dataFeedReaderExample.readDataFeedValueWithId(dataFeedId);
  console.log(
    `DataFeedReaderExample at ${
      DataFeedReaderExample.address
    } read data feed value with ID ${dataFeedId} as \n  value: ${dataFeedValue.toString()}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
