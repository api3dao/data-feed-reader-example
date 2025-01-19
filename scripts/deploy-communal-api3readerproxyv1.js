const api3Contracts = require('@api3/contracts');
const { artifacts, ethers, network } = require('hardhat');

const { validateDapiName } = require('./utils');

async function main() {
  const dapiName = process.env.DAPI_NAME;
  if (!dapiName) {
    throw new Error('Environment variable DAPI_NAME is not defined');
  }
  validateDapiName(dapiName);
  const { chainId } = network.config;
  const api3ReaderProxyV1Address = api3Contracts.computeCommunalApi3ReaderProxyV1Address(chainId, dapiName);
  if ((await ethers.provider.getCode(api3ReaderProxyV1Address)) === '0x') {
    const api3ReaderProxyV1FactoryAddress =
      api3Contracts.deploymentAddresses.Api3ReaderProxyV1Factory[chainId.toString()];
    const api3ReaderProxyV1FactoryArtifact = await artifacts.readArtifact('IApi3ReaderProxyV1Factory');
    const [deployer] = await ethers.getSigners();
    const api3ReaderProxyV1Factory = new ethers.Contract(
      api3ReaderProxyV1FactoryAddress,
      api3ReaderProxyV1FactoryArtifact.abi,
      deployer
    );
    const receipt = await api3ReaderProxyV1Factory.deployApi3ReaderProxyV1(
      ethers.utils.formatBytes32String(dapiName),
      1,
      '0x'
    );
    await new Promise((resolve) =>
      ethers.provider.once(receipt.hash, () => {
        resolve();
      })
    );
    console.log(
      `The communal Api3ReaderProxyV1 for ${dapiName} is deployed at ${api3ReaderProxyV1Address} of ${network.name}`
    );
  } else {
    console.log(
      `The communal Api3ReaderProxyV1 for ${dapiName} was already deployed at ${api3ReaderProxyV1Address} of ${network.name}`
    );
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
