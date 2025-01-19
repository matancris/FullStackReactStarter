const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { findUserById, findUserByEmail, createUser } = require('../api/user/user.model');
const { config } = require('./index');

// JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await findUserById(payload.id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: config.google.clientId,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackUrl,
  passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists
    const existingUser = await findUserByEmail(profile.emails[0].value);

    if (existingUser) {
      return done(null, existingUser);
    }

    // Create new user if doesn't exist
    const newUser = await createUser({
      name: profile.displayName,
      email: profile.emails[0].value,
      googleId: profile.id,
      password: null // Google users don't need a password
    });

    return done(null, newUser);
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport; 