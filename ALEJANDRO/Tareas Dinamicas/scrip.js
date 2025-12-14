  const colors = ['#ADD8E6', '#FFFACD', '#90EE90', '#FFB6C1', '#E6E6FA', '#F0E68C'];
        let colorIndex = 0;

        function addTask() {
            const taskInput = document.getElementById('taskInput');
            const statusSelect = document.getElementById('statusSelect');
            const tasksContainer = document.getElementById('tasksContainer');
            
            const taskName = taskInput.value.trim();
            
            if (taskName === '') {
                alert('Por favor ingresa un nombre para la tarea');
                return;
            }
            
            const newTask = document.createElement('button');
            newTask.className = 'task-btn';
            newTask.style.backgroundColor = colors[colorIndex % colors.length];
            colorIndex++;
            
            newTask.textContent = taskName;
            
            if (statusSelect.value === 'finalizado') {
                newTask.classList.add('completed');
            }
            
            tasksContainer.appendChild(newTask);
            
            taskInput.value = '';
            statusSelect.value = 'pendiente';
        }

        document.getElementById('taskInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTask();
            }
        });