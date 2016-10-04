import api from 'api/user';  // eslint-disable-line import/no-unresolved
import spinner from './spinner';


export default class Render {
    static renderSearchResult(accounts) {
        const resultNode = document.getElementById('search-results');
        const list = document.createElement('ol');
        list.id = 'search-results_list';
        for (const accountInfo of accounts) {
            const item = document.createElement('li');

            item.class = 'search-results_item';
            item.innerText = accountInfo.nickname;
            item.onclick = this._getHandler(accountInfo.account_id, accountInfo.nickname);

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
        rateNode.innerText = rate * 100;
    }

    static _getHandler(accountId, accountNickname) {
        return () => {
            spinner.renderSpinner();

            api.loadUserDetails(accountId)
              .then(response => response.json())
              .then((responseBody) => {
                  const info = responseBody.data[accountId].statistics.all;
                  const wins = info.wins;
                  const battles = info.battles;
                  const rate = wins / battles;
                  this.renderUserDetails(accountNickname, accountId, wins, battles, rate);
                  spinner.hideSpinner();
              })
              .catch((e) => {
                  alert(e);
                  spinner.hideSpinner();
              });
        };
    }
}
