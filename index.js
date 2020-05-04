// implement your API here
const express = require("express");
const db = require("./data/db");

const server = express();

server.use(express.json());

//get users
server.get("/api/users", (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        console.log("error on GET /api/users", err);
        res
        .status(500)
        .json({ errorMessage: "error getting user list from database" });
    });
});
//!get users

//get specific user

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
db.findById(id)
    .then(user => {
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({
            errorMessage: "the user with the specified id was not found"
        });
        }
    })
    .catch(err => {
        console.log("error on GET /api/users/:id", err);
        res
        .status(500)
        .json({ errorMessage: "error getting specific user from database" });
    });
});

//! get specific user

//post user to database

server.post("/api/users", (req, res) => {
    const userData = req.body;

    if (!userData.name || !userData.bio) {
    res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    } else {
    db.insert(userData)
        .then(user => {
        res.status(201).json(user);
        })
        .catch(err => {
        console.log("error on POST /api/users", err);
        res
            .status(500)
            .json({ errorMessage: "error adding the user to the database" });
        });
    }
});

//!post user to database

//delete user from database

server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;

    db.remove(id)
    .then(removed => {
        if (removed) {
        res
            .status(200)
            .json({ successMessage: "the user was removed successfully" });
        } else {
            res.status(404).json({
                errorMessage: "the user with the specified id was not found"
            });
        }
    })
    .catch(err => {
    console.log("error on DELETE /api/users/:id", err);
    res
        .status(500)
        .json({ errorMessage: "error removing the specified user" });
    });
});

//!delete user from database

//edit user from database

server.put("/api/users/:id", (req, res) => {
    const userData = req.body;
    const id = req.params.id;

    if (id !== userData.id) {
    res
        .status(404)
        .json({ errorMessage: "The user with the specified ID does not exist." });
    } else if (!userData.name || !userData.bio) {
    res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    } else if (userData && userData.name && userData.id) {
    db.update(id, userData)
        .then(user => {
        res.status(200).json(userData);
        })
        .catch(err => {
        console.log("error on PUT /api/users/:id", err);
        res
            .status(500)
            .json({ errorMessage: "error adding the user to the database" });
        });
    }
});

//!edit user from database

const port = 8000;
server.listen(port, () => console.log("API is listening on port", port));