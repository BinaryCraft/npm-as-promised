/**
 * Changes api of function to return a promise. Note: This function could have taken been simpler and taken only one argument,
 * the function who's api needs to change, but then crappiness: https://github.com/npm/npm/blob/master/lib/npm.js#L75-81
 *
 * @param {Object} base the base object
 * @param {String} functionName the name of the function who's api needs to change to accept a promise
 * @returns {Function} A function who's api now returns a promise
 */
function convertToPromiseApi(base, functionName) {
    return function() {
        let args = arguments;
        return new Promise(function(resolve, reject) {
            base[ functionName ].call(this, ...args, function(err, data) {
                if (err === undefined) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    };
}

export default convertToPromiseApi;