const router = require("express").Router()
const { getAllProduct, searchProduct, getProductOrderName, getProductOrderCategory, getProductOrderDate, getProductOrderPrice, getProductById, postProduct, patchProduct, deleteProduct } = require('../controller/product')
const { authorization } = require('../middleware/auth')
const { getProductRedis, clearDataProductRedis } = require('../middleware/redis')
const multer = require('multer')
const { request } = require("express")

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './uploads/')
    },
    filename: (request, file, callback) => {
        callback(null, file.fieldname + '-' + new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname
        )
    }
})
let upload = multer({ storage: storage })

// [GET]
// router.get("/", product.getAllProduct);
router.get("/", authorization, getProductRedis, getAllProduct);
router.get("/search", authorization, searchProduct);
router.get("/ordername", getProductOrderName);
router.get("/ordercategory", getProductOrderCategory);
router.get("/orderdate", getProductOrderDate);
router.get("/orderprice", getProductOrderPrice);
// [GET BY ID]
router.get("/:id", getProductById);
// [POST]
router.post("/", upload.single("image"), postProduct);
// [PACTH/PUT]
router.patch("/:id", clearDataProductRedis, patchProduct);
// [DELETE]
router.delete("/:id", clearDataProductRedis, deleteProduct);

module.exports = router // Export