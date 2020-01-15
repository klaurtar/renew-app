const path = require('path');
module.exports = (api) => {
    api.get(
        '/item_photo_of/:photo_name',
        (req, res, next) => {
            res.setHeader('Content-Type', 'image/jpeg');
            next();
        },
        (req, res) => {
            let photoPath = path.resolve(__dirname + `./../../cdn/item_photos/${req.params.photo_name}`);
            //console.log(photoPath);
            res.sendFile(photoPath);
        }
    );
}
