const api3DapiManagement = require('@api3/dapi-management');

module.exports = {
  validateDapiName: (dapiName) => {
    const dapi = api3DapiManagement.dapis.find((dapi) => dapi.name === dapiName);
    if (!dapi) {
      throw new Error(`dAPI with name ${dapiName} does not exist`);
    }
    if (dapi.stage === 'deprecated') {
      console.warn(`dAPI with name ${dapiName} is deprecated`);
    } else if (dapi.stage !== 'active') {
      throw new Error(`dAPI with name ${dapiName} is not active, its current state is ${dapi.stage}`);
    }
  },
};
