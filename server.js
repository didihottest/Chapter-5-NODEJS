const express = require('express');
const app = express();
app.use(express.static(__dirname));

app.get("/", function(req, res) {
   res.sendFile(__dirname + "/index.html");
});

app.get("/game", function(req, res){
    res.sendFile(__dirname + "/game.html");
});

app.listen(3000, function(){
    console.log("server started at port 3000");
});