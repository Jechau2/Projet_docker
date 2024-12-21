var taskList = document.getElementById("taskList");
async function addTask() {
    const taskInput = document.getElementById("taskInput");
    const descriptionInput = document.getElementById("Description");
    const dateInput = document.getElementById("Date");

    const title = taskInput.value;
    const description = descriptionInput.value;
    const deadline = dateInput.value;

    if (!title || !description || !deadline) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    const newTask = { title, description, deadline };

    try {
    
        const response = await fetch("http://localhost:3001/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        });

        if (response.ok) {
            alert("Tâche ajoutée avec succès !");
            fetchTasks(); 
        } else {
            alert("Erreur lors de l'ajout de la tâche !");
        }
    } catch (error) {
        console.error("Erreur :", error);
        alert("Erreur de connexion au serveur !");
    }

    taskInput.value = "";
    descriptionInput.value = "";
    dateInput.value = "";
}

async function fetchTasks() {
    try {
        const response = await fetch("http://localhost:3001/tasks");

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des tâches !");
        }

        const tasks = await response.json();

        const taskList = document.getElementById("taskList");
        taskList.innerHTML = ""; 

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${task.title}</strong> - ${task.description} <em>(Pour le : ${task.deadline})</em>
            `;

            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = '<ion-icon name="trash-outline" class="delete"></ion-icon>';
            deleteButton.onclick = () => deleteTask(task.id);

            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error("Erreur :", error);
        alert("Erreur lors de la récupération des tâches !");
    }
}

document.addEventListener("DOMContentLoaded", fetchTasks);

async function deleteTask(taskId) {
    try {
        const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            alert("Tâche supprimée avec succès !");
            fetchTasks(); // Actualiser la liste des tâches
        } else {
            alert("Erreur lors de la suppression de la tâche !");
        }
    } catch (error) {
        console.error("Erreur :", error);
        alert("Erreur de connexion au serveur !");
    }
}

