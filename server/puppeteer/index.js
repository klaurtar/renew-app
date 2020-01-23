const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname + './../../.env') });

const ItemPoster = require('./ItemPoster');
// const ItemDeleter = require('./ItemDeleter');
// const ItemTester = require('./ItemTester');
//
// const item = require('../classes/item/Item');
// const fbitem = require('../classes/fbitem/FbItem');
// const group = require('../classes/group/Group');

// let nextItem = item.getNextItemToBePublishedSync();
//
// console.log('fist', nextItem);

(async () => {
	// let nextItem = await item.getNextItemToBePublishedSync();
	//
	// console.log(nextItem);
	//
	// let itemGroups = await group.getGroupsSync({
	// 	_id: {
	// 		$in: nextItem['groups']
	// 	}
	// });
	//
	// console.log(itemGroups);


	//let updatedItem = await item.updateItemSync(nextItem, {last_fb_published_at: 1});

	//console.log(updatedItem);

	// let lastfbitem = await fbitem.addFbItemSync({
	// 	item_id: nextItem._id,
	// 	url: 'https://www.facebook.com/marketplace/item/2575139949206454/',
	// 	//published_at: Date.now()
	// });

	//console.log(lastfbitem);

	//await ItemPoster.publishNextItem();

	//nextItem.then((data)=>console.log(data));
})();


let publishInterval;
let publishIntervalTime = 1000 * 60 * 60;
//let publishIntervalTime = 1000 * 60 * 10;

if(!publishInterval){
	ItemPoster.publishNextItem();
	publishInterval = setInterval(()=>{
		//console.log('---> check the next item to be published');
		ItemPoster.publishNextItem();
	}, publishIntervalTime);
}




//ItemPoster.post(item);
//ItemDeleter.deleteFbItem(itemToBeDeleted);
//ItemTester.testFbItem();
