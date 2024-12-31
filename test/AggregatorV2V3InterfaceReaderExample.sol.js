const helpers = require('@nomicfoundation/hardhat-network-helpers');
const { context, describe, expect, it } = require('chai');
const { ethers } = require('hardhat');

describe('AggregatorV2V3InterfaceReaderExample', function () {
  async function deploy() {
    const accounts = await ethers.getSigners();
    const roles = {
      owner: accounts[0],
      randomPerson: accounts[9],
    };
    const mockApi3ReaderProxyV1Factory = await ethers.getContractFactory('MockApi3ReaderProxyV1', roles.owner);
    const mockApi3ReaderProxyV1 = await mockApi3ReaderProxyV1Factory.deploy();
    const aggregatorV2V3InterfaceReaderExampleFactory = await ethers.getContractFactory(
      'AggregatorV2V3InterfaceReaderExample',
      roles.owner
    );
    const aggregatorV2V3InterfaceReaderExample = await aggregatorV2V3InterfaceReaderExampleFactory.deploy(
      mockApi3ReaderProxyV1.address
    );
    return {
      roles,
      mockApi3ReaderProxyV1,
      aggregatorV2V3InterfaceReaderExample,
    };
  }

  describe('constructor', function () {
    it('constructs', async function () {
      const { roles, mockApi3ReaderProxyV1, aggregatorV2V3InterfaceReaderExample } = await helpers.loadFixture(deploy);
      expect(await aggregatorV2V3InterfaceReaderExample.owner()).to.equal(roles.owner.address);
      expect(await aggregatorV2V3InterfaceReaderExample.proxy()).to.equal(mockApi3ReaderProxyV1.address);
    });
  });

  describe('setProxy', function () {
    context('Sender is the owner', function () {
      it('sets proxy', async function () {
        const { roles, aggregatorV2V3InterfaceReaderExample } = await helpers.loadFixture(deploy);
        const newProxyAddress = ethers.Wallet.createRandom().address;
        await aggregatorV2V3InterfaceReaderExample.connect(roles.owner).setProxy(newProxyAddress);
        expect(await aggregatorV2V3InterfaceReaderExample.proxy()).to.equal(newProxyAddress);
      });
    });
    context('Sender is not the owner', function () {
      it('reverts', async function () {
        const { roles, aggregatorV2V3InterfaceReaderExample } = await helpers.loadFixture(deploy);
        const newProxyAddress = ethers.Wallet.createRandom().address;
        await expect(
          aggregatorV2V3InterfaceReaderExample.connect(roles.randomPerson).setProxy(newProxyAddress)
        ).to.be.revertedWith('Ownable: caller is not the owner');
      });
    });
  });

  describe('readValue', function () {
    context('Value is positive', function () {
      it('reads data feed', async function () {
        const { mockApi3ReaderProxyV1, aggregatorV2V3InterfaceReaderExample } = await helpers.loadFixture(deploy);
        const dataFeedValue = 123_456;
        const dataFeedTimestamp = await helpers.time.latest();
        await mockApi3ReaderProxyV1.mock(dataFeedValue, dataFeedTimestamp);
        expect(await aggregatorV2V3InterfaceReaderExample.readValue()).to.equal(dataFeedValue);
      });
    });
    context('Value is not positive', function () {
      it('reverts', async function () {
        const { mockApi3ReaderProxyV1, aggregatorV2V3InterfaceReaderExample } = await helpers.loadFixture(deploy);
        const dataFeedValue = -123_456;
        const dataFeedTimestamp = await helpers.time.latest();
        await mockApi3ReaderProxyV1.mock(dataFeedValue, dataFeedTimestamp);
        await expect(aggregatorV2V3InterfaceReaderExample.readValue()).to.be.revertedWith('Value not positive');
      });
    });
  });
});
