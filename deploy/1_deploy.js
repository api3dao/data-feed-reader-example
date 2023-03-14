const hre = require('hardhat');

module.exports = async () => {
  const proxyAddress = process.env.PROXY;
  if (!proxyAddress) {
    throw new Error('Environment variable "PROXY" is not defined');
  }
  const dataFeedReaderExample = await hre.deployments.deploy('DataFeedReaderExample', {
    args: [proxyAddress],
    from: (await hre.getUnnamedAccounts())[0],
    log: true,
  });
  console.log(`Deployed DataFeedReaderExample at ${dataFeedReaderExample.address}`);
};
