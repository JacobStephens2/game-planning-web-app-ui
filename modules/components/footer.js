import { apiHostname } from "/modules/exports/apiHostname.js";

document.querySelector('footer').innerHTML = `
  <a href="https://github.com/JacobStephens2/game-planning-web-app-ui">GitHub</a>
  <a href="${apiHostname}">API</a>
`;
