const multer  = require('multer');
const utilities = require('../utilities');


/**
* apply some multer middlewares
*/
const upload = multer(
    {
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                //cb(null, './cdn/item_photos/') // note, dest start from working root directory.
                cb(null, process.env.ITEM_PHOTOS_DIR) // note, dest start from working root directory.
            },
            filename: function (req, file, cb) {
                cb(null, `${utilities.generateID()}-${Date.now()}.jpg`);
            }
        }),
        /**
        * skip uploading file/s or not.
        * Once cb(null, false) even if with array of files, it will skip all the files
        */
        fileFilter: function (req, file, cb) {
            // The function should call `cb` with a boolean
            // to indicate if the file should be accepted
            const allowedMimetypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if(allowedMimetypes.indexOf(file.mimetype) === -1){
                cb(null, false);
            }else{
                cb(null, true);
            }
        },
        limits: {
            fileSize: 1024 * 1024 * 5 // 5MB
        }
        //dest: './cdn/item_photos/', // note, dest start from working root directory.
    }
);

const CustomMulter = (req, res, next) => {
    upload.array('photos', 8)(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          console.log('upload image error', err.message);
          res.status(400).json({
              error: {
                  errors: [`upload image error ${err.message}`]
              },
              code: 400
          });
          return;
        }
        next();
    });
};

module.exports = { CustomMulter };
