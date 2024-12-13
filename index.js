/* Follow the instructions found in the description to complete the JavaScript functionality.*/

let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    console.log(stringifiedTodoList);
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;
console.log(todoList);
console.log("HI");
saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};
let userInputElement = document.getElementById("todoUserInput");
//let userInputValue = userInputElement.value;
function onAddTodo(k=null){
        //let userInputElement = document.getElementById("todoUserInput");
        //let userInputValue = userInputElement.value;
        console.log(event.key);
        if (event.key !== "Enter" & k !== "Enter"){
            return
        }
        let userInputValue = userInputElement.value;
        if (userInputValue === "") {
            alert("Enter Valid Text");
            return;
        }
        //let todosCount = todoList.length;
        todosCount = todosCount + 1;
        console.log(todosCount);
        
        let newTodo = {
            text: userInputValue,
            uniqueNo: todosCount,
            isChecked: false
        };
        console.log(newTodo);
        todoList.push(newTodo);
        createAndAppendTodo(newTodo);
        userInputElement.value = "";
};
userInputElement.addEventListener("keydown", onAddTodo);

addTodoButton.onclick = function() {
    onAddTodo("Enter");
};

function onTodoStatusChange(checkboxId, labelId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked-label");
    let parentEl = labelElement.parentElement;
    let grandParentEl = parentEl.parentElement;
    //grandParentEl.classList.toggle("checked");
    parentEl.classList.toggle("checked-li");
    let indexOfObj = todoList.findIndex(function(eachItem) {
        let eachItemId = "checkbox" + eachItem.uniqueNo;
        if (eachItemId === checkboxId) {
            return true
        } else {
            return false
        }
    });
    if (checkboxElement.checked === true) {
        todoList[indexOfObj].isChecked = true;
    } else {
        todoList[indexOfObj].isChecked = false;
    }
    console.log(todoList);

}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    todoList.splice(deleteElementIndex, 1);
}

function createAndAppendTodo(todo) {
    console.log(todo);
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    console.log("ChekBID:"+checkboxId);
    console.log("LabelkBID:"+labelId);
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;

    inputElement.onclick = function() {
        console.log("ChekBID1:"+checkboxId);
        console.log("LabelkBID1:"+labelId);
        onTodoStatusChange(checkboxId, labelId);
    };

    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked-label");
        labelContainer.classList.add("checked-li");
    //parentEl.classList.toggle("checked-li");
    }
    labelContainer.appendChild(labelElement);

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

for (let todo of todoList) {
    createAndAppendTodo(todo);
}