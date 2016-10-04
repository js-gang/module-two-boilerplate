import * as settings from './settings';


export default class User {
  static loadUsers(search_text) {
    const url = `${settings.API_PROXY_URL}/${settings.GAME}/account/list/?search=${search_text}`;

    return fetch(url, { method: 'GET' });
  }

  static loadUserDetails(account_id) {
    const url = `${settings.API_PROXY_URL}/${settings.GAME}/account/info/?account_id=${account_id}`;

    return fetch(url, { method: 'GET' });
  }
}
