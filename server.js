// Require Dependencies
var express = require("express");
const path = require("path");
const fs = require("fs");

// Set up express App
var app = express();
const PORT = process.env.PORT || 3000;

// set up data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static files css
app.use(express.static(__dirname));

//require app file
require("./routes")(app);



//Setup listener
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
