const Spinner = {
    renderSpinner: function () {
        const spinner = document.getElementById('spinner')
        spinner.hidden = false
    },

    hideSpinner: function () {
        const spinner = document.getElementById('spinner')
        spinner.hidden = true
    },
}

module.exports = Spinner
