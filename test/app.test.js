var app = require('../app'),
    sinon = require('sinon'),
    chai = require('chai'),
    sinonChai = require('sinon-chai'),
    expect = chai.expect;

chai.use(sinonChai);

describe('spy', function () {

    it('should work', function () {
        expect(true)
            .to.equal(true);
    });

    it('calls the original function', function () {
        var callback = sinon.spy();
        var proxy = app.once(callback);
        proxy();
        expect(callback.called)
            .to.equal(true);
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

            expect(callback).to.have.been.calledWith(1, 2, 3);
            expect(callback).to.have.been.calledOn(obj);
        });
});