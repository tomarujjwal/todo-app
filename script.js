// Reference
var todoInput = document.querySelector(".todo-input");
var btn = document.querySelector(".todo-button");
var todoList = document.querySelector(".todo-list");
var clearAllBtn = document.querySelector(".clearAllButton");

// Event Handlers
btn.onclick = create;
todoList.onclick = performAction;
clearAllBtn.onclick = clearAll;

// function for ClearAll button display
function checkClearCondition() {
    if (localStorage.length > 0) {
    clearAllBtn.style.display="block";
    }
    if (localStorage.length == 0) {
        clearAllBtn.style.display="none";
    }
}

var data;
// Functions
function create(e) {
e.preventDefault();
data = todoInput.value;
data = data.trim();
if (data != "") {

    //unique key creation 
    var uniqueKey=Date.now();

    // storing data in localStorage 
    localStorage.setItem(uniqueKey, data);

    var newDiv = document.createElement("div");
    newDiv.classList.add("todo");
    // assigning uniqueKey id to div
    newDiv.setAttribute("id", `${uniqueKey}`);

    var newLi = document.createElement("li");
    newLi.classList.add("todo-item");
    newLi.innerText = data;
    newDiv.appendChild(newLi);

    var cmpltBtn = document.createElement("button");
    cmpltBtn.classList.add("cmpltBtn");
    cmpltBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
    newDiv.appendChild(cmpltBtn);

    var deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    newDiv.appendChild(deleteBtn);

    todoList.appendChild(newDiv);
    todoInput.value = "";

    checkClearCondition();
}
}

function performAction(e) {
var item = e.target;

if (item.classList[0] == "cmpltBtn") {
    var parent = item.parentElement;
    parent.classList.toggle("todo-done");
}
if (item.classList[0] == "deleteBtn") {            
    var parent = item.parentElement;
    localStorage.removeItem(parent.id);            
    parent.remove();
}                            
checkClearCondition();
}

function fetching() {
checkClearCondition();
// fetch data from localStorage 
const itemzz = { ...localStorage };

var ArrayOfEntries = Object.entries(itemzz);

ArrayOfEntries.forEach((key) => {
    var newDiv = document.createElement("div");

    newDiv.classList.add("todo");
    // assigning uniqueKey id to div
    newDiv.setAttribute("id", `${key[0]}`);

    var newLi = document.createElement("li");
    newLi.classList.add("todo-item");
    newLi.innerText = `${key[1]}`;
    newDiv.appendChild(newLi);

    var cmpltBtn = document.createElement("button");
    cmpltBtn.classList.add("cmpltBtn");
    cmpltBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
    newDiv.appendChild(cmpltBtn);

    var deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    newDiv.appendChild(deleteBtn);

    todoList.appendChild(newDiv);
    todoInput.value = "";
})
}

function clearAll() {
    todoList.innerHTML='';
    localStorage.clear();
    clearAllBtn.style.display="none";
}


