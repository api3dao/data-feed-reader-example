import { artifacts, deployScript } from '../rocketh/deploy.js';

// eslint-disable-next-line import/no-default-export
export default deployScript(
  async (env) => {
    const proxyAddress = process.env.PROXY;
    if (!proxyAddress) {
      throw new Error('Environment variable "PROXY" is not defined');
    }
    const dataFeedReaderExample = await env.deploy('DataFeedReaderExample', {
      account: env.namedAccounts.deployer,
      artifact: artifacts.DataFeedReaderExample,
      args: [proxyAddress],
    });
    console.log(`Deployed DataFeedReaderExample at ${dataFeedReaderExample.address}`);
  },
  { tags: ['DataFeedReaderExample'] }
);
