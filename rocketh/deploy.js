import { setupDeployScripts } from 'rocketh';

import { extensions } from './config.js';

export const { deployScript } = setupDeployScripts(extensions);
export * as artifacts from '../generated/artifacts/index.js';
