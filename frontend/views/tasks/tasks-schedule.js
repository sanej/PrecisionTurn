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
            tasks: [], // Ensure tasks is initialized as an empty array
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
        }
    },
    methods: {
        fetchTasks() {
            fetch(window.config.endpoints.tasks)
                .then(response => {
                    console.log('Response:', response);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Flatten the tasks by stages into a single array of tasks
                    this.tasks = Object.entries(data).flatMap(([stage, tasks]) => 
                        tasks.map(task => ({...task, stage}))
                    );
                })
                .catch(error => console.error('Error fetching tasks:', error));
        },
        addTask() {
            const newTaskCopy = { ...this.newTask };
            this.tasks.push(newTaskCopy);
    
            // Clear form fields
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
        notifyLead(task) {
            console.log(`Notifying site lead about task: ${task.name}`);
            // Placeholder for SMS notification logic
        },
    },
    mounted() {
        this.fetchTasks(); // Fetch tasks when the component is mounted
    }
}).mount('#app');