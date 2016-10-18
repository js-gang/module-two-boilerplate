import chai from 'chai'
import mockery from 'mockery'
import sinon from 'sinon'

import render from 'dom/render'

const expect = chai.expect;


describe('dom.render :: api call handler', function() {
    let render

    const apiStub = sinon.stub()

    before(function() {
        mockery.enable({
            warnOnUnregistered: false,
            useCleanCache: true,
        })
        mockery.registerMock('api/user', {loadUserDetails: apiStub})
        mockery.registerMock(
            './spinner',
            {
                renderSpinner: sinon.stub(),
                hideSpinner: sinon.stub(),
            },
        )

        render = require('dom/render').default
    })

    after(function() {
        mockery.disable();
    })

    it('calls user details handler', function(done) {
        const accountId = 1, nickname = 'John', wins = 10, battles = 10, rate = 100;

        const renderStub = sinon.stub(render, 'renderUserDetails')

        apiStub
            .withArgs(accountId)
            .returns(
                Promise.resolve([accountId, wins, battles, rate])
            )

        render.getUserDetailsHandler(accountId, nickname)()
            .then(() => {
                expect(apiStub.lastCall.args).to.deep.equal([accountId]);
                expect(renderStub.lastCall.args).to.deep.equal([nickname, accountId, wins, battles, rate]);

                renderStub.restore();

                done();
            });
    })

    it('raises network error', function(done) {
        const accountId = 666;
        const networkError = 'network error';

        apiStub
            .withArgs(accountId)
            .returns(
                Promise.reject(networkError)
            )

        render.getUserDetailsHandler(accountId, 'nickname')()
            .then(() => {
                expect(apiStub.lastCall.args).to.deep.equal([accountId]);
                //expect(e).to.be.equal(networkError);
                done();
            });
    })
});


describe('dom.render :: search results', function() {
    const accounts = [
        {account_id: 1, nickname: 'John'},
        {account_id: 2, nickname: 'Carl'},
    ]

    beforeEach(function() {
        document.body.innerHTML = '<div id="search-results"/>'
    })

    it('should render search result', function() {
        const resultNode = document.getElementById('search-results')

        render.renderSearchResult(accounts)

        const result_list = document.getElementById('search-results_list')
        expect(result_list).to.not.be.undefined
        expect(resultNode).to.be.equal(result_list.parentNode)
        expect(result_list.children.length).to.be.equal(2)

        for (let i=0; i < result_list.children.length; i++) {
            const list_item = result_list.children[i]
            const account = accounts[i]

            expect(list_item.classList.contains('search-results_item')).to.be.equal(true)
            expect(list_item.innerText).to.be.equal(account.nickname)
        }
    })

    it('should call onclick handler', function() {
        const handler_stub = sinon.stub(render, 'getUserDetailsHandler')

        for (const account of accounts) {
            handler_stub.withArgs(account.account_id, account.nickname).returns(() => account)
        }

        render.renderSearchResult(accounts)

        const result_list = document.getElementById('search-results_list')
        expect(handler_stub.callCount).to.be.equal(result_list.children.length)
        for (let i=0; i < result_list.children.length; i++) {
            const list_item = result_list.children[i]
            const account = accounts[i]

            expect(handler_stub.args[i]).to.deep.equal([account.account_id, account.nickname])
            expect(list_item.onclick()).to.deep.equal(account)
        }

        handler_stub.restore()
    })
});


describe('dom.render :: user details', function() {
    beforeEach(function() {
        document.body.innerHTML = `
        <div id="user-details">
            <span id="user-details-id"></span>
            <span id="user-details-wins"></span>
            <span id="user-details-battles"></span>
            <span id="user-details-rate"></span>
        </div>`
    })

    const userDetails = ['nickname', 'accountId', 'wins', 'battles', 50]

    it('should render user details', function() {
        const idNode = document.getElementById('user-details-id')
        const winsNode = document.getElementById('user-details-wins')
        const battlesNode = document.getElementById('user-details-battles')
        const rateNode = document.getElementById('user-details-rate')

        render.renderUserDetails(...userDetails)

        expect(idNode.innerText).to.be.equal('nickname (accountId)')
        expect(winsNode.innerText).to.be.equal('wins')
        expect(battlesNode.innerText).to.be.equal('battles')
        expect(rateNode.innerText).to.be.equal(50)
    })
});
