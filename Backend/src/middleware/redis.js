const redis = require('redis')
const client = redis.createClient()
const helper = require('../helper/index')
const { request, response } = require('express')

module.exports = {
    getProductRedis: (request, response, next) => {
        let { page } = request.query
        client.get(`getProduct:${page}`, (error, result) => {
            if (!error && result != null) {
                console.log('Ada data redis')
                return helper.response(response, 200, JSON.parse(result))
            } else {
                console.log('No data redis')
                next()
            }
        })
    },
    clearDataProductRedis: (request, response, next) => {
        client.flushall((error, result) => {
            console.log(result)
        })
        next()
    }
}
