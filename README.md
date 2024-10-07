
# Overview

Google Cloud Storage is a cloud-based storage solution that enables secure and reliable storage of data. 
It allows you to store any amount of data and retrieve it as often as you'd like. 
The platform provides high availability and offers a variety of storage classes to manage your data based on access frequency. 
This package integrates with Google Cloud Storage APIs to offer seamless management of your data and buckets.

Repo: [https://github.com/slingr-stack/google-storage-package](https://github.com/slingr-stack/google-storage-package)

This [package](https://platform-docs.slingr.io/dev-reference/data-model-and-logic/packages/) allows you to connect to the Google Cloud Storage API. 
It provides the following features:

- Authentication via Service Account
- Direct access to the Google Cloud Storage API
- Helpers to simplify interactions with Google Cloud Storage in your app

## Configuration

Official documentation: [https://cloud.google.com/storage/docs/json_api](https://cloud.google.com/storage/docs/json_api)

### Registering New Service Account

To use this package, you must first configure the integration to authenticate with the Google Cloud system using a service account. (On the [Credentials menu](https://console.cloud.google.com/apis/credentials))

You will need to create a service account in your Google Cloud project and download the private key JSON file, which contains the service account email and private key.
You must format the private key in with characters `\n`!

#### Service Account Email

**Name**: serviceAccountEmail  
**Type**: text  
**Mandatory**: true

#### Private Key

**Name**: privateKey  
**Type**: password (text)  
**Mandatory**: true

# Javascript API

## HTTP Requests

You can make `GET`, `POST`, `PUT`, `PATCH`, and `DELETE` requests to the [Google Cloud Storage API](https://cloud.google.com/storage/docs/json_api) like this:

### List Buckets

```javascript
let response;
response = pkg.googlecloudstorage.api.get('/b');
log(JSON.stringify(response));
```

### Create a Bucket

```javascript
let response;
response = pkg.googlecloudstorage.api.post('/b', {
    body: {
        name: 'my-new-bucket',
        location: 'US'
    }
});
log(JSON.stringify(response));
```

### Delete a Bucket

```javascript
let response;
response = pkg.googlecloudstorage.api.delete('/b/my-bucket');
log(JSON.stringify(response));
```

### Get Bucket Details

```javascript
let response;
response = pkg.googlecloudstorage.buckets.get('/b/my-bucket');
log(JSON.stringify(response));
```

### Copy Object

```javascript
let response;
response = pkg.googlecloudstorage.objects.copy('source-bucket', 'source-object', 'destination-bucket', 'destination-object');
log(JSON.stringify(response));
```

Delete Object

```javascript
let response;
response = pkg.googlecloudstorage.objects.delete('my-bucket', 'object-name');
log(JSON.stringify(response));
```

### Get Object Metadata

```javascript
let response;
response = pkg.googlecloudstorage.objects.get('my-bucket', 'object-name');
log(JSON.stringify(response));
```

### Get Object Content

```javascript
let response;
response = pkg.googlecloudstorage.api.getContent('my-bucket', 'object-name');
log(JSON.stringify(response));
```

### Insert Object

```javascript
let response;
response = pkg.googlecloudstorage.objects.insert('my-bucket', 'object-name', 'file-id', 'application/octet-stream', {key: 'value'});
log(JSON.stringify(response));
```

### List Objects

```javascript
let response;
response = pkg.googlecloudstorage.objects.list('my-bucket', {prefix: 'folder/'});
log(JSON.stringify(response));
```

Please take a look at the documentation of the [HTTP service](https://github.com/slingr-stack/http-service)
for more information about generic requests.

## Dependencies
* HTTP Service

## About SLINGR

SLINGR is a low-code rapid application development platform that speeds up development,
with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

## License

This package is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
