const api = require('../api/user')
const spinner = require('./spinner')


const Render = {
    renderSearchResult: function (accounts) {
        const resultNode = document.getElementById('search-results');
        const list = document.createElement('ol');
        list.id = 'search-results_list';
        for (let account_info of accounts) {
            const item = document.createElement('li');
            item.class = 'search-results_item';
            item.innerText = account_info.nickname;

            const get_handler = account_info => () => {
                spinner.renderSpinner();

                const get_handler = (account_id, nickname) => {
                    return response_body => {
                        const info = response_body.data[account_id].statistics.all;
                        const wins = info.wins;
                        const battles = info.battles;
                        const rate = wins / battles;
                        this.renderUserDetails(nickname, account_id, wins, battles, rate);
                        spinner.hideSpinner();
                    }
                }

                const account_id = account_info.account_id;
                api.loadUserDetails(account_id)
                    .then(response => response.json())
                    .then(get_handler(account_info.account_id, account_info.nickname))
                    .catch(e => {
                        console.log('Error: ', e);
                        spinner.hideSpinner();
                    });
            }

            item.onclick = get_handler(account_info);
            list.appendChild(item);
        }
        resultNode.appendChild(list);
    },

    renderUserDetails: function (nickname, account_id, wins, battles, rate) {
        const resultNode = document.getElementById('user-details');
        for (let child of resultNode.children) {
            if (child.id == 'user-details-id')
                child.innerText = `${nickname} (${account_id})`;
            else if (child.id == 'user-details-wins')
                child.innerText = wins;
            else if (child.id == 'user-details-battles')
                child.innerText = battles;
            else if (child.id == 'user-details-rate')
                child.innerText = rate * 100;
        }
    },
}

module.exports = Render
