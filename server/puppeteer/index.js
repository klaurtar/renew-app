const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname + './../../.env') });

const eventManager = require('../eventManager');
const ItemPoster = require('./ItemPoster');
const ItemDeleter = require('./ItemDeleter');

//ItemPoster.publishNextItem();

eventManager.on('publishItem', (itemId) => {
    console.log('publish item of ', itemId);
    ItemPoster.publishItem(itemId);
});

eventManager.on('removeFbItem', (fbitemId) => {
    console.log('remove fbitem of ', fbitemId);
    ItemDeleter.deleteFbItem(fbitemId);
});

/*
* will interval every 60 mins
*/
let publishInterval;
let publishIntervalTime = 1000 * 60 * 60;
//let publishIntervalTime = 1000 * 60 * 10;

if(!publishInterval){
	ItemPoster.publishNextItem();
	publishInterval = setInterval(()=>{
		console.log('---> check the next item to be published');
		ItemPoster.publishNextItem();
	}, publishIntervalTime);
}


/*
* will interval every 90 mins
*/
let deleteInterval;
let deleteIntervalTime = 1000 * 60 * 90;
//let deleteIntervalTime = 1000 * 60 * 10;

if(!deleteInterval){
	//ItemDeleter.deleteNextItem();
	deleteInterval = setInterval(()=>{
		console.log('---> check the next fbitem to be deleted');
		ItemDeleter.deleteNextItem();
	}, deleteIntervalTime);
}
