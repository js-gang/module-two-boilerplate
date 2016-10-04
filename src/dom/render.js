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
        const resultNode = document.getElementById('user-details');
        for (const child of resultNode.children) {
            if (child.id === 'user-details-id')
                child.innerText = `${nickname} (${accountId})`;
            else if (child.id === 'user-details-wins')
                child.innerText = wins;
            else if (child.id === 'user-details-battles')
                child.innerText = battles;
            else if (child.id === 'user-details-rate')
                child.innerText = rate * 100;
        }
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
