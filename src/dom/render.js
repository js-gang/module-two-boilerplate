import api from 'api/user'

import spinner from './spinner';


export default class Render {
    static renderSearchResult(accounts) {
        const resultNode = document.getElementById('search-results');
        const list = document.createElement('ol');
        list.id = 'search-results_list';
        for (const accountInfo of accounts) {
            const item = document.createElement('li');

            item.classList.add('search-results_item');
            item.innerText = accountInfo.nickname;
            item.onclick = this.getUserDetailsHandler(accountInfo.account_id, accountInfo.nickname);

            list.appendChild(item);
        }
        resultNode.appendChild(list);
    }

    static renderUserDetails(nickname, accountId, wins, battles, rate) {
        const idNode = document.getElementById('user-details-id');
        const winsNode = document.getElementById('user-details-wins');
        const battlesNode = document.getElementById('user-details-battles');
        const rateNode = document.getElementById('user-details-rate');

        idNode.innerText = `${nickname} (${accountId})`;
        winsNode.innerText = wins;
        battlesNode.innerText = battles;
        rateNode.innerText = rate;
    }

    static getUserDetailsHandler(accountId, accountNickname) {
        return () => {
            spinner.renderSpinner();

            return api.loadUserDetails(accountId)
                .then(([accountId, wins, battles, rate]) => {
                    this.renderUserDetails(accountNickname, accountId, wins, battles, rate);
                })
                .then(() => {
                    spinner.hideSpinner();
                })
                .catch((e) => {
                    spinner.hideSpinner();
                });
        };
    }
}
