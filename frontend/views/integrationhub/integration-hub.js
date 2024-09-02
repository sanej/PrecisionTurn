new Vue({
    el: '#app',
    data: {
        integrations: [
            { id: 1, name: 'Enterprise Resource Planning (ERP)', examples: ['SAP', 'Oracle'], status: 'Connected', lastSync: '2023-10-01 12:00:00' },
            { id: 2, name: 'Project Management', examples: ['Primavera', 'MS Project'], status: 'Not Connected', lastSync: 'N/A' },
            { id: 3, name: 'Document Management Systems', examples: ['OpenText', 'SharePoint'], status: 'Error', lastSync: '2023-09-30 15:30:00' },
            { id: 4, name: 'Supply Chain Management', examples: ['JDA', 'Kinaxis'], status: 'Connected', lastSync: '2023-10-01 08:45:00' },
            { id: 5, name: 'Asset Management Systems', examples: ['IBM Maximo'], status: 'Connected', lastSync: '2023-10-01 09:00:00' },
            { id: 6, name: 'Safety Management Systems', examples: ['Intelex'], status: 'Not Connected', lastSync: 'N/A' },
            { id: 7, name: 'Compliance and Regulatory Systems', examples: [], status: 'Connected', lastSync: '2023-10-01 10:00:00' },
            { id: 8, name: 'Geospatial Information Systems (GIS)', examples: [], status: 'Error', lastSync: '2023-09-30 14:00:00' },
            { id: 9, name: 'Customer Relationship Management (CRM)', examples: ['Salesforce'], status: 'Connected', lastSync: '2023-10-01 11:00:00' },
            { id: 10, name: 'Contractor Management Systems', examples: [], status: 'Not Connected', lastSync: 'N/A' },
            { id: 11, name: 'Operational Technology (OT) Systems', examples: [], status: 'Connected', lastSync: '2023-10-01 12:30:00' },
            { id: 12, name: 'Human Resources Management (HRM) Systems', examples: [], status: 'Connected', lastSync: '2023-10-01 13:00:00' },
            { id: 13, name: 'Collaboration Tools', examples: ['Slack', 'Teams'], status: 'Not Connected', lastSync: 'N/A' }
        ]
    },
    methods: {
        statusClass(status) {
            return {
                'status-connected': status === 'Connected',
                'status-not-connected': status === 'Not Connected',
                'status-error': status === 'Error'
            };
        },
        connectIntegration(integration) {
            // Handle integration connection
            alert(`Connecting to ${integration.name}`);
            integration.status = 'Connected';
            integration.lastSync = new Date().toISOString();
        },
        disconnectIntegration(integration) {
            // Handle integration disconnection
            alert(`Disconnecting from ${integration.name}`);
            integration.status = 'Not Connected';
            integration.lastSync = 'N/A';
        },
        openSettings(integration) {
            // Handle opening settings
            alert(`Opening settings for ${integration.name}`);
        },
        viewLogs(integration) {
            // Handle viewing logs
            alert(`Viewing logs for ${integration.name}`);
        }
    }
});