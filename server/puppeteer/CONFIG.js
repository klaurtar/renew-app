module.exports = {
	facebookUrl: 'https://www.facebook.com/',
	marketPlaceUrl: 'https://www.facebook.com/marketplace/nyc/propertyforsale/',
	sellingPage: 'https://www.facebook.com/marketplace/selling/',
	/*
	* set email
	*/
	email: process.env.FB_EMAIL,
	/*
	* set pass
	*/
	password: process.env.FB_PASSWORD,
	/*
	* @param {int} maxItems - hom many item you need to scape??
	* 0 -> means all the items, otherwise set the max number.
	*/
	maxItems: 15,
	removeBr: false,
	/*
	* rename the files, remember to add ths .csv file extension to make it more readable.
	*/
	allItemsFileName: 'all_items.csv',
	notSoldItemsFileName: 'not_sold_Items.csv',
	soldItemsFileName: 'sold_Items.csv',
};
