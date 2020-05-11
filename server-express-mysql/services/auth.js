const jwt = require('jsonwebtoken');
const models = require('../models/index');
const bcrypt = require('bcryptjs');

var authService = {}

authService.signUser = user => {
    const token = jwt.sign({
        userName: user.userName,
        userId: user.userId,
    },
        'secretkey',
        {
            expiresIn: '1h'
        });
    return token
}


authService.verifyUser = token => {
    try {
        let decoded = jwt.verify(token, 'secretkey');
        return models.users.findByPk(decoded.userId);
    }
    catch (error) {
        console.log(err);
        return resizeBy.status(401).json({
            message: 'Authorization Failed'
        });
    }
};

authService.hashPassword = plainTextPassword => {

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(plainTextPassword, salt);
    return hash;

};

authService.comparePasswords = (plainTextPassword, hashedPassword) => {
    return bcrypt.compareSync(plainTextPassword, hashedPassword)
}


module.exports = authService;