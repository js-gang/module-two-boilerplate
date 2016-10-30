import chai from 'chai'

import spinner from 'dom/spinner'


const expect = chai.expect;


describe('dom.spinner', function() {
    before(function() {
        document.body.innerHTML = '<div id="spinner" />'
    })

    it('should hide spinner', function() {
        const spinnerElement = document.getElementById('spinner')
        spinnerElement.hidden = false

        spinner.hideSpinner()

        expect(spinnerElement).have.property('hidden', true)
    })

    it('should show spinner', function() {
        const spinnerElement = document.getElementById('spinner')
        spinnerElement.hidden = true

        spinner.renderSpinner()

        expect(spinnerElement).have.property('hidden', false)
    })
})
