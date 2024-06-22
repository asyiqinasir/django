const express = require('express');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const i18nextBackend = require('i18next-fs-backend');

const app = express();

i18next
  .use(i18nextBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: __dirname + '/locales/{{lng}}.json'
    },
    detection: {
      order: ['querystring', 'cookie'],
      caches: ['cookie']
    },
    fallbackLng: 'en',
    preload: ['en', 'es']
  });

app.use(i18nextMiddleware.handle(i18next));

app.get('/', (req, res) => {
  res.send(`
    <h1>${req.t('welcome')}</h1>
    <p>${req.t('description')}</p>
    <button onclick="changeLanguage()">Switch Language</button>
    <script>
      function changeLanguage() {
        window.location.href = '/?lng=' + (document.documentElement.lang === 'en' ? 'es' : 'en');
      }
    </script>
  `);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
