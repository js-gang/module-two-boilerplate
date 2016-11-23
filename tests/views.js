/* eslint-disable */

import { assert } from 'chai'

import mockery from 'mockery'

import { renderUser, renderSearchResult } from 'views'

describe('renderUser', function() {

    const accountData = {
        nickname: 'the_chemodan',
        account_id: 0
    }

    before( function() {
        document.body.innerHTML = renderUser(accountData)
    })

    it('should render account name and id', function() {
        const node = document.body.querySelector('.js-user')

        assert.include(node.innerHTML, accountData.nickname)
        assert.include(node.getAttribute('data-id'), accountData.account_id)
    })
})

describe('renderSearchResult', function() {
    it('should handle user click', function() {

    })
})
