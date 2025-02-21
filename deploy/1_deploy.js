const { deployments, ethers } = require('hardhat');

module.exports = async () => {
  const proxyAddress = process.env.PROXY;
  if (!proxyAddress) {
    throw new Error('Environment variable "PROXY" is not defined');
  }
  const [deployer] = await ethers.getSigners();
  const dataFeedReaderExample = await deployments.deploy('DataFeedReaderExample', {
    args: [proxyAddress],
    from: deployer.address,
    log: true,
  });
  console.log(`Deployed DataFeedReaderExample at ${dataFeedReaderExample.address}`);
};
