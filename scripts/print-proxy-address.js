const hre = require('hardhat');
const api3Contracts = require('@api3/contracts');

async function main() {
  const dapiName = process.env.DAPI_NAME;
  if (!dapiName) {
    throw new Error('Environment variable DAPI_NAME is not defined');
  }
  const chainId = hre.network.config.chainId;
  const oevBeneficiary = process.env.OEV_BENEFICIARY ?? api3Contracts.managerMultisigAddresses[chainId.toString()];
  if (!oevBeneficiary) {
    throw new Error(
      `Environment variable OEV_BENEFICIARY is not defined or the manager multisig has not been deployed on ${hre.network.name}`
    );
  }
  const dapiProxyWithOevAddress = api3Contracts.computeDapiProxyWithOevAddress(chainId, dapiName, oevBeneficiary, '0x');
  console.log(
    `The address of DapiProxyWithOev for ${dapiName} with OEV beneficiary ${oevBeneficiary} is ${dapiProxyWithOevAddress}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
