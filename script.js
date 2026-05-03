class TaskManager {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.currentSort = 'deadline-asc';
        this.init();
    }

    init() {
        this.loadTasks();
        this.bindEvents();
        this.render();
        this.updateStats();
        this.setMinDate();
    }

    setMinDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('taskDeadline').setAttribute('min', today);
    }

    bindEvents() {
        // Form submission
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setFilter(btn.dataset.filter);
            });
        });

        // Sort select
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            this.setSort(e.target.value);
        });
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    addTask() {
        const titleInput = document.getElementById('taskTitle');
        const deadlineInput = document.getElementById('taskDeadline');

        const title = titleInput.value.trim();
        const deadline = deadlineInput.value;

        if (!title || !deadline) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }

        const task = {
            id: this.generateId(),
            title,
            deadline,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(task);
        this.saveTasks();
        this.render();
        this.updateStats();

        // Reset form
        titleInput.value = '';
        deadlineInput.value = '';

        this.showNotification('Task added successfully!', 'success');
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
            this.updateStats();
        }
    }

    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveTasks();
            this.render();
            this.updateStats();
            this.showNotification('Task deleted successfully!', 'success');
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });

        this.render();
    }

    setSort(sort) {
        this.currentSort = sort;
        this.render();
    }

    getFilteredTasks() {
        let filtered = [...this.tasks];

        // Apply filter
        switch (this.currentFilter) {
            case 'pending':
                filtered = filtered.filter(t => !t.completed);
                break;
            case 'completed':
                filtered = filtered.filter(t => t.completed);
                break;
            case 'overdue':
                filtered = filtered.filter(t => this.isOverdue(t));
                break;
        }

        // Apply sort
        filtered.sort((a, b) => {
            switch (this.currentSort) {
                case 'deadline-asc':
                    return new Date(a.deadline) - new Date(b.deadline);
                case 'deadline-desc':
                    return new Date(b.deadline) - new Date(a.deadline);
                case 'title-asc':
                    return a.title.localeCompare(b.title);
                case 'title-desc':
                    return b.title.localeCompare(a.title);
                case 'date-added':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                default:
                    return 0;
            }
        });

        return filtered;
    }

    isOverdue(task) {
        if (task.completed) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const deadlineDate = new Date(task.deadline);
        return deadlineDate < today;
    }

    isDueSoon(task) {
        if (task.completed || this.isOverdue(task)) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const deadlineDate = new Date(task.deadline);
        const diffTime = deadlineDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 3 && diffDays >= 0;
    }

    formatDeadline(deadline) {
        const date = new Date(deadline);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const deadlineDate = new Date(date);
        deadlineDate.setHours(0, 0, 0, 0);
        
        const diffTime = deadlineDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        if (diffDays === -1) return 'Yesterday';
        if (diffDays > 0 && diffDays <= 7) return `In ${diffDays} days`;
        if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;

        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined 
        });
    }

    render() {
        const taskList = document.getElementById('taskList');
        const filteredTasks = this.getFilteredTasks();

        if (filteredTasks.length === 0) {
            taskList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-clipboard-list"></i>
                    <h3>No tasks found</h3>
                    <p>${this.currentFilter === 'all' ? 'Start by adding your first assignment above!' : `No ${this.currentFilter} tasks`}</p>
                </div>
            `;
            return;
        }

        taskList.innerHTML = filteredTasks.map(task => {
            const isOverdue = this.isOverdue(task);
            const isDueSoon = this.isDueSoon(task);
            const deadlineClass = isOverdue ? 'overdue' : isDueSoon ? 'due-soon' : '';
            const taskClass = task.completed ? 'completed' : isOverdue ? 'overdue' : '';

            return `
                <div class="task-item ${taskClass}" data-id="${task.id}" style="position: relative;">
                    <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="taskManager.toggleTask('${task.id}')">
                        ${task.completed ? '<i class="fas fa-check"></i>' : ''}
                    </div>
                    <div class="task-content">
                        <div class="task-title">${this.escapeHtml(task.title)}</div>
                        <div class="task-deadline ${deadlineClass}">
                            <i class="fas fa-calendar-alt"></i>
                            ${this.formatDeadline(task.deadline)}
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="task-btn delete" onclick="taskManager.deleteTask('${task.id}')" title="Delete task">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    updateStats() {
        const pending = this.tasks.filter(t => !t.completed && !this.isOverdue(t)).length;
        const completed = this.tasks.filter(t => t.completed).length;
        const overdue = this.tasks.filter(t => this.isOverdue(t)).length;

        document.getElementById('pendingCount').textContent = pending;
        document.getElementById('completedCount').textContent = completed;
        document.getElementById('overdueCount').textContent = overdue;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            ${message}
        `;

        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1',
            color: 'white',
            fontWeight: '500',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            zIndex: '9999',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease-out'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const saved = localStorage.getItem('tasks');
        if (saved) {
            try {
                this.tasks = JSON.parse(saved);
            } catch (e) {
                console.error('Error loading tasks:', e);
                this.tasks = [];
            }
        }
    }
}

// Initialize the app
let taskManager;
document.addEventListener('DOMContentLoaded', () => {
    taskManager = new TaskManager();
});

// Add some sample tasks for demonstration (optional)
if (!localStorage.getItem('tasks')) {
    const sampleTasks = [
        {
            id: 'sample1',
            title: 'Complete Math Assignment',
            deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 'sample2',
            title: 'Submit Physics Lab Report',
            deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 'sample3',
            title: 'Study for Chemistry Quiz',
            deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            completed: false,
            createdAt: new Date().toISOString()
        }
    ];
    
    localStorage.setItem('tasks', JSON.stringify(sampleTasks));
}
