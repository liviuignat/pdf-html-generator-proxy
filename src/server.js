import app from 'expressApp';
import http from 'http';

const server = new http.Server(app);
const port = process.env.PORT || 3000;

server.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }

  return console.info(`==> 💻  Open http://localhost:${port} in a browser to view the app.`);
});
