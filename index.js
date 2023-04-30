const csvParser = require('csv-parser');
const fs = require('fs');
const normalizeUrl = require('./normalizeUrl');
const scrapeSimilarWebData = require('./scrapeSimilarWebData');
const writeScrapedDataToFile = require('./writeScrapedDataToFile');

(async () => {
  const urls = fs.readFileSync('urls.txt', 'utf-8').split('\n').map(url => url.trim());

  const scrapedData = await scrapeSimilarWebDataForUrls(urls);
  console.log('scrapedData:', scrapedData);
  await writeScrapedDataToFile(scrapedData, 'newwork.csv');
})();

async function scrapeSimilarWebDataForUrls(urls) {
  const scrapedData = [];
  for (const url of urls) {
    const hostname = normalizeUrl(url);

    let data;
    if (hostname === 'nodata') {
      data = {
        Website: url,
        Similarweb_Monthly_Traffic: 'No data',
        Avg_Visit_Duration: 'No data',
      };
    } else {
      data = await scrapeSimilarWebData(hostname);
    }

    scrapedData.push(data);
  }
  return scrapedData;
}
