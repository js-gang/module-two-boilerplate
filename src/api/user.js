import * as settings from './settings';


export default class User {
    static loadUsers(searchText) {
        const url = `${settings.API_PROXY_URL}/${settings.GAME}/account/list/?search=${searchText}`;

        return window.fetch(url, { method: 'GET' })
            .then(response => response.json())
            .then((responseBody) => {
                return responseBody.data;
            });
    }

    static loadUserDetails(accountId) {
        const url = `${settings.API_PROXY_URL}/${settings.GAME}/account/info/?account_id=${accountId}`;

        return window.fetch(url, { method: 'GET' })
            .then(response => response.json())
            .then(responseBody => {
                const info = responseBody.data[accountId].statistics.all;
                const wins = info.wins;
                const battles = info.battles;
                const rate = wins / battles * 100;
                return [accountId, wins, battles, rate];
            });
    }
}
