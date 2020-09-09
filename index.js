const Joi = require("joi");

const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	res.send("hello");
});

// app.get("/api/courses", (req, res) => {
// 	res.send([1, 2, 3]);
// });

const courses = [
	{ id: 1, name: "course1" },
	{ id: 2, name: "course2" },
	{ id: 3, name: "course3" }
];

app.get("/api/courses", (req, res) => {
	res.send(courses);
});

// /api/courses/1
app.get("/api/courses/:id", (req, res) => {
	//res.send(req.params.id);
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) {
		res.status(404).send("The course with the given id was not found");
	}
	res.send(course);
});

app.post("/api/courses", async (req, res) => {
	const schema = {
		name: Joi.string().min(3).required()
	};
	const result = Joi.validate(req.body, schema);

	//const result = await schema.validateAsync(req.body);
	//const result = Joi.validate;
	//console.log(result);
	// if (!req.body.name || req.body.name.length < 3) {
	// 	res.status(400).send(
	// 		"name is required and should be a minimum of 3 characters"
	// 	);
	if (result.error) {
		res.status(400).send(result.error.details[0].message);
		return;
	}
	const course = {
		id: courses.length + 1,
		name: req.body.name
	};
	courses.push(course);
	res.send(course);
});

// // /api/courses/1
// app.get("/api/posts/:year/:month", (req, res) => {
// 	//res.send(req.params);
// 	res.send(req.query);
// });

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
