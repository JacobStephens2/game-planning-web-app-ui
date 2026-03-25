import { apiHostname } from '/modules/exports/apiHostname.js';
import { handleErrors } from '/modules/exports/handleErrors.js';
import { updateUIError } from '/modules/exports/updateUIError.js';

function logout() {
  document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  let endpoint = apiHostname + '/logout';

  const updateUISuccess = function (data) {
    window.location = '/login';
  }

  const createRequest = function (url, succeed, fail) {
    fetch(url, {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => handleErrors(response))
      .then((data) => succeed(data))
      .catch((error) => fail(error));
  };

  createRequest(endpoint, updateUISuccess, updateUIError);

}

export { logout }
