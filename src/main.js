/* eslint-disable import/no-unresolved */

import api from 'api/user';
import spinner from 'dom/spinner';
import render from 'dom/render';

import './main.css';


spinner.hideSpinner();


document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('search');
    const input = document.getElementById('username');

    button.onclick = (() => {
        spinner.renderSpinner();

        api.loadUsers(input.value)
            .then(response => response.json())
            .then((responseBody) => {
                render.renderSearchResult(responseBody.data);
                spinner.hideSpinner();
            })
            .catch((e) => {
                alert(e);
                spinner.hideSpinner();
            });
    });
});
