# sensit-node

Official Sensit API library client for node.js

__This library is generated by [alpaca](https://github.com/pksunkara/alpaca)__

## Installation

Make sure you have [npm](https://npmjs.org) installed.

```bash
$ npm install sensit-client
```

#### Versions

Works with [ 0.8 / 0.9 / 0.10 / 0.11 ]

## Usage

```js
var sensit = require('sensit-client');

// Then we instantiate a client (as shown below)
```

### Build a client

##### Without any authentication

```js
var client = sensit.client();

// If you need to send options
var client = sensit.client({}, options);
```

##### Authorization header token

```js
var client = sensit.client('1a2b3', options);
```

### Response information

__All the callbacks provided to an api call will recieve the response as shown below__

```js
client.klass('args').method('args', function (err, response) {
    if (err) console.log(err);

    response.body;
    // >>> 'Hello world!'

    response.code;
    // >>> 200

    response.headers;
    // >>> {'content-type': 'text/html'}
}
```

##### HTML response

```js
response.body;
// >>> 'The username is pksunkara!'
```

##### JSON response

```js
response.body;
// >>> {'user': 'pksunkara'}
```

### Request body information

##### RAW request

```js
body = 'username=pksunkara';
```

##### FORM request

```js
body = {'user': 'pksunkara'};
```

##### JSON request

```js
body = {'user': 'pksunkara'};
```

### Client Options

The following options are available while instantiating a client:

 * __base__: Base url for the api
 * __api_version__: Default version of the api (to be used in url)
 * __user_agent__: Default user-agent for all requests
 * __headers__: Default headers for all requests
 * __request_type__: Default format of the request body

### Method Options

The following options are available while calling a method of an api:

 * __api_version__: Version of the api (to be used in url)
 * __headers__: Headers for the request
 * __query__: Query parameters for the url
 * __body__: Body of the request
 * __request_type__: Format of the request body

### <no value> api

<no value>



```js
var user = client.user();
```

##### <no value> (GET /user)

<no value>



```js
user.profile(options, callback);
```

### Topic api

A topic is root that data is attached to. It is the equivalent of a source in searchlight/solink and acts as a table which has columns(Fields) and rows(Feeds).



```js
var topic = client.topic();
```

##### List of Topics (GET /topics)

Requires authorization of **read_any_data**, or **read_application_data**.



```js
topic.list(options, callback);
```

##### Get this Topic (GET /topics/:id)

Requires authorization of **read_any_data**, or **read_application_data**.



```js
topic.find(options, callback);
```

##### Create a Topic (POST /topics)

Requires authorization of **manage_any_data**, or **manage_application_data**.

The following arguments are required:

 * __topic__: A hash containing the name/id of the topic (required) and a description of the topic.

```js
topic.create("{name:'my_topic', description:'Event data from source A.'}", options, callback);
```

##### Update a Topic (PUT /topics/:id)

Requires authorization of **manage_any_data**, or **manage_application_data**.

The following arguments are required:

 * __topic__: A hash containing the name/id of the topic (required) and a description of the topic.

```js
topic.update("{name:'my_topic', description:'Event data from source A.'}", options, callback);
```

##### Delete a Topic (DELETE /topics/:id)

Requires authorization of **manage_any_data**, or **manage_application_data**.



```js
topic.delete(options, callback);
```

### Feed api

Returns api instance to get auxilary information about Buffer useful when creating your app.

The following arguments are required:

 * __topic_id__: The key for the parent topic
 * __id__: The id of the feed

```js
var feed = client.feed("1", "my_topic");
```

##### List of Feeds (GET /topics/:topic_id/feeds)

Returns a list of feeds for a given topic. Requires authorization of **read_any_data**, or **read_application_data**.



```js
feed.list(options, callback);
```

##### Get a Feed (GET /topics/:topic_id/feeds/:id)

Returns a specific feed for a topic. Requires authorization of **read_any_data**, or **read_application_data**.



```js
feed.find(options, callback);
```

##### Create a Feed (POST /topics/:topic_id/feeds)

Create a feed on a given topic. Requires authorization of **read_any_data**, or **read_application_data**.

The following arguments are required:

 * __feed__: A Hash containing `at`: a formatted time of the event. Defaults to the current time if not present.`tz`: The time zone of the time given in `at`. Defaults to UTC`data`:A hash of data to be stored

```js
feed.create("{at: '2013-02-14T16:13:33.378Z', tz: 'Eastern Time (US & Canada)', data:{key1:123, key2:456.2, city:'alabama'}}", options, callback);
```

##### Update a Feed (PUT /topics/:topic_id/feeds/:id)

Update an associated Feed to the Topic. Requires authorization of **read_any_data**, or **read_application_data**.

The following arguments are required:

 * __feed__: A hash containing `data`:A hash of data to be stored

```js
feed.update("{data:{key1:123, key2:456.2, city:'alabama'}}", options, callback);
```

##### Delete a Feed (DELETE /topics/:topic_id/feeds/:id)

Deletes the desired feed. Requires authorization of **read_any_data**, or **read_application_data**.



```js
feed.delete(options, callback);
```

### Get Feed data api

Get the value of a specific field within a feed

The following arguments are required:

 * __topic_id__: The key for the parent topic
 * __feed_id__: The id of the parent feed
 * __id__: The key of the specific field

```js
var data = client.data("my_topic", "2", "captured_at");
```

##### Get Feed data with a Topic (GET /topics/:topic_id/feeds/:feed_id/data/:id)

Requires authorization of **read_any_data**, or **read_application_data**.



```js
data.find(options, callback);
```

##### Update Feed data (PUT /topics/:topic_id/feeds/:feed_id/data/:id)

Update a specific value of a field within a feed with the data passed in. Requires authorization of **read_any_data**, or **read_application_data**.



```js
data.update(options, callback);
```

### Percolator api

A **Percolator** is a reverse query much like a match rule which is run whenever a new feed is added. These can be used to create alerts by causing the sensit to publish the feed that was just added. A percolator query is defined by a `name` and and valid `query` according to the according the the [elasticsearch Query DSL](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/query-dsl.html).  For more information about Percolator queries please refer to the [elasticsearch percolator documentation](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/search-percolate.html).

The following arguments are required:

 * __topic_id__: The key for the parent topic
 * __id__: The name of the percolator query

```js
var percolator = client.percolator("my_rule", "my_topic");
```

##### List of Percolations for a Topic (GET /topics/:topic_id/percolators)

Returns a list or percolators for a given topic. Requires authorization of **read_any_percolators**, or **read_application_percolators**.



```js
percolator.list(options, callback);
```

##### Get the Percolator (GET /topics/:topic_id/percolators/:id)

Return a specific percolator of the associated Topic by Id. Requires authorization of **read_any_percolators**, or **read_application_percolators**.



```js
percolator.find(options, callback);
```

##### Create a Percolator (POST /topics/:topic_id/percolators)

Create a percolator on the associated Topic with the specified name and query. Requires authorization of **manage_any_percolators**, or **manage_application_percolators**.

The following arguments are required:

 * __percolator__: A Hash containing `name`: The name of the percolator(required).`query`: The query hash according to the according the the [elasticsearch Query DSL](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/query-dsl.html)

```js
percolator.create("{name: 'Kimchy-User', query:{term: {user: 'kimchy'}}}", options, callback);
```

##### Update a Percolator (PUT /topics/:topic_id/percolators/:id)

Update the query for a specific percolator. Requires authorization of **manage_any_percolators**, or **manage_application_percolators**.

The following arguments are required:

 * __percolator__: A Hash containing the `query` hash according to the according the the [elasticsearch Query DSL](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/query-dsl.html)

```js
percolator.update("{query:{term: {user: 'kimchy'}}}", options, callback);
```

##### Delete a Percolator (DELETE /topics/:topic_id/percolators/:id)

Delete a percolator on the associated topic. Requires authorization of **manage_any_percolators**, or **manage_application_percolators**.



```js
percolator.delete(options, callback);
```

### Report api

Reports are stored filter and facet queries on the **Feed** data. A report is a assigned a `name` and the `query` is any elasticsearch query which filters only the desired data for the facets (See the [elasticsearch Query DSL](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/query-dsl-queries.html) for valid queries). A report can have many `facets` with each facet is referred to by a user defined `name`. Valid `type`'s of facet include **terms**, **range**, **histogram**, **filter**, **statistical**, **query**, **terms_stats**, or **geo_distance**. The `query` within a facet defines the field counts or statistics which the data is calculated over. See the [elasticsearch facet dsl](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/search-facets.html) for information about the various facet types and valid query fields.

The following arguments are required:

 * __topic_id__: The key for the parent topic
 * __id__: The identifier of the report

```js
var report = client.report("my_report", "my_topic");
```

##### List of Reports for a Topic (GET /topics/:topic_id/reports)

Get all reports for the associated Topic. Requires authorization of **read_any_reports**, or **read_application_reports**.



```js
report.list(options, callback);
```

##### Get a Report (GET /topics/:topic_id/reports/:id)

Retrieve a specific report on the associated topic by Id. Requires authorization of **read_any_reports**, or **read_application_reports**.



```js
report.find(options, callback);
```

##### Create a Report (POST /topics/:topic_id/reports)

Create a new report on the associated Topic which can be easily retrieved later using an id. Requires authorization of **manage_any_reports**, or **manage_application_reports**.

The following arguments are required:

 * __report__: A Hash containing `name`: The name of the report (required).`query`:The search query acccording to the [elasticsearch Query DSL](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/query-dsl-queries.html) to filter the data for the facets (Defaults to match all).`facets`:An array of facet hashes which each contain a `name` ad type of the facet along with its query hash (required).

```js
report.create("{name:'My report', query:{match_all: { }}, facets:[{name: 'facet1', type: 'terms', query: { field: 'value1'}}]}", options, callback);
```

##### Update a Report for a Topic (PUT /topics/:topic_id/reports/:id)

Update the query, facets or name of the report. Requires authorization of **manage_any_reports**, or **manage_application_reports**.

The following arguments are required:

 * __report__: A Hash containing `name`: The name of the report (required).`query`:The search query acccording to the [elasticsearch Query DSL](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/query-dsl-queries.html) to filter the data for the facets (Defaults to match all).`facets`:An array of facet hashes which each contain a `name` ad type of the facet along with its query hash (required).

```js
report.update("{name:'My report', query:{match_all: { }}, facets:[{name: 'facet1', type: 'terms', query: { field: 'value1'}}]}", options, callback);
```

##### Delete a Report (DELETE /topics/:topic_id/reports/:id)

Remove a saved report on the associated Topic by Id. Requires authorization of **manage_any_reports**, or **manage_application_reports**.



```js
report.delete(options, callback);
```

### Subscription api

Subscriptions allows feed data to imported using a socket rather than just using the Feed REST API. By creating a subscription sensit will start to listen for feed data being imported using the specified `host` and while using the topic name as the `channel` name.

The following arguments are required:

 * __id__: The identifier for the subscription

```js
var subscription = client.subscription("subscription1");
```

##### List of Subscriptions (GET /subscriptions)

Get the list of all subscriptions for importing feed data to the associated topics. Requires authorization of **read_any_subscriptions**, or **read_application_subscriptions**.



```js
subscription.list(options, callback);
```

##### Get a Subscription (GET /subscriptions/:id)

Get the information of a specific subscription. Requires authorization of **read_any_subscriptions**, or **read_application_subscriptions**.



```js
subscription.find(options, callback);
```

##### Create a Subscription (POST /subscriptions)

Create a subscription which will connect to the server and listen for feed data for any of the associated topics. Requires authorization of **manage_any_subscriptions**, or **manage_application_subscriptions**.

The following arguments are required:

 * __subscription__: A Hash containing`name`:The channel or name to identify the subscription(required).`host`:The ip address or host of the connection(required).`protocol`:the protocol to communicate over (http, tcp, udp, mqtt) (required)`port`:The port of the connection.

```js
subscription.create("{name:'alpha', host:'10.234.12.11', protocol:'http', port:80}", options, callback);
```

##### Update a Subscription (PUT /subscriptions/:id)

Returns an object with the current configuration that Buffer is using, including supported services, their icons and the varying limits of character and schedules.  Requires authorization of **manage_any_subscriptions**, or **manage_application_subscriptions**.

The following arguments are required:

 * __subscription__: A Hash containing`name`:The channel or name to identify the subscription(required).`host`:The ip address or host of the connection(required).`protocol`:the protocol to communicate over (http, tcp, udp, mqtt) (required)`port`:The port of the connection.

```js
subscription.update("{name:'alpha', host:'10.234.12.11', protocol:'http', port:80}", options, callback);
```

##### Delete a Subscription (DELETE /subscriptions/:id)

Delete the subscription and stop listening for feed data for the associated topics. Requires authorization of **manage_any_subscriptions**, or **manage_application_subscriptions**.



```js
subscription.delete(options, callback);
```

### Field api

.

The following arguments are required:

 * __topic_id__: The key for the parent topic
 * __id__: Username of the user

```js
var field = client.field("pksunkara", "my_topic");
```

##### List all Fields for a Topic (GET /topics/:topic_id/fields)

Get all the fields associated with a topic. Requires authorization of **read_any_data**, or **read_application_data**



```js
field.list(options, callback);
```

##### Get a Field (GET /topics/:topic_id/fields/:id)

Get a Field of the associated a topic and Id. Requires authorization of **read_any_data**, or **read_application_data**



```js
field.find(options, callback);
```

##### Create a Field on a Topic (POST /topics/:topic_id/fields)

Adds a new field that feed data can be added too. Requires authorization of **manage_any_data**, or **manage_application_data**

The following arguments are required:

 * __field__: A Hash containing`name`: A descriptive name of the field.`key`:The name that is used to identify the field in a feed (required).`datatype`:The type of data that is stored in the field. ie. integer, float, string, bool, datetime

```js
field.create("{name:'Transaction ID', key:'tran_id', datatype:'integer'}", options, callback);
```

##### Update a Field on a Topic (PUT /api/topics/:topic_id/fields/:id)

Updates the Field data and makes the corresponding changes in the index. Requires authorization of **manage_any_data**, or **manage_application_data**

The following arguments are required:

 * __field__: A Hash containing`name`: A descriptive name of the field.`key`:The name that is used to identify the field in a feed (required).`datatype`:The type of data that is stored in the field. ie. integer, float, string, bool, datetime

```js
field.update("{name:'Transaction ID', key:'tran_id', datatype:'integer'}", options, callback);
```

##### Delete a Field of the associated Topic. (DELETE /api/topics/:topic_id/fields/:id)

Deletes a field and the feed data in that field. Requires authorization of **manage_any_data**, or **manage_application_data**



```js
field.delete(options, callback);
```

## Contributors
Here is a list of [Contributors](https://github.com/cwadding/sensit-node/contributors)

### TODO

## License
MIT

## Bug Reports
Report [here](https://github.com/cwadding/sensit-node/issues).

## Contact
Christopher Waddington (cwadding@gmail.com)
