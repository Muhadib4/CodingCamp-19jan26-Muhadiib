// Mengambil elemen-elemen HTML yang dibutuhkan
const todoInput = document.getElementById('todoInput');
const dateInput = document.getElementById('dateInput');
const addBtn = document.getElementById('addBtn');
const todoTableBody = document.getElementById('todoTableBody');
const noTaskMsg = document.getElementById('noTaskMsg');
const filterSelect = document.getElementById('filterSelect');
const deleteAllBtn = document.getElementById('deleteAllBtn');

let todos = [];

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
    renderTodos(); // Perbarui tampilan
    todoInput.value = ''; // Kosongkan input setelah tambah
    dateInput.value = '';
}

// Fungsi untuk menampilkan data dari array ke dalam tabel HTML
function renderTodos(filter = 'all') {
    todoTableBody.innerHTML = ''; // Kosongkan tabel dulu

    // Saring data berdasarkan pilihan filter
    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'uncompleted') return !todo.completed;
        return true; // Untuk 'all'
    });

    // Cek jika data kosong, tampilkan pesan "No task found"
    if (filteredTodos.length === 0) {
        noTaskMsg.style.display = 'block';
    } else {
        noTaskMsg.style.display = 'none';
    }

    // Loop data yang sudah disaring untuk dibuatkan baris tabel (TR)
    filteredTodos.forEach(todo => {
        const tr = document.createElement('tr');
        
        // Cari baris ini di dalam loop filteredTodos.forEach:
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

// Fungsi untuk mengubah status selesai/belum
function toggleComplete(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    renderTodos(filterSelect.value);
}


// Fungsi untuk menghapus satu tugas dengan konfirmasi
function deleteTodo(id) {
    const yakin = confirm("Apakah kamu yakin ingin meng-delete task ini?");

    if (yakin) {
        todos = todos.filter(todo => todo.id !== id);
        renderTodos(filterSelect.value);
    } 
}

// Fungsi untuk menghapus semua tugas
deleteAllBtn.addEventListener('click', () => {
    if (confirm("Hapus semua tugas?")) {
        todos = [];
        renderTodos();
    }
});

// Event listener untuk tombol tambah
addBtn.addEventListener('click', addTodo);

// Event listener untuk filter (Poin instruksi: Filter)
filterSelect.addEventListener('change', (e) => {
    renderTodos(e.target.value);
});

// Jalankan render pertama kali saat web dibuka
renderTodos();