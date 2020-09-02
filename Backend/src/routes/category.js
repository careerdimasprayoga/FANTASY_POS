const router = require("express").Router()
const { getCategory, getCategoryById, postCategory, patchCategory, deleteCategory } = require('../controller/category')

router.get("/", getCategory);
router.get("/:id", getCategoryById);
router.post("/", postCategory);
router.patch("/:id", patchCategory);
router.delete("/:id", deleteCategory);

module.exports = router