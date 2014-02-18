var request = module.exports;

/**
 * This module takes care of encoding the request body into format given by options
 */
request.setBody = function(reqobj, body, options) {
  var type = (options['request_type'] ? options['request_type'] : 'form');


  // Encoding body into JSON format
  if (type == 'json') {
    reqobj['json'] = body;
  }

  // Encoding body into form-urlencoded format
  if (type == 'form') {
    reqobj['form'] = body;
  }

  // Raw body
  if (type == 'raw') {
    reqobj['body'] = body;

    if (typeof reqobj['body'] == 'object') {
      delete reqobj['body'];
    }
  }

  return reqobj;
};
