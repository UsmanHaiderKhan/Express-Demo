function authenticate(req, res, next) {
	console.log("Authenticating User...");
	next();
}
module.exports = authenticate;
