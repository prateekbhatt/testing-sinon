var app = require('../app'),
    sinon = require('sinon'),
    chai = require('chai'),
    sinonChai = require('sinon-chai'),
    expect = chai.expect;

chai.use(sinonChai);

/**
 * Test the 'spy' module of sinon
 */
describe('spy', function () {

    it('should work', function () {
        expect(true)
            .to.equal(true);
    });

    it('calls the original function', function () {
        var callback = sinon.spy();
        var proxy = app.once(callback);
        proxy();
        expect(callback)
            .to.have.to.have.been.called;
    });

    it('calls the original function only once', function () {
        var callback = sinon.spy();
        var proxy = app.once(callback);
        proxy();
        proxy();
        expect(callback)
            .to.have.been.calledOnce;
    });

    it('calls the original function with the right this and args',
        function () {
            var callback = sinon.spy();
            var proxy = app.once(callback);
            var obj = {};
            proxy.call(obj, 1, 2, 3);

            expect(callback)
                .to.have.been.calledWith(1, 2, 3);

            expect(callback)
                .to.have.been.calledOn(obj);

            expect(callback)
                .to.not.have.been.calledWith(3);
        });
});

/**
 * Test the 'stub' module of sinon
 */
describe('stub', function () {

    it('returns the return value from the original function', function () {

        /**
         * Create a stub to return a dummy value to test against
         */
        var callback = sinon.stub().returns(42);

        var proxy = app.once(callback);
        var returnValue = proxy();

        expect(returnValue).to.equal(42);
    });
});