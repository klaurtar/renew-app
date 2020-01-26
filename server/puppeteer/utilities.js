const puppeteer = require("puppeteer");
module.exports = {
    openBrowser: async function() {
        console.log('>>> openBrowser ');
        let browser;
        try{
            // open the headless browser
            browser = await puppeteer.launch({ headless: false });
            //await browser.userAgent();
            const context = browser.defaultBrowserContext();
            await context.overridePermissions('https://www.facebook.com', ['notifications']);
        }catch(e){
            browser = await module.exports['openBrowser'];
        }
        return browser;
    },
    openPage: async function(browser, pageUrl) {
        // let page = await browser.newPage();
        // await page.setViewport({
        //     width: 999,
        //     height: 650,
        // });
        // //await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
        // console.log('>>> openPage of ', pageUrl);
        // await page.goto(pageUrl);
        // return page;

        try{
            // open a new page
            let page = await browser.newPage();
            await page.setViewport({
                width: 999,
                height: 650,
            });
            //await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
            console.log('>>> openPage of ', pageUrl);
            await page.goto(pageUrl);
            return page;
        }catch(e){
            console.log('[TIMEOUT] -> restart app');
        }
    },
    navigateTo: async function(page, pageUrl) {
        try{
            console.log('>>> navigate to ', pageUrl);
            await page.goto(pageUrl);
            await page.waitFor(200);
        }catch(e){
            console.log('[TIMEOUT] -> it took more time to navigate', pageUrl);
        }
    },
    fbLogin: async function(page, data) {
        console.log('>>> log in with ', data.email, ' email');
        await page.waitFor(500);
        await page.evaluate((email, password) => {
            document.querySelector('#email').value = email;
            document.querySelector('#pass').value = password;
            document.querySelector('#loginbutton').click();
        }, data.email, data.password);
        await page.waitForSelector('title');
    },
    keepWaitingForSelector: async function(page, selector, multiple = false, maxAttempts = 50){
        console.log('>>> keepWaitingFor: ', selector, ' selector ');
        let $selector;
        let $selectorAttempts = 0;
        do{
            await page.waitFor(500);
            try{
                $selector = (multiple)? await page.$$(selector): await page.$(selector);
            }catch(e){
                $selectorAttempts++;
                //console.log(e);
            }
            //console.log('>>> keepWaitingFor: ', selector, ' selector ', ' attempt of ', $selectorAttempts);
        }while (!$selector && $selectorAttempts < maxAttempts);
        return $selector;
    },
}
