var taskList = document.getElementById("taskList");

function addTask() {
  var taskInput = document.getElementById("taskInput");
  var descriptionInput = document.getElementById("Description");
  var dateInput = document.getElementById("Date");

  var taskText = taskInput.value;
  var descriptionText = descriptionInput.value;
  var dateText = dateInput.value;

  if (taskText === "" || descriptionText === "" || dateText === "") {
    alert("Veuillez remplir tous les champs !");
    return; // Ne rien faire si un champ est vide
  }

  var li = document.createElement("li");
  li.innerHTML = `
    <strong>${taskText}</strong> - ${descriptionText} <em>(Pour le : ${dateText})</em>
  `;

  var editButton = document.createElement("button");
  editButton.innerHTML = '<ion-icon name="pencil-outline" class="modify"></ion-icon>';
  editButton.onclick = function() {
    editTask(li);
  };

  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<ion-icon name="trash-outline" class="delete"></ion-icon>';
  deleteButton.onclick = function() {
    deleteTask(li);
  };

  li.appendChild(editButton);
  li.appendChild(deleteButton);
  taskList.appendChild(li);

  // Réinitialiser les champs après ajout
  taskInput.value = "";
  descriptionInput.value = "";
  dateInput.value = "";
}

function editTask(task) {
  var taskTextElement = task.querySelector("strong");
  var descriptionElement = task.childNodes[2];
  var dateElement = task.querySelector("em");

  var taskText = taskTextElement.textContent;
  var descriptionText = descriptionElement.textContent.split(" - ")[1].split(" (Pour le :")[0].trim();
  var dateText = dateElement.textContent.replace("(Pour le : ", "").replace(")", "").trim();

  var newTaskText = prompt("Modifier la tâche :", taskText);
  var newDescription = prompt("Modifier la description :", descriptionText);
  var newDate = prompt("Modifier la date :", dateText);

  if (newTaskText !== null && newTaskText !== "") {
    taskTextElement.textContent = newTaskText;
  }
  if (newDescription !== null && newDescription !== "") {
    descriptionElement.textContent = ` - ${newDescription} `;
  }
  if (newDate !== null && newDate !== "") {
    dateElement.textContent = `(Pour le : ${newDate})`;
  }
}

function deleteTask(task) {
  taskList.removeChild(task);
}
