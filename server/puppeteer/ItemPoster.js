const puppeteer = require("puppeteer");
const CONFIG = require('./CONFIG');
const utilities = require('../utilities');
const item = require('../classes/item/Item');
const fbitem = require('../classes/fbitem/FbItem');
const group = require('../classes/group/Group');

/**/
let itemToBePublished;
/*
* will be setted once the item has published on fb
*/
let publishedItemUrl;


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
    console.log('>>> log in with ', data.email, ' email');
    await page.waitFor(500);
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
        await page.waitFor(200);
        await page.goto(pageUrl);
        await page.waitFor(200);
    }catch(e){
        console.log('[TIMEOUT] -> it took more time to navigate');
    }
}
/*
*
*/
async function closeBrowser(){
    console.log('>>> closeBrowser ');
    await browser.close();
}
/*
*
*/
async function openSellingDialog(){
    console.log('>>> openSellingDialog');

    let sellBtn = await utilities.keepWaitingForSelector(page, 'button._54qk');
    await sellBtn.click();

    await utilities.keepWaitingForSelector(page, 'div._59s7[role=dialog]');
    await utilities.keepWaitingForSelector(page, 'a._4e31[role=button]');
}

/*
*
*/
async function fillOutDialogData(){
    let itemBtn = await utilities.keepWaitingForSelector(page, 'a._4e31[role=button]');
    await itemBtn.click();

    let cateInput = await utilities.keepWaitingForSelector(page, 'input._58al[data-testid="searchable-text-input"]');
    await cateInput.type(itemToBePublished.category);

    let autoCompleteLi = await utilities.keepWaitingForSelector(page, 'li[role="option"][data-testid="choose_contact_button"]');
    await autoCompleteLi.click();

    let titleInput = await utilities.keepWaitingForSelector(page, '._2t_f input._58al[type="text"]');
    await titleInput.type(itemToBePublished.title);

    let priceInput = await utilities.keepWaitingForSelector(page, 'input[placeholder="Price"]');
    await priceInput.type('' + itemToBePublished.price);

    //await listenToPhotoUploading();

    let photosBtn = await utilities.keepWaitingForSelector(page, 'input[data-testid="add-more-photos"]');
    let photos = (itemToBePublished.photos).map(photo => `../../cdn/item_photos/${photo}`);
    await photosBtn.uploadFile(...photos);

    let nextBtn = await utilities.keepWaitingForSelector(page, '.rfloat ._332r button[data-testid="react-composer-post-button"]:not([disabled])');
    await nextBtn.click();

    await page.waitFor(2500);

    // handle clicking of publish btn
    let publishBtn = await utilities.keepWaitingForSelector(page, '.rfloat ._332r button[data-testid="react-composer-post-button"]:not([disabled])');
    await publishBtn.click();

    await page.waitFor(2000);

    // wait for publish response
    try{
        await page.waitForRequest('https://www.facebook.com/api/graphql/');
        await page.waitForRequest('https://www.facebook.com/api/graphql/');
        await page.waitForResponse(response => response.url() === 'https://www.facebook.com/api/graphql/' && response.status() === 200);
        await page.waitForResponse(response => response.url() === 'https://www.facebook.com/api/graphql/' && response.status() === 200);
    }catch(e){}

    // wait for the published item to be listed
    await utilities.keepWaitingForSelector(page, `span[title="${itemToBePublished.title}"]`, false, 6);

    // click on first listed item which is the last published one to get its url
    let publishedItemTitle = await utilities.keepWaitingForSelector(page, '._nx- span#marketplace-modal-dialog-title');
    await publishedItemTitle.click();

    await page.waitFor(1500);
    publishedItemUrl = page.url();
    console.log('page url', page.url());
    return publishedItemUrl;
}

/*
*
*/
async function shareOnGroups(itemUrl = publishedItemUrl, groups){
    if(groups.length > 0){
        for(let i = 0; i < groups.length; i++){
            await navigateTo(groups[i]['url']);
            let startDisscutionBtn = await utilities.keepWaitingForSelector(page, 'a[label="Start Discussion"][data-testid="status-attachment-selector"]');
            await startDisscutionBtn.click();


            let textInputDiv = await utilities.keepWaitingForSelector(page, 'div[role="dialog"][aria-label="Create a post"] div[contenteditable="true"]');
            await textInputDiv.type(itemToBePublished.title + ' \n');
            await textInputDiv.type(itemToBePublished.description + ' \n');
            await textInputDiv.type(itemUrl + ' ');
            await page.waitFor(1500);
            // click share btn
            let shareBtn = await utilities.keepWaitingForSelector(page, 'button[data-testid="react-composer-post-button"]:not([disabled])');
            await shareBtn.click();
            await page.waitFor(1500);

            // wait for share response
            try{
                await page.waitForResponse(response => response.url().match('https://www.facebook.com/composerx/intercept/status/') && response.status() === 200);
            }catch(e){}

            //
            let itemFbId;
            if(itemFbId = itemUrl.match(/[0-9]+/g)){
                itemFbId = itemFbId[0];
                await utilities.keepWaitingForSelector(page, `div[data-fsii="${itemFbId}"]`, false, 7);
            }


        }

    }
}


/************************/

async function publish(item_){
    itemToBePublished = item_;

    try{
        await openBrowser();
        await openPage(CONFIG.facebookUrl);
        await login({ email: CONFIG.email, password: CONFIG.password });

        await navigateTo(CONFIG.sellingPage);
        await openSellingDialog();
        await fillOutDialogData();


        if(!!publishedItemUrl.match(/https:\/\/www.facebook.com\/marketplace\/item\/[0-9]/)){
            // add fbitem
            await saveFbItem();
            // update item
            await item.updateItemSync(itemToBePublished._id, {last_fb_published_at: Date.now()});
            // publish on groups
            if(itemToBePublished.groups.length > 0){
                let itemGroups = await retreiveItemGroups();
                await shareOnGroups(publishedItemUrl, itemGroups);
            }

        }

        await closeBrowser();

    }catch(e){
        console.log(e);
    }

}

/*
*
*/
async function publishNextItem(){
    let nextItem = await item.getNextItemToBePublishedSync();
    if(!!nextItem){
        console.log('will publish this item', nextItem);
        await publish(nextItem);
    }
}
/*
*
*/
async function saveFbItem(){
    let savedfbitem = await fbitem.addFbItemSync({
		item_id: itemToBePublished._id,
		url: publishedItemUrl,
		published_at: Date.now()
	});
}

/*
*
*/
async function retreiveItemGroups(){
    let itemGroups = await group.getGroupsSync({
		_id: {
			$in: itemToBePublished['groups']
		}
	});
    return itemGroups || [];
}


module.exports = {
    publish: publish,
    publishNextItem: publishNextItem
}
