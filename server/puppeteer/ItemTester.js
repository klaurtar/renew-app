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
async function displaySoldItems() {
    try{
        let hideActiveItemBtn = await page.waitForSelector('div#js_1 div.rfloat[role="button"]');
        await hideActiveItemBtn.click();
        await page.waitFor(2000);


    }catch(e){
        console.log('[TIMEOUT] -> hideActiveItem');
    }

    try{
        console.log('waiting for sold items displaying ...');

        let hideItemBtns = [];
        do{
            await page.waitFor(2000);
            try{
                console.log('iteration ..', hideItemBtns.length);
                hideItemBtns = await page.$$('div#js_1 div.rfloat[role="button"]');

            }catch(e){
                console.log("here orrror");
                console.log(e);
            }
        }while (hideItemBtns.length < 2);

        console.log('hideItemBtns length', hideItemBtns.length);
        await hideItemBtns[1].click();
        await page.waitFor(2000);

    }catch(e){
        console.log('[TIMEOUT] -> showing tabs ');
    }
}

/*
*
*/
async function openDeleteDialog() {
    //=====> click on manage btn
    await page.waitFor(1000);
    let manageBtn;
    let manageBtnAttemps = 0;
    do{
        await page.waitFor(2000);
        try{
            manageBtn = await page.$('div.uiPopover a._4jy0[role="button"]');
        }catch(e){
            manageBtnAttemps++;
            console.log("manageBtnAttemps", manageBtnAttemps);
            console.log(e);
        }
    }while (!manageBtn && manageBtnAttemps < 50);

    console.log('click on manageBtn');
    await manageBtn.click();
    await page.waitFor(2000);

    //=====> click on delete btn
    await page.waitFor(1000);
    let delBtn;
    let delBtnAttemps = 0;
    do{
        await page.waitFor(2000);
        try{
            delBtn = await page.$('ul li a._54nc[role="menuitem"]');
        }catch(e){
            delBtnAttemps++;
            console.log("delBtnAttemps", delBtnAttemps);
            console.log(e);
        }
    }while (!delBtn && delBtnAttemps < 50);

    console.log('click on delBtn');
    await delBtn.click();
    await page.waitFor(2000);
}

/*
*
*/
async function deleteItemViaDeleteDialog() {
    //=====> click on manage btn
    await page.waitFor(1000);
    let deleteBtns;
    let deleteBtnsAttemps = 0;
    do{
        await page.waitFor(2000);
        try{
            deleteBtns = await page.$$('div._59s7[role="dialog"] ._4iyi button');
        }catch(e){
            deleteBtnsAttemps++;
            console.log("deleteBtnsAttemps", deleteBtnsAttemps);
            console.log(e);
        }
    }while (!deleteBtns && deleteBtnsAttemps < 50);

    console.log('click on deleteBtns[1]');
    await deleteBtns[1].click();
    await page.waitFor(2000);
}


/*
*
*/
async function closeBrowser(){
    console.log('>>> closeBrowser ');
    await browser.close();
}






/************************/

async function testFbItem(item){
    itemToBeDeleted = item;
    try{
        await openBrowser();
        await openPage(CONFIG.facebookUrl);
        await login({
            email: CONFIG.email,
            password: CONFIG.password
        });
        await navigateTo(CONFIG.sellingPage);
        await displaySoldItems();
        await openDeleteDialog();
        await deleteItemViaDeleteDialog();
        //await closeBrowser();

    }catch(e){
        console.log(e);
    }

}

module.exports = {
    testFbItem: testFbItem
}
