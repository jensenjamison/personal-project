require('dotenv').config();
const express = require("express");
const app = express();
const massive = require('massive');
const authController = require ("./controllers/authController")
const surveysController = require ("./controllers/surveysController")
const session = require("express-session");
const nodemailer = require("nodemailer");

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING, EMAIL_NAME, EMAIL_PW} = process.env;

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

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: EMAIL_NAME,
        pass: EMAIL_PW
    }
});
 
 transporter.verify((error, success) => {
    if (error) {
       console.log(error);
    } else {
       console.log('Server listening for messages', success);
    };
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
app.get("/api/survey/getOne/:survey_id", surveysController.getOne); //param
app.post("/api/survey/new", surveysController.addNewSurvey);   //body
app.post("/api/survey/completed", surveysController.addCompletedSurvey);   //body
app.delete("/api/survey/:survey_id", surveysController.setInactive);  //param



app.listen(SERVER_PORT, () => {
    console.log(`listening on port ${SERVER_PORT}`)
})