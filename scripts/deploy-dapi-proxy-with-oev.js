const hre = require('hardhat');
const api3Contracts = require('@api3/contracts');

async function main() {
  const dapiName = process.env.DAPI_NAME;
  if (!dapiName) {
    throw new Error('Environment variable DAPI_NAME is not defined');
  }
  const chainId = hre.network.config.chainId;
  const oevBeneficiary = process.env.OEV_BENEFICIARY ?? api3Contracts.managerMultisigAddresses[chainId.toString()];
  if (!oevBeneficiary) {
    throw new Error(`Environment variable OEV_BENEFICIARY is not defined or has GnosisSafeWithoutProxy has not been deployed on ${hre.network.name}`);
  }
  const dapiProxyWithOevAddress = api3Contracts.computeDapiProxyWithOevAddress(chainId, dapiName, oevBeneficiary, '0x');
  if ((await hre.ethers.provider.getCode(dapiProxyWithOevAddress)) === '0x') {
    const proxyFactoryAddress = api3Contracts.deploymentAddresses.ProxyFactory[chainId.toString()];
    const proxyFactoryArtifact = await hre.artifacts.readArtifact('IProxyFactory');
    const proxyFactory = new hre.ethers.Contract(
      proxyFactoryAddress,
      proxyFactoryArtifact.abi,
      (await hre.ethers.getSigners())[0]
    );
    const receipt = await proxyFactory.deployDapiProxyWithOev(hre.ethers.utils.formatBytes32String(dapiName), oevBeneficiary, '0x');
    await new Promise((resolve) =>
      hre.ethers.provider.once(receipt.hash, () => {
        resolve();
      })
    );
    console.log(`DapiProxyWithOev for ${dapiName} with OEV beneficiary ${oevBeneficiary} is deployed at ${dapiProxyWithOevAddress} of ${hre.network.name}`);
  } else {
    console.log(`DapiProxyWithOev for ${dapiName} with OEV beneficiary ${oevBeneficiary} was already deployed at ${dapiProxyWithOevAddress} of ${hre.network.name}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
