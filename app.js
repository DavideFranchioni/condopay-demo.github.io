// CondoPay App Demo - Main Application Logic
// Gestisce tutte le funzionalità dell'applicativo demo

class CondoPayApp {
    constructor() {
        this.currentUser = null;
        this.currentSection = 'dashboard';
        this.isLoggedIn = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadInitialData();
    }

    bindEvents() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Navigation menu
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-section]')) {
                e.preventDefault();
                this.navigateTo(e.target.dataset.section);
            }
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }
    }

    // ===== LOGIN/LOGOUT FUNCTIONALITY =====
    
    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const loginBtn = document.querySelector('.login-btn');
        
        // Simulate login process
        loginBtn.textContent = 'Accesso in corso...';
        loginBtn.disabled = true;
        
        // Simulate API call delay
        await this.delay(1500);
        
        // Simple demo authentication
        if (email && password) {
            this.currentUser = {
                id: 1,
                name: 'Marco Rossi',
                email: email,
                role: 'admin',
                company: 'Studio Amministrazioni Rossi',
                avatar: 'MR'
            };
            
            this.isLoggedIn = true;
            this.showDashboard();
        } else {
            alert('Credenziali non valide');
            loginBtn.textContent = 'Accedi alla Dashboard';
            loginBtn.disabled = false;
        }
    }

    showDashboard() {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        
        // Load dashboard content
        this.navigateTo('dashboard');
        this.updateUserInfo();
        this.startRealTimeUpdates();
    }

    logout() {
        if (confirm('Sei sicuro di voler uscire dalla dashboard?')) {
            this.isLoggedIn = false;
            this.currentUser = null;
            this.stopRealTimeUpdates();
            location.reload();
        }
    }

    // ===== NAVIGATION =====
    
    navigateTo(section) {
        // Update active menu item
        document.querySelectorAll('.sidebar-menu a').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-section="${section}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Update page title
        const titles = {
            dashboard: 'Dashboard Principale',
            condominiums: 'Gestione Condomini',
            payments: 'Pagamenti e Transazioni',
            residents: 'Gestione Condomini',
            communications: 'Comunicazioni',
            reports: 'Report e Analytics',
            integrations: 'Integrazioni',
            settings: 'Impostazioni'
        };
        
        document.getElementById('pageTitle').textContent = titles[section] || 'Dashboard';
        
        // Load section content
        this.loadSectionContent(section);
        this.currentSection = section;
    }

    async loadSectionContent(section) {
        const content = document.getElementById('mainContent');
        
        // Show loading state
        content.innerHTML = '<div class="loading">Caricamento...</div>';
        
        // Simulate loading delay
        await this.delay(300);
        
        // Load section-specific content
        switch (section) {
            case 'dashboard':
                content.innerHTML = this.generateDashboardHTML();
                this.initDashboard();
                break;
            case 'condominiums':
                content.innerHTML = this.generateCondominiumsHTML();
                this.initCondominiums();
                break;
            case 'payments':
                content.innerHTML = this.generatePaymentsHTML();
                this.initPayments();
                break;
            case 'residents':
                content.innerHTML = this.generateResidentsHTML();
                this.initResidents();
                break;
            case 'communications':
                content.innerHTML = this.generateCommunicationsHTML();
                this.initCommunications();
                break;
            case 'reports':
                content.innerHTML = this.generateReportsHTML();
                this.initReports();
                break;
            case 'integrations':
                content.innerHTML = this.generateIntegrationsHTML();
                this.initIntegrations();
                break;
            case 'settings':
                content.innerHTML = this.generateSettingsHTML();
                this.initSettings();
                break;
            default:
                content.innerHTML = '<div class="text-center p-4">Sezione non trovata</div>';
        }
    }

    // ===== DASHBOARD SECTION =====
    
    generateDashboardHTML() {
        return `
            <!-- Stats Grid -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-title">Volume Mensile</div>
                        <div class="stat-icon">💰</div>
                    </div>
                    <div class="stat-value" data-counter="185420">€0</div>
                    <div class="stat-change positive">
                        ↗️ +12.5% vs mese scorso
                    </div>
                </div>
                
                <div class="stat-card success">
                    <div class="stat-header">
                        <div class="stat-title">Tasso Pagamento</div>
                        <div class="stat-icon">✅</div>
                    </div>
                    <div class="stat-value" data-counter="94.2">0%</div>
                    <div class="stat-change positive">
                        ↗️ +8.3% vs media settore
                    </div>
                </div>
                
                <div class="stat-card warning">
                    <div class="stat-header">
                        <div class="stat-title">Morosità</div>
                        <div class="stat-icon">⚠️</div>
                    </div>
                    <div class="stat-value" data-counter="3.1">0%</div>
                    <div class="stat-change positive">
                        ↘️ -14.9% vs mese scorso
                    </div>
                </div>
                
                <div class="stat-card info">
                    <div class="stat-header">
                        <div class="stat-title">Condomini Gestiti</div>
                        <div class="stat-icon">🏢</div>
                    </div>
                    <div class="stat-value" data-counter="25">0</div>
                    <div class="stat-change positive">
                        ↗️ +2 nuovi questo mese
                    </div>
                </div>
            </div>

            <!-- Dashboard Grid -->
            <div class="dashboard-grid">
                <!-- Chart Area -->
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">Andamento Pagamenti (Ultimi 6 Mesi)</h3>
                        <div>
                            <button class="btn btn-secondary" onclick="app.exportChart()">📊 Esporta</button>
                        </div>
                    </div>
                    <div class="chart-area" id="mainChart">
                        📈 Grafico Pagamenti Interattivo<br>
                        <small>Gen: €175k | Feb: €180k | Mar: €183k | Apr: €186k | Mag: €189k | Giu: €185k</small>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="activity-list">
                    <div class="activity-header">Attività Recenti</div>
                    <div id="activityFeed">
                        ${this.generateActivityItems()}
                    </div>
                </div>
            </div>

            <!-- Condomini Overview Table -->
            <div class="data-table">
                <div class="table-header">
                    <h3 class="table-title">Condomini - Situazione Pagamenti</h3>
                    <div class="table-filters">
                        <input type="text" placeholder="Cerca condominio..." class="search-input" id="searchCondos">
                        <button class="btn btn-primary" onclick="app.addCondominium()">+ Nuovo Condominio</button>
                    </div>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th>Condominio</th>
                            <th>Unità</th>
                            <th>Volume Mensile</th>
                            <th>Tasso Pagamento</th>
                            <th>Morosità</th>
                            <th>Status</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody id="condosTableBody">
                        ${this.generateCondosTableRows()}
                    </tbody>
                </table>
            </div>
        `;
    }

    initDashboard() {
        this.animateCounters();
        this.setupSearchFilter();
        this.loadRecentActivity();
        
        // Simulate real-time updates
        setInterval(() => {
            this.updateActivityFeed();
        }, 30000); // Update every 30 seconds
    }

    // ===== CONDOMINIUMS SECTION =====
    
    generateCondominiumsHTML() {
        return `
            <div class="content-header mb-4">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h2>Gestione Condomini</h2>
                    <button class="btn btn-primary" onclick="app.addCondominium()">
                        + Nuovo Condominio
                    </button>
                </div>
            </div>

            <!-- Filters -->
            <div class="data-table mb-4">
                <div class="table-header">
                    <h3 class="table-title">Filtri e Ricerca</h3>
                </div>
                <div style="padding: 1.5rem;">
                    <div class="form-row">
                        <div class="form-field">
                            <label>Cerca per nome</label>
                            <input type="text" placeholder="Nome condominio..." id="searchCondominiums">
                        </div>
                        <div class="form-field">
                            <label>Filtra per status</label>
                            <select id="filterStatus">
                                <option value="">Tutti</option>
                                <option value="excellent">Ottimo</option>
                                <option value="good">Buono</option>
                                <option value="warning">Attenzione</option>
                                <option value="critical">Critico</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Condomini Grid -->
            <div class="stats-grid" id="condominiumsGrid">
                ${this.generateCondominiumCards()}
            </div>

            <!-- Detailed Table -->
            <div class="data-table">
                <div class="table-header">
                    <h3 class="table-title">Dettagli Condomini</h3>
                    <button class="btn btn-secondary" onclick="app.exportCondominiums()">📊 Esporta Excel</button>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th>Condominio</th>
                            <th>Indirizzo</th>
                            <th>Unità</th>
                            <th>Volume Mensile</th>
                            <th>Tasso Pagamento</th>
                            <th>Morosità</th>
                            <th>Ultimo Pagamento</th>
                            <th>Status</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.generateDetailedCondosTableRows()}
                    </tbody>
                </table>
            </div>
        `;
    }

    initCondominiums() {
        // Setup filters
        const searchInput = document.getElementById('searchCondominiums');
        const statusFilter = document.getElementById('filterStatus');
        
        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterCondominiums());
        }
        
        if (statusFilter) {
            statusFilter.addEventListener('change', () => this.filterCondominiums());
        }
    }

    // ===== PAYMENTS SECTION =====
    
    generatePaymentsHTML() {
        return `
            <div class="content-header mb-4">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h2>Pagamenti e Transazioni</h2>
                    <div>
                        <button class="btn btn-secondary mr-2" onclick="app.exportPayments()">📊 Esporta</button>
                        <button class="btn btn-primary" onclick="app.processPayment()">+ Nuovo Pagamento</button>
                    </div>
                </div>
            </div>

            <!-- Payment Stats -->
            <div class="stats-grid">
                <div class="stat-card success">
                    <div class="stat-header">
                        <div class="stat-title">Pagamenti Oggi</div>
                        <div class="stat-icon">💳</div>
                    </div>
                    <div class="stat-value">€12.450</div>
                    <div class="stat-change positive">+8 transazioni</div>
                </div>
                
                <div class="stat-card info">
                    <div class="stat-header">
                        <div class="stat-title">In Attesa</div>
                        <div class="stat-icon">⏳</div>
                    </div>
                    <div class="stat-value">€8.920</div>
                    <div class="stat-change">5 pagamenti</div>
                </div>
                
                <div class="stat-card warning">
                    <div class="stat-header">
                        <div class="stat-title">Scaduti</div>
                        <div class="stat-icon">⚠️</div>
                    </div>
                    <div class="stat-value">€3.200</div>
                    <div class="stat-change negative">2 pagamenti</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-title">Commissioni</div>
                        <div class="stat-icon">💰</div>
                    </div>
                    <div class="stat-value">€127.50</div>
                    <div class="stat-change positive">2.1% del volume</div>
                </div>
            </div>

            <!-- Payment Methods Chart -->
            <div class="dashboard-grid">
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">Metodi di Pagamento</h3>
                    </div>
                    <div class="chart-area">
                        📊 Grafico Metodi Pagamento<br>
                        <small>Stripe: 75% | Bonifico: 20% | Contanti: 5%</small>
                    </div>
                </div>
                
                <div class="activity-list">
                    <div class="activity-header">Transazioni Recenti</div>
                    <div id="recentTransactions">
                        ${this.generateTransactionItems()}
                    </div>
                </div>
            </div>

            <!-- Payments Table -->
            <div class="data-table">
                <div class="table-header">
                    <h3 class="table-title">Tutti i Pagamenti</h3>
                    <div class="table-filters">
                        <input type="date" class="search-input" id="filterDate">
                        <select class="search-input" id="filterMethod">
                            <option value="">Tutti i metodi</option>
                            <option value="stripe">Stripe</option>
                            <option value="bank_transfer">Bonifico</option>
                            <option value="cash">Contanti</option>
                        </select>
                        <select class="search-input" id="filterPaymentStatus">
                            <option value="">Tutti gli stati</option>
                            <option value="completed">Completato</option>
                            <option value="pending">In attesa</option>
                            <option value="failed">Fallito</option>
                        </select>
                    </div>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th>ID Transazione</th>
                            <th>Condominio</th>
                            <th>Unità</th>
                            <th>Importo</th>
                            <th>Metodo</th>
                            <th>Data</th>
                            <th>Status</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.generatePaymentsTableRows()}
                    </tbody>
                </table>
            </div>
        `;
    }

    initPayments() {
        // Setup filters for payments
        this.setupPaymentFilters();
        
        // Auto-refresh payments every 10 seconds
        setInterval(() => {
            this.refreshPayments();
        }, 10000);
    }

    // ===== UTILITY FUNCTIONS =====
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    animateCounters() {
        const counters = document.querySelectorAll('[data-counter]');
        
        counters.forEach(counter => {
            const target = parseFloat(counter.dataset.counter);
            const isEuro = counter.textContent.includes('€');
            const isPercent = counter.textContent.includes('%');
            
            let current = 0;
            const increment = target / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                let displayValue = '';
                if (isEuro) {
                    displayValue = '€' + Math.floor(current).toLocaleString('it-IT');
                } else if (isPercent) {
                    displayValue = current.toFixed(1) + '%';
                } else {
                    displayValue = Math.floor(current).toString();
                }
                
                counter.textContent = displayValue;
            }, 50);
        });
    }

    generateActivityItems() {
        const activities = CONDOPAY_MOCK_DATA.recentActivity || [];
        
        return activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon ${activity.type}">
                    ${this.getActivityIcon(activity.type)}
                </div>
                <div class="activity-content">
                    <div class="activity-title">${activity.title}</div>
                    <div class="activity-description">${activity.description}</div>
                </div>
                <div class="activity-time">${this.formatTimeAgo(activity.timestamp)}</div>
            </div>
        `).join('');
    }

    generateCondosTableRows() {
        const condos = CONDOPAY_MOCK_DATA.condominiums || [];
        
        return condos.map(condo => `
            <tr data-condo-id="${condo.id}">
                <td>
                    <div>
                        <div class="font-semibold">${condo.name}</div>
                        <div class="text-sm text-gray-500">${condo.address}</div>
                    </div>
                </td>
                <td>${condo.units}</td>
                <td>€${condo.monthlyAmount.toLocaleString()}</td>
                <td>${condo.paymentRate}%</td>
                <td>${condo.defaultingUnits} unità</td>
                <td><span class="status-badge status-${this.getStatusColor(condo.paymentRate)}">${this.getStatusText(condo.paymentRate)}</span></td>
                <td>
                    <button class="btn btn-secondary" onclick="app.manageCondominium(${condo.id})">Gestisci</button>
                </td>
            </tr>
        `).join('');
    }

    getActivityIcon(type) {
        const icons = {
            payment: '💳',
            alert: '📧',
            notification: '🔔',
            system: '⚙️'
        };
        return icons[type] || '📝';
    }

    getStatusColor(paymentRate) {
        if (paymentRate >= 95) return 'success';
        if (paymentRate >= 85) return 'warning';
        return 'danger';
    }

    getStatusText(paymentRate) {
        if (paymentRate >= 95) return 'Ottimo';
        if (paymentRate >= 85) return 'Buono';
        if (paymentRate >= 75) return 'Attenzione';
        return 'Critico';
    }

    formatTimeAgo(timestamp) {
        const now = new Date();
        const time = new Date(timestamp);
        const diffMs = now - time;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        
        if (diffMins < 1) return 'Ora';
        if (diffMins < 60) return `${diffMins} min fa`;
        if (diffHours < 24) return `${diffHours} ore fa`;
        return time.toLocaleDateString('it-IT');
    }

    // ===== DATA MANAGEMENT =====
    
    loadInitialData() {
        // Load mock data from mock-data.js
        if (typeof CONDOPAY_MOCK_DATA !== 'undefined') {
            console.log('Mock data loaded successfully');
        }
    }

    updateUserInfo() {
        if (this.currentUser) {
            const userAvatar = document.querySelector('.user-avatar');
            const userName = document.querySelector('.user-menu div div');
            
            if (userAvatar) userAvatar.textContent = this.currentUser.avatar;
            if (userName) userName.textContent = this.currentUser.name;
        }
    }

    startRealTimeUpdates() {
        // Simulate real-time updates
        this.updateInterval = setInterval(() => {
            this.simulateRealTimeData();
        }, 30000);
    }

    stopRealTimeUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }

    simulateRealTimeData() {
        // Add new activity items
        const activityFeed = document.getElementById('activityFeed');
        if (activityFeed) {
            const newActivity = this.generateNewActivity();
            activityFeed.insertAdjacentHTML('afterbegin', newActivity);
            
            // Remove old items (keep only last 10)
            const items = activityFeed.querySelectorAll('.activity-item');
            if (items.length > 10) {
                items[items.length - 1].remove();
            }
        }
    }

    generateNewActivity() {
        const activities = [
            { type: 'payment', title: 'Pagamento Ricevuto', description: 'Palazzo Navigli - Apt. 5C' },
            { type: 'alert', title: 'Sollecito Inviato', description: 'Residenza Centro - 2 unità' },
            { type: 'system', title: 'Backup Completato', description: 'Backup automatico dati' }
        ];
        
        const activity = activities[Math.floor(Math.random() * activities.length)];
        
        return `
            <div class="activity-item">
                <div class="activity-icon ${activity.type}">
                    ${this.getActivityIcon(activity.type)}
                </div>
                <div class="activity-content">
                    <div class="activity-title">${activity.title}</div>
                    <div class="activity-description">${activity.description}</div>
                </div>
                <div class="activity-time">Ora</div>
            </div>
        `;
    }

    // ===== PLACEHOLDER METHODS FOR OTHER SECTIONS =====
    
    generateCondominiumCards() {
        return '<div class="text-center p-4">Cards condomini in sviluppo...</div>';
    }

    generateDetailedCondosTableRows() {
        return '<tr><td colspan="9" class="text-center p-4">Tabella dettagliata in sviluppo...</td></tr>';
    }

    generateTransactionItems() {
        return '<div class="text-center p-4">Transazioni recenti in sviluppo...</div>';
    }

    generatePaymentsTableRows() {
        return '<tr><td colspan="8" class="text-center p-4">Tabella pagamenti in sviluppo...</td></tr>';
    }

    generateResidentsHTML() {
        return '<div class="text-center p-4"><h2>Gestione Condomini</h2><p>Sezione in sviluppo...</p></div>';
    }

    generateCommunicationsHTML() {
        return '<div class="text-center p-4"><h2>Comunicazioni</h2><p>Sezione in sviluppo...</p></div>';
    }

    generateReportsHTML() {
        return '<div class="text-center p-4"><h2>Report e Analytics</h2><p>Sezione in sviluppo...</p></div>';
    }

    generateIntegrationsHTML() {
        return '<div class="text-center p-4"><h2>Integrazioni</h2><p>Sezione in sviluppo...</p></div>';
    }

    generateSettingsHTML() {
        return '<div class="text-center p-4"><h2>Impostazioni</h2><p>Sezione in sviluppo...</p></div>';
    }

    // Placeholder init methods
    initResidents() {}
    initCommunications() {}
    initReports() {}
    initIntegrations() {}
    initSettings() {}

    // Placeholder action methods
    setupSearchFilter() {}
    loadRecentActivity() {}
    updateActivityFeed() {}
    filterCondominiums() {}
    setupPaymentFilters() {}
    refreshPayments() {}
    addCondominium() { alert('Funzionalità in sviluppo'); }
    manageCondominium(id) { alert(`Gestione condominio ${id} in sviluppo`); }
    exportChart() { alert('Export in sviluppo'); }
    exportCondominiums() { alert('Export in sviluppo'); }
    exportPayments() { alert('Export in sviluppo'); }
    processPayment() { alert('Funzionalità in sviluppo'); }
    showNotifications() { alert('Notifiche in sviluppo'); }
    showUserMenu() { alert('Menu utente in sviluppo'); }
    toggleMobileMenu() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
    }
}

// Global functions
function logout() {
    app.logout();
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.app = new CondoPayApp();
});