import request from 'request';

export function getPdfFromHtmlStream({html = '', urlPart = 'pdf', method = 'POST'} = {}) {
  return new Promise((resolve) => {
    const req = request({
      url: `https://dock-server.duckdns.org/pdf-generator/${urlPart}`,
      method,
      headers: {
        'content-type': 'text/html'
      },
      body: html
    });

    return resolve(req);
  });
}
