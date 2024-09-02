document.addEventListener('DOMContentLoaded', function() {
    const personnelData = [
        { name: 'John Doe', role: 'Engineer', status: 'Available', department: 'Engineering' },
        { name: 'Jane Smith', role: 'Technician', status: 'In Use', department: 'Maintenance' },
        { name: 'Michael Brown', role: 'Supervisor', status: 'Available', department: 'Operations' }
    ];

    const assetsData = [
        { name: 'Forklift', type: 'Vehicle', status: 'In Use', location: 'Warehouse 1' },
        { name: 'Welding Machine', type: 'Equipment', status: 'Available', location: 'Workshop' },
        { name: 'Generator', type: 'Power', status: 'Under Maintenance', location: 'Site B' }
    ];

    const personnelTable = document.getElementById('personnel-table').getElementsByTagName('tbody')[0];
    const assetsTable = document.getElementById('assets-table').getElementsByTagName('tbody')[0];

    personnelData.forEach(person => {
        const row = personnelTable.insertRow();
        row.innerHTML = `
            <td>${person.name}</td>
            <td>${person.role}</td>
            <td>${person.status}</td>
            <td>${person.department}</td>
        `;
    });

    assetsData.forEach(asset => {
        const row = assetsTable.insertRow();
        row.innerHTML = `
            <td>${asset.name}</td>
            <td>${asset.type}</td>
            <td>${asset.status}</td>
            <td>${asset.location}</td>
        `;
    });

    // Search functionality for personnel
    document.getElementById('personnel-search').addEventListener('input', function() {
        const query = this.value.toLowerCase();
        filterTable(personnelTable, query);
    });

    // Search functionality for assets
    document.getElementById('assets-search').addEventListener('input', function() {
        const query = this.value.toLowerCase();
        filterTable(assetsTable, query);
    });

    function filterTable(table, query) {
        for (let row of table.rows) {
            const cells = Array.from(row.cells);
            const match = cells.some(cell => cell.textContent.toLowerCase().includes(query));
            row.style.display = match ? '' : 'none';
        }
    }
});
