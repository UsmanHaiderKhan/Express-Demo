const Joi = require("joi");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const auth = require("./auth");
const logger = require("./logger");
const express = require("express");
const app = express();
//Built-In Middle Ware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//Here we Keep static resources of Our Site Like Css/Images extra
app.use(express.static("public"));

app.use(morgan("tiny"));
console.log(`Environment:${app.get("env")}`);
if (app.get("env") === "development") {
	console.log("Morgen is Enabled...");
}
app.use(helmet());

console.log("Application Mode = " + config.get("name"));
console.log("Mail Server = " + config.get("mail.host"));
console.log("Mail Password = " + config.get("mail.password"));

//Custom Middle Ware
app.use(logger);

app.use(auth);

var courses = [
	{
		id: 1,
		name: "JAVA"
	},
	{
		id: 2,
		name: "Dot Net"
	},
	{
		id: 3,
		name: "Android"
	},
	{
		id: 4,
		name: "Quantum Computing"
	}
];

//Basic Use
app.get("/", function(req, res) {
	res.send("Hello Brother");
});

//Routes with Pera-meters
app.get("/api/posts/:year/:month", (req, res) => {
	res.send(req.query);
});

//HTTP_GET All the Courses
app.get("/api/courses", (req, res) => {
	res.send(JSON.stringify(courses));
});

//Get Data from Array By Id
app.get("/api/courses/:id", (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) return res.status(404).send("No Course Available Across that Id");
	res.send(course);
});

//HTTP_Post Request
app.post("/api/courses", (req, res) => {
	const { error } = validateCourse(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	//Custom Code to check input validation
	// if (!req.body.name || req.body.name.length < 3) {
	// 	res.status(400).send("Name Filed Is Empty Or Less then 3 Characters...!");
	// 	return;
	// }
	const course = {
		id: courses.length + 1,
		name: req.body.name
	};
	courses.push(course);
	res.send(course);
});

// HTTP_Put Request
app.put("/api/courses/:id", (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) {
		return res.status(404).send("Course Not Found Across That Id");
	}

	const { error } = validateCourse(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	// Update Course Name
	course.name = req.body.name;
	res.send(course);
});

//Http_Delete Request
app.delete("/api/courses/:id", (req, res) => {
	var course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) {
		return res.status(404).send("No course Across that Id...");
	}
	//Delete course
	const index = courses.indexOf(course);
	courses.splice(index, 1);
	res.send(course);
});

//Make Validation Function
function validateCourse(course) {
	const Schema = {
		name: Joi.string()
			.min(3)
			.required()
	};
	return Joi.validate(course, Schema);
}

//When We Deploy the Application Port No Changes For
//That we Need To Set Up Port no Dynamically For that

var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Listening on PORT ${port}...`));
