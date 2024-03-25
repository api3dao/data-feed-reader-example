const hre = require('hardhat');
const api3Contracts = require('@api3/contracts');

async function main() {
  const dataFeedId = process.env.DATA_FEED_ID;
  if (!dataFeedId) {
    throw new Error('Environment variable DATA_FEED_ID is not defined');
  }
  const chainId = hre.network.config.chainId;
  const dataFeedProxyAddress = api3Contracts.computeDataFeedProxyAddress(chainId, dataFeedId, '0x');
  if ((await hre.ethers.provider.getCode(dataFeedProxyAddress)) === '0x') {
    const proxyFactoryAddress = api3Contracts.deploymentAddresses.ProxyFactory[chainId.toString()];
    const proxyFactoryArtifact = await hre.artifacts.readArtifact('IProxyFactory');
    const proxyFactory = new hre.ethers.Contract(
      proxyFactoryAddress,
      proxyFactoryArtifact.abi,
      (await hre.ethers.getSigners())[0]
    );
    const receipt = await proxyFactory.deployDataFeedProxy(dataFeedId, '0x');
    await new Promise((resolve) =>
      hre.ethers.provider.once(receipt.hash, () => {
        resolve();
      })
    );
    console.log(`DataFeedProxy for ${dataFeedId} is deployed at ${dataFeedProxyAddress} of ${hre.network.name}`);
  } else {
    console.log(
      `DataFeedProxy for ${dataFeedId} was already deployed at ${dataFeedProxyAddress} of ${hre.network.name}`
    );
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
