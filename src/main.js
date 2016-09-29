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
  return fetch(url)
  .then(resp => resp.json())
  .then(resp => {
      toggleSpinner()
      renderSearchResult(resp.data)
  })
}

function loadProfile(account_id) {
  const url = `${API_PROXY_URL}/${GAME}/account/info/?account_id=${account_id}`
  // create request to the url and return a promise
  return fetch(url)
  .then(resp => resp.json())
  .then(resp => renderUserProfile(resp.data[account_id]))
}

function toggleSpinner(domNode) {
  // clean all content of passed node and then render element with `spinner` classname
  const spinner = document.querySelector('#spinner')
  spinner.classList.toggle('show')
}

function renderUserProfile({ nickname, global_rating, statistics }) {
  const { wins, battles } = statistics.all
  const winsPercent = ((wins / battles) * 100).toFixed(2)

  document.querySelector('#profile').innerHTML = `
    <h1>${nickname} <sup>${global_rating}</sup></h1>
    <div>
      <p>Battles: ${battles}</p>
      <p>Wins percent: ${winsPercent}%</p>
    </div>
  `
}

function renderSearchResult(accounts) {
  // render result to the node with class name `search-results`
  // Note! it's already exist. See index.html for more info.
  // Each search result item should be rendered
  // inside node with `search-results_item` class name.
  const usersList = document.querySelector('#users-list')
  console.log(accounts)
  usersList.innerHTML = accounts.map(({ account_id, nickname }) => {
      return `<div class="search-results_item js-user" data-id="${account_id}">${nickname}</div>`
  }).join('')

  for (node of document.querySelectorAll('.js-user')) {
      node.addEventListener('click', handleUserClick)
  }
}

function handleSearchClick() {
    const searchInput = document.querySelector('#username')
    const username = searchInput.value
    const accounts = loadUsers(username)
    toggleSpinner()
    renderSearchResult(accounts)
}

function handleUserClick(e) {
    const userNode = e.target
    const accountId = userNode.dataset.id
    loadProfile(accountId)
}


document.addEventListener('DOMContentLoaded', () => {
  // add search button click handler here
  const button = document.querySelector('#search')
  button.addEventListener('click',  handleSearchClick)
})
