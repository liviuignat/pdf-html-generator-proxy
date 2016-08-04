import cheerio from 'cheerio';
import superagent from 'superagent';
import superagentCache from 'superagent-cache';
import CacheService from 'cache-service-node-cache';

const defaults = {cacheWhenEmpty: false, expiration: 3600};
const cacheService = new CacheService();
superagentCache(superagent, cacheService, defaults);

export function inlineHtmlCss(html = '') {
  const $html = cheerio.load(html);
  const $links = $html('link');
  const promises = [];

  $html('link').replaceWith('');

  $links.each((index, $link) => {
    promises.push(getCssLinkContent($html($link).attr('href')));
  });

  return Promise.all(promises).then(cssContents => {
    const inlineCss = cssContents.map(css => `<style>${css}</style>`);
    $html('head').append(inlineCss);
    const processedHtml = $html.html();
    return processedHtml;
  });
}

function getCssLinkContent(link) {
  return new Promise(resolve => {
    superagent.get(link).end((err, res) => {
      resolve(res.text);
    });
  });
}
