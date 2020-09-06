const router = require("express").Router()
const { getAllProduct, searchProduct, getProductOrderName, getProductOrderCategory, getProductOrderDate, getProductOrderPrice, getProductById, postProduct, patchProduct, deleteProduct } = require('../controller/product')
const { auth, management_page } = require('../middleware/auth')
const { getProductRedis, clearDataProductRedis } = require('../middleware/redis')
// const { request } = require("express")
const uploadImage = require('../middleware/multer')

// [GET]
// router.get("/", product.getAllProduct);
router.get("/", auth, getProductRedis, getAllProduct);
router.get("/search", auth, searchProduct);
router.get("/ordername", auth, getProductOrderName);
router.get("/ordercategory", auth, getProductOrderCategory);
router.get("/orderdate", auth, getProductOrderDate);
router.get("/orderprice", auth, getProductOrderPrice);
router.get("/:id", auth, getProductById);
// [POST]
router.post("/", management_page, uploadImage, clearDataProductRedis, postProduct);
// [PACTH/PUT]
router.patch("/:id", management_page, uploadImage, clearDataProductRedis, patchProduct);
// [DELETE]
router.delete("/:id", management_page, clearDataProductRedis, deleteProduct);

module.exports = router // Export