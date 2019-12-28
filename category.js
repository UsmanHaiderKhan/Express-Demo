const express = require("express");
const Joi = require("joi");

var app = express();
app.use(express.json());

// Categories Array
var categories = [
	{
		id: 1,
		name: "Xoima"
	},
	{
		id: 2,
		name: "OPPO"
	},
	{
		id: 3,
		name: "Samsung"
	},
	{
		id: 4,
		name: "IPhone"
	}
];

//HTTP_GET Request
app.get("/api/category", (req, res) => {
	res.send(categories);
});

// Get Data by Id
app.get("/api/category/:id", (req, res) => {
	const category = categories.find(c => c.id === parseInt(req.params.id));
	if (!category) {
		return res.status(404).send("Here is no Category Across that Id...");
	}
	res.send(category);
});

//HTTP_POST Request
app.post("/api/category", (req, res) => {
	const { error } = ValidateCategory(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	//Post the Data
	const category = {
		id: categories.length + 1,
		name: req.body.name
	};
	categories.push(category);
	res.send(category);
});

// Http Put Request
app.put("/api/category/:id", (req, res) => {
	// Getting Id From Array Of Mobile Categories
	const category = categories.find(c => c.id === parseInt(req.params.id));
	if (!category) {
		return res.status(404).send("Here No Category Across that Id...");
	}
	// Validate the Incoming data
	const { error } = ValidateCategory(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	// Now Put the data
	category.name = req.body.name;
	res.send(category);
});

//HTTp Delete Request
app.delete("/api/category/:id", (req, res) => {
	var category = categories.find(c => c.id === parseInt(req.params.id));
	if (!category) {
		res.status(404).send("We Did Find ANy Thing Agnist That Id....");
	}
	const index = categories.indexOf(category);
	categories.splice(index, 1);
	res.send(category);
});

// common Function
function ValidateCategory(category) {
	var Schema = {
		name: Joi.string()
			.min(5)
			.required()
	};
	return Joi.validate(category, Schema);
}
//
var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Listen On PORT ${port}...`));
