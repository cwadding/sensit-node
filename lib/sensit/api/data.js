/**
 * Get the value of a specific field within a feed
 *
 * @param "topic_id" The key for the parent topic
 * @param "feed_id" The id of the parent feed
 * @param "id" The key of the specific field
 */
var Data = function(topic_id, feed_id, id, client) {
  this.topic_id = topic_id;
  this.feed_id = feed_id;
  this.id = id;
  this.client = client;

  return this;
};

/**
 * Requires authorization of **read_any_data**, or **read_application_data**.
 * '/topics/:topic_id/feeds/:feed_id/data/:id' GET
 *
 */
Data.prototype.find = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/topics/' + this.topic_id + '/feeds/' + this.feed_id + '/data/' + this.id + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Update a specific value of a field within a feed with the data passed in. Requires authorization of **read_any_data**, or **read_application_data**.
 * '/topics/:topic_id/feeds/:feed_id/data/:id' PUT
 *
 */
Data.prototype.update = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});

  this.client.put('/topics/' + this.topic_id + '/feeds/' + this.feed_id + '/data/' + this.id + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

// Export module
module.exports = Data
