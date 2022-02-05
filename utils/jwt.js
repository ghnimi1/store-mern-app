const jwt = require('jsonwebtoken')

//Id is the payload we want to add to this token
const generateToken = (id) => {
    //2nd parameter is some kinda secret
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d' //Token will expire in 1days
    });
}

module.exports = generateToken;