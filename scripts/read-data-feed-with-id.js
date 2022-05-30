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
  const dataFeed = await dataFeedReaderExample.readDataFeedWithId(dataFeedId);
  console.log(
    `DataFeedReaderExample at ${
      DataFeedReaderExample.address
    } read data feed with ID ${dataFeedId} as \n  value: ${dataFeed.value.toString()}\n  timestamp: ${dataFeed.timestamp.toString()}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
