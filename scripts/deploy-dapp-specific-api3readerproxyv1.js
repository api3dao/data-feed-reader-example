const hre = require('hardhat');
const api3Contracts = require('@api3/contracts');
const { validateDapiName } = require('./utils');

async function main() {
  const dapiName = process.env.DAPI_NAME;
  if (!dapiName) {
    throw new Error('Environment variable DAPI_NAME is not defined');
  }
  validateDapiName(dapiName);
  const dappAlias = process.env.DAPP_ALIAS;
  if (!dappAlias) {
    throw new Error('Environment variable DAPP_ALIAS is not defined');
  }
  const chainId = hre.network.config.chainId;
  const api3ReaderProxyV1Address = api3Contracts.computeDappSpecificApi3ReaderProxyV1Address(
    dappAlias,
    chainId,
    dapiName
  );
  if ((await hre.ethers.provider.getCode(api3ReaderProxyV1Address)) === '0x') {
    const api3ReaderProxyV1FactoryAddress =
      api3Contracts.deploymentAddresses.Api3ReaderProxyV1Factory[chainId.toString()];
    const api3ReaderProxyV1FactoryArtifact = await hre.artifacts.readArtifact('IApi3ReaderProxyV1Factory');
    const api3ReaderProxyV1Factory = new hre.ethers.Contract(
      api3ReaderProxyV1FactoryAddress,
      api3ReaderProxyV1FactoryArtifact.abi,
      (await hre.ethers.getSigners())[0]
    );
    const receipt = await api3ReaderProxyV1Factory.deployApi3ReaderProxyV1(
      hre.ethers.utils.formatBytes32String(dapiName),
      api3Contracts.computeDappId(dappAlias, chainId),
      '0x'
    );
    await new Promise((resolve) =>
      hre.ethers.provider.once(receipt.hash, () => {
        resolve();
      })
    );
    console.log(
      `${dappAlias}'s Api3ReaderProxyV1 for ${dapiName} is deployed at ${api3ReaderProxyV1Address} of ${hre.network.name}`
    );
  } else {
    console.log(
      `${dappAlias}'s Api3ReaderProxyV1 for ${dapiName} was already deployed at ${api3ReaderProxyV1Address} of ${hre.network.name}`
    );
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
