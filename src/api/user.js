const settings = require('./settings')


const User = {
    loadUsers: function (search_text) {
        const url = `${settings.API_PROXY_URL}/${settings.GAME}/account/list/?search=${search_text}`

        return fetch(url, {method: 'GET'})
    },

    loadUserDetails: function (account_id) {
        const url = `${settings.API_PROXY_URL}/${settings.GAME}/account/info/?account_id=${account_id}`

        return fetch(url, {method: 'GET'})
    },
}

module.exports = User
