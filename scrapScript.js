const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.freepik.com/free-photos-vectors/biker-skull/2');

  const fontFamilies = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('*'));
    return [...new Set(elements.map((element) => {
      return window.getComputedStyle(element, null).getPropertyValue('font-family');
    }))];
  });

  console.log(fontFamilies);

  await browser.close();
})();
