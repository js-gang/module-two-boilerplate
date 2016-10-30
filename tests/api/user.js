import chai from 'chai'
import sinon from 'sinon'

import user from 'api/user'


const expect = chai.expect;


describe('api.user', function() {
    const API_URL = 'http://188.166.73.133/wg-api/wot'

    beforeEach(function() {
        const apiResponceBodies = {
            'should call account/list api url': 'accounts list',
            'should call account/details api url': {
                666: {
                    statistics: {
                        all: {
                            wins: 100,
                            battles: 200,
                        }
                    }
                }
            },
        };

        const method = this.currentTest.title;
        function fetchReplacement(url) {
            return Promise.resolve({
                json() {
                    return {data: apiResponceBodies[method]};
                }
            });
        };
        sinon.stub(window, 'fetch', fetchReplacement);
    })

    afterEach(function() {
        window.fetch.restore();
    })

    it('should call account/list api url', function(done) {
        const searchText = 'player1'

        user.loadUsers(searchText)
            .then((data) => {
                expect(window.fetch.called).to.equal(true)
                expect(window.fetch.lastCall.args).to.deep.equal([
                    API_URL + `/account/list/?search=${searchText}`,
                    {method: 'GET'},
                ])

                expect(data).to.be.equal('accounts list');

                done();
            })
    })

    it('should call account/details api url', function(done) {
        const accountId = 666
        const wins = 100;
        const battles = 200;
        const rate = wins / battles * 100;

        user.loadUserDetails(accountId)
            .then((data) => {
                expect(window.fetch.called).to.equal(true)
                expect(window.fetch.lastCall.args).to.deep.equal([
                    API_URL + `/account/info/?account_id=${accountId}`,
                    {method: 'GET'},
                ])

                expect(data).to.deep.equal([accountId, wins, battles, rate]);

                done();
            })
    })
});
