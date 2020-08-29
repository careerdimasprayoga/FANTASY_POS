const router = require("express").Router()
const { postOrder, getAllOrder, today_income, total_order, total_yearIncome } = require('../controller/order');

router.post("/", postOrder);
router.get("/", getAllOrder);
router.get("/today_income", today_income);
router.get("/total_order", total_order);
router.get("/total_yearIncome", total_yearIncome);

module.exports = router