const url = require('url');

function normalizeUrl(inputUrl) {
  inputUrl = inputUrl.trim(); // Trim leading and trailing spaces

  if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
    inputUrl = 'http://' + inputUrl;
  }

  try {
    const parsedUrl = new url.URL(inputUrl);
    let hostname = parsedUrl.hostname;

    if (hostname.startsWith('www.')) {
      hostname = hostname.slice(4);
    }

    console.log('Normalized URL:', hostname);
    return hostname;
  } catch (e) {
    console.error(`Failed to normalize URL: ${inputUrl}`);
    return 'nodata';
  }
}

module.exports = normalizeUrl;
