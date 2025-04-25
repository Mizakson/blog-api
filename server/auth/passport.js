const passport = require("passport")
const jwtStrategy = require("passport-jwt").Strategy
const extractJwt = require("passport-jwt").ExtractJwt
const queries = require("../utils/queries")

const opts = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

const verify = async (payload, done) => {
    try {
        const user = await queries.getUserByUsername(payload.sub)

        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    } catch (error) {
        done(error, false)
    }
}

const JwtStrategy = new jwtStrategy(opts, verify)

passport.use(JwtStrategy)

module.exports = passport