/* eslint-disable import/no-unresolved */

import api from 'api/user';
import render from 'dom/render';
import spinner from 'dom/spinner';

import 'bootstrap/dist/css/bootstrap.css';

import './main.css';


spinner.hideSpinner();


document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('search');
    const input = document.getElementById('username');

    button.onclick = (() => {
        spinner.renderSpinner();

        api.loadUsers(input.value)
            .then(data => {
                render.renderSearchResult(data);
                spinner.hideSpinner();
            })
            .catch((e) => {
                alert(e);
                spinner.hideSpinner();
            });
    });
});

/*
TODO

coverage main.js
test main.js
handle api errors
check correct working
*/
