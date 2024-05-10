let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById('addTodoButton');
let saveButtonElement = document.getElementById('saveButton');

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem('todoList');
    let parsedTodoList = JSON.parse(stringifiedTodoList);

    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }

}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.count;


saveButtonElement.onclick = function() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

addTodoButton.onclick = function() {
    onAddTodo();
}

function onDeleteTodo(todoid) {
    let todoElement = document.getElementById(todoid);
    todoItemsContainer.removeChild(todoElement);
    let deleteId = todoList.findIndex(function(eachTodo) {
        let eachItemId = "todo" + eachTodo.uniqueNo;
        if (eachItemId === todoid) {
            return true;
        } else {
            return false;
        }

    });
    todoList.splice(deleteId, 1);
}

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkBoxElement = document.getElementById(checkboxId);
    console.log(checkBoxElement.checked);

    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function(eachtodo) {
        let eachtodoIndex = "todo" + eachtodo.uniqueNo;
        if (eachtodoIndex === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoObjectIndex];

    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };
    todoElement.appendChild(inputElement);
    

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);


    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.id = labelId;
    labelElement.textContent = todo.text;
  
    if (todo.isChecked === true) {
        labelElement.classList.add('checked');
    }

    labelContainer.appendChild(labelElement);
    
    let labelDescElement = document.createElement("label");
    labelDescElement.textContent = "Description: " + todo.desc; 
    labelDescElement.classList.add("Description-label");// Set the due date text
    labelContainer.appendChild(labelDescElement);

    
    let labelDateElement = document.createElement("label");
    labelDateElement.textContent = "DueDate: " + todo.date;
    labelDateElement.classList.add("duedate-label");
    labelContainer.appendChild(labelDateElement);
    

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };
    deleteIconContainer.appendChild(deleteIcon);
}


function onAddTodo() {
    let userInputElement = document.getElementById('todoUserInput');
    let userInputValue = userInputElement.value;
    
    let userDescElement = document.getElementById('todoDescInput');
    let userDescValue = userDescElement.value;
    
    let dueDateElement = document.getElementById('dueDate');
    let dueDateValue = dueDateElement.value;
    
    if (userInputValue === "") {
        alert("Enter valid input");
        return;
    }

    todosCount = todosCount + 1;

    let newTodo = {
        text: userInputValue,
        desc:userDescValue,
        date:dueDateValue,
        uniqueNo: todosCount,
        isChecked: false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}