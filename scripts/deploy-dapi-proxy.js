const hre = require('hardhat');
const api3Contracts = require('@api3/contracts');

async function main() {
  const proxyFactoryAddress = api3Contracts.references.ProxyFactory[hre.network.config.chainId.toString()];
  const proxyFactoryArtifact = await hre.artifacts.readArtifact('IProxyFactory');
  const proxyFactory = new hre.ethers.Contract(proxyFactoryAddress, proxyFactoryArtifact.abi, hre.ethers.provider);
  const dapiName = process.env.DAPI_NAME;
  if (!dapiName) {
    throw new Error('Environment variable "DAPI_NAME" is not defined');
  }
  const receipt = await proxyFactory.deployDapiProxy(hre.ethers.utils.formatBytes32String(dapiName), '0x');
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
