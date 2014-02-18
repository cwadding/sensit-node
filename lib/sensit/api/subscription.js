/**
 * Subscriptions allows feed data to imported using a socket rather than just using the Feed REST API. By creating a subscription sensit will start to listen for feed data being imported using the specified `host` and while using the topic name as the `channel` name.
 *
 * @param "id" The identifier for the subscription
 */
var Subscription = function(id, client) {
  this.id = id;
  this.client = client;

  return this;
};

/**
 * Get the list of all subscriptions for importing feed data to the associated topics. Requires authorization of **read_any_subscriptions**, or **read_application_subscriptions**.
 * '/subscriptions' GET
 *
 */
Subscription.prototype.list = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/subscriptions', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Get the information of a specific subscription. Requires authorization of **read_any_subscriptions**, or **read_application_subscriptions**.
 * '/subscriptions/:id' GET
 *
 */
Subscription.prototype.find = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/subscriptions/' + this.id + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Create a subscription which will connect to the server and listen for feed data for any of the associated topics. Requires authorization of **manage_any_subscriptions**, or **manage_application_subscriptions**.
 * '/subscriptions' POST
 *
 * @param "name" The channel or name to identify the subscription.
 * @param "host" The ip address or host of the connection
 * @param "protocol" the protocol to comminivate over
 */
Subscription.prototype.create = function (name, host, protocol, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['name'] = name;
  body['host'] = host;
  body['protocol'] = protocol;

  this.client.post('/subscriptions', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Returns an object with the current configuration that Buffer is using, including supported services, their icons and the varying limits of character and schedules.  Requires authorization of **manage_any_subscriptions**, or **manage_application_subscriptions**.
 * '/subscriptions/:id' PUT
 *
 * @param "name" The channel or name to identify the subscription.
 * @param "host" The ip address or host of the connection
 * @param "protocol" the protocol to comminivate over
 */
Subscription.prototype.update = function (name, host, protocol, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['name'] = name;
  body['host'] = host;
  body['protocol'] = protocol;

  this.client.put('/subscriptions/' + this.id + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Delete the subscription and stop listening for feed data for the associated topics. Requires authorization of **manage_any_subscriptions**, or **manage_application_subscriptions**.
 * '/subscriptions/:id' DELETE
 *
 */
Subscription.prototype.delete = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});

  this.client.delete('/subscriptions/' + this.id + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

// Export module
module.exports = Subscription
