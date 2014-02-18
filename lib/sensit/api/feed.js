/**
 * Returns api instance to get auxilary information about Buffer useful when creating your app.
 *
 * @param "topic_id" The key for the parent topic
 * @param "id" The id of the feed
 */
var Feed = function(topic_id, id, client) {
  this.topic_id = topic_id;
  this.id = id;
  this.client = client;

  return this;
};

/**
 * Returns a list of feeds for a given topic. Requires authorization of **read_any_data**, or **read_application_data**.
 * '/topics/:topic_id/feeds' GET
 *
 */
Feed.prototype.list = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/topics/' + this.topic_id + '/feeds', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Returns a specific feed for a topic. Requires authorization of **read_any_data**, or **read_application_data**.
 * '/topics/:topic_id/feeds/:id' GET
 *
 */
Feed.prototype.find = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/topics/' + this.topic_id + '/feeds/' + this.id + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Create a feed on a given topic. Requires authorization of **read_any_data**, or **read_application_data**.
 * '/topics/:topic_id/feeds' POST
 *
 * @param "data" A hash of data to be stored
 */
Feed.prototype.create = function (data, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['data'] = data;

  this.client.post('/topics/' + this.topic_id + '/feeds', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Update an associated Feed to the Topic. Requires authorization of **read_any_data**, or **read_application_data**.
 * '/topics/:topic_id/feeds/:id' PUT
 *
 * @param "data" A hash of data to be stored
 */
Feed.prototype.update = function (data, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['data'] = data;

  this.client.put('/topics/' + this.topic_id + '/feeds/' + this.id + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Deletes the desired feed. Requires authorization of **read_any_data**, or **read_application_data**.
 * '/topics/:topic_id/feeds/:id' DELETE
 *
 */
Feed.prototype.delete = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});

  this.client.delete('/topics/' + this.topic_id + '/feeds/' + this.id + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

// Export module
module.exports = Feed
