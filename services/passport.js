const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// Give the user the unique mongoID as a cookie when it is set
passport.serializeUser((user, done) => {
	done(null, user.id);	
})

// Turn user id back into User on database /fulfill request
passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	})
})

passport.use(
	new GoogleStrategy({
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: "/auth/google/callback",
		proxy: true
	}, (accessToken, refreshToken, profile, done) => {
		User.findOne({googleID: profile.id}).then((existingUser) => {
			if(existingUser) {
				console.log('User already Exists!');
				done(null, existingUser);
			} else {
				new User({googleID: profile.id}).save().then((user) => {
					console.log('New User added To the Database');
					done(null, user);
				})
			}
		})
	})
)