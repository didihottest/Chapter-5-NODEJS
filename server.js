// use express module
const express = require('express');
const app = express();
// use request module
const request = require("request")
// import json file to server
const logins = require("./json/playerName.json")
// router for default route
const router = express.Router()
app.use(router);
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
// set view engine to ejs
app.set("view engine", "ejs");
// index route
app.get("/", function(req, res) {
   res.render("index");
});
// login route
app.get("/login", function(req, res){
    res.render("login");
})

// determine if player already logged in or not
let loginStatus = 0;
// put player name in global variable so it can be used by another route
let playerNameLogin;

app.post("/login", function(req, res){
    // assign player name and password from login page
    playerNameLogin = req.body.playerName;
    let playerPassword = req.body.password;
    // api url
    let loginURL = "http://localhost:3000/api/login";
    // request module to get json file from api url
    request(loginURL, function(error, response, body){
        loginDB = JSON.parse(body);
        if (playerNameLogin === loginDB.playerName && playerPassword === loginDB.password){
            //login status set to 1 which mean user is already logged in
            loginStatus = 1;
            //redirect user to game
            res.redirect("/game")
        } else {
            //redirect user to failed to login page because username or password is false
            res.redirect("/failed");
        }
    });
});

// game route
app.get("/game", function(req, res){
    // conditional logic if user has logged in or not
    if (loginStatus === 1) {
        // forward user if the user has logged in
        res.render("game", {playerName: playerNameLogin});
    } else {
        // if user hasn't logged in redirect user to login-first page
        res.render("login-first");
    }
});

// api link endpoint
app.get("/api/login", function(req, res){
    res.status(200).json(logins)
});

// endpoint route if username or password is false
app.get("/failed", function (req, res) {  
    res.render("fail-login");
});

// end point if user go to invalid route
app.use((req, res, next)=>{
    res.status(404).render("notfound");
});


// set server to listen to localhost:3000 
app.listen(3000, function(){
    console.log("server started at port 3000");
});