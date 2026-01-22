const todoInput = document.getElementById('todoInput');
const dateInput = document.getElementById('dateInput');
const addBtn = document.getElementById('addBtn');
const todoTableBody = document.getElementById('todoTableBody');
const noTaskMsg = document.getElementById('noTaskMsg');
const filterSelect = document.getElementById('filterSelect');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const sounds = {
    click: new Audio('sounds/switch-sound.mp3'),
    confetti: new Audio('sounds/confetti-pop-sound-effect.mp3'),
    trash: new Audio('sounds/trash-sound.mp3')
};

let todos = [];

function confeti() {
    var audio = document.getElementById("confeti")
    audio.currentTime = 0;
    audio.play()
}

function addTodo() {
    sounds.click.currentTime = 0; 
    sounds.click.play().catch(e => console.log("Klik layar dulu agar suara aktif!"));

    const task = todoInput.value;
    const date = dateInput.value;

    if (task === '' || date === '') {
        alert("Harap isi tugas dan tanggalnya!");
        return;
    }

    const newTodo = {
        id: Date.now(),
        task: task,
        date: date,
        completed: false
    };

    todos.push(newTodo);
    renderTodos();
    
    fireConfetti(); 

    todoInput.value = '';
    dateInput.value = '';
}

function renderTodos(filter = 'all') {
    todoTableBody.innerHTML = '';

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'uncompleted') return !todo.completed;
        return true;
    });

    if (filteredTodos.length === 0) {
        noTaskMsg.style.display = 'block';
    } else {
        noTaskMsg.style.display = 'none';
    }

    filteredTodos.forEach(todo => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
        <td class="${todo.completed ? 'completed-text' : ''}">${todo.task}</td>
        <td>${todo.date}</td>

        <td class="${todo.completed ? 'status-completed' : 'status-uncompleted'}">
        ${todo.completed ? 'Completed' : 'Uncompleted'}
        </td>
    
        <td>
        <button class="btn-complete" onclick="toggleComplete(${todo.id})">✔</button>
        <button class="btn-delete" onclick="deleteTodo(${todo.id})">🗑</button>
        </td>
    `;
        todoTableBody.appendChild(tr);
    });
}

function toggleComplete(id) {
    
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    renderTodos(filterSelect.value);
    var audio = document.getElementById("completed")
    audio.play()
}

function deleteTodo(id) {
    const yakin = confirm("Apakah kamu yakin ingin meng-delete task ini?");

    if (yakin) {
        todos = todos.filter(todo => todo.id !== id);
        renderTodos(filterSelect.value);
    } 
    var audio = document.getElementById("uncompleted")
    audio.play()
}

deleteAllBtn.addEventListener('click', () => {
    if (confirm("Hapus semua tugas?")) {
        todos = [];
        renderTodos();
    }
    var audio = document.getElementById("uncompleted")
    audio.play()
});

addBtn.addEventListener('click', addTodo);

filterSelect.addEventListener('change', (e) => {
    renderTodos(e.target.value);
});

renderTodos();

function fireConfetti(isSuccess = true) {
    if(isSuccess) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
        });
    }
}

function addTodo() {
    const task = todoInput.value;
    const date = dateInput.value;

    if (task === '' || date === '') {
        alert("Harap isi tugas dan tanggalnya!");
        return;
    }

    const newTodo = {
        id: Date.now(),
        task: task,
        date: date,
        completed: false
    };

    todos.push(newTodo);
    renderTodos();
    
    fireConfetti(); 

    todoInput.value = '';
    dateInput.value = '';
}

function toggleComplete(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            if (!todo.completed) {
                fireConfetti(); 
            }
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    renderTodos(filterSelect.value);
}
