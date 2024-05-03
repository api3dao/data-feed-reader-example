const { getChains, api3Chains } = require("@api3/dapi-management");

async function main() {
  const supportedChains = getChains()
    .filter(chain => ['active', 'deprecated'].includes(chain.stage))
    .map(chain => {
      const { alias } = api3Chains.CHAINS.find(({ id }) => id === chain.id);
      return { id: Number(chain.id), name: alias, marketLink: `https://market.api3.org/${alias}` };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
  console.table(supportedChains, ['id', 'name', 'marketLink']);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
