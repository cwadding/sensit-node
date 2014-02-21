/**
 * A topic is root that data is attached to. It is the equivalent of a source in searchlight/solink and acts as a table which has columns(Fields) and rows(Feeds).
 *
 */
var Topic = function(client) {
  this.client = client;

  return this;
};

/**
 * Requires authorization of **read_any_data**, or **read_application_data**.
 * '/topics' GET
 *
 */
Topic.prototype.list = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/topics', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Requires authorization of **read_any_data**, or **read_application_data**.
 * '/topics/:id' GET
 *
 */
Topic.prototype.find = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/topics/:id', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Requires authorization of **manage_any_data**, or **manage_application_data**.
 * '/topics' POST
 *
 * @param "topic" A hash containing the name/id of the topic (required) and a description of the topic.
 */
Topic.prototype.create = function (topic, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['topic'] = topic;

  this.client.post('/topics', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Requires authorization of **manage_any_data**, or **manage_application_data**.
 * '/topics/:id' PUT
 *
 * @param "topic" A hash containing the name/id of the topic (required) and a description of the topic.
 */
Topic.prototype.update = function (topic, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['topic'] = topic;

  this.client.put('/topics/:id', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Requires authorization of **manage_any_data**, or **manage_application_data**.
 * '/topics/:id' DELETE
 *
 */
Topic.prototype.delete = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});

  this.client.delete('/topics/:id', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

// Export module
module.exports = Topic
