import express from 'express';
import path from 'path';

const serverPort = process.env.PORT || 3000;
const environment = process.env.NODE_ENV || 'development';

const app = express();

// force a redirect to "https://" only during production
if (environment === 'production') {
  app.use(function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.hostname}${req.url}`);
    }
    next();
  });
}

app.use(express.static(path.join(path.resolve(), 'dist')));

app.get('*', function (req, res) {
  res.sendFile(path.join(path.resolve(), 'dist/index.html'));
});

app.listen(serverPort, function () {
  console.log(`Serving app on port ${serverPort}`);
});
