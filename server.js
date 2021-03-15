const express = require('express');
const app = express();
const request = require("request")
const logins = require("./json/playerName.json")
const router = express.Router()
app.use(router);
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
   res.render("index");
});

app.get("/login", function(req, res){
    res.render("login");
})

app.post("/login", function(req, res){
    let playerNameLogin = req.body.playerName;
    let playerPassword = req.body.password;
    let loginURL = "http://localhost:3000/api/login";
    request(loginURL, function(error, response, body){
        let loginDB = JSON.parse(body);
        if (playerNameLogin === loginDB.playerName && playerPassword === loginDB.password){
            res.redirect("/game")
        } else {
            res.redirect("/failed");
        }
    });
});

app.get("/game", function(req, res){
    let loginURL = "http://localhost:3000/api/login";
    request(loginURL, function (error, response, body){
        let loginDB = JSON.parse(body);
        res.render("game", {playerName: loginDB.playerName});
        return loginDB;
    })
});

app.get("/api/login", function(req, res){
    res.status(200).json(logins)
});

app.get("/failed", function (req, res) {  
    res.render("fail-login");
});

app.use((req, res, next)=>{
    res.status(404).render("notfound");
});

app.listen(3000, function(){
    console.log("server started at port 3000");
});