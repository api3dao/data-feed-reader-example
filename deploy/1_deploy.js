const hre = require('hardhat');
const api3OperationsDeploymentReferences = require('@api3/operations/chain/deployments/references.json');

module.exports = async () => {
  const dapiServerAddress =
    api3OperationsDeploymentReferences.contracts.DapiServer[hre.network.config.chainId.toString()];
  const dataFeedReaderExample = await hre.deployments.deploy('DataFeedReaderExample', {
    args: [dapiServerAddress],
    from: (await hre.getUnnamedAccounts())[0],
    log: true,
  });
  console.log(`Deployed DataFeedReaderExample at ${dataFeedReaderExample.address}`);
};
