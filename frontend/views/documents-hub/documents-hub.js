new Vue({
    el: '#app',
    data: {
        searchTerm: '',
        activeCategory: 'all',
        categories: [
            { id: 'all', label: 'All Documents' },
            { id: 'operational', label: 'Operational Manuals' },
            { id: 'compliance', label: 'Compliance Documents' },
            { id: 'technical', label: 'Technical Drawings' }
        ],
        documents: [
            {
                id: 1,
                name: 'Shutdown Procedure Manual',
                type: 'PDF',
                category: 'operational',
                uploadDate: '2024-08-25',
                aiInsights: 'Critical safety procedures updated in Section 3.2. Review recommended.',
                tag: 'Urgent'
            },
            {
                id: 2,
                name: 'Environmental Compliance Report',
                type: 'DOCX',
                category: 'compliance',
                uploadDate: '2024-08-23',
                aiInsights: 'New emissions standards compliance requirements identified.',
                tag: 'Reviewed'
            }
        ]
    },
    computed: {
        filteredDocuments() {
            return this.documents.filter(doc => {
                return (
                    doc.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
                    (this.activeCategory === 'all' || doc.category === this.activeCategory)
                );
            });
        }
    },
    methods: {
        setCategory(categoryId) {
            this.activeCategory = categoryId;
        },
        viewDocument(docId) {
            alert(`Viewing document with ID: ${docId}`);
        },
        downloadDocument(docId) {
            alert(`Downloading document with ID: ${docId}`);
        }
    }
});
