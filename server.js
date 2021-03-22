// use express module
const express = require('express');
const app = express();
// use request module
const request = require("request")
// import json file to server
const logins = require("./json/playerName.json")
// router for default route
const router = express.Router()
// use router as a middleware
app.use(router);
// use express static middleware
app.use(express.static(__dirname));
// use express bodyparser to pass data from body
app.use(express.urlencoded({
    extended: true
}));
// set view engine to ejs
app.set("view engine", "ejs");
// set ejs directory to public folder
app.set('views', './public/views');
// index route
app.get("/", function (req, res) {
    res.render("index");
});
// login route
app.get("/login", function (req, res) {
    res.render("login");
})

// determine if player already logged in or not
let loginStatus = 0;
// put player name in global variable so it can be used by another route
let playerNameLogin;

app.post("/login", function (req, res) {
    // assign player name and password from login page
    playerNameLogin = req.body.playerName;
    let playerPassword = req.body.password;
    // api url
    let loginURL = "http://localhost:3000/api/login";
    // request module to get json file from api url
    request(loginURL, function (error, response, body) {
        loginDB = JSON.parse(body);
        if (playerNameLogin === loginDB.playerName && playerPassword === loginDB.password) {
            //login status set to 1 which mean user is already logged in
            loginStatus = 1;
            //redirect user to game
            res.redirect("/game")
        } else {
            //redirect user to login page because username or password is false
            res.render("login", {
                status: "fail"
            });
        }
    });
});

// game route endpoint
app.get("/game", function (req, res) {
    // conditional logic if user has logged in or not
    if (loginStatus === 1) {
        // forward user if the user has logged in
        res.render("game", {
            playerName: playerNameLogin
        });
    } else {
        // if user hasn't logged in redirect user to login-first page
        res.render("error", {
            headTitle: "Not Logged In",
            title: "You Are Not Logged In",
            subtitle: "Go To Login Page",
            location: "/login"
        });
    }
});

// api link endpoint
app.get("/api/login", function (req, res) {
    res.status(200).json(logins)
});

// end point if server has an internal error
app.use((error, req, res, next) => {
    res.status(500).render("error", {
        headTitle: "Internal Server Error",
        title: "Internal Server Error",
        subtitle: "Go to Main Page",
        location: "/"
    })
    next()
});

// end point if server has dont have the requested end point
app.use((req, res, next) => {
    res.status(404).render("error", {
        headTitle: "Not Found!",
        title: "404 Not Found",
        subtitle: "Go To Main Page",
        location: "/"
    });
    next()
});

// set server to listen to localhost:3000 
app.listen(3000, function () {
    console.log("server started at port 3000");
});