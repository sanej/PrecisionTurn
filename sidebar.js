document.addEventListener('DOMContentLoaded', function() {
    const sidebarContainer = document.getElementById('sidebar-container');
    fetch('sidebar.html')
        .then(response => response.text())
        .then(data => {
            sidebarContainer.innerHTML = data;
            const items = sidebarContainer.querySelectorAll('li[data-link]');
            items.forEach(item => {
                item.addEventListener('click', function() {
                    window.location.href = this.getAttribute('data-link');
                });
            });
        });
});