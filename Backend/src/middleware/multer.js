const multer = require('multer')
const helper = require('../helper/index')

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        console.log(file)
        callback(null, './uploads/')
    }, filename: (request, file, callback) => {
        callback(null, file.fieldname + '-' + new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname)
    }
})
const fileFilter = (request, file, callback) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        callback(null, true)
    } else {
        return callback(new Error("Extension File Must be PNG or JPG"), false)
    }
}
const limits = { fileSize: 1024 * 1024 * 1 }
let upload = multer({ storage, fileFilter, limits }).single("image")

const uploadFilter = (request, response, next) => {
    upload(request, response, function (err) {
        if (err instanceof multer.MulterError) {
            return helper.response(response, 400, err.message)
        } else if (err) {
            return helper.response(response, 400, err.message)
        } //else if (!request.file) {
        //return helper.response(response, 400, "Please select an image to upload")
        //}
        next()
    })
}
module.exports = uploadFilter