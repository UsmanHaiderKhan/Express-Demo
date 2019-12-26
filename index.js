const Joi = require("joi");

const express = require("express");
const app = express();
app.use(express.json());
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
	if (!course) res.status(404).send("No Course Available Across that Id");
	res.send(course);
});

//HTTP_Post Request
app.post("/api/courses", (req, res) => {
	if (result.error) {
		res.status(400).send(result.error.details[0].message);
		return;
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
	const course = course.find(c => c.id === parseInt(req.params.id));
	if (!course) {
		res.status(404).send("Course Not Found Across That Id");
	}

	var { error } = validateCourse(req.body);
	if (error) {
	}
	// var updated=
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
