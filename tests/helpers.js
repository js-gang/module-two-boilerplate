/* eslint-disable */

import { assert } from 'chai'
import sinon from 'sinon'

import { testFunc } from 'main'

import * as helpers from 'helpers'

describe('testFunc', function() {
    beforeEach(function() {
        sinon.stub(helpers, 'toggleSpinner')
    })
    afterEach(function() {
        helpers.toggleSpinner.restore()
    })

    it('should call toggleSpinner', function() {
        testFunc()
        assert.isTrue(helpers.toggleSpinner.called)
    })
})
