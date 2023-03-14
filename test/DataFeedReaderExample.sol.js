const { ethers } = require('hardhat');
const helpers = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

describe('DataFeedReaderExample', function () {
  async function deploy() {
    const accounts = await ethers.getSigners();
    const roles = {
      owner: accounts[0],
      randomPerson: accounts[9],
    };
    // The Api3ServerV1 address doesn't matter since the mock contract doesn't read from it
    const api3ServerV1 = ethers.Wallet.createRandom().address;
    const mockProxyFactory = await ethers.getContractFactory('MockProxy', roles.owner);
    const mockProxy = await mockProxyFactory.deploy(api3ServerV1);
    const dataFeedReaderExampleFactory = await ethers.getContractFactory('DataFeedReaderExample', roles.owner);
    const dataFeedReaderExample = await dataFeedReaderExampleFactory.deploy(mockProxy.address);
    return {
      mockProxy,
      dataFeedReaderExample,
    };
  }

  describe('readDataFeed', function () {
    it('reads data feed', async function () {
      const { mockProxy, dataFeedReaderExample } = await helpers.loadFixture(deploy);
      const dataFeedValue = 123456;
      const dataFeedTimestamp = (await ethers.provider.getBlock()).timestamp;
      await mockProxy.mock(dataFeedValue, dataFeedTimestamp);
      const dataFeed = await dataFeedReaderExample.readDataFeed();
      expect(dataFeed.value).to.equal(dataFeedValue);
      expect(dataFeed.timestamp).to.equal(dataFeedTimestamp);
    });
  });
});
