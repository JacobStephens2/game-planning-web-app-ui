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
  document.querySelector('h1').innerText = "Are you sure you want to delete " + parsedData.title + "?";
  document.querySelector('title').innerText = "Delete " + parsedData.title;
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

// Delete on Delete button click
document.querySelector('input[type="submit"]').addEventListener('click', function (event) {
  event.preventDefault();

  const submitBtn = this;

  // Loading state
  submitBtn.dataset.originalValue = submitBtn.value;
  submitBtn.value = 'Deleting...';
  submitBtn.disabled = true;

  let deleteEndpoint = apiHostname + '/game/delete?id=' + id;

  fetch(deleteEndpoint, {
    method: 'POST',
    credentials: 'include',
    redirect: 'follow'
  })
    .then(response => handleErrors(response))
    .then((data) => {
      const parsedData = JSON.parse(data);
      window.location = '/games/read?message=' + encodeURIComponent('Deleted ' + parsedData.title);
    })
    .catch((error) => updateUIError(error));

});
