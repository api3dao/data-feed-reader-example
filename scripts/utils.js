import { dapis } from '@api3/dapi-management';

export function validateDapiName(dapiName) {
  const dapi = dapis.find((dapi) => dapi.name === dapiName);
  if (!dapi) {
    throw new Error(`dAPI with name ${dapiName} does not exist`);
  }
  if (dapi.stage === 'deprecated') {
    console.warn(`dAPI with name ${dapiName} is deprecated`);
  } else if (dapi.stage !== 'active') {
    throw new Error(`dAPI with name ${dapiName} is not active, its current state is ${dapi.stage}`);
  }
}
