import { cookieMethods } from "/modules/exports/cookieMethods.js";
import { apiHostname } from '/modules/exports/apiHostname.js';
import { handleErrors } from '/modules/exports/handleErrors.js';
import { updateUIError } from '/modules/exports/updateUIError.js';

if (cookieMethods.getCookie('loggedIn') != 'true') {
  window.location = '/login';
}

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
if (urlParams.get('message')) {
  let message = urlParams.get('message');
  let messageBox = document.createElement('p');
  messageBox.innerText = message;
  document.querySelector('h1').after(messageBox);
}

// Show loading state
const loadingEl = document.createElement('p');
loadingEl.id = 'loading';
loadingEl.innerText = 'Loading games...';
document.querySelector('ul').before(loadingEl);

let endpoint = apiHostname + '/games/read';

const updateUISuccess = function (data) {
  const loadingEl = document.querySelector('#loading');
  if (loadingEl) loadingEl.remove();

  const parsedData = JSON.parse(data);
  if (parsedData.length === 0) {
    let emptyMsg = document.createElement('p');
    emptyMsg.innerText = 'No games yet. Add one to get started!';
    document.querySelector('ul').before(emptyMsg);
    return;
  }
  for (let i in parsedData) {
    let li = document.createElement('li');
    li.innerHTML =
      `<a href="/game/edit?id=${parsedData[i].id}">` +
      parsedData[i].title +
      `</a>`;
    document.querySelector('ul').append(li);
  }
}

fetch(endpoint, {
  method: 'GET',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' }
})
  .then((response) => handleErrors(response))
  .then((data) => updateUISuccess(data))
  .catch((error) => {
    const loadingEl = document.querySelector('#loading');
    if (loadingEl) loadingEl.remove();
    updateUIError(error);
  });
