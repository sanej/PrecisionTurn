document.getElementById('searchDocuments').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const rows = document.querySelectorAll('.document-list tbody tr');

    rows.forEach(row => {
        const documentName = row.querySelector('td').textContent.toLowerCase();
        row.style.display = documentName.includes(searchTerm) ? '' : 'none';
    });
});