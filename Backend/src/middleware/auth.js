const jwt = require('jsonwebtoken')
const helper = require('../helper')

module.exports = {
    authorization: (request, response, next) => {
        let token = request.headers.authorization
        if (token) {
            console.log(token)
            token = token.split(" ")[1]
            jwt.verify(token, "RAHASIA", (error, result) => {
                console.log(error)
                if ((error && error.name === "JsonWebTokenError") || (error && error.name === "TokenExpiredError")) {
                    return helper.response(response, 403, error.message)
                } else {
                    console.log(result)
                    request.token = result
                    next()
                }
            })
        } else {
            return helper.response(response, 200, "Please login first")
        }
    }
}
