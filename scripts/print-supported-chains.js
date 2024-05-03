const { getChains, api3Chains } = require('@api3/dapi-management');

async function main() {
  const supportedChains = getChains()
    .filter((chain) => ['active', 'deprecated'].includes(chain.stage))
    .map((chain) => {
      const { alias, testnet } = api3Chains.CHAINS.find(({ id }) => id === chain.id);
      return {
        id: Number(chain.id),
        name: alias,
        type: testnet ? 'testnet' : 'mainnet',
        marketLink: `https://market.api3.org/${alias}`,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  console.table(supportedChains);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
