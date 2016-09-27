import { loadUsers, loadProfile } from './loaders'
import { renderUserProfile, renderSearchResult } from './views'
import { toggleSpinner } from './helpers'

export function handleSearchClick() {
  toggleSpinner()
  const usernameInput = document.querySelector('#username')
  const username = usernameInput.value
  loadUsers(username)
  .then((data) => {
    toggleSpinner()
    return data
  })
  .then(data => renderSearchResult(data))
}

export function handleUserClick(e) {
  const userNode = e.target
  const accountId = userNode.dataset.id

  userNode.classList.toggle('active')
  toggleSpinner()
  loadProfile(accountId)
  .then((data) => {
    toggleSpinner()
    return data
  })
  .then(data => renderUserProfile(data))
  .catch(toggleSpinner)
}
