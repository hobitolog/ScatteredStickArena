var LocalStrategy = require('passport-local').Strategy
var bcrypt = require('bcrypt')

var User = require('./models/user')
var log = require('./log')

module.exports = {
    init: function (passport) {

        passport.serializeUser(function (user, done) {
            done(null, user._id)
        })

        passport.deserializeUser(function (id, done) {
            User.findById(id, function (err, user) {
                done(err, user)
            })
        })

        passport.use('local-register', new LocalStrategy({
            usernameField: "registerLogin",
            passwordField: "registerPassword",
            passReqToCallback: true
        }, (req, username, password, done) => {

            var createUser = () => {

                var email = req.body.registerEmail

                if(!username || !password || !email) {
                    req.registerMessage = "Dane są niekompletne"
                    return done(null, false)
                }

                if(!email.includes("@")) {
                    req.registerMessage = "Adres e-mail jest nieprawidłowy"
                    return done(null, false)
                }

                if(username.length < 2 || username.length > 30) {
                    req.registerMessage = "Login musi zawierać od 2 a 30 znaków"
                    return done(null, false)
                }
                
                User.findOne({
                    $or: [
                        { "email": email },
                        { "login": username }
                    ]
                }).then(user => {

                    if (user) {
                        var msg = (user.email == email) ? "E-mail jest już używany." : "Login jest już używany."
                        req.registerMessage = msg
                        return done(null, false)
                    }
                    else {
                        var newUser = new User()
                        newUser.login = username
                        newUser.email = email
                        newUser.setPassword(password)
                        newUser.initActivation()

                        newUser.save(function (err) {
                            if (err) {
                                log.error("Error creating user: " + err)
                                return done(err)
                            }

                            log.info('New user registered: ' + newUser.login)
                            return done(null, newUser)
                        })
                    }
                })
            }
            process.nextTick(createUser)
        }))

        passport.use('local-login', new LocalStrategy({
            usernameField: "login",
            passwordField: "password",
            passReqToCallback: true
        }, function (req, username, password, done) {
            User.findOne({ login: username }, function (err, user) {
                if (err) { return done(err) }
                if (!user || !user.isValidPassword(password)) {
                    req.loginMessage = 'Nieprawidłowy login lub hasło.'
                    return done(null, false)
                }
                return done(null, user)
            })
        }))
    },

    isLoggedIn: (req, res, next) => {

        if (req.isAuthenticated())
            return next()

        res.redirect('/login')
    },

    isActivated: (req, res, next) => {

        if(req.user.activation.activated)
            return next()

        res.redirect('/activation')
    }
}