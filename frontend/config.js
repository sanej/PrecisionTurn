// config.js
window.config = {
    baseUrl: 'http://localhost:8000' // Default to local server
};

// If running in a production environment, override the base URL
if (window.location.hostname !== 'localhost') {
    window.config.baseUrl = 'https://storage.googleapis.com/precisionturn-frontend/frontend';
}