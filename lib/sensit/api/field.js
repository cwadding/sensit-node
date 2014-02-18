/**
 * .
 *
 * @param "topic_id" The key for the parent topic
 * @param "id" Username of the user
 */
var Field = function(topic_id, id, client) {
  this.topic_id = topic_id;
  this.id = id;
  this.client = client;

  return this;
};

/**
 * Get all the fields associated with a topic. Requires authorization of **read_any_data**, or **read_application_data**
 * '/topics/:topic_id/fields' GET
 *
 */
Field.prototype.list = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/topics/' + this.topic_id + '/fields', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Get a Field of the associated a topic and Id. Requires authorization of **read_any_data**, or **read_application_data**
 * '/topics/:topic_id/fields/:id' GET
 *
 */
Field.prototype.find = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/topics/' + this.topic_id + '/fields/' + this.id + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Adds a new field that feed data can be added too. Requires authorization of **manage_any_data**, or **manage_application_data**
 * '/topics/:topic_id/fields' POST
 *
 * @param "name" The descriptive name of the field.
 * @param "key" The name that the is used to identify the field in a feed
 */
Field.prototype.create = function (name, key, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['name'] = name;
  body['key'] = key;

  this.client.post('/topics/' + this.topic_id + '/fields', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Updates the Field data and makes the corresponding changes in the index. Requires authorization of **manage_any_data**, or **manage_application_data**
 * '/api/topics/:topic_id/fields/:id' PUT
 *
 * @param "name" The descriptive name of the field.
 */
Field.prototype.update = function (name, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['name'] = name;

  this.client.put('/api/topics/' + this.topic_id + '/fields/' + this.id + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Deletes a field and the feed data in that field. Requires authorization of **manage_any_data**, or **manage_application_data**
 * '/api/topics/:topic_id/fields/:id' DELETE
 *
 */
Field.prototype.delete = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});

  this.client.delete('/api/topics/' + this.topic_id + '/fields/' + this.id + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

// Export module
module.exports = Field
