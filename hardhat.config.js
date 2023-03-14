require('@nomicfoundation/hardhat-toolbox');
require('hardhat-deploy');
const api3Chains = require('@api3/chains');
require('dotenv').config();

const networks = Object.entries(api3Chains.hardhatConfigNetworks()).reduce((networksWithMnemonic, networkEntry) => {
  const chainAlias = networkEntry[0];
  const network = networkEntry[1];
  networksWithMnemonic[chainAlias] = {
    ...network,
    accounts: { mnemonic: process.env.MNEMONIC ? process.env.MNEMONIC : '' },
  };
  return networksWithMnemonic;
}, {});

module.exports = {
  networks,
  solidity: {
    version: '0.8.17',
  },
};
