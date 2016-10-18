/* eslint-env moacha */

const chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect;

chai.should();

describe.skip('::demo', function() {
    var obj;

    before(function() {
        obj = {};
    })

    beforeEach(function() {
        console.log(`Running test: "${this.currentTest.title}"`);
    })

    afterEach(function() {
    })

    after(function() {
    })

    describe('#sub-demo', function () {
        it('should work with assert', function() {
            assert.equal(2 + 2, 4);
        })
    })

    it('should work with expect', function() {
        expect(2 + 2).to.equal(4);
    })

    it('should work with should', function() {
        (2 + 2).should.equal(4);
    })
});
