const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../helper')
const { post_user, check_user } = require('../model/users')

module.exports = {
    register_user: async (request, response) => {
        const { email, password, name } = request.body
        const salt = bcrypt.genSaltSync(10) // Penggunanan dokumentasi bcrypt
        const encrypt_password = bcrypt.hashSync(password, salt)
        const setData = {
            email,
            password: encrypt_password,
            name,
            role_id: 1,
            status: 0,
            created: new Date()
        }
        try {
            const result = await post_user(setData)
            return helper.response(response, 200, "Success Register User", result)
        } catch (error) {
            return helper.response(response, 400, "Bad Request")
        }
    },
    login_user: async (request, response) => {
        const { email, password } = request.body
        const check_data_user = await check_user(email)
        if (check_data_user.length >= 1) {
            const check_password = bcrypt.compareSync(password, check_data_user[0].password)
            if (check_password) {
                const { id, email, name, role_id, status } = check_data_user[0]
                let payload = {
                    id,
                    email,
                    name,
                    role_id,
                    status
                }
                const token = jwt.sign(payload, "RAHASIA", { expiresIn: "1h" })
                payload = { ...payload, token }
                return helper.response(response, 200, "Login Success", payload)
            } else {
                return helper.response(response, 400, "Wrong Password !")
            }
        } else {
            return helper.response(response, 400, "Email has not registred !")
        }
    }
}
