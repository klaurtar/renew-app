const path = require('path');
require('dotenv').config({ path: path.resolve('../../.env') });
const puppeteer = require("puppeteer");
//const fs = require("fs");
const CONFIG = require('./CONFIG');
//const itemToBeDeleted = require('./itemToBeDeleted');


/**/
let itemToBeDeleted;

/*
*
*/
var browser;
/*
*
*/
var page;


/*
* open browser
*/
async function openBrowser(argument) {
    console.log('>>> openBrowser ');
    // open the headless browser
    browser = await puppeteer.launch({ headless: false });
    //await browser.userAgent();
    const context = browser.defaultBrowserContext();
    await context.overridePermissions('https://www.facebook.com', ['notifications']);
}

/*
* open page
* @param {string} - pageUrl
*/
async function openPage(pageUrl) {
    try{
        // open a new page
        page = await browser.newPage();

        // listen to responses
        //await listenToResponses();

        await page.setViewport({
            width: 999,
            height: 650,
        });
        //await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
        console.log('>>> openPage of ', pageUrl);
        await page.goto(pageUrl);
    }catch(e){
        console.log('[TIMEOUT] -> restart app');
    }

}

/*
* login
* @param {Object} - credentials
*/
async function login(data) {
    console.log('>>> log in ', data, data.email);
    await page.evaluate((email, password) => {
        document.querySelector('#email').value = email;
        document.querySelector('#pass').value = password;
        document.querySelector('#loginbutton').click();
    }, data.email, data.password);
    await page.waitForSelector('title');
}

/*
* open page
* @param {string} - pageUrl
*/
async function navigateTo(pageUrl) {
    try{
        console.log('>>> navigate to ', pageUrl);
        await page.goto(pageUrl);
        await page.waitFor(200);
    }catch(e){
        console.log('[TIMEOUT] -> it took more time to navigate');
    }

}

/*
*
*/
async function markItemAsSold() {
    try{
        let soldBtn = await page.waitForSelector('button[nextavailability="out_of_stock"]');
        await soldBtn.click();
        try{
            await page.waitForRequest('https://www.facebook.com/api/graphql/');
            await page.waitForResponse(response => response.url() === 'https://www.facebook.com/api/graphql/' && response.status() === 200);
        }catch(e){}
    }catch(e){
        console.log('[TIMEOUT] -> markItemAsSold');
    }
}


/*
*
*/
async function closeBrowser(){
    console.log('>>> closeBrowser ');
    await browser.close();
}






/************************/

async function deleteFbItem(item){
    itemToBeDeleted = item;
    try{
        await openBrowser();
        await openPage(CONFIG.facebookUrl);
        await login({
            email: CONFIG.email,
            password: CONFIG.password
        });
        await navigateTo(itemToBeDeleted.url);
        await markItemAsSold();
        await navigateTo(CONFIG.sellingPage);


        //await closeBrowser();

    }catch(e){
        console.log(e);
    }

}

module.exports = {
    deleteFbItem: deleteFbItem
}
