// This script is intended for API3 to use internally.
// Differently from `deploy-dapp-specific-api3readerproxyv1.js`, it allows
// proxies with arbirary dApp aliases to be deployed.
import * as api3Contracts from '@api3/contracts';
import { solidityPackedKeccak256 } from 'ethers';
import hre from 'hardhat';

import { validateDapiName } from './utils.js';

// Unlike the `@api3/contracts` version, the below does not throw due to
// `dappAlias` not being recognized
function computeDappIdUnsafe(dappAlias, chainId) {
  return BigInt(
    solidityPackedKeccak256(['bytes32', 'uint256'], [solidityPackedKeccak256(['string'], [dappAlias]), chainId])
  );
}

async function main() {
  const dapiName = process.env.DAPI_NAME;
  if (!dapiName) {
    throw new Error('Environment variable DAPI_NAME is not defined');
  }
  validateDapiName(dapiName);
  const dappAlias = process.env.DAPP_ALIAS;
  if (!dappAlias) {
    throw new Error('Environment variable DAPP_ALIAS is not defined');
  }
  if (!api3Contracts.DAPPS.some((dapp) => dappAlias in dapp.aliases)) {
    console.warn(`@api3/contracts does not include the dApp with alias ${dappAlias}. Deployment will continue anyway.`);
  }
  const { ethers, networkConfig, networkName } = await hre.network.getOrCreate();
  const { chainId } = networkConfig;
  const dappId = computeDappIdUnsafe(dappAlias, chainId);
  const api3ReaderProxyV1Address = api3Contracts.computeApi3ReaderProxyV1Address(chainId, dapiName, dappId, '0x');
  if ((await ethers.provider.getCode(api3ReaderProxyV1Address)) === '0x') {
    const api3ReaderProxyV1FactoryAddress =
      api3Contracts.deploymentAddresses.Api3ReaderProxyV1Factory[chainId.toString()];
    const api3ReaderProxyV1FactoryArtifact = await hre.artifacts.readArtifact('IApi3ReaderProxyV1Factory');
    const [deployer] = await ethers.getSigners();
    const api3ReaderProxyV1Factory = new ethers.Contract(
      api3ReaderProxyV1FactoryAddress,
      api3ReaderProxyV1FactoryArtifact.abi,
      deployer
    );
    const transaction = await api3ReaderProxyV1Factory.deployApi3ReaderProxyV1(
      ethers.encodeBytes32String(dapiName),
      dappId,
      '0x'
    );
    await transaction.wait();
    console.log(
      `${dappAlias}'s Api3ReaderProxyV1 for ${dapiName} is deployed at ${api3ReaderProxyV1Address} of ${networkName}`
    );
  } else {
    console.log(
      `${dappAlias}'s Api3ReaderProxyV1 for ${dapiName} was already deployed at ${api3ReaderProxyV1Address} of ${networkName}`
    );
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
