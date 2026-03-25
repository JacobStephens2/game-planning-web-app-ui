import { cookieMethods } from "/modules/exports/cookieMethods.js";
import { apiHostname } from '/modules/exports/apiHostname.js';
import { handleErrors } from '/modules/exports/handleErrors.js';
import { updateUIError } from '/modules/exports/updateUIError.js';

if (cookieMethods.getCookie('loggedIn') != 'true') {
  window.location = '/login';
}

document.querySelector('input[type="submit"]').addEventListener('click', function (event) {
  event.preventDefault();

  const submitBtn = document.querySelector('input[type="submit"]');
  const title = document.querySelector('input#title').value;
  const description = document.querySelector('textarea#description')?.value || '';

  if (!title) {
    const messageEl = document.querySelector('#message') || document.querySelector('form+p');
    if (messageEl) {
      messageEl.innerText = 'Please enter a game title';
      messageEl.style.color = '#c00';
    }
    return;
  }

  // Loading state
  submitBtn.dataset.originalValue = submitBtn.value;
  submitBtn.value = 'Creating...';
  submitBtn.disabled = true;

  let endpoint = apiHostname + '/game/create';

  var formdata = new FormData();
  formdata.append("game[title]", title);
  formdata.append("game[description]", description);

  fetch(endpoint, {
    method: 'POST',
    credentials: 'include',
    body: formdata,
    redirect: 'follow'
  })
    .then(response => handleErrors(response))
    .then(() => { window.location = '/games/read'; })
    .catch((error) => updateUIError(error));

});
