const { createApp } = Vue;

createApp({
    data() {
        return {
            newTask: {
                name: '',
                date: '',
                time: '',
                priority: 'medium',
                stage: 'pre-shutdown-admin',
                notify: false,
                completed: false
            },
            tasks: [],
            stageTitles: {
                'pre-shutdown-admin': 'Pre-Shutdown Administrative Planning',
                'pre-shutdown-safety': 'Pre-Shutdown Safety Planning',
                'shutdown-execution': 'Shutdown Execution',
                'post-shutdown-review': 'Post-Shutdown Review'
            }
        };
    },
    computed: {
        tasksByStage() {
            const stages = {
                'pre-shutdown-admin': [],
                'pre-shutdown-safety': [],
                'shutdown-execution': [],
                'post-shutdown-review': []
            };
            this.tasks.forEach(task => {
                if (stages[task.stage]) {
                    stages[task.stage].push(task);
                }
            });
            return stages;
        },
        criticalTasks() {
            return this.tasks.filter(task => 
                task.priority === 'high' && !task.completed
            );
        }
    },
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleDateString();
        },
        async fetchTasks() {
            try {
                const response = await fetch(window.config.endpoints.tasks);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                this.tasks = Object.entries(data).flatMap(([stage, tasks]) => 
                    tasks.map(task => ({...task, stage, id: crypto.randomUUID()}))
                );
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        },
        addTask() {
            const newTaskCopy = { 
                ...this.newTask,
                id: crypto.randomUUID(),
                created_at: new Date().toISOString()
            };
            this.tasks.push(newTaskCopy);
            
            if(newTaskCopy.notify) {
                this.notifyLead(newTaskCopy);
            }

            // Reset form
            this.newTask = {
                name: '',
                date: '',
                time: '',
                priority: 'medium',
                stage: 'pre-shutdown-admin',
                notify: false,
                completed: false
            };
        },
        async notifyLead(task) {
            try {
                const response = await fetch(window.config.endpoints.notify, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        task_id: task.id,
                        task_name: task.name,
                        priority: task.priority
                    })
                });
                
                if (!response.ok) throw new Error('Notification failed');
                
                // Show success notification
                alert(`Notification sent for task: ${task.name}`);
            } catch (error) {
                console.error('Error sending notification:', error);
                alert('Failed to send notification. Please try again.');
            }
        },
        // Add to existing methods
        getStageStatus(stage) {
            const tasks = this.tasksByStage[stage];
            if (!tasks || tasks.length === 0) return 'pending';
            
            const completedCount = tasks.filter(t => t.completed).length;
            if (completedCount === tasks.length) return 'completed';
            if (completedCount > 0) return 'in-progress';
            return 'pending';
        },
        getStageProgress(stage) {
            const tasks = this.tasksByStage[stage];
            if (!tasks || tasks.length === 0) return '0/0 tasks';
            
            const completedCount = tasks.filter(t => t.completed).length;
            return `${completedCount}/${tasks.length} tasks`;
        },
    
        getProgressPercentage(stage) {
            const tasks = this.tasksByStage[stage];
            if (!tasks || tasks.length === 0) return 0;
            
            const completedCount = tasks.filter(t => t.completed).length;
            return (completedCount / tasks.length) * 100;
        }
    },
    mounted() {
        this.fetchTasks();
        
        // Refresh tasks every 5 minutes
        setInterval(this.fetchTasks, 300000);
    }
}).mount('#app');