const connection = require("../config/mysql");

module.exports = {
    getAllOrder: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT historys.invoice as invoices, 'Dimas Prayoga' as cashier, historys.date as dates, GROUP_CONCAT(products.name) as names, historys.subtotal as subtotals from historys LEFT JOIN orders on orders.id_history = historys.id LEFT JOIN products on products.id = orders.id_product GROUP BY(invoices)", (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            });
        })
    }, today_income: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT SUM(subtotal) as subtotals FROM historys WHERE DATE_FORMAT(date, "%Y-%m-%d") = CURRENT_DATE() `, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            });
        })
    }, total_order: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT COUNT(*) as totals from orders", (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            });
        })
    }, total_yearIncome: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT COUNT(*) as totals from orders", (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            });
        })
    },
    postOrder: (dataOrder) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO orders SET ?", dataOrder, (error, result) => {
                if (!error) {
                    const newResult = {
                        product_id: result.insertId,
                        ...dataOrder
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }
}



// TABLE : 
// PRODUCTS
// CATEGORYS
// ORDERS
// HISTORYS

// PRODUCTS
// id  |   id_category |   name    |   image   |   price   |   created  |   updated   |   status  |

// CATEGORYS
// id  |   name    |

// ORDERS | perfect
// id  | id_product   |    id_history  |   price   |    ppn |

// HISTORYS
// id  |    invoice     |   subtotal    |   date    |