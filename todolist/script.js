// get function
function getData() {
  fetch("http://localhost:3000/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      for (const item of data) {
        console.log(item);
        // create the task list item
        const newTaskFromGet = document.createElement("li");
        // newTaskFromGet.contentEditable = true;
        newTaskFromGet.innerHTML = item.description;

        // append the task to the task list
        document.getElementById("task-list-ol").appendChild(newTaskFromGet);

        //create trash button
        const trashButton = document.createElement("button");
        const trashIcon = document.createElement("i");
        trashIcon.className = "fa-solid fa-trash";
        trashButton.appendChild(trashIcon);
        newTaskFromGet.appendChild(trashButton);

        // add click event listener to trashIcon
        trashIcon.addEventListener("click", function () {
          newTaskFromGet.remove();
        });

        // add click event to Button
        trashButton.addEventListener("click", function (e) {
          let description = newTaskFromGet.textContent;
          setTimeout(function () {
            deleteListItemsFromDatabase(e, description);
          }, 500);
        });

        // add checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        newTaskFromGet.appendChild(checkbox);

        // add click event listener on checkbox
        checkbox.addEventListener("click", function (event) {
          if (event.target.checked) {
            newTaskFromGet.style.textDecoration = "line-through";
          } else {
            newTaskFromGet.style.textDecoration = "none";
          }
        });
        // content editable
        newTaskFromGet.contentEditable = true;
      }
      function deleteListItemsFromDatabase(e, description) {
        console.table(data);
        let filteredData = data.filter(
          (item) => item.description === description
        );
        console.table(filteredData);
        let id = data.find((item) => item.description === description)._id;

        // Get the button that was clicked
        let button = e.target;
        // Get the list item that the button is inside of
        let listItem = button.parentNode;

        // Send a DELETE request to the server with the id as a parameter
        fetch(`http://localhost:3000/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            // Remove the list item from the page
            listItem.remove();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })

    .catch((error) => console.error(error));
}

getData();

// post function

// import { postData } from "./api-client";

// keyup input main button

document
  .getElementById("input-todo-field")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      document.getElementById("add-button").click();
    }
  });

// main/add button

function addTasksMain() {
  document.getElementById("add-button").addEventListener("click", function () {
    //get the input value
    const inputTodo = document.getElementById("input-todo-field").value;

    let data = {
      description: inputTodo,
      done: false,
    };

    postData("http://localhost:3000/", data);

    //create the task list item
    const newTask = document.createElement("li");
    newTask.innerHTML = inputTodo;
    newTask.contentEditable = true;

    //create the delete button
    const deleteButton = document.createElement("button");
    deleteButton.id = "delete-button";
    newTask.appendChild(deleteButton);

    //create the trash icon
    const trashIcon = document.createElement("i");
    trashIcon.className = "fa-solid fa-trash";
    deleteButton.appendChild(trashIcon);

    //append the task to the task list
    document.getElementById("task-list-ol").appendChild(newTask);
    document.getElementById("input-todo-field").value = "";

    //create the checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    newTask.appendChild(checkbox);

    //Click event trash icon
    trashIcon.addEventListener("click", function (event) {
      const listItem = event.target.parentNode.parentNode;
      const listForRemove = document.getElementById("task-list-ol");

      listForRemove.removeChild(listItem);
    });

    // add click event listener on checkbox
    checkbox.addEventListener("click", function (event) {
      if (event.target.checked) {
        newTask.style.textDecoration = "line-through";
      } else {
        newTask.style.textDecoration = "none";
      }
    });

    // deleting
    const list = document.getElementById("task-list-ol");

    list.addEventListener("click", function (event) {
      if (event.target.tagName === "BUTTON") {
        const listItem = event.target.parentNode;
        list.removeChild(listItem);
      }
    });

    // // dele from database part
    location.reload();
  });
}

addTasksMain();
