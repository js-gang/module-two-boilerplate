export function toggleSpinner() {
  const spinner = document.querySelector('#spinner')
  spinner.classList.toggle('show')
  // clean all content of passed node and then render element with `spinner` classname
}
