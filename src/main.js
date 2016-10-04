require('main.css')

const api = require('./api/user')
const spinner = require('./dom/spinner')
const render = require('./dom/render')


spinner.hideSpinner();


document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('search');
    const input = document.getElementById('username');

    button.onclick = (() => {
        spinner.renderSpinner();

        api.loadUsers(input.value)
            .then(response => response.json())
            .then(response_body => {
                render.renderSearchResult(response_body.data);
                spinner.hideSpinner();
            })
            .catch(e => {
                console.log('Error: ', e);
                spinner.hideSpinner();
            });
    });
});
