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
    const mockApi3ReaderProxyFactory = await ethers.getContractFactory('MockApi3ReaderProxy', roles.owner);
    const mockApi3ReaderProxy = await mockApi3ReaderProxyFactory.deploy();
    const dataFeedReaderExampleFactory = await ethers.getContractFactory('DataFeedReaderExample', roles.owner);
    const dataFeedReaderExample = await dataFeedReaderExampleFactory.deploy(mockApi3ReaderProxy.address);
    return {
      roles,
      mockApi3ReaderProxy,
      dataFeedReaderExample,
    };
  }

  describe('constructor', function () {
    it('constructs', async function () {
      const { roles, mockApi3ReaderProxy, dataFeedReaderExample } = await helpers.loadFixture(deploy);
      expect(await dataFeedReaderExample.owner()).to.equal(roles.owner.address);
      expect(await dataFeedReaderExample.proxy()).to.equal(mockApi3ReaderProxy.address);
    });
  });

  describe('setProxy', function () {
    context('Sender is the owner', function () {
      it('sets proxy', async function () {
        const { roles, dataFeedReaderExample } = await helpers.loadFixture(deploy);
        const newProxyAddress = ethers.Wallet.createRandom().address;
        await dataFeedReaderExample.connect(roles.owner).setProxy(newProxyAddress);
        expect(await dataFeedReaderExample.proxy()).to.equal(newProxyAddress);
      });
    });
    context('Sender is not the owner', function () {
      it('reverts', async function () {
        const { roles, dataFeedReaderExample } = await helpers.loadFixture(deploy);
        const newProxyAddress = ethers.Wallet.createRandom().address;
        await expect(dataFeedReaderExample.connect(roles.randomPerson).setProxy(newProxyAddress)).to.be.revertedWith(
          'Ownable: caller is not the owner'
        );
      });
    });
  });

  describe('readDataFeed', function () {
    context('Value is positive', function () {
      context('Timestamp is not older than a day', function () {
        it('reads data feed', async function () {
          const { mockApi3ReaderProxy, dataFeedReaderExample } = await helpers.loadFixture(deploy);
          const dataFeedValue = 123456;
          const dataFeedTimestamp = (await ethers.provider.getBlock()).timestamp;
          await mockApi3ReaderProxy.mock(dataFeedValue, dataFeedTimestamp);
          const dataFeed = await dataFeedReaderExample.readDataFeed();
          expect(dataFeed.value).to.equal(dataFeedValue);
          expect(dataFeed.timestamp).to.equal(dataFeedTimestamp);
        });
      });
      context('Timestamp is older than a day', function () {
        it('reverts', async function () {
          const { mockApi3ReaderProxy, dataFeedReaderExample } = await helpers.loadFixture(deploy);
          const dataFeedValue = 123456;
          const dataFeedTimestamp = (await ethers.provider.getBlock()).timestamp - 24 * 60 * 60;
          await mockApi3ReaderProxy.mock(dataFeedValue, dataFeedTimestamp);
          await expect(dataFeedReaderExample.readDataFeed()).to.be.revertedWith('Timestamp older than one day');
        });
      });
    });
    context('Value is not positive', function () {
      it('reverts', async function () {
        const { mockApi3ReaderProxy, dataFeedReaderExample } = await helpers.loadFixture(deploy);
        const dataFeedValue = -123456;
        const dataFeedTimestamp = (await ethers.provider.getBlock()).timestamp;
        await mockApi3ReaderProxy.mock(dataFeedValue, dataFeedTimestamp);
        await expect(dataFeedReaderExample.readDataFeed()).to.be.revertedWith('Value not positive');
      });
    });
  });
});
