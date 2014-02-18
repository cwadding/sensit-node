/**
 * <no value>
 *
 */
var User = function(client) {
  this.client = client;

  return this;
};

/**
 * <no value>
 * '/user' GET
 *
 */
User.prototype.profile = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/user', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

// Export module
module.exports = User
