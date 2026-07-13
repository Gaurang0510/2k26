import puppeteer from 'puppeteer';
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:5173/');
  // skip intro
  await new Promise(r => setTimeout(r, 3000));
  
  const layoutInfo = await page.evaluate(() => {
    const aboutSection = document.querySelector('#about');
    const container = aboutSection.querySelector('.mx-auto');
    const computed = window.getComputedStyle(container);
    return {
      windowWidth: window.innerWidth,
      rect: container.getBoundingClientRect(),
      margin: computed.margin,
      marginLeft: computed.marginLeft,
      marginRight: computed.marginRight,
      width: computed.width,
      maxWidth: computed.maxWidth,
      display: computed.display,
      parentDisplay: window.getComputedStyle(container.parentElement).display
    };
  });
  console.log(JSON.stringify(layoutInfo, null, 2));
  await browser.close();
})();
