// At the top of your file, outside any event listeners
const orgChartData = [
    { id: 1, name: "Sarah Johnson", title: "Maintenance Head" },
    { id: 2, name: "Michael Chen", title: "Plant Head" },
    { id: 3, pid: 1, name: "Emily Rodriguez", title: "TAM Manager" },
    { id: 4, pid: 3, name: "David Patel", title: "TAM Coordinator" },
    { id: 5, pid: 3, name: "Olivia Thompson", title: "TAM Ops Head" },
    { id: 6, pid: 3, name: "James Wilson", title: "Procurement Rep." },
    { id: 7, pid: 3, name: "Sophia Lee", title: "Finance Rep." },
    { id: 8, pid: 3, name: "Ethan Nguyen", title: "HSE Rep." },
    { id: 9, pid: 3, name: "Ava Müller", title: "Reliability Rep." },
    { id: 10, pid: 3, name: "Liam O'Connor", title: "Project Rep." },
    { id: 11, pid: 4, name: "Emma Garcia", title: "TAM Scheduler" },
    { id: 12, pid: 5, name: "Noah Kim", title: "Operations Rep." },
];

// Initialize the chart
function initOrgChart() {
    OrgChart.templates.olivia.field_0 = '<text style="font-size: 20px;" fill="#aeaeae" x="100" y="30" text-anchor="middle">{val}</text>';
    OrgChart.templates.olivia.field_1 = '<text style="font-size: 14px;" fill="#039be5" x="100" y="60" text-anchor="middle">{val}</text>';

    const chart = new OrgChart(document.getElementById("orgChart"), {
        template: "olivia",
        enableDragDrop: true,
        nodeBinding: {
            field_0: "name",
            field_1: "title"
        },
        nodes: orgChartData,
        layout: OrgChart.tree,
        scaleInitial: OrgChart.match.boundary,
        padding: 20,
        levelSeparation: 60,
        siblingSeparation: 20,
        subtreeSeparation: 20,
        nodeMouseClick: OrgChart.action.expandCollapse,
        nodeMenu: {
            details: { text: "Details" },
            edit: { text: "Edit" },
            add: { text: "Add" },
            remove: { text: "Remove" }
        },
        slinks: [
            {from: 1, to: 2, label: 'Collaborates', color: 'green'}
        ],
    });

    // Make chart responsive
    window.addEventListener('resize', function() {
        chart.fit();
    });

    // Initial fit
    chart.fit();
}

document.addEventListener('DOMContentLoaded', function() {
    // Personnel data with Governance Role added
    const personnelData = [
        { name: 'John Doe', role: 'Engineer', status: 'Available', department: 'Engineering', governanceRole: 'TAM Coordinator' },
        { name: 'Jane Smith', role: 'Technician', status: 'In Use', department: 'Maintenance', governanceRole: '-' },
        { name: 'Michael Brown', role: 'Supervisor', status: 'Available', department: 'Operations', governanceRole: 'TAM Operations Head' }
    ];

    // Assets data
    const assetsData = [
        { name: 'Forklift', type: 'Vehicle', status: 'In Use', location: 'Warehouse 1' },
        { name: 'Welding Machine', type: 'Equipment', status: 'Available', location: 'Workshop' },
        { name: 'Generator', type: 'Power', status: 'Under Maintenance', location: 'Site B' }
    ];

    
    // Fetch personnel and assets table body elements
    const personnelTable = document.getElementById('personnel-table').getElementsByTagName('tbody')[0];
    const assetsTable = document.getElementById('assets-table').getElementsByTagName('tbody')[0];

    // Populate personnel table
    personnelData.forEach(person => {
        const row = personnelTable.insertRow();
        row.innerHTML = `
            <td>${person.name}</td>
            <td>${person.role}</td>
            <td><span class="status-label ${person.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'} px-2 py-1 rounded">${person.status}</span></td>
            <td>${person.department}</td>
            <td>${person.governanceRole || '-'}</td>
        `;
    });

    // Populate assets table
    assetsData.forEach(asset => {
        const row = assetsTable.insertRow();
        row.innerHTML = `
            <td>${asset.name}</td>
            <td>${asset.type}</td>
            <td><span class="status-label ${asset.status === 'Available' ? 'bg-green-100 text-green-800' : asset.status === 'In Use' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'} px-2 py-1 rounded">${asset.status}</span></td>
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

    // Function to filter table based on query
    function filterTable(table, query) {
        for (let row of table.rows) {
            const cells = Array.from(row.cells);
            const match = cells.some(cell => cell.textContent.toLowerCase().includes(query));
            row.style.display = match ? '' : 'none';
        }
    }
    // Tab functionality
    const tabs = document.querySelectorAll('.tab');
    const sections = document.querySelectorAll('.management-section');

    function showSection(targetId) {
        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.add('active');
                section.style.display = 'block';
            } else {
                section.classList.remove('active');
                section.style.display = 'none';
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.target;
            
            // Deactivate all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Activate clicked tab
            tab.classList.add('active');

            // Show the correct section
            showSection(target);

            // Initialize org chart when Governance Structure tab is clicked
            if (target === 'governance') {
                initOrgChart();
            }
        });
    });

    // Initialize org chart and show Governance Structure by default
    document.querySelector('.tab[data-target="governance"]').classList.add('active');
    showSection('governance');
    initOrgChart();

});

