const puppeteer = require('puppeteer');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('What is the URL you want to scrape? ', async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const fontFamilies = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('*'));
    return [...new Set(elements.map((element) => {
      return window.getComputedStyle(element, null).getPropertyValue('font-family');
    }))];
  });

  console.log(fontFamilies);

  await browser.close();
  readline.close()
});