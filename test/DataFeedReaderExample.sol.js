const hre = require('hardhat');

describe('DataFeedReaderExample', function () {
  let mockDapiServer, dataFeedReaderExample;
  let roles;

  beforeEach(async () => {
    const accounts = await hre.ethers.getSigners();
    roles = {
      deployer: accounts[0],
    };
    const mockDapiServerFactory = await hre.ethers.getContractFactory('MockDapiServer', roles.deployer);
    mockDapiServer = await mockDapiServerFactory.deploy();
    const dataFeedReaderExampleFactory = await hre.ethers.getContractFactory('DataFeedReaderExample', roles.deployer);
    dataFeedReaderExample = await dataFeedReaderExampleFactory.deploy(mockDapiServer.address);
  });

  describe('constructor', function () {
    it('works', async function () {
      console.log(dataFeedReaderExample.address);
    });
  });
});
