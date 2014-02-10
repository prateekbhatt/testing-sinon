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
}