const hre = require('hardhat');

async function main() {
  const DataFeedReaderExample = await hre.deployments.get('DataFeedReaderExample');
  const dataFeedReaderExample = new hre.ethers.Contract(
    DataFeedReaderExample.address,
    DataFeedReaderExample.abi,
    hre.ethers.provider
  );
  const selfServeDapiServerWhitelisterAddressOnPolygonTestnet = '0x78D95f27B068F36Bd4c3f29e424D7072D149DDF3';
  const selfServeDapiServerWhitelisterAbi = [
    'function allowToReadDataFeedWithIdFor30Days(bytes32 dataFeedId, address reader) public',
    'function allowToReadDataFeedWithDapiNameFor30Days(bytes32 dapiName, address reader) external',
  ];
  const selfServeDapiServerWhitelister = new hre.ethers.Contract(
    selfServeDapiServerWhitelisterAddressOnPolygonTestnet,
    selfServeDapiServerWhitelisterAbi,
    (await hre.ethers.getSigners())[0]
  );
  const dapiName = process.env.DAPI_NAME;
  if (!dapiName) {
    throw new Error('dAPI name not defined');
  }
  const encodedDapiName = hre.ethers.utils.formatBytes32String(dapiName);
  const receipt = await selfServeDapiServerWhitelister.allowToReadDataFeedWithDapiNameFor30Days(
    encodedDapiName,
    DataFeedReaderExample.address
  );
  await new Promise((resolve) =>
    hre.ethers.provider.once(receipt.hash, () => {
      resolve();
    })
  );
  const accessStatus = await dataFeedReaderExample.dapiNameToReaderToWhitelistStatus(
    encodedDapiName,
    dataFeedReaderExample.address
  );
  console.log(
    `DataFeedReaderExample is allowed to read the dAPI with name ${dapiName} until ${new Date(
      accessStatus.expirationTimestamp.toNumber() * 1000
    ).toISOString()}. It is granted indefinite access ${accessStatus.indefiniteWhitelistCount} times.`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
