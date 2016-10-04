export default class Spinner {
  static renderSpinner() {
    const spinner = document.getElementById('spinner');
    spinner.hidden = false;
  }

  static hideSpinner() {
    const spinner = document.getElementById('spinner');
    spinner.hidden = true;
  }
}
