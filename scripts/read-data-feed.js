import hre from 'hardhat';
import { loadEnvironmentFromHardhat } from 'hardhat-deploy/helpers';

async function main() {
  const connection = await hre.network.getOrCreate();
  const env = await loadEnvironmentFromHardhat({ hre, connection });
  const DataFeedReaderExample = env.get('DataFeedReaderExample');
  const dataFeedReaderExample = new connection.ethers.Contract(
    DataFeedReaderExample.address,
    DataFeedReaderExample.abi,
    connection.ethers.provider
  );
  const dataFeedProxy = await dataFeedReaderExample.proxy();
  const dataFeed = await dataFeedReaderExample.readDataFeed();
  console.log(
    `DataFeedReaderExample at ${
      DataFeedReaderExample.address
    } read its data feed through the proxy at ${dataFeedProxy} as \n  value: ${dataFeed.value.toString()}\n  timestamp: ${dataFeed.timestamp.toString()} (${new Date(
      Number(dataFeed.timestamp) * 1000
    ).toISOString()})`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
