import { cookieMethods } from "/modules/exports/cookieMethods.js";
import { apiHostname } from '/modules/exports/apiHostname.js';
import { handleErrors } from '/modules/exports/handleErrors.js';
import { updateUIError } from '/modules/exports/updateUIError.js';

if (cookieMethods.getCookie('loggedIn') != 'true') {
  window.location = '/login';
}

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let id = urlParams.get('id');

const updateUISuccess = function (data) {
  const parsedData = JSON.parse(data);
  document.querySelector('input#title').value = parsedData.title;
  document.querySelector('h1').innerText = parsedData.title;
  document.querySelector('title').innerText = parsedData.title;
  document.querySelector('#deleteLink').href = "/game/delete?id=" + parsedData.id;
  if (parsedData.description) {
    const descEl = document.querySelector('textarea#description');
    if (descEl) descEl.value = parsedData.description;
  }
}

let readEndpoint = apiHostname + '/game/read?id=' + id;

fetch(readEndpoint, {
  method: 'GET',
  credentials: 'include',
  redirect: 'follow'
})
  .then(response => handleErrors(response))
  .then((data) => updateUISuccess(data))
  .catch(error => updateUIError(error));

// Update on Update button click
document.querySelector('input[type="submit"][value="Update"]').addEventListener('click', function (event) {
  event.preventDefault();

  const submitBtn = this;
  const description = document.querySelector('textarea#description')?.value || '';

  // Loading state
  submitBtn.dataset.originalValue = submitBtn.value;
  submitBtn.value = 'Updating...';
  submitBtn.disabled = true;

  let updateEndpoint = apiHostname + '/game/update?id=' + id;

  var formdata = new FormData();
  formdata.append("game[id]", id);
  formdata.append("game[title]", document.querySelector('input#title').value);
  formdata.append("game[description]", description);

  fetch(updateEndpoint, {
    method: 'POST',
    credentials: 'include',
    body: formdata,
    redirect: 'follow'
  })
    .then(response => handleErrors(response))
    .then(() => { window.location = '/games/read'; })
    .catch((error) => updateUIError(error));

});
