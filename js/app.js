const todoForm = document.querySelector('#todoForm');
const todoList = document.querySelector('#todoList');
const todoInput = document.querySelector('#todoInput');

todoForm.addEventListener('submit', addTask);
todoList.addEventListener('click', removeTask);

initTasks();

// clear();

function clear() {
    localStorage.clear();
}

function addTask(event) {

    if(todoInput.value === '') {
        alert('Please enter something to input !');
        return;
    }

    let currentTasks = getCurrentTasksFromLS();
    addTaskToHTML(todoInput.value);
    currentTasks.push(todoInput.value);
    todoInput.value = '';
    localStorage.setItem('tasks', JSON.stringify(currentTasks));

    event.preventDefault();
}

function removeTask(event) {

    if(event.target.className === 'remove-button') {
        if(!confirm('Are you sure about that ?'))
        return;

        let currentTasks = getCurrentTasksFromLS();
        let task = event.target.parentElement.parentElement.firstChild.innerText;
        console.log(task);

        let index = currentTasks.indexOf(task);
        console.log(index);

        if(index > -1)
            currentTasks.splice(index, 1);

        console.log(currentTasks);

        localStorage.setItem('tasks', JSON.stringify(currentTasks));

        event.target.parentElement.parentElement.remove();
    }
}

function initTasks() {
    let currentTasks = getCurrentTasksFromLS();

    currentTasks.forEach(function(item) {
        addTaskToHTML(item);
    });
}

function getCurrentTasksFromLS() {

    let tasks;
    if(localStorage.getItem('tasks') === null)
        return tasks = [];

    tasks = JSON.parse(localStorage.getItem('tasks'));
    return tasks;

}

function addTaskToHTML(text) {

    let tr = document.createElement('tr');
    let td_1 = document.createElement('td');
    let td_2 = document.createElement('td');
    let btn = document.createElement('button');

    td_1.className = "cell-1";
    td_2.className = "cell-2";

    btn.innerText = 'Remove';
    btn.setAttribute('class', 'remove-button');

    td_1.innerText = text;
    td_2.appendChild(btn);
    
    tr.appendChild(td_1);
    tr.appendChild(td_2);

    todoList.appendChild(tr);

}