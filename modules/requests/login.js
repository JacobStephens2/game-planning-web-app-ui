import { apiHostname } from '/modules/exports/apiHostname.js';
import { handleErrors } from '/modules/exports/handleErrors.js';
import { updateUIError } from '/modules/exports/updateUIError.js';

let loginEndpoint = apiHostname + '/login';

document.querySelector('input[type="submit"]').addEventListener('click', function (event) {
  event.preventDefault();

  const messageEl = document.querySelector('form+p');
  const submitBtn = document.querySelector('input[type="submit"]');
  const email = document.querySelector('input[type="email"]').value;
  const password = document.querySelector('input[type="password"]').value;

  if (!email || !password) {
    messageEl.innerText = 'Please enter your email and password';
    messageEl.style.color = '#c00';
    return;
  }

  // Loading state
  submitBtn.dataset.originalValue = submitBtn.value;
  submitBtn.value = 'Logging in...';
  submitBtn.disabled = true;
  messageEl.innerText = '';

  const updateUISuccess = function (data) {
    const parsedData = JSON.parse(data);
    if (parsedData.logged_in == 'true') {
      const d = new Date();
      d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
      document.cookie = "loggedIn=true;expires=" + d.toUTCString() + ";path=/";
      window.location = '/games/read';
    } else {
      messageEl.innerText = parsedData.message;
      messageEl.style.color = '#c00';
      submitBtn.value = submitBtn.dataset.originalValue;
      submitBtn.disabled = false;
    }
  }

  fetch(loginEndpoint, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then((response) => handleErrors(response))
    .then((data) => updateUISuccess(data))
    .catch((error) => updateUIError(error));
});
