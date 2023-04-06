const hre = require('hardhat');

async function main() {
  const proxyAddress = process.env.PROXY;
  if (!proxyAddress) {
    throw new Error('Environment variable "PROXY" is not defined');
  }
  const dataFeedReaderExample = new hre.ethers.Contract(
    proxyAddress,
    (await hre.artifacts.readArtifact('IProxy')).abi,
    hre.ethers.provider
  );
  const dataFeed = await dataFeedReaderExample.read();
  console.log(
    `Read proxy at ${proxyAddress} directly as \n  value: ${dataFeed.value.toString()}\n  timestamp: ${dataFeed.timestamp.toString()} (${new Date(
      dataFeed.timestamp * 1000
    ).toISOString()})`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
