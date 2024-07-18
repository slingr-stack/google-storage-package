/**
 * Copies a source object to a destination object
 * https://cloud.google.com/storage/docs/json_api/v1/objects/copy
 *
 * @param {string} sourceBucket         - The bucket to copy the object from
 * @param {string} sourceObject         - The object to copy from the source bucket
 * @param {string} destinationBucket    - The bucket to copy the object to
 * @param {string} destiationObject     - The name of the new object
 * @param {object} optionalParams       - Optional parameters to adjust the response, like projection
 * @return {object}                     - The response of the request.
 */
exports.copy = (sourceBucket, sourceObject, destinationBucket, destiationObject, optionalParams) => {
    return pkg.googlecloudstorage.api.post(`b/${sourceBucket}/o/${sourceObject}`);
};

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
      settings: {
        multipart: true,
        parts: [
          {
            name: 'the_file',
            type: 'file',
            fileId: fileId
          },
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
          }
        ]
      }
    }
    if(additionalParams.debug) {
        request.isDebug = true;
    }
    pkg.googlecloudstorage.api.post(`b/${bucketName}/o`, request);
  };