'use strict'
var passport = require('koa-passport')
var LocalStrategy = require('passport-local').Strategy

exports.setup = function (User, config) {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password' // this is the virtual field on the model
  },
    async function (username, password, done) {
      try {
        const user = await User.findOne({
          where: {
            username: username
          }
        })
        if (!user) {
          return done(null, false, { message: 'This username is not registered.' })
        }
        if (user.dataValues.password !== password) {
          return done(null, false, { message: 'This password is not correct.' })
        }
        return done(null, user)
      } catch (err) {
        if (err) return done(err)
      }
    }))
}
