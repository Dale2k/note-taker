const fs = require("fs");
const path = require("path");

module.exports = function (app) {

    fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) throw err;

        var notes = JSON.parse(data);

        // api/notes get 
        app.get("/api/notes", function (req, res) {
            res.json(notes);
        });

        // api/notes post
        app.post("/api/notes", function (req, res) {
            let newNote = req.body;
            notes.push(newNote);
            updatedb();
            return console.log("Note added: " + newNote.title);
        });

        // // delete note with specific id
        // app.delete("/api/notes", function(req,res) {
        //     notes();
        //     updatedb();
        //     console.log("Deleted note");
        // });





        // notes route
        app.get("/notes", function (req, res) {
            res.sendFile(path.join(__dirname, "..public/notes.html"));
        });

        // * route
        app.get("*", function (res, req) {
            res.sendFile(path.join(__dirname, "..public/index.html"));
        });

        //updatedb
        function updatedb() {
            fs.writeFile("db/db.json", JSON.stringify(notes), function (err) {
                if (err) throw err;
                return true;
            });
        }
    });
};