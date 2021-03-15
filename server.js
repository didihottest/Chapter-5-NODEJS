const express = require('express');
const app = express();
const fs = require("fs")
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
    let playerName = {playerName:req.body.playerName};
    playerNameJSON = JSON.stringify(playerName);
    fs.writeFile("json/playerName.json", playerNameJSON, (err)=>err)
    res.redirect('/game');
})

app.get("/game", function(req, res){
    fs.readFile('json/playerName.json', (err, data) => {
        if (err) throw err;
        let playerLoggedin = JSON.parse((data.toString()))
        res.render("game", {playerName:playerLoggedin.playerName});
      });
});

app.listen(3000, function(){
    console.log("server started at port 3000");
});