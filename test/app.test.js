var app = require('../app'),
    sinon = require('sinon'),
    chai = require('chai'),
    sinonChai = require('sinon-chai'),
    expect = chai.expect;

chai.use(sinonChai);

var request = require('request');

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
        var callback = sinon.stub()
            .returns(42);

        var proxy = app.once(callback);
        var returnValue = proxy();

        expect(returnValue)
            .to.equal(42);
    });
});

/**
 * Test request to Google using stub
 */
describe('testing GET request to Google using stub', function () {

    var spyGetGoogle;

    before(function (done) {
        spyGetGoogle = sinon.spy(app._test, 'getGoogle');
        done();
    });

    beforeEach(function (done) {
        spyGetGoogle.reset();
        done();
    });


    /**
     * Stubs the getData function
     * Prevents it from calling the getGoogle function
     */
    it('makes a get request to getData, stubs getData', function () {

        var stubGetData = sinon.stub(app, 'getData')
            .returns({
                message: 'hello world from stub'
            });

        var result = app.getData(stubGetData);

        expect(stubGetData)
            .to.be.calledOnce;

        expect(result)
            .to.have.deep.property("message", "hello world from stub");

        expect(spyGetGoogle)
            .not.to.have.been.called;
    });

    it('stubs the "request" library to return dummy result', function () {

        var stubRequestGet = sinon.stub(request, 'get');
        stubRequestGet.withArgs('http://www.google.com')
            .returns({
                message: 'This is not Google, its me the stub!'
            });

        var result = app._test.getGoogle(function (err, body) {
            console.log(err, body);
        });

        expect(stubRequestGet)
            .to.have.been.calledOnce;

        expect(stubRequestGet)
            .to.have.been.calledAfter.spyGetGoogle;

        expect(stubRequestGet)
            .to.have.returned({
                message: 'This is not Google, its me the stub!'
            });
    })
});