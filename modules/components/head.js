const pageTitle = document.title || 'Game Planning';
document.querySelector('head').innerHTML = `
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="This site helps people manage their plans for presenting games at events" />
  <base href="${window.location.origin}">
  <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
  <link rel="stylesheet" href="/styles/vendor/remedy.css">
  <link rel="stylesheet" href="/styles/vendor/reminders.css">
  <link rel="stylesheet" href="/styles/style.css">
  <title>${pageTitle}</title>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-QMLT3NJ32P"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-QMLT3NJ32P');
  </script>
`;