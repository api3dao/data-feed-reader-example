const hre = require('hardhat');
const api3Contracts = require('@api3/contracts');

async function main() {
  const dapiName = process.env.DAPI_NAME;
  if (!dapiName) {
    throw new Error('Environment variable DAPI_NAME is not defined');
  }
  const chainId = hre.network.config.chainId;
  const dapiProxyAddress = api3Contracts.computeDapiProxyAddress(chainId, dapiName, '0x');
  if ((await hre.ethers.provider.getCode(dapiProxyAddress)) === '0x') {
    const proxyFactoryAddress = api3Contracts.references.ProxyFactory[chainId.toString()];
    const proxyFactoryArtifact = await hre.artifacts.readArtifact('IProxyFactory');
    const proxyFactory = new hre.ethers.Contract(
      proxyFactoryAddress,
      proxyFactoryArtifact.abi,
      (await hre.ethers.getSigners())[0]
    );
    const receipt = await proxyFactory.deployDapiProxy(hre.ethers.utils.formatBytes32String(dapiName), '0x');
    await new Promise((resolve) =>
      hre.ethers.provider.once(receipt.hash, () => {
        resolve();
      })
    );
    console.log(`DapiProxy for ${dapiName} is deployed at ${dapiProxyAddress} of ${hre.network.name}`);
  } else {
    console.log(`DapiProxy for ${dapiName} was already deployed at ${dapiProxyAddress} of ${hre.network.name}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
