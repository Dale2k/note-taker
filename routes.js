const fs = require("fs");
const path = require("path");
// var express = require("express");
// var app = express();

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

        //  save note with specific id
        app.get("/api/notes/:id", function (req, res) {
            notes(req.params.id);
            res.json(notes);
        });


        // delete note with specific id
        app.delete("/api/notes/:id", function (req, res) {
            notes(req.params.id);
            updatedb();
            console.log("Deleted note " + req.params.id);
        });





        // notes route
        app.get("/notes", function (req, res) {
            res.sendFile(path.join(__dirname, "./public/notes.html"));
        });

        // * route
        app.get("*", function (req, res) {
            res.sendFile(path.join(__dirname, "./public/index.html"));
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


// * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

// app.get('/user/:uid/photos/:file', function (req, res) {
//     var uid = req.params.uid
//     var file = req.params.file

//     req.user.mayViewFilesFrom(uid, function (yes) {
//       if (yes) {
//         res.sendFile('/uploads/' + uid + '/' + file)
//       } else {
//         res.status(403).send("Sorry! You can't see that.")
//       }
//     })
//   })


// // GET /user/tj
// console.dir(req.params.name)
// // => 'tj'

// GET /file/javascripts/jquery.js
// console.dir(req.params[0])
// => 'javascripts/jquery.js'