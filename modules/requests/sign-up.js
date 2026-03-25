import { apiHostname } from '/modules/exports/apiHostname.js';
import { handleErrors } from '/modules/exports/handleErrors.js';
import { updateUIError } from '/modules/exports/updateUIError.js';

let signUpEndpoint = apiHostname + '/sign-up';

document.querySelector('input[type="submit"]').addEventListener('click', function (event) {
  event.preventDefault();

  const messageEl = document.querySelector('#message');
  const submitBtn = document.querySelector('input[type="submit"]');
  const email = document.querySelector('input[type="email"]').value;
  const password = document.querySelector('input[type="password"]').value;

  // Client-side validation
  if (!email) {
    messageEl.innerText = 'Please enter an email address';
    messageEl.style.color = '#c00';
    return;
  }

  if (password.length < 8) {
    messageEl.innerText = 'Password must be at least 8 characters';
    messageEl.style.color = '#c00';
    return;
  }

  // Loading state
  submitBtn.dataset.originalValue = submitBtn.value;
  submitBtn.value = 'Signing up...';
  submitBtn.disabled = true;
  messageEl.innerText = '';

  const updateUISuccess = function (data) {
    const parsedData = JSON.parse(data);
    messageEl.style.color = '';
    messageEl.innerText = parsedData.message;
    submitBtn.value = submitBtn.dataset.originalValue;
    submitBtn.disabled = false;
  }

  fetch(signUpEndpoint, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then((response) => handleErrors(response))
    .then((data) => updateUISuccess(data))
    .catch((error) => updateUIError(error));
});
