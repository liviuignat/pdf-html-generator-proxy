import Express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import co from 'co';

import {inlineHtmlCss} from 'services/htmlService';
import {getPdfFromHtml} from 'services/pdfService';
import {mockHtml} from 'mocks/pdf';

const app = new Express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/alex/html', (req, res) => {
  co(function* () {
    try {
      const html = mockHtml;

      const inlinedCssHtml = yield inlineHtmlCss(html);

      res.set('content-type', 'text/html');
      yield res.send(inlinedCssHtml);
    } catch (err) {
      res.status(500);
      res.send(`Error: ${err}. Stack: ${err.stack}`);
    }
  });
});

app.get('/alex/pdf', (req, res) => {
  co(function* () {
    try {
      const html = mockHtml;

      const inlinedCssHtml = yield inlineHtmlCss(html);
      const pdf = yield getPdfFromHtml(inlinedCssHtml);

      res.set('content-type', 'application/pdf');
      yield res.send(pdf);
    } catch (err) {
      res.status(500);
      res.send(`Error: ${err}. Stack: ${err.stack}`);
    }
  });
});

export default app;
