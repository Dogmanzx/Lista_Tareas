// script.js
const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const taskList = document.getElementById('taskList');

function addTask() {
    const taskText = taskInput.value.trim();
    const dueDate = taskDate.value;
    if (taskText === '' || dueDate === '') return;

    const li = document.createElement('li');
    li.textContent = `${taskText} (Fecha límite: ${dueDate})`;
    li.classList.add('pending');
    li.setAttribute('data-due-date', dueDate);

    li.onclick = function() {
        if (li.classList.contains('pending')) {
            li.classList.remove('pending');
            li.classList.add('completed');
        } else if (li.classList.contains('completed')) {
            li.classList.remove('completed');
            li.classList.add('pending');
        }
    };

    taskList.appendChild(li);
    taskInput.value = '';
    taskDate.value = '';

    checkOverdueTasks();
}

function checkOverdueTasks() {
    const currentDate = new Date().toISOString().split('T')[0];
    const lis = taskList.getElementsByTagName('li');
    Array.from(lis).forEach(li => {
        const dueDate = li.getAttribute('data-due-date');
        if (dueDate < currentDate && !li.classList.contains('completed')) {
            li.classList.remove('pending');
            li.classList.add('overdue');
        }
    });
}

// Añadir evento para escuchar "Enter" en los campos de entrada
taskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

taskDate.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Verificar tareas vencidas al cargar la página
document.addEventListener('DOMContentLoaded', checkOverdueTasks);
