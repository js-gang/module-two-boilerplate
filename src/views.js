import { handleUserClick } from './handlers'

export function renderUser({ nickname, account_id }) {
  return `
    <div class="search-results_item js-user" data-id="${account_id}">${nickname}</div>
  `
}

export function renderSearchResult(accounts) {
  let node = document.querySelector('#search-results')
  node.innerHTML = accounts.map(renderUser).join('')
  for (node of document.querySelectorAll('.js-user')) {
    node.addEventListener('click', handleUserClick)
  }
  // render result to the node with class name `search-results`
  // Note! it's already exist. See index.html for more info.
  // Each search result item should be rendered
  // inside node with `search-results_item` class name.
}


export function renderUserProfile({ nickname, global_rating, statistics }) {
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
