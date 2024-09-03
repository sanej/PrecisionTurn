document.addEventListener('DOMContentLoaded', function() {
    const sidebarContainer = document.getElementById('sidebar-container');
    fetch(`${window.config.baseUrl}/components/sidebar/sidebar.html`)
        .then(response => response.text())
        .then(data => {
            sidebarContainer.innerHTML = data;
            const items = sidebarContainer.querySelectorAll('li[data-link]');
            items.forEach(item => {
                const relativeLink = item.getAttribute('data-link');
                const absoluteLink = new URL(relativeLink, window.config.baseUrl).href;
                console.log(absoluteLink);
                item.setAttribute('data-link', absoluteLink);
                item.addEventListener('click', function() {
                    window.location.href = this.getAttribute('data-link');
                });
            });
        });
});