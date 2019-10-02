require('dotenv').config();
const express = require("express");
const app = express();
const massive = require('massive');
const authController = require ("./controllers/authController")
const surveysController = require ("./controllers/surveysController")
const {CONNECTION_STRING, SESSION_SECRET} = process.env;
const session = require("express-session");

app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))


massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log("db connected")
})


// auth endpoints
app.get("/auth/session", authController.getSession);
app.post("/auth/register", authController.register); // body
app.put("/auth/editUser", authController.editUser); //body
app.post("/auth/login", authController.login);  //body
app.post("/auth/logout", authController.logout); 

// survey endpoints
app.get("/api/survey/getAll/", surveysController.getAll);
app.get("/api/survey/getAll/user", surveysController.getUserSurveys);
app.get("/api/getOne/:survey_id", surveysController.getOne); //param
app.post("/api/survey", surveysController.addSurvey);   //body
app.delete("/api/survey/:survey_id", surveysController.deleteSurvey);  //param



app.listen(5050, () => {
    console.log("listening on port 5050")
})