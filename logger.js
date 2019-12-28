function log(req, res, next) {
	console.log("Logging User...");
	next();
}
module.exports = log;
