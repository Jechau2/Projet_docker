const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const server = express();

const db = mysql.createPool({
    host: "db",   
    user: "user",      
    password: "password",
    database: "taskdb",
});

server.use(express.json());
server.use(cors());

server.post("/tasks", (req, res) => {
    const { title, description, deadline } = req.body;

    const sql = "INSERT INTO tasks (title, description, deadline) VALUES (?, ?, ?)";
    db.query(sql, [title, description, deadline], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Erreur lors de l'ajout de la tâche");
        } else {
            res.status(201).send({
                message: "Tâche ajoutée avec succès",
                taskId: result.insertId, 
            });
        }
    });
});


server.get("/tasks", (req, res) => {
    const sql = "SELECT * FROM tasks";
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Erreur lors de la récupération des tâches");
        } else {
            res.status(200).json(result);
        }
    });
});


server.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { title, description, deadline } = req.body;

    const sql = "UPDATE tasks SET title = ?, description = ?, deadline = ? WHERE id = ?";
    db.query(sql, [title, description, deadline, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Erreur lors de la mise à jour de la tâche");
        } else {
            res.status(200).send("Tâche mise à jour avec succès");
        }
    });
});


server.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM tasks WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Erreur lors de la suppression de la tâche");
        } else {
            res.status(200).send("Tâche supprimée avec succès");
        }
    });
});


server.listen(3001, () => {
    console.log("Serveur en cours d'exécution sur le port 3001");
});
