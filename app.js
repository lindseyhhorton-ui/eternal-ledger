// Flameborn Lexicon Application
class FlamebornLexicon {
    constructor() {
        this.data = lexiconData;
        this.filteredData = lexiconData;
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.contentContainer = document.getElementById('lexiconContent');
        
        this.init();
    }
    
    init() {
        // Initial render
        this.render();
        
        // Event listeners
        this.searchInput.addEventListener('input', () => this.handleSearch());
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });
        
        this.categoryFilter.addEventListener('change', () => this.handleFilter());
    }
    
    handleSearch() {
        const searchTerm = this.searchInput.value.toLowerCase().trim();
        const selectedCategory = this.categoryFilter.value;
        
        this.filteredData = this.data.filter(entry => {
            const matchesSearch = searchTerm === '' || 
                entry.term.toLowerCase().includes(searchTerm) ||
                entry.description.toLowerCase().includes(searchTerm) ||
                entry.details.toLowerCase().includes(searchTerm);
                
            const matchesCategory = selectedCategory === 'all' || 
                entry.category === selectedCategory;
                
            return matchesSearch && matchesCategory;
        });
        
        this.render();
    }
    
    handleFilter() {
        this.handleSearch(); // Reuse search logic which includes filtering
    }
    
    render() {
        if (this.filteredData.length === 0) {
            this.contentContainer.innerHTML = `
                <div class="no-results">
                    <p>🔥 No entries found matching your criteria.</p>
                    <p>Try adjusting your search or filter.</p>
                </div>
            `;
            return;
        }
        
        const grid = document.createElement('div');
        grid.className = 'lexicon-grid';
        
        this.filteredData.forEach(entry => {
            const entryElement = this.createEntryElement(entry);
            grid.appendChild(entryElement);
        });
        
        this.contentContainer.innerHTML = '';
        this.contentContainer.appendChild(grid);
    }
    
    createEntryElement(entry) {
        const article = document.createElement('article');
        article.className = 'lexicon-entry';
        article.setAttribute('data-id', entry.id);
        
        article.innerHTML = `
            <div class="entry-header">
                <h2 class="entry-title">${this.escapeHtml(entry.term)}</h2>
                <span class="entry-category">${this.escapeHtml(entry.category)}</span>
            </div>
            <p class="entry-description">${this.escapeHtml(entry.description)}</p>
            <p class="entry-details">${this.escapeHtml(entry.details)}</p>
        `;
        
        return article;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new FlamebornLexicon();
});
