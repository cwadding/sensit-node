var Client = require('./sensit/client');

// Export module
var sensit = module.exports;

/**
 * This file contains the global namespace for the module
 */
sensit.client = function(auth, options) {
  return new Client(auth, options);
};
