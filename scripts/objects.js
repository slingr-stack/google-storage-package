
// const api = app.gcs.api;
const api = pkg.googlecloudstorage.api;

/**
 * Copies a source object to a destination object
 * https://cloud.google.com/storage/docs/json_api/v1/objects/copy
 *
 * @param {string} sourceBucket         - The bucket to copy the object from
 * @param {string} sourceObject         - The object to copy from the source bucket
 * @param {string} destinationBucket    - The bucket to copy the object to
 * @param {string} destinationObject     - The name of the new object
 * @param {object} optionalParams       - Optional parameters to adjust the response, like projection
 * @return {object}                     - The response of the request.
 */
exports.copy = (sourceBucket, sourceObject, destinationBucket, destinationObject, optionalParams) => {
  return api.post(`b/${sourceBucket}/o/${sourceObject}/copyTo/b/${destinationBucket}/o/${destinationObject}`, { params: optionalParams});
};

/**
 * Deletes a file from the bucket
 * https://cloud.google.com/storage/docs/json_api/v1/objects/delete
 *
 * @param {string} bucketName           - The bucket to remove the object from
 * @param {string} name                 - The name of the object to remove
 * @param {object} optionalParams       - Optional parameters to adjust the response
 * @return {object}                     - The response of the request
 */
exports.delete = (bucketName, name, optionalParams) => {
  return api.delete(`b/${bucketName}/o/${name}`, { params: optionalParams });
}

/**
 * Retrieves an object's meta data from the bucket. Use getContent to download the actual file
 * https://cloud.google.com/storage/docs/json_api/v1/objects/get
 *
 * @param {string} bucketName           - The bucket to retrieve the object from
 * @param {string} name                 - The object to retrieve
 * @param {object} optionalParams       - Additional parameters for the request
 * @return {object}                     - The response of the request
 */
exports.get = (bucketName, name, optionalParams) => {
  if(! optionalParams) optionalParams = {};
  optionalParams.alt = 'json';
  return api.get(`b/${bucketName}/o/${name}`, { params: optionalParams });
}

/**
 * Retrieves an object's content from the bucket and creates a slingr file with the response
 * https://cloud.google.com/storage/docs/json_api/v1/objects/get
 *
 * @param {string} bucketName           - The bucket to retrieve the object from
 * @param {string} name                 - The object to retrieve
 * @param {object} optionalParams       - Additional parameters for the request
 * @return {object}                     - The information about the new file
 */
exports.getContent = (bucketName, name, optionalParams) => {
  if(! optionalParams) optionalParams = {};
  optionalParams.alt = 'media';
  return api.get(`b/${bucketName}/o/${name}`, { params: optionalParams, settings: { forceDownload: true, downloadSync: true } });
} 

/**
 * Writes a file to the google cloud bucket, potentially replacing an existing object
 * https://cloud.google.com/storage/docs/json_api/v1/objects/insert
 *
 * @param {string} bucketName           - The bucket to write the object to
 * @param {string} name                 - The name of the object to insert
 * @param {string} fileId               - The slingr file id of the file to insert
 * @param {string} contentType          - The MIME type of the object to insert
 * @param {object} metadata             - key/value pairs of data to keep associated with the object
 * @param {object} additionalParams     - Additional paramaeters to include in the json
 * @return {object}                     - The response of the request.
 */
exports.insert = (bucketName, name, fileId, contentType, metadata, additionalParams) => {
  let request = {
    isUpload: true,
    url: `b/${bucketName}/o`,
    params: {
      uploadType: 'multipart'
    },
    headers: {
      'Content-Type': 'multipart/related'
    },
    settings: {
      multipart: true,
      parts: [
        {
          name: 'the_metadata',
          type: 'other',
          contentType: 'application/json',
          content: {
            name: name,
            contentType: contentType,
            metadata: metadata,
            //               ...additionalParams
          }
        },
        {
          name: 'the_file',
          type: 'file',
          fileId: fileId
        }
      ]
    }
  }
  if(additionalParams.debug) {
    request.isDebug = true;
  }
  return api.post(`b/${bucketName}/o`, request);
};

/**
 * Lists files in a google cloud bucket
 * https://cloud.google.com/storage/docs/json_api/v1/objects/list
 */
exports.list = (bucketName, params) => {
  return api.get(`b/${bucketName}/o`, {
    params: params
  });
}
