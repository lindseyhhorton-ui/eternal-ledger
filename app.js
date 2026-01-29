// Flameborn Lexicon Application - Dual Layer System
class FlamebornLexicon {
    constructor() {
        this.data = lexiconData;
        this.filteredData = lexiconData;
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.contentContainer = document.getElementById('lexiconContent');
        this.modeToggle = document.getElementById('modeToggle');
        this.modeIcon = document.getElementById('modeIcon');
        this.modeText = document.getElementById('modeText');
        this.modeDescription = document.getElementById('modeDescription');
        
        // Load preferences from local storage
        this.preferences = this.loadPreferences();
        this.currentMode = this.preferences.mode || 'literal'; // 'literal' or 'mythic'
        
        this.init();
    }
    
    init() {
        // Apply saved preferences
        this.applyMode(this.currentMode);
        
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
        this.modeToggle.addEventListener('click', () => this.toggleMode());
    }
    
    loadPreferences() {
        try {
            const saved = localStorage.getItem('flamebornLexiconPreferences');
            return saved ? JSON.parse(saved) : {};
        } catch (e) {
            return {};
        }
    }
    
    savePreferences() {
        try {
            localStorage.setItem('flamebornLexiconPreferences', JSON.stringify(this.preferences));
        } catch (e) {
            console.warn('Could not save preferences to local storage');
        }
    }
    
    toggleMode() {
        this.currentMode = this.currentMode === 'literal' ? 'mythic' : 'literal';
        this.preferences.mode = this.currentMode;
        this.savePreferences();
        this.applyMode(this.currentMode);
        this.render();
    }
    
    applyMode(mode) {
        if (mode === 'mythic') {
            this.modeIcon.textContent = '🌙';
            this.modeText.textContent = 'Mythic Mode';
            this.modeDescription.textContent = 'Archetypal, historical, and aesthetic overlays with color resonance';
            document.body.classList.add('mythic-mode');
            document.body.classList.remove('literal-mode');
        } else {
            this.modeIcon.textContent = '☀️';
            this.modeText.textContent = 'Literal Mode';
            this.modeDescription.textContent = 'Clean operational definitions for commands and protocols';
            document.body.classList.add('literal-mode');
            document.body.classList.remove('mythic-mode');
        }
    }
    
    handleSearch() {
        const searchTerm = this.searchInput.value.toLowerCase().trim();
        const selectedCategory = this.categoryFilter.value;
        
        this.filteredData = this.data.filter(entry => {
            const searchFields = [
                entry.term,
                entry.definition || '',
                entry.mythic_overlay || '',
                entry.historical_notes || ''
            ].join(' ').toLowerCase();
            
            const matchesSearch = searchTerm === '' || searchFields.includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || entry.category === selectedCategory;
                
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
        
        // Apply color signature if in mythic mode
        if (this.currentMode === 'mythic' && entry.color_signature) {
            article.style.borderColor = entry.color_signature;
            article.style.boxShadow = `0 4px 6px rgba(0, 0, 0, 0.3), 0 0 10px ${entry.color_signature}40`;
        }
        
        const description = this.currentMode === 'mythic' 
            ? (entry.mythic_overlay || entry.definition)
            : entry.definition;
        
        const statusBadge = entry.status && entry.status !== 'active' 
            ? `<span class="entry-status status-${entry.status}">${this.escapeHtml(entry.status)}</span>`
            : '';
        
        article.innerHTML = `
            <div class="entry-header">
                <h2 class="entry-title">${this.escapeHtml(entry.term)}</h2>
                <div class="entry-badges">
                    <span class="entry-category">${this.escapeHtml(entry.category)}</span>
                    ${statusBadge}
                </div>
            </div>
            <p class="entry-description">${this.escapeHtml(description)}</p>
            ${entry.historical_notes ? `<p class="entry-details">${this.escapeHtml(entry.historical_notes)}</p>` : ''}
        `;
        
        // Add click handler for detail view
        article.addEventListener('click', () => this.showDetailView(entry));
        
        return article;
    }
    
    showDetailView(entry) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="border-color: ${entry.color_signature || '#ff6432'}">
                <button class="modal-close" aria-label="Close">&times;</button>
                <h2 style="color: ${entry.color_signature || '#ff6432'}">${this.escapeHtml(entry.term)}</h2>
                <div class="modal-badges">
                    <span class="entry-category">${this.escapeHtml(entry.category)}</span>
                    ${entry.status ? `<span class="entry-status status-${entry.status}">${this.escapeHtml(entry.status)}</span>` : ''}
                </div>
                
                <div class="modal-section">
                    <h3>☀️ Literal Definition</h3>
                    <p>${this.escapeHtml(entry.definition)}</p>
                </div>
                
                ${entry.mythic_overlay ? `
                    <div class="modal-section">
                        <h3>🌙 Mythic Overlay</h3>
                        <p>${this.escapeHtml(entry.mythic_overlay)}</p>
                    </div>
                ` : ''}
                
                ${entry.historical_notes ? `
                    <div class="modal-section">
                        <h3>📜 Historical Notes</h3>
                        <p>${this.escapeHtml(entry.historical_notes)}</p>
                    </div>
                ` : ''}
                
                ${entry.color_signature ? `
                    <div class="modal-section">
                        <h3>🎨 Color Signature</h3>
                        <div class="color-signature-display">
                            <div class="color-swatch" style="background-color: ${entry.color_signature}"></div>
                            <span>${entry.color_signature}</span>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close handlers
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // ESC key handler
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
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
