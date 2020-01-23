## Pre-Run ##
- Install `mongodb` and run it. Note, sometime you should create directory for mongodb to store data.
- Install dependencies `npm i`.
- Copy `example.env` content into `.env` file. `.env` file contains environment variables.
- Type the following command to run server.
```
npm run api
```

## Read API Docs ##
- Navigate to `server` directory. Then `apidocs`. Then open `index.html` file by explorer.

## Create Directory For Item Photos ##
- Create a folder in the working root directory and call it `cdn`.
- Then inside this folder create nested one and call it `item_photos`.
- *Or* Create the directory where ever but change `ITEM_PHOTOS_DIR` in `.env` file into this directory.

## Display Item Photos ##
- You must be authenticated to access photos.
- To display uploaded item photos, by `<img />` tag for example, you can access them through `http://localhost:8181/item_photo_of/` followed by `photo name`. e.g. `http://localhost:8181/item_photo_of/_mssrdlk4t-1579570618748.jpg`.

## Run Auto Publish ##
- To run auto publish script `npm run autopublish`.
### How Auto Publishing Work ###
- Every hour, the app will get the next item to publish it. The next item is the item that has not been published for certain amount of time. For example, one week, one month or 3 day. `note, it's three days right now for testing, later we will change it`.
- If there is an item to be published, the app will publish it, share it on groups and update `last_fb_published_at` field of the item.
