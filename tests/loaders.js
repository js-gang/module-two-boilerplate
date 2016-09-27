/* eslint-disable */

import { assert } from 'chai'

import sinon from 'sinon'

import { loadUsers } from 'loaders'

describe('loadUsers', function() {
    const fakeData = { foo: 'bar' }

    beforeEach( function() {
        sinon.stub(window, 'fetch')
        window.fetch.returns(Promise.resolve({
            json() {
                return { status: 'ok', data: fakeData }
            }
        }))
    })

    afterEach( function() {
        window.fetch.restore()
    })

    it('should call fetch with url', function(done) {
      loadUsers('test').then(function(resp) {
          assert.equal(resp, fakeData)

          assert.equal(
              window.fetch.firstCall.args[0],
              'http://188.166.73.133/wg-api/wot/account/list/?search=test'
          )
      }).then(done, done)
    })
})
