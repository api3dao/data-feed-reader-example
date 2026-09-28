import * as deployExtension from '@rocketh/deploy';

export const config = {
  accounts: {
    deployer: { default: 0 },
  },
  data: {},
};

export const extensions = { ...deployExtension };
