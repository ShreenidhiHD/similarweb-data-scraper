const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

async function scrapeSimilarWebData(url) {
  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto("https://www.similarweb.com/website/" + url + "/#overview", {
    waitUntil: "networkidle2",
  });

  try {
    await page.waitForSelector("p[data-test='total-visits'] + p", { timeout: 30000 });
    await page.waitForSelector("p[data-test='avg-visit-duration'] + p", { timeout: 30000 });
  } catch (e) {
    console.log("Timeout error:", e);
  }

  try {
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
  } catch (error) {
    console.error("Scraping error:", error);
    await browser.close();
    return { Website: url, error: "Scraping failed" };
  }
}

module.exports = scrapeSimilarWebData;
