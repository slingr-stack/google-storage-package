/****************************************************
 Public API - Generic Functions
 ****************************************************/

/**
 * Retrieves the details about a specific bucket
 * https://cloud.google.com/storage/docs/json_api/v1/buckets/get
 *
 * @param {string} bucketName       - The bucket to retrieve details about
 * @param {object} optionalParams   - Optional parameters to adjust the response, like projection
 * @return {object}                 - The response of the request.
 */
exports.get = (bucketName, optionalParams) => {
    return pkg.googlecloudstorage.api.get('/b/' + bucketName, { params: optionalParams });
}