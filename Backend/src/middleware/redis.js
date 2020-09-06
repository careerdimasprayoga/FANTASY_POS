const redis = require('redis')
const client = redis.createClient()
const helper = require('../helper/index')
const { request, response } = require('express')

module.exports = {
    getProductRedis: (request, response, next) => {
        let { page, limit } = request.query
        client.get(`getProduct,page:${page},limit:${limit}`, (error, result) => {
            if (!error && result != null) {
                console.log('Ada data redis')
                return helper.response(response, 200, JSON.parse(result))
            } else {
                console.log('No data redis')
                next()
            }
        })
    },
    getCategoryRedis: (request, response, next) => {
        client.get(`getCategory`, (error, result) => {
            if (!error && result != null) {
                console.log('Ada data redis')
                return helper.response(response, 200, JSON.parse(result))
            } else {
                console.log('No data redis')
                next()
            }
        })
    }, clearDataProductRedis: (request, response, next) => {
        client.keys("getProduct*", (err, keys) => {
            if (keys.length > 0) {
                keys.forEach((value) => {
                    client.del(value)
                })
            }
            next()
        })
        // client.flushall((error, result) => { // all redis deleted
        //     console.log(result)
        // })
        // next()
    }, clearDataCategoryRedis: (request, response, next) => {
        client.keys("getCategory*", (err, keys) => {
            if (keys.length > 0) {
                keys.forEach((value) => {
                    client.del(value)
                })
            }
            next()
        })
    }
}