const API_PROXY_URL = 'http://188.166.73.133/wg-api'
const GAME = 'wot'

function makeRequest(url) {
  return fetch(url)
  .then(resp => resp.json())
  .then(resp => new Promise(function(resolve, reject) {
    if (resp.status === 'ok') {
      resolve(resp.data)
    } else if (resp.status === 'error') {
      reject(resp.error.message)
    }
  }))
}

export function loadUsers(username) {
  const url = `${API_PROXY_URL}/${GAME}/account/list/?search=${username}`
  // create request to the url and return a promise
  return makeRequest(url)
}

export function loadProfile(account_id) {
  const url = `${API_PROXY_URL}/${GAME}/account/info/?account_id=${account_id}`
  return makeRequest(url)
    .then(data => data[account_id])
}
