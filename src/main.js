const API_PROXY_URL = 'http://188.166.73.133/wg-api'

const GAME = 'wot'

/*
full API description you can find here:
https://ru.wargaming.net/developers/api_reference

you don't have to pass application_id query param.
It will be passed automatically via proxy server
*/

function loadUsers(username) {
  const url = `${API_PROXY_URL}/${GAME}/account/list/?search=${username}`
  return makeRequest(url);
}

function loadProfile(accountId) {
  const url = `${API_PROXY_URL}/${GAME}/account/info/?account_id=${accountId}`;
  return makeRequest(url)
  .then(data => data[accountId])
}

function makeRequest(url) {
  return fetch(url)
  .then(response => response.json())
  .then(responseJson => new Promise(function(resolve, reject) {
    if (responseJson.status === 'ok') {
      resolve(responseJson.data);
    } else {
      reject(responseJson.error.message);
    }
  }));
}

function toggleSpinner() {
  // clean all content of passed node and then render element with `spinner` classname
  const spinner = document.querySelector('#spinner');
  spinner.classList.toggle('show');
}

function renderSearchResult(accounts) {
  // render result to the node with class name `search-results`
  // Note! it's already exist. See index.html for more info.
  // Each search result item should be rendered
  // inside node with `search-results_item` class name.
  const userList = accounts.map(renderUser).join('');
  const node = document.querySelector('#search-results');
  node.innerHTML = userList;
  for (let element of document.querySelectorAll('.js-user')) {
    element.addEventListener('click', handleUserClick);
  }
}

function renderUser({nickname, account_id}) {
  return `
    <div class="search-results_item js-user" data-id="${account_id}">${nickname}</div>
  `
}

function renderUserProfile({nickname, global_rating, statistics}) {
  const {wins, battles} = statistics.all;
  const winsPercents = (wins / battles * 100).toFixed(2);
  const profile = `
    <div>
    <h1>${nickname}</h1>
    <p>Rating: ${global_rating}</p>
    <p>Battles: ${battles}</p>
    <p>Wins Percent: ${winsPercents}</p>
    </div>
  `
  document.querySelector('#profile').innerHTML = profile;
}

function toggleError(errorMessage) {
  const errorElement = document.querySelector('#error-message');
  errorElement.innerHTML = errorMessage;
  errorElement.classList.add('show');
}

function handleSearchClick(e) {
  // const query = document.q
  toggleSpinner();
  const usernameInput = document.querySelector('#username');
  const username = usernameInput.value;
  loadUsers(username)
  .then((data) => {
    toggleSpinner();
    return data;
  })
  .then(renderSearchResult)
  .catch((message) => {
    toggleSpinner();
    alert(message);
  });

  console.log('Hello');
}

function handleUserClick(e) {
  const userNode = e.target;
  const accountId = userNode.dataset.id;
  toggleSpinner();
  loadProfile(accountId)
  .then(data => renderUserProfile(data))
  .then(toggleSpinner);
}

document.addEventListener('DOMContentLoaded', () => {
  // add search button click handler here
  const button = document.querySelector('#search');
  button.addEventListener('click', handleSearchClick);
})
