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
  // create request to the url and return a promise
}

function renderSpinner(domNode) {
  // clean all content of passed node and then render element with `spinner` classname
}

function renderSearchResult(accounts) {
  // render result to the node with class name `search-results`
  // Note! it's already exist. See index.html for more info.
  // Each search result item should be rendered
  // inside node with `search-results_item` class name.
}

function handleSearchClick(e) {
  
  console.log('Hello');
}

document.addEventListener('DOMContentLoaded', () => {
  // add search button click handler here
  const button = document.querySelector('#search');
  button.addEventListener('click', handleSearchClick);
})
