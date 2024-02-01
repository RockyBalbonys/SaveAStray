const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: '367854237850-6nomj4kp7i22ikmlcv0n4d0qkj332mhe.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "/auth/callback",
    scope: ['profile', 'email']
},
(accessToken, refreshToken, profile, done) => {
    done(null, profile)
    /*
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
        console.log(user);
        return cb(err, user);
      }); */
}));

// Serialize user into the session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((user, done) => {
    done(null, user);
});
