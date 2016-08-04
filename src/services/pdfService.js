import superagent from 'superagent';

export function getPdfFromHtml(html = '') {
  return new Promise((resolve, reject) => {
    superagent
      .post('https://dock-server.duckdns.org/fs-pdf')
      .set('content-type', 'text/html')
      .send(html)
      .end((err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res.text);
      });
  });
}
