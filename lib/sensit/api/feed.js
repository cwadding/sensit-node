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
 * '/api/topics/:topic_id/feeds' GET
 *
 */
Feed.prototype.list = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/api/topics/' + this.topic_id + '/feeds', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Returns a specific feed for a topic. Requires authorization of **read_any_data**, or **read_application_data**.
 * '/api/topics/:topic_id/feeds/:id' GET
 *
 */
Feed.prototype.find = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/api/topics/' + this.topic_id + '/feeds/' + this.id + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Create a feed on a given topic. Requires authorization of **read_any_data**, or **read_application_data**.
 * '/api/topics/:topic_id/feeds' POST
 *
 * @param "feed" A Hash containing `at`: a formatted time of the event. Defaults to the current time if not present.`tz`: The time zone of the time given in `at`. Defaults to UTC`data`:A hash of data to be stored
 */
Feed.prototype.create = function (feed, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['feed'] = feed;

  this.client.post('/api/topics/' + this.topic_id + '/feeds', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Update an associated Feed to the Topic. Requires authorization of **read_any_data**, or **read_application_data**.
 * '/api/topics/:topic_id/feeds/:id' PUT
 *
 * @param "feed" A hash containing `data`:A hash of data to be stored
 */
Feed.prototype.update = function (feed, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['feed'] = feed;

  this.client.put('/api/topics/' + this.topic_id + '/feeds/' + this.id + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Deletes the desired feed. Requires authorization of **read_any_data**, or **read_application_data**.
 * '/api/topics/:topic_id/feeds/:id' DELETE
 *
 */
Feed.prototype.delete = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});

  this.client.delete('/api/topics/' + this.topic_id + '/feeds/' + this.id + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

// Export module
module.exports = Feed
