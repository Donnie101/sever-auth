const { User } = require('../models/user');
const { secret } = require('../config')
const jwt = require('jwt-simple');


function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, secret)
}

module.exports.signup = function(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password)
        return res.status(422).send({ error: 'You must provide email and password' })

    User.findOne({ email: email.toLowerCase() }, function(err, existingUser) {
        if (err) return next(err);

        if (existingUser) return res.status(422).send({ error: 'Email is in use' });

        User.create({ email, password }, (err, user) => {
            if (err) return res.send(err);
            res.json({ token: tokenForUser(user) });
        });
    });
}


module.exports.signin = function(req, res, next) {
    res.send({ token: tokenForUser(req.user) });
}