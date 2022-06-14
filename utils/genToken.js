const jwt = require('jsonwebtoken')
function genToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}
module.exports = { genToken }