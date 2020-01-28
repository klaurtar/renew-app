const path = require('path');
const CONFIG = require('./CONFIG');
const utilities = require('./utilities');
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
    // fill out the category
    let cateInput = await utilities.keepWaitingForSelector(page, 'input._58al[data-testid="searchable-text-input"]');
    await cateInput.type(itemToBePublished.category);
    // select the category from the autoComplete list
    let autoCompleteLi = await utilities.keepWaitingForSelector(page, 'li[role="option"][data-testid="choose_contact_button"]');
    await autoCompleteLi.click();
    // fill out the title
    let titleInput = await utilities.keepWaitingForSelector(page, '._2t_f input._58al[type="text"]');
    await titleInput.type(itemToBePublished.title);
    // fill out the price
    let priceInput = await utilities.keepWaitingForSelector(page, 'input[placeholder="Price"]');
    await priceInput.type('' + itemToBePublished.price);

    // fill out the description
    let descriptionInput = await utilities.keepWaitingForSelector(page, 'div[data-testid="status-attachment-mentions-input"][contenteditable="true"]');
    await descriptionInput.type(itemToBePublished.description || '');

    //await listenToPhotoUploading();

    let photosBtn = await utilities.keepWaitingForSelector(page, 'input[data-testid="add-more-photos"]');
    //let photos = (itemToBePublished.photos).map(photo => `../../cdn/item_photos/${photo}`);
    let photos = (itemToBePublished.photos).map(photo => path.resolve(`${__dirname}./../../cdn/item_photos/${photo}`));
    console.log('>>>>>>>>>>photos', photos);
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
            await utilities.navigateTo(page, groups[i]['url']);
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
                await utilities.keepWaitingForSelector(page, `div[data-fsii="${itemFbId}"]`, false, 3);
            }
        }
    }
}


/************************/

async function playePublishProcess(item_){
    itemToBePublished = item_;


    if(!!CONFIG.email && !!CONFIG.password){
        try{
            browser = await utilities.openBrowser();
            page = await utilities.openPage(browser, CONFIG.facebookUrl);
            await utilities.fbLogin(page, {
                email: CONFIG.email,
                password: CONFIG.password
            });
            await utilities.navigateTo(page, CONFIG.sellingPage);
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
            await browser.close();

        }catch(e){
            console.log('error happened');
            console.log(e);
            if(!!browser){
                try {
                    await browser.close();
                    browser = false;
                } catch (e) {}
            }
        }
    }else{
        console.log("Set email and password");
    }

}

/*
*
*/
async function publishNextItem(){
    let nextItem = await item.getNextItemToBePublishedSync();
    if(!!nextItem){
        console.log('will publish this item', nextItem);
        await playePublishProcess(nextItem);
    }
}
/*
*
*/
async function publishItem(itemId){
    let nextItem = await item.getItemSync(itemId);
    if(!!nextItem){
        console.log('will publish this item', nextItem);
        await playePublishProcess(nextItem);
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
    publishItem: publishItem,
    publishNextItem: publishNextItem
}
