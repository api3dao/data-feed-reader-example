const hre = require('hardhat');
const dapiServerDeploymentOnPolygonTestnet = require('@api3/operations/chain/deployments/polygon-testnet/DapiServer.json');

async function main() {
  const voidSignerAddressZero = new hre.ethers.VoidSigner(hre.ethers.constants.AddressZero, hre.ethers.provider);
  const dapiServer = new hre.ethers.Contract(
    dapiServerDeploymentOnPolygonTestnet.address,
    dapiServerDeploymentOnPolygonTestnet.abi,
    voidSignerAddressZero
  );
  const dapiName = process.env.DAPI_NAME;
  if (!dapiName) {
    throw new Error('dAPI name not defined');
  }
  const encodedDapiName = hre.ethers.utils.formatBytes32String(dapiName);
  const dapi = await dapiServer.readDapiWithName(encodedDapiName);
  console.log(
    `VoidSigner with address 0 read dAPI with name ${dapiName} as \n  value: ${dapi.value.toString()}\n  timestamp: ${dapi.timestamp.toString()}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
