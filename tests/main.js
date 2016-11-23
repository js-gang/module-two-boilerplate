/* eslint-disable */

import { assert } from 'chai'

import sinon from 'sinon'

import mockery from 'mockery'

describe('Main', function() {

    const handleSearchClick = sinon.stub()

    before(function(){
        document.body.innerHTML = '<button id="search"></button>'

        mockery.enable()
        mockery.registerMock('./handlers', { handleSearchClick })

        require('../src/main.js')

        const DOMContentLoadedEvent = document.createEvent('Event')
        DOMContentLoadedEvent.initEvent('DOMContentLoaded', true, true)
        document.dispatchEvent(DOMContentLoadedEvent)
    })

    it('should call click handler on button click', function () {
        const buttonNode = document.body.querySelector('#search')
        buttonNode.click()
        assert.isTrue(handleSearchClick.called)
    })
})
