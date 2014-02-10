exports.once = function (callback) {
    var called = false,
        returnValue;
        // callCount = 0;

    return function () {
        if (!called) {
            called = true;
            // callCount ++;
            returnValue = callback.apply(this, arguments);
        }
        return returnValue;
    }
}