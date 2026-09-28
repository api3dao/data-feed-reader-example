import hre from 'hardhat';
import { loadEnvironmentFromHardhat } from 'hardhat-deploy/helpers';

async function main() {
  const proxyAddress = process.env.PROXY;
  if (!proxyAddress) {
    throw new Error('Environment variable "PROXY" is not defined');
  }
  const connection = await hre.network.getOrCreate();
  const env = await loadEnvironmentFromHardhat({ hre, connection });
  const DataFeedReaderExample = env.get('DataFeedReaderExample');
  const { ethers } = connection;
  const [deployer] = await ethers.getSigners();
  const dataFeedReaderExample = new ethers.Contract(DataFeedReaderExample.address, DataFeedReaderExample.abi, deployer);
  const oldProxyAddress = await dataFeedReaderExample.proxy();
  const transaction = await dataFeedReaderExample.setProxy(proxyAddress);
  await transaction.wait();
  console.log(
    `Proxy address of DataFeedReaderExample at ${DataFeedReaderExample.address} was ${oldProxyAddress} and is now ${proxyAddress}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
