document.addEventListener('DOMContentLoaded', function() {
    const sidebarContainer = document.getElementById('sidebar-container');
    const cacheBuster = `?v=${new Date().getTime()}`;
    fetch(`${window.config.baseUrl}/components/sidebar/sidebar.html${cacheBuster}`)
        .then(response => response.text())
        .then(data => {
            sidebarContainer.innerHTML = data;
            
            // Make PrecisionTurn label clickable
            const precisionTurnLabel = sidebarContainer.querySelector('#precisionturn');
            precisionTurnLabel.addEventListener('click', function() {
                window.location.href = `${window.config.baseUrl}/index.html`;
            });

            // Set up other clickable items
            const items = sidebarContainer.querySelectorAll('li[data-link]');
            items.forEach(item => {
                const relativeLink = item.getAttribute('data-link');
                const absoluteLink = new URL(relativeLink, `${window.config.baseUrl}/`).href;
                item.setAttribute('data-link', absoluteLink);
                item.addEventListener('click', function() {
                    window.location.href = this.getAttribute('data-link');
                });
            });
        });
});