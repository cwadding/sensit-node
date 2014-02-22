/**
 * Publications are stored actions which are taken when a feed is created, updated, deleted, or there is a matching percolator query.
 *
 * @param "topic_id" The key for the parent topic
 * @param "id" The identifier of the publication
 */
var Publication = function(topic_id, id, client) {
  this.topic_id = topic_id;
  this.id = id;
  this.client = client;

  return this;
};

/**
 * Get all publications for the associated Topic. Requires authorization of **read_any_publications**, or **read_application_publications**.
 * '/api/topics/:topic_id/publications' GET
 *
 */
Publication.prototype.list = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/api/topics/' + this.topic_id + '/publications', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Retrieve a specific publication on the associated topic by Id. Requires authorization of **read_any_publications**, or **read_application_publications**.
 * '/api/topics/:topic_id/publications/:id' GET
 *
 */
Publication.prototype.find = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/api/topics/' + this.topic_id + '/publications/' + this.id + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Create a new publication on the associated Topic which can be easily retrieved later using an id. Requires authorization of **manage_any_publications**, or **manage_application_publications**.
 * '/api/topics/:topic_id/publications' POST
 *
 * @param "publication" A Hash containing `host`:The ip address or host of the connection(required).`protocol`:the protocol to communicate over (http, tcp, udp, mqtt) (required)`port`:The port of the connection.
 */
Publication.prototype.create = function (publication, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['publication'] = publication;

  this.client.post('/api/topics/' + this.topic_id + '/publications', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Update a publication. Requires authorization of **manage_any_publications**, or **manage_application_publications**.
 * '/api/topics/:topic_id/publications/:id' PUT
 *
 * @param "publication" A Hash containing `host`:The ip address or host of the connection(required).`protocol`:the protocol to communicate over (http, tcp, udp, mqtt) (required)`port`:The port of the connection.
 */
Publication.prototype.update = function (publication, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['publication'] = publication;

  this.client.put('/api/topics/' + this.topic_id + '/publications/' + this.id + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Remove a saved publication on the associated Topic by Id. Requires authorization of **manage_any_publications**, or **manage_application_publications**.
 * '/api/topics/:topic_id/publications/:id' DELETE
 *
 */
Publication.prototype.delete = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});

  this.client.delete('/api/topics/' + this.topic_id + '/publications/' + this.id + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

// Export module
module.exports = Publication
