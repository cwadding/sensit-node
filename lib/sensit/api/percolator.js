/**
 * A **Percolator** is a reverse query much like a match rule which is run whenever a new feed is added. These can be used to create alerts by causing the sensit to publish the feed that was just added. A percolator query is defined by a `name` and and valid `query` according to the according the the [elasticsearch Query DSL](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/query-dsl.html).  For more information about Percolator queries please refer to the [elasticsearch percolator documentation](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/search-percolate.html).
 *
 * @param "topic_id" The key for the parent topic
 * @param "id" The name of the percolator query
 */
var Percolator = function(topic_id, id, client) {
  this.topic_id = topic_id;
  this.id = id;
  this.client = client;

  return this;
};

/**
 * Returns a list or percolators for a given topic. Requires authorization of **read_any_percolators**, or **read_application_percolators**.
 * '/topics/:topic_id/percolators' GET
 *
 */
Percolator.prototype.list = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/topics/' + this.topic_id + '/percolators', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Return a specific percolator of the associated Topic by Id. Requires authorization of **read_any_percolators**, or **read_application_percolators**.
 * '/topics/:topic_id/percolators/:id' GET
 *
 */
Percolator.prototype.find = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/topics/' + this.topic_id + '/percolators/' + this.id + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Create a percolator on the associated Topic with the specified name and query. Requires authorization of **manage_any_percolators**, or **manage_application_percolators**.
 * '/topics/:topic_id/percolators' POST
 *
 * @param "name" The time zone of the time. Defaults to UTC
 * @param "query" A hash of data to be stored
 */
Percolator.prototype.create = function (name, query, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['name'] = name;
  body['query'] = query;

  this.client.post('/topics/' + this.topic_id + '/percolators', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Update the query for a specific percolator. Requires authorization of **manage_any_percolators**, or **manage_application_percolators**.
 * '/topics/:topic_id/percolators/:id' PUT
 *
 * @param "query" A hash of data to be stored
 */
Percolator.prototype.update = function (query, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['query'] = query;

  this.client.put('/topics/' + this.topic_id + '/percolators/' + this.id + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Delete a percolator on the associated topic. Requires authorization of **manage_any_percolators**, or **manage_application_percolators**.
 * '/topics/:topic_id/percolators/:id' DELETE
 *
 */
Percolator.prototype.delete = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});

  this.client.delete('/topics/' + this.topic_id + '/percolators/' + this.id + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

// Export module
module.exports = Percolator
