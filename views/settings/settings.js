document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('saveSettings');
    
    saveButton.addEventListener('click', function() {
        const userPreferences = {
            notifications: document.getElementById('notifications').value,
            theme: document.getElementById('theme').value
        };

        const systemSettings = {
            timeZone: document.getElementById('timeZone').value,
            language: document.getElementById('language').value
        };

        const securitySettings = {
            password: document.getElementById('password').value,
            twoFactorAuth: document.getElementById('twoFactorAuth').value
        };

        // Example: Save settings to local storage (could be extended to server)
        localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
        localStorage.setItem('systemSettings', JSON.stringify(systemSettings));
        localStorage.setItem('securitySettings', JSON.stringify(securitySettings));

        alert('Settings saved successfully!');
    });
});