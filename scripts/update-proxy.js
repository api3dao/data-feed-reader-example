const hre = require('hardhat');

async function main() {
  const proxyAddress = process.env.PROXY;
  if (!proxyAddress) {
    throw new Error('Environment variable "PROXY" is not defined');
  }
  const DataFeedReaderExample = await hre.deployments.get('DataFeedReaderExample');
  const dataFeedReaderExample = new hre.ethers.Contract(
    DataFeedReaderExample.address,
    DataFeedReaderExample.abi,
    (await hre.ethers.getSigners())[0]
  );
  const oldProxyAddress = await dataFeedReaderExample.proxy();
  const receipt = await dataFeedReaderExample.setProxy(proxyAddress);
  await new Promise((resolve) =>
    hre.ethers.provider.once(receipt.hash, () => {
      resolve();
    })
  );
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
