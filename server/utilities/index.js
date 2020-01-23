module.exports = {
    generateID: () => ('_' + Math.random().toString(36).substr(2, 9)),
    ITEM_CATEGORIES: require('./ITEM_CATEGORIES'),
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
