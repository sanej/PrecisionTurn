// turnaround-copilot.js

document.addEventListener('DOMContentLoaded', function () {
    new Vue({
        el: '#app',
        data: {
            chatMessages: [
                { id: Date.now() + Math.random(), sender: "System", text: "Welcome to Turnaround Copilot. How can I assist you today?" }
            ],
            userInput: "",
            latestAlert: "" // Add this line to define the latestAlert property
        },
        methods: {
            async sendMessage() {
                // Trim the user input and return if it's empty
                const userQuestion = this.userInput.trim();
                if (userQuestion === '') return;

                // Add user's question to chat
                this.chatMessages.push({
                    id: Date.now() + Math.random(), // Ensure unique ID
                    sender: 'You',
                    text: this.escapeHtml(userQuestion),
                });

                // Clear input field
                this.userInput = '';

                // Handle specific hardcoded responses
                if (userQuestion.toLowerCase().includes("spend trend")) {
                    const chartId = 'spendTrendChart' + Date.now() + Math.random(); // Ensure unique chart ID
                    const copilotMessage = { 
                        id: Date.now() + Math.random(), // Ensure unique ID
                        sender: "Copilot", 
                        text: "Here's the spend trend over the last 6 months:",
                        chartId: chartId
                    };
                    this.chatMessages.push(copilotMessage);
                    
                    this.$nextTick(() => {
                        const ctx = document.getElementById(chartId);
                        if (ctx) {
                            new Chart(ctx, {
                                type: 'line',
                                data: {
                                    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
                                    datasets: [{
                                        label: 'Spend in $K',
                                        data: [300, 450, 720, 980, 1250, 1500],
                                        borderColor: 'rgb(75, 192, 192)',
                                        tension: 0.1
                                    }]
                                },
                                options: {
                                    responsive: true,
                                    maintainAspectRatio: true,
                                    aspectRatio: 1.5,
                                }
                            });
                            this.scrollToBottom();
                        } else {
                            console.error(`Canvas element with id ${chartId} not found.`);
                        }
                    });
                } else if (userQuestion.toLowerCase().includes("standard operating procedure")) {
                    const response = `
                        ## Standard Operating Procedure
                        The standard operating procedure for equipment shutdown during turnaround includes the following key steps:
                        1. **Conduct a pre-shutdown safety meeting** with all involved personnel.
                        2. **Verify all necessary permits** are in place and up-to-date.
                        3. **Follow the specific shutdown sequence** for each piece of equipment as outlined in the equipment manual.
                        4. **Ensure proper lockout/tagout procedures** are followed for all energy sources.
                        5. **Conduct post-shutdown checks** to verify all systems are properly isolated and de-energized.
                        Always refer to the detailed SOP document for comprehensive instructions and safety precautions.
                    `;
                    const copilotMessage = { 
                        id: Date.now() + Math.random(), // Ensure unique ID
                        sender: "Copilot", 
                        text: this.parseMarkdown(response)
                    };
                    this.chatMessages.push(copilotMessage);
                    this.$nextTick(this.scrollToBottom);
                } else if (userQuestion.toLowerCase().includes("top five items by spend")) {
                    const response = `
                        ## Top Five Items by Spend
                        Based on the current turnaround data, the top five items by spend are:
                        1. **Equipment Rental:** $1.2M
                        2. **Contractor Labor:** $950K
                        3. **Replacement Parts:** $780K
                        4. **Scaffolding:** $450K
                        5. **Specialized Tools:** $320K
                        These items account for approximately 74% of the total turnaround budget.
                    `;
                    const copilotMessage = { 
                        id: Date.now() + Math.random(), // Ensure unique ID
                        sender: "Copilot", 
                        text: this.parseMarkdown(response)
                    };
                    this.chatMessages.push(copilotMessage);
                    this.$nextTick(this.scrollToBottom);
                    // Add this block to handle the "generate plan" query
                } else if (userQuestion.toLowerCase().startsWith('generate plan:')) {
                    const planDetails = userQuestion.substring('generate plan:'.length).trim();
                    await this.generatePlan(planDetails);
                } else {
                    // Call the RAG function for other queries
                    this.callRAGFunction(userQuestion).then(data => {
                        if (data.error) {
                            const copilotMessage = { 
                                id: Date.now() + Math.random(), // Ensure unique ID
                                sender: "Copilot", 
                                text: "I'm sorry, I don't have specific information about that. Can you try asking about top spend items, spend trends, or standard operating procedures?" 
                            };
                            this.chatMessages.push(copilotMessage);
                        } else {
                            const copilotMessage = { 
                                id: Date.now() + Math.random(), // Ensure unique ID
                                sender: "Copilot", 
                                text: this.parseMarkdown(data.answer)
                            };
                            this.chatMessages.push(copilotMessage);
                        }
                        this.$nextTick(this.scrollToBottom);
                    });
                }
            },
            scrollToBottom() {
                const chatContainer = this.$refs.chatMessages;
                setTimeout(() => {
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }, 100); // Adjust timeout if necessary
            },

            requestBriefing() {
                const briefing = "Here's your daily briefing: You have 5 tasks scheduled for today. The critical path task is the inspection of the main turbine. Safety reminder: Always wear proper PPE in designated areas.";
                this.speakResponse(briefing);
                this.latestAlert = "Daily briefing delivered.";

                // Remove the alert after 5 seconds
                setTimeout(() => {
                    this.latestAlert = "";
                }, 17000);
            },
            speakResponse(text) {
                fetch('https://api.elevenlabs.io/v1/text-to-speech/pjcYQlDFKMbcOUp6F5GD', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'xi-api-key': 'sk_cef8183a5b1d9d16e6d80327c0cf9e707d8ab8a59b756c75'  // Replace with your actual API key
                    },
                    body: JSON.stringify({
                        text: text,
                        voice_settings: {
                            stability: 0.5,
                            similarity_boost: 0.5
                        }
                    })
                })
                .then(response => response.blob())
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    const audio = new Audio(url);
                    audio.play();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            },
            // Method to generate a plan
            async generatePlan(planDetails) {
                try {
                    const response = await fetch(`${window.config.apiUrl}/generate-plan`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ planDetails })
                    });
                    
                    if (!response.ok) {
                        throw new Error('Failed to generate plan');
                    }
            
                    const data = await response.json();
                    console.log('Received plan data:', data);
            
                    const plan = data.plan;
            
                    const planMessage = {
                        id: Date.now(),
                        sender: "Copilot",
                        text: "I've generated a project plan for the Richmond Refinery turnaround. Here's a summary:",
                        planSummary: {
                            Duration: plan.Project_Overview.Duration,
                            "Start Date": plan.Detailed_Task_Breakdown[0].Start_Date,
                            "Major Phases": plan.Key_Milestones.length,
                            "Estimated Budget": plan.Project_Overview.Estimated_Budget
                        },
                        fullPlan: this.formatFullPlan(plan),
                        showFullPlan: false
                    };
            
                    this.chatMessages.push(planMessage);
                    this.$nextTick(this.scrollToBottom);
                } catch (error) {
                    console.error('Error generating plan:', error);
                    this.chatMessages.push({
                        id: Date.now(),
                        sender: "Copilot",
                        text: "I'm sorry, there was an error generating the plan. Please try again later."
                    });
                }
            },
            formatFullPlan(plan) {
                let formattedPlan = "";
                for (const [section, content] of Object.entries(plan)) {
                    formattedPlan += `<h3>${section.replace(/_/g, ' ')}</h3>`;
                    if (Array.isArray(content)) {
                        formattedPlan += '<ul>';
                        content.forEach(item => {
                            formattedPlan += `<li>${Object.entries(item).map(([k, v]) => `${k}: ${v}`).join(', ')}</li>`;
                        });
                        formattedPlan += '</ul>';
                    } else if (typeof content === 'object') {
                        formattedPlan += '<ul>';
                        for (const [key, value] of Object.entries(content)) {
                            formattedPlan += `<li><strong>${key}:</strong> ${value}</li>`;
                        }
                        formattedPlan += '</ul>';
                    } else {
                        formattedPlan += `<p>${content}</p>`;
                    }
                }
                return formattedPlan;
            },
            toggleFullPlan(messageId) {
                const message = this.chatMessages.find(m => m.id === messageId);
                if (message) {
                  message.showFullPlan = !message.showFullPlan;
                  if (message.showFullPlan && message.fullPlan) {
                    // Here you can add logic to display the full plan, possibly using a modal or expanding the message
                    console.log('Full plan:', message.fullPlan);
                    // For now, let's just add the full plan details to the message text
                    message.text += `\n\nFull Plan Details:\n${JSON.stringify(message.fullPlan, null, 2)}`;
                  }
                }
              },
            viewConsolidatedPlan() {
                // Placeholder for consolidated plan view
                alert("Consolidated Plan view is not yet implemented.");
            },
            // Method to call the RAG function
            async callRAGFunction(question) {
                const apiUrl = window.config.apiUrl;
                console.log('API URL:' +  apiUrl);
                console.log('Calling API at:', `${apiUrl}/query`);

                try {
                    const response = await fetch(`${apiUrl}/query`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ question })
                    });
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error('Error calling RAG function:', error);
                    return { error: 'Failed to get response from backend' };
                }
            },
            // Utility method to escape HTML
            escapeHtml(unsafe) {
                return unsafe
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
            },

            // Method to parse markdown into HTML
            parseMarkdown(markdown) {
                let html = markdown
                    .replace(/^##\s?(.*)/gm, '<h3>$1</h3>')  // Change h2 to h3 for subsections
                    .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*)\*/g, '<em>$1</em>')
                    .replace(/^([*-])\s(.*)$/gm, '<li>$2</li>')  // Convert single-line list items
                    .replace(/(<li>.*<\/li>)\n/g, '<ul>$1</ul>')  // Wrap lists in <ul> tags
                    .replace(/\n{2,}/g, '</p><p>')  // Convert multiple newlines to paragraph breaks
                    .replace(/\n/g, ' ');  // Replace single newlines with spaces
                return '<p>' + html + '</p>';  // Wrap the entire content in paragraphs
            }
        }
    });
});