import { hardhatConfig } from '@api3/contracts';
import hardhatToolboxMochaEthers from '@nomicfoundation/hardhat-toolbox-mocha-ethers';
import 'dotenv/config';
import { defineConfig } from 'hardhat/config';
import hardhatDeploy from 'hardhat-deploy';

const compilers = [{ version: '0.8.17', settings: { optimizer: { enabled: false, runs: 200 } } }];

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [hardhatToolboxMochaEthers, hardhatDeploy],
  networks: hardhatConfig.v3.networks(),
  chainDescriptors: hardhatConfig.v3.chainDescriptors(),
  verify: hardhatConfig.v3.verify(),
  typechain: { outDir: 'typechain-types' },
  solidity: {
    npmFilesToBuild: [
      '@api3/contracts/api3-server-v1/proxies/interfaces/IApi3ReaderProxyV1Factory.sol',
      '@api3/contracts/mock/MockApi3ReaderProxy.sol',
      '@api3/contracts/mock/MockApi3ReaderProxyV1.sol',
    ],
    profiles: {
      default: { compilers },
      production: { compilers },
    },
  },
});
