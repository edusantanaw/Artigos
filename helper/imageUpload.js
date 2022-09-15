const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
            cb(null, 'public/images/category')
    },
    filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
});

const upload = multer({ storage: storage }).single('img');
const uploadImages = async (req, res, next) => {
    upload(req, res, function( err) {
        if (err) {
            console.log(err);
        }
        next(undefined, true)
    })
}

// const uploadImages = async (req, res, next) => {
//     parser.single('category')(req, res, err => {
//         if (err) {
//             throw err
//         } else {
//             const image = {}
//             console.log(req.file)
//             image.id = req.file
//             image.url = `/images/category/${image.id}`
//             next()
//         }
//     })
// }
module.exports = uploadImages
