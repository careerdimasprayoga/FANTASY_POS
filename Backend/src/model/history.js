const connection = require("../config/mysql");

module.exports = {
    getAllHistory: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM historys", (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            });
        })
    }, postHistory: (dataHistory) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO historys SET ?", dataHistory, (error, result) => {
                console.log(result)
                if (!error) {
                    const newResult = {
                        product_id: result.insertId,
                        ...dataHistory
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }
}