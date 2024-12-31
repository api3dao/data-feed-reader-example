require('@nomicfoundation/hardhat-toolbox');
require('hardhat-deploy');
const {
  api3Chains: { hardhatConfig },
} = require('@api3/dapi-management');
require('dotenv').config();

module.exports = {
  gasReporter: {
    enabled: false,
  },
  networks: hardhatConfig.networks(),
  solidity: {
    version: '0.8.17',
  },
};
