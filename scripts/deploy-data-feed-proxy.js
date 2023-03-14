const hre = require('hardhat');
const api3Contracts = require('@api3/contracts');

async function main() {
  const proxyFactoryAddress = api3Contracts.references.ProxyFactory[hre.network.config.chainId.toString()];
  const proxyFactoryArtifact = await hre.artifacts.readArtifact('IProxyFactory');
  const proxyFactory = new hre.ethers.Contract(proxyFactoryAddress, proxyFactoryArtifact.abi, hre.ethers.provider);
  const dataFeedId = process.env.DATA_FEED_ID;
  if (!dataFeedId) {
    throw new Error('Environment variable "DATA_FEED_ID" is not defined');
  }
  const receipt = await proxyFactory.deployDataFeedProxy(dataFeedId, '0x');
  await new Promise((resolve) =>
    hre.ethers.provider.once(receipt.hash, () => {
      resolve();
    })
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
