// Set up variables and requires
const express = require("express");
const data = require("./data.json")
const app = express();

// Set pug as the view engine

app.set("view engine", "pug");
app.use(express.json());
app.use("/static", express.static("public"));

// The request pages for the index, about, and project:ID pages.

app.get("/",(req, res, next) => {
	res.render("index", data);
});

app.get("/about",(req,res,next) => {
	res.render('about', data);
});

app.get('/projects/:id',(req,res,next) => {
    const projectId = req.params.id;
    
    const project = data.projects.find(({id}) => id === +projectId );
    if (project) {
    res.render('project', {project});
    } else{ 
        res.sendStatus(404);
    }
});

// Error handling.
// NOTE: Example error handler code from Error Handling Middleware course video and error.pug view creation by extension.

app.use((req, res, next) => {
    const err = new Error("Uh-oh, this page does not exist.");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
	res.render("error", err);
    console.log("Uh-oh, this page does not exist.");
  
});

// Listening message is displayed to the console.

app.listen(3000, () =>{
	console.log("App is listening on port 3000");
});