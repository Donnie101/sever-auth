const auth = require('./controllers/authentication')
const passportService = require('./services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSingin = passport.authenticate('local', { session: false });

module.exports = function(app) {
    app.get('/', requireAuth, (req, res) => {
        res.send('Welcom to the home page');
    })

    app.post('/signin', requireSingin, auth.signin);

    app.post('/signup', auth.signup);
}