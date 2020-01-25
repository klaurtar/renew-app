const CONFIG = require('./CONFIG');
const utilities = require('./utilities');
const item = require('../classes/item/Item');
const fbitem = require('../classes/fbitem/FbItem');


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
*
*/
async function saveItemViews() {
    let viewsDiv = await utilities.keepWaitingForSelector(page, 'div[data-testid="marketplace_pdp_component"] div._43kf._50f8');
    let viewsText = await page.evaluate(element => element.textContent, viewsDiv);
    let matches;
    if(matches = (viewsText || '').match(/[0-9]+/g)){
        let views = parseInt(matches[0]);
        if(views > 0){
            // increament the views
            console.log('increament views with ', views, ' of ', itemToBeDeleted._id, ' item');
            await item.updateItemSync(itemToBeDeleted.item_id, {
                $inc: {
                    views: views
                }
            });
        }
    }
}

/*
*
*/
async function markItemAsSold() {
    let soldBtn = await utilities.keepWaitingForSelector(page, 'button[nextavailability="out_of_stock"]');
    await soldBtn.click();
    try{
        await page.waitForRequest('https://www.facebook.com/api/graphql/');
        await page.waitForResponse(response => response.url() === 'https://www.facebook.com/api/graphql/' && response.status() === 200);
    }catch(e){}
}

/*
*
*/
async function displaySoldItems() {
    // hide active items
    let hideActiveItemBtn = await utilities.keepWaitingForSelector(page, 'div#js_1 div.rfloat[role="button"]');
    await hideActiveItemBtn.click();

    try{
        console.log('waiting for sold items displaying ...');
        // must be 2 btns; first one is for active items, second one is for sold items.
        let hideItemBtns = [];
        do{
            await page.waitFor(2000);
            try{
                //console.log('iteration ..', hideItemBtns.length);
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
async function openDeleteDialogAndDelete() {
    //=====> click on manage btn
    let manageBtn = await utilities.keepWaitingForSelector(page, 'div.uiPopover a._4jy0[role="button"]');
    await manageBtn.click();

    //=====> click on delete btn of manage btn
    let delBtn = await utilities.keepWaitingForSelector(page, 'ul li a._54nc[role="menuitem"]');
    await delBtn.click();

    //=====> click on detele btn of dialog (confirm delete). Note, there are 2 btns with the same selector, one is for cancel, the other one is for delete
    let deleteBtns = await utilities.keepWaitingForSelector(page, 'div._59s7[role="dialog"] ._4iyi button', true);
    await deleteBtns[1].click();
    await page.waitFor(2000);
}







/************************/

async function deleteFbItem(item){
    itemToBeDeleted = item;

    if(!!CONFIG.email && !!CONFIG.password){
        try{
            browser = await utilities.openBrowser();
            page = await utilities.openPage(browser, CONFIG.facebookUrl);
            await utilities.fbLogin(page, {
                email: CONFIG.email,
                password: CONFIG.password
            });
            await utilities.navigateTo(page, itemToBeDeleted.url);
            await saveItemViews();
            await markItemAsSold();
            await utilities.navigateTo(page, CONFIG.sellingPage);
            await displaySoldItems();
            await openDeleteDialogAndDelete();
            await browser.close();
            await fbitem.deleteFbItemSync(itemToBeDeleted._id);
        }catch(e){
            console.log(e);
        }
    }else{
        console.log("Set email and password");
    }

}

/*
*
*/
async function deleteNextItem(){
    let nextItem = await fbitem.getNextItemToBeDeletedSync();
    if(!!nextItem){
        console.log('will delete this fbitem', nextItem);
        await deleteFbItem(nextItem);
    }
}

module.exports = {
    deleteFbItem: deleteFbItem,
    deleteNextItem: deleteNextItem
}
