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

        function updateStats() {
            const total = todos.length;
            const completed = todos.filter(t => t.completed).length;
            const remaining = total - completed;
            
            const statsText = document.getElementById('statsText');
            if (total === 0) {
                statsText.innerText = "Belum ada tugas hari ini. Yuk, mulai!";
            } else {
                statsText.innerText = `Kamu punya ${total} tugas, ${completed} selesai, ${remaining} lagi semangat ya!`;
            }
        }

        function editTodo(id) {
            const todo = todos.find(t => t.id === id);
            if (!todo) return;

            const newTask = prompt("Ubah nama tugas:", todo.task);
            if (newTask === null || newTask.trim() === "") return;

            const newDate = prompt("Ubah tanggal (YYYY-MM-DD):", todo.date);
            if (newDate === null || newDate.trim() === "") return;

            todo.task = newTask;
            todo.date = newDate;
            
            renderTodos(filterSelect.value);
        }

        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isMinimal = document.body.classList.contains('dark-mode');
            themeToggle.innerHTML = isMinimal ? 
                `<span class="icon">🌈</span> Aurora` : 
                `<span class="icon">🌃</span> DarkMode`;
        });



        // cursor trail animation
        const coords = { x: 0, y: 0 };
        const circles = document.querySelectorAll(".circle");

        const colors = [
            "#EBFFE4", "#B3FFC0", "#41FFB3", "#00EEC2", "#00DBC9",
            "#00C9CB", "#00B7CA", "#00A6C8", "#0094C6", "#0081C6",
            "#006BCF", "#1E34FF", "#4600E4", "#5000B5", "#50008A",
            "#490064", "#3D0042", "#2D0026", "#18000D", "#000000",
        ];

        circles.forEach(function (circle, index) {
            circle.x = 0;
            circle.y = 0;
            circle.style.backgroundColor = colors[index % colors.length];
        });

        window.addEventListener("mousemove", function (e) {
            coords.x = e.clientX;
            coords.y = e.clientY;
        });

        function animateCircles() {
            let x = coords.x;
            let y = coords.y;

            circles.forEach(function (circle, index) {
                circle.style.left = x - 12 + "px";
                circle.style.top = y - 12 + "px";

                circle.style.scale = (circles.length - index) / circles.length;

                circle.x = x;
                circle.y = y;

                const nextCircle = circles[index + 1] || circles[0];
                x += (nextCircle.x - x) * 0.3;
                y += (nextCircle.y - y) * 0.3;
            });

            requestAnimationFrame(animateCircles);
        }

        animateCircles();