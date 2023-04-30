const puppeteer = require("puppeteer");

async function scrapeSimilarWebData(url) {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto("https://www.similarweb.com/website/" + url + "/#overview", {
    waitUntil: "networkidle2",
  });

  try {
    await page.waitForSelector("p[data-test='total-visits'] + p", { timeout: 20000 });
    await page.waitForSelector("p[data-test='avg-visit-duration'] + p", { timeout: 20000 });
  } catch (e) {
    console.log("Timeout error:", e);
  }

  const Similarweb_Monthly_Traffic = await page.$eval(
    "p[data-test='total-visits'] + p",
    (element) => element.textContent.trim()
  ).catch(() => "No data");

  const Avg_Visit_Duration = await page.$eval(
    "p[data-test='avg-visit-duration'] + p",
    (element) => element.textContent.trim()
  ).catch(() => "No data");

  console.log("Similarweb_Monthly_Traffic:", Similarweb_Monthly_Traffic);
  console.log("Avg_Visit_Duration:", Avg_Visit_Duration);

  await browser.close();

  return { Website: url, Similarweb_Monthly_Traffic, Avg_Visit_Duration };
}

module.exports = scrapeSimilarWebData;
