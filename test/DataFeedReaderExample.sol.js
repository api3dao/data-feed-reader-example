const hre = require('hardhat');
const { expect } = require('chai');

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

  describe('readDataFeedWithId', function () {
    context('DataFeedReaderExample is allowed to read', function () {
      it('reads data feed with ID', async function () {
        const dataFeedId = '0x1234567890123456789012345678901234567890123456789012345678901234';
        const dataFeedValue = 123456;
        const dataFeedTimestamp = (await hre.ethers.provider.getBlock()).timestamp;
        await mockDapiServer.mockDataFeed(dataFeedId, dataFeedValue, dataFeedTimestamp);
        const dataFeed = await dataFeedReaderExample.readDataFeedWithId(dataFeedId);
        expect(dataFeed.value).to.equal(dataFeedValue);
        expect(dataFeed.timestamp).to.equal(dataFeedTimestamp);
      });
    });
    context('DataFeedReaderExample is not allowed to read', function () {
      it('reverts', async function () {
        const dataFeedId = '0x1234567890123456789012345678901234567890123456789012345678901234';
        const dataFeedValue = 123456;
        const dataFeedTimestamp = (await hre.ethers.provider.getBlock()).timestamp;
        await mockDapiServer.mockDataFeed(dataFeedId, dataFeedValue, dataFeedTimestamp);
        await mockDapiServer.mockIfAllowedToRead(false);
        await expect(dataFeedReaderExample.readDataFeedWithId(dataFeedId)).to.be.revertedWith('Sender cannot read');
      });
    });
  });

  describe('readDataFeedValueWithId', function () {
    context('DataFeedReaderExample is allowed to read', function () {
      it('reads data feed value with ID', async function () {
        const dataFeedId = '0x1234567890123456789012345678901234567890123456789012345678901234';
        const dataFeedValue = 123456;
        const dataFeedTimestamp = (await hre.ethers.provider.getBlock()).timestamp;
        await mockDapiServer.mockDataFeed(dataFeedId, dataFeedValue, dataFeedTimestamp);
        expect(await dataFeedReaderExample.readDataFeedValueWithId(dataFeedId)).to.equal(dataFeedValue);
      });
    });
    context('DataFeedReaderExample is not allowed to read', function () {
      it('reverts', async function () {
        const dataFeedId = '0x1234567890123456789012345678901234567890123456789012345678901234';
        const dataFeedValue = 123456;
        const dataFeedTimestamp = (await hre.ethers.provider.getBlock()).timestamp;
        await mockDapiServer.mockDataFeed(dataFeedId, dataFeedValue, dataFeedTimestamp);
        await mockDapiServer.mockIfAllowedToRead(false);
        await expect(dataFeedReaderExample.readDataFeedValueWithId(dataFeedId)).to.be.revertedWith(
          'Sender cannot read'
        );
      });
    });
  });

  describe('readDataFeedWithDapiName', function () {
    context('DataFeedReaderExample is allowed to read', function () {
      it('reads data feed with ID', async function () {
        const dataFeedId = '0x1234567890123456789012345678901234567890123456789012345678901234';
        const dataFeedValue = 123456;
        const dataFeedTimestamp = (await hre.ethers.provider.getBlock()).timestamp;
        await mockDapiServer.mockDataFeed(dataFeedId, dataFeedValue, dataFeedTimestamp);
        const dapiName = hre.ethers.utils.formatBytes32String('My dAPI');
        await mockDapiServer.mockDapiName(dapiName, dataFeedId);
        const dataFeed = await dataFeedReaderExample.readDataFeedWithDapiName(dapiName);
        expect(dataFeed.value).to.equal(dataFeedValue);
        expect(dataFeed.timestamp).to.equal(dataFeedTimestamp);
      });
    });
    context('DataFeedReaderExample is not allowed to read', function () {
      it('reverts', async function () {
        const dataFeedId = '0x1234567890123456789012345678901234567890123456789012345678901234';
        const dataFeedValue = 123456;
        const dataFeedTimestamp = (await hre.ethers.provider.getBlock()).timestamp;
        await mockDapiServer.mockDataFeed(dataFeedId, dataFeedValue, dataFeedTimestamp);
        const dapiName = hre.ethers.utils.formatBytes32String('My dAPI');
        await mockDapiServer.mockDapiName(dapiName, dataFeedId);
        await mockDapiServer.mockIfAllowedToRead(false);
        await expect(dataFeedReaderExample.readDataFeedWithDapiName(dapiName)).to.be.revertedWith('Sender cannot read');
      });
    });
  });

  describe('readDataFeedValueWithDapiName', function () {
    context('DataFeedReaderExample is allowed to read', function () {
      it('reads data feed with ID', async function () {
        const dataFeedId = '0x1234567890123456789012345678901234567890123456789012345678901234';
        const dataFeedValue = 123456;
        const dataFeedTimestamp = (await hre.ethers.provider.getBlock()).timestamp;
        await mockDapiServer.mockDataFeed(dataFeedId, dataFeedValue, dataFeedTimestamp);
        const dapiName = hre.ethers.utils.formatBytes32String('My dAPI');
        await mockDapiServer.mockDapiName(dapiName, dataFeedId);
        expect(await dataFeedReaderExample.readDataFeedValueWithDapiName(dapiName)).to.equal(dataFeedValue);
      });
    });
    context('DataFeedReaderExample is not allowed to read', function () {
      it('reverts', async function () {
        const dataFeedId = '0x1234567890123456789012345678901234567890123456789012345678901234';
        const dataFeedValue = 123456;
        const dataFeedTimestamp = (await hre.ethers.provider.getBlock()).timestamp;
        await mockDapiServer.mockDataFeed(dataFeedId, dataFeedValue, dataFeedTimestamp);
        const dapiName = hre.ethers.utils.formatBytes32String('My dAPI');
        await mockDapiServer.mockDapiName(dapiName, dataFeedId);
        await mockDapiServer.mockIfAllowedToRead(false);
        await expect(dataFeedReaderExample.readDataFeedValueWithDapiName(dapiName)).to.be.revertedWith(
          'Sender cannot read'
        );
      });
    });
  });
});
