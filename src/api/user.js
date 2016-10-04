import * as settings from './settings';


export default class User {
    static loadUsers(searchText) {
        const url = `${settings.API_PROXY_URL}/${settings.GAME}/account/list/?search=${searchText}`;

        return fetch(url, { method: 'GET' });
    }

    static loadUserDetails(accountId) {
        const url = `${settings.API_PROXY_URL}/${settings.GAME}/account/info/?account_id=${accountId}`;

        return fetch(url, { method: 'GET' });
    }
}
