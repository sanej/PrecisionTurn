// config.js
window.config = {
    baseUrl: 'http://localhost:8000', // Default to local server
    apiUrl: 'http://localhost:8001'   // Default to local Flask server
};

// If running in a production environment, override the base URL
if (window.location.hostname !== 'localhost') {
    window.config.baseUrl = 'https://storage.googleapis.com/precisionturn-frontend/frontend';
    window.config.apiUrl = 'https://precisionturn.ue.r.appspot.com'; // Replace <your-project-id> with your actual project ID

}