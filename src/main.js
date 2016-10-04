require('main.css')


const API_PROXY_URL = 'http://188.166.73.133/wg-api'
// API docs: https://ru.wargaming.net/developers/api_reference

const GAME = 'wot'


function loadUsers(search_text) {
    const url = `${API_PROXY_URL}/${GAME}/account/list/?search=${search_text}`;

    return fetch(url, {method: 'GET'});
}

function loadUserDetails(account_id) {
    const url = `${API_PROXY_URL}/${GAME}/account/info/?account_id=${account_id}`;

    return fetch(url, {method: 'GET'});
}

function renderSpinner() {
    const spinner = document.createElement('div');
    spinner.id = 'spinner';

    document.body.appendChild(spinner);
}

function hideSpinner() {
    const spinner = document.getElementById('spinner');
    spinner.parentNode.removeChild(spinner);
}

function renderSearchResult(accounts) {
    const resultNode = document.getElementById('search-results');
    const list = document.createElement('ol');
    list.id = 'search-results_list';
    for (let account_info of accounts) {
        const item = document.createElement('li');
        item.id = 'search-results_item';
        item.innerText = account_info.nickname;
        // TODO: item.dataset
        item.onclick = () => {
            renderSpinner();

            const account_id = account_info.account_id;
            loadUserDetails(account_id)
                .then(response => response.json())
                .then(response_body => {
                    const info = response_body.data[account_id].statistics.all;
                    const wins = info.wins;
                    const battles = info.battles;
                    const rate = wins / battles;
                    renderUserDetails(account_info.nickname, account_id, wins, battles, rate);
                    hideSpinner();
                })
                .catch(e => {
                    console.log('Error: ', e);
                    hideSpinner();
                });
        };
        list.appendChild(item);
    }
    resultNode.appendChild(list);
}

function renderUserDetails(nickname, account_id, wins, battles, rate) {
    const resultNode = document.getElementById('user-details');
    for (let child of resultNode.children) {
        if (child.id == 'user-details-id')
            child.innerText = `${nickname} (${account_id})`;
        else if (child.id == 'user-details-wins')
            child.innerText = wins;
        else if (child.id == 'user-details-battles')
            child.innerText = battles;
        else if (child.id == 'user-details-rate')
            child.innerText = rate * 100;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('search');
    const input = document.getElementById('username');

    button.onclick = (() => {
        renderSpinner();

        loadUsers(input.value)
            .then(response => response.json())
            .then(response_body => {
                renderSearchResult(response_body.data);
                hideSpinner();
            })
            .catch(e => {
                console.log('Error: ', e);
                hideSpinner();
            });
    });
});
