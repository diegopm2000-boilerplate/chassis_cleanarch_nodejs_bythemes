// memoryConfigStore.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

let store;

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.set = (config) => new Promise((resolve) => {
  store = config;
  resolve(store);
});

exports.get = () => store;