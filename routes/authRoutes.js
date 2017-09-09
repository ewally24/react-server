const passport = require('passport');

module.exports = (app) => {

	app.get('/', (req, res, next) => {
		res.send({'greeting': 'hi'})
	})

	app.get('/auth/google', passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	app.get('/auth/google/callback', passport.authenticate('google'));

	// If user was deserialized and return their user object from their cookie 
	// should be able to request user object/fields for that id.
	// passport attaches a couple of objects and functions to req including req.user object and logout
	app.get('/api/current_user', (req, res, next) => {
		res.send(req.user);
	})

	// logout
	app.get('/api/logout', (req, res, next) => {
		req.logout();
		res.send(req.user); // should return nothing
	})

}