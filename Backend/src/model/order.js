const connection = require("../config/mysql");

module.exports = {
    getAllOrder: () => {
        return new Promise((resolve,reject) => {
            connection.query("SELECT orders.id_history, product.name, orders.ppn, orders.price FROM orders INNER JOIN product ON orders.id_product = product.id", (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            });
        })
    }, postOrder: (dataOrder) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO orders SET ?", dataOrder, (error, result) => {
                if(!error) {
                    const newResult = {
                        // product_id: result.insertId,
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