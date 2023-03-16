const hre = require('hardhat');

async function main() {
  const DataFeedReaderExample = await hre.deployments.get('DataFeedReaderExample');
  const dataFeedReaderExample = new hre.ethers.Contract(
    DataFeedReaderExample.address,
    DataFeedReaderExample.abi,
    hre.ethers.provider
  );
  const dataFeedProxy = await dataFeedReaderExample.proxy();
  const dataFeed = await dataFeedReaderExample.readDataFeed();
  console.log(
    `DataFeedReaderExample at ${
      DataFeedReaderExample.address
    } read its data feed through the proxy at ${dataFeedProxy} as \n  value: ${dataFeed.value.toString()}\n  timestamp: ${dataFeed.timestamp.toString()} (${new Date(
      dataFeed.timestamp.toNumber() * 1000
    ).toISOString()})`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
