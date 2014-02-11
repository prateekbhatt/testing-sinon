var request = require('request');

exports.once = function (callback) {
    var called = false,
        returnValue;

    return function () {
        if (!called) {
            called = true;
            returnValue = callback.apply(this, arguments);
        }
        return returnValue;
    }
};


/**
 * Calls the getGoogle function to fetch Google homepage
 * @param  {Function} callback Callback function
 * @api private
 */
exports.getData = function (callback) {

    console.log('\n\n requesting data from google with callback: ', callback);
    return getGoogle(callback);
};

/**
 * Fetches the Google homepage using the
 * request lib
 * @param  {Function} callback Callback function
 * @api private
 */
var getGoogle = function (callback) {
    return request.get("http://www.google.com", callback);
}

/**
 * Export private helpers through _test object
 * (For testing using mocha, sinon)
 */
exports._test = {
    getGoogle: getGoogle
}