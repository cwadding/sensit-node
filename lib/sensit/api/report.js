/**
 * Reports are stored filter and facet queries on the **Feed** data. A report is a assigned a `name` and the `query` is any elasticsearch query which filters only the desired data for the facets (See the [elasticsearch Query DSL](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/query-dsl-queries.html) for valid queries). A report can have many `facets` with each facet is referred to by a user defined `name`. Valid `type`'s of facet include **terms**, **range**, **histogram**, **filter**, **statistical**, **query**, **terms_stats**, or **geo_distance**. The `query` within a facet defines the field counts or statistics which the data is calculated over. See the [elasticsearch facet dsl](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/search-facets.html) for information about the various facet types and valid query fields.
 *
 * @param "topic_id" The key for the parent topic
 * @param "id" The identifier of the report
 */
var Report = function(topic_id, id, client) {
  this.topic_id = topic_id;
  this.id = id;
  this.client = client;

  return this;
};

/**
 * Get all reports for the associated Topic. Requires authorization of **read_any_reports**, or **read_application_reports**.
 * '/api/topics/:topic_id/reports' GET
 *
 */
Report.prototype.list = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/api/topics/' + this.topic_id + '/reports', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Retrieve a specific report on the associated topic by Id. Requires authorization of **read_any_reports**, or **read_application_reports**.
 * '/api/topics/:topic_id/reports/:id' GET
 *
 */
Report.prototype.find = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/api/topics/' + this.topic_id + '/reports/' + this.id + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Create a new report on the associated Topic which can be easily retrieved later using an id. Requires authorization of **manage_any_reports**, or **manage_application_reports**.
 * '/api/topics/:topic_id/reports' POST
 *
 * @param "report" A Hash containing `name`: The name of the report (required).`query`:The search query acccording to the [elasticsearch Query DSL](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/query-dsl-queries.html) to filter the data for the facets (Defaults to match all).`facets`:An array of facet hashes which each contain a `name` ad type of the facet along with its query hash (required).
 */
Report.prototype.create = function (report, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['report'] = report;

  this.client.post('/api/topics/' + this.topic_id + '/reports', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Update the query, facets or name of the report. Requires authorization of **manage_any_reports**, or **manage_application_reports**.
 * '/api/topics/:topic_id/reports/:id' PUT
 *
 * @param "report" A Hash containing `name`: The name of the report (required).`query`:The search query acccording to the [elasticsearch Query DSL](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/query-dsl-queries.html) to filter the data for the facets (Defaults to match all).`facets`:An array of facet hashes which each contain a `name` ad type of the facet along with its query hash (required).
 */
Report.prototype.update = function (report, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['report'] = report;

  this.client.put('/api/topics/' + this.topic_id + '/reports/' + this.id + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * Remove a saved report on the associated Topic by Id. Requires authorization of **manage_any_reports**, or **manage_application_reports**.
 * '/api/topics/:topic_id/reports/:id' DELETE
 *
 */
Report.prototype.delete = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});

  this.client.delete('/api/topics/' + this.topic_id + '/reports/' + this.id + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

// Export module
module.exports = Report
