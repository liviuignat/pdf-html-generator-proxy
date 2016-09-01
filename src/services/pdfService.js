import request from 'request';
import {config} from 'config';

const {baseApiUrl} = config;

export function getPdfFromHtmlService1Stream({html = '', urlPart = 'pdf', method = 'POST'} = {}) {
  return new Promise((resolve) => {
    const req = request({
      url: `${baseApiUrl}/pdf-generator/${urlPart}`,
      method,
      headers: {
        'content-type': 'text/html'
      },
      body: html
    });

    return resolve(req);
  });
}

export function getPdfFromHtmlService2Stream({html = ''} = {}) {
  return new Promise((resolve) => {
    const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZXMiOlsicGRmIl0sImlhdCI6MTQ3MDc1OTUwN30.a5vayu9hF28V8akDQWggbDR_uXRteY-Onsj05MZT0vQ`;
    const payload = {
      document: html
    };

    const req = request({
      url: `${baseApiUrl}/pdf-service/pdf?download=false`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload)
    });

    return resolve(req);
  });
}
