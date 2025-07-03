// CondoPay App Demo - Main Application Logic - VERSIONE COMPLETA
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
                        <h3 class="chart-title">Grafico Pagamenti Interattivo</h3>
                        <div>
                            <button class="btn btn-secondary" onclick="app.exportChart()">📊 Esporta</button>
                        </div>
                    </div>
                    <div class="chart-area" id="mainChart">
                        <!-- Il grafico sarà renderizzato qui -->
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
        
        // Initialize the main chart after DOM is ready
        setTimeout(() => {
            if (window.interactiveCharts) {
                interactiveCharts.renderPaymentsChart('mainChart');
            }
        }, 500);
        
        // Simulate real-time updates
        setInterval(() => {
            this.updateActivityFeed();
        }, 30000);
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
                    <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-field">
                            <label>Cerca per nome</label>
                            <input type="text" placeholder="Nome condominio..." id="searchCondominiums" class="form-control">
                        </div>
                        <div class="form-field">
                            <label>Filtra per status</label>
                            <select id="filterStatus" class="form-control">
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
                            <th>Ultimo Aggiornamento</th>
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

            <!-- Payment Methods Chart and Recent -->
            <div class="dashboard-grid">
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">Metodi di Pagamento (Questo Mese)</h3>
                        <select class="btn btn-secondary" style="border: 1px solid #e2e8f0;">
                            <option>Ultimo mese</option>
                            <option>Ultimi 3 mesi</option>
                            <option>Ultimo anno</option>
                        </select>
                    </div>
                    <div class="chart-area" id="paymentMethodsChart">
                        <!-- Il grafico sarà renderizzato qui -->
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
        
        // Initialize payment methods chart
        setTimeout(() => {
            if (window.interactiveCharts) {
                interactiveCharts.renderPaymentMethodsChart('paymentMethodsChart');
            }
        }, 500);
        
        // Auto-refresh payments every 10 seconds
        setInterval(() => {
            this.refreshPayments();
        }, 10000);
    }

    // ===== GENERATE FUNCTIONS =====

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
            <tr data-condo-id="${condo.id}" style="cursor: pointer;" 
                onclick="app.manageCondominium(${condo.id})"
                onmouseenter="this.style.backgroundColor='#f7fafc'"
                onmouseleave="this.style.backgroundColor='white'">
                <td>
                    <div>
                        <div class="font-semibold">${condo.name}</div>
                        <div class="text-sm text-gray-500">${condo.address}</div>
                    </div>
                </td>
                <td>${condo.units}</td>
                <td>€${condo.monthlyAmount.toLocaleString()}</td>
                <td>
                    <span style="color: ${this.getStatusColor(condo.paymentRate)}">${condo.paymentRate}%</span>
                </td>
                <td>${condo.defaultingUnits} unità</td>
                <td><span class="status-badge status-${this.getStatusClass(condo.paymentRate)}">${this.getStatusText(condo.paymentRate)}</span></td>
                <td onclick="event.stopPropagation();">
                    <button class="btn btn-secondary" onclick="app.manageCondominium(${condo.id})" title="Gestisci">
                        ⚙️
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Generate condominium cards for overview
    generateCondominiumCards() {
        const condos = CONDOPAY_MOCK_DATA.condominiums;
        
        return condos.map(condo => `
            <div class="condo-card stat-card ${this.getCondoStatusClass(condo.paymentRate)}" 
                 style="cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;"
                 onclick="app.manageCondominium(${condo.id})"
                 onmouseenter="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)'"
                 onmouseleave="this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 3px rgba(0,0,0,0.1)'">
                
                <div class="card-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <div>
                        <h4 style="margin: 0; font-size: 1.1rem; font-weight: 600;">${condo.name}</h4>
                        <p style="margin: 0.25rem 0 0 0; color: #666; font-size: 0.9rem;">${condo.address}</p>
                    </div>
                    <div class="status-indicator" style="width: 12px; height: 12px; border-radius: 50%; background: ${this.getStatusColor(condo.paymentRate)};"></div>
                </div>
                
                <div class="card-stats" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                    <div>
                        <div style="font-size: 0.8rem; color: #666; margin-bottom: 0.25rem;">Unità</div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: #667eea;">${condo.units}</div>
                    </div>
                    <div>
                        <div style="font-size: 0.8rem; color: #666; margin-bottom: 0.25rem;">Volume Mensile</div>
                        <div style="font-size: 1.1rem; font-weight: bold; color: #48bb78;">€${Utils.Number.formatNumber(condo.monthlyAmount)}</div>
                    </div>
                </div>
                
                <div class="card-metrics" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                            <span style="font-size: 0.8rem; color: #666;">Pagamenti</span>
                            <span style="font-size: 0.9rem; font-weight: 600; color: ${this.getStatusColor(condo.paymentRate)};">${condo.paymentRate}%</span>
                        </div>
                        <div class="progress-bar" style="width: 100%; height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden;">
                            <div style="width: ${condo.paymentRate}%; height: 100%; background: ${this.getStatusColor(condo.paymentRate)}; transition: width 0.3s;"></div>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 0.8rem; color: #666;">Morosità</div>
                        <div style="font-size: 1rem; font-weight: bold; color: ${condo.defaultingUnits > 0 ? '#f56565' : '#48bb78'};">
                            ${condo.defaultingUnits} unità
                        </div>
                    </div>
                </div>
                
                <div class="card-actions" style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #f0f0f0;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.8rem; color: #666;">
                            ${condo.nextAssembly ? `Assemblea: ${Utils.Date.formatDate(condo.nextAssembly)}` : 'Nessuna assemblea programmata'}
                        </span>
                        <div class="quick-actions" style="display: flex; gap: 0.5rem;">
                            <button class="btn btn-sm btn-secondary" onclick="event.stopPropagation(); app.viewCondoResidents(${condo.id})" title="Gestisci Residenti">
                                👥
                            </button>
                            <button class="btn btn-sm btn-secondary" onclick="event.stopPropagation(); app.exportCondoReport(${condo.id})" title="Report Condominio">
                                📊
                            </button>
                            <button class="btn btn-sm btn-secondary" onclick="event.stopPropagation(); app.sendCondoCommunication(${condo.id})" title="Invia Comunicazione">
                                📧
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Generate detailed condominiums table rows
    generateDetailedCondosTableRows() {
        const condos = CONDOPAY_MOCK_DATA.condominiums;
        
        return condos.map(condo => `
            <tr data-condo-id="${condo.id}" style="cursor: pointer;" 
                onclick="app.manageCondominium(${condo.id})"
                onmouseenter="this.style.backgroundColor='#f7fafc'"
                onmouseleave="this.style.backgroundColor='white'">
                
                <td>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div class="status-dot" style="width: 8px; height: 8px; border-radius: 50%; background: ${this.getStatusColor(condo.paymentRate)};"></div>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 0.25rem;">${condo.name}</div>
                            <div style="font-size: 0.9rem; color: #666;">${condo.city}, ${condo.zipCode}</div>
                        </div>
                    </div>
                </td>
                
                <td>
                    <div style="font-size: 0.9rem; color: #666; margin-bottom: 0.25rem;">${condo.address}</div>
                    <div style="display: flex; gap: 0.5rem; font-size: 0.8rem;">
                        ${condo.elevator ? '<span style="background: #e6fffa; color: #00695c; padding: 0.125rem 0.5rem; border-radius: 12px;">Ascensore</span>' : ''}
                        ${condo.parking ? '<span style="background: #e3f2fd; color: #1565c0; padding: 0.125rem 0.5rem; border-radius: 12px;">Parcheggio</span>' : ''}
                        ${condo.garden ? '<span style="background: #e8f5e8; color: #2e7d32; padding: 0.125rem 0.5rem; border-radius: 12px;">Giardino</span>' : ''}
                    </div>
                </td>
                
                <td style="text-align: center;">
                    <div style="font-size: 1.2rem; font-weight: bold; color: #667eea;">${condo.units}</div>
                    <div style="font-size: 0.8rem; color: #666;">unità</div>
                </td>
                
                <td style="text-align: right;">
                    <div style="font-size: 1.1rem; font-weight: bold; color: #48bb78;">€${Utils.Number.formatNumber(condo.monthlyAmount)}</div>
                    <div style="font-size: 0.8rem; color: #666;">mensile</div>
                </td>
                
                <td style="text-align: center;">
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <div style="font-size: 1.1rem; font-weight: bold; color: ${this.getStatusColor(condo.paymentRate)}; margin-bottom: 0.25rem;">
                            ${condo.paymentRate}%
                        </div>
                        <div class="mini-progress" style="width: 60px; height: 4px; background: #e2e8f0; border-radius: 2px; overflow: hidden;">
                            <div style="width: ${condo.paymentRate}%; height: 100%; background: ${this.getStatusColor(condo.paymentRate)}; transition: width 0.3s;"></div>
                        </div>
                    </div>
                </td>
                
                <td style="text-align: center;">
                    <div style="font-size: 1.1rem; font-weight: bold; color: ${condo.defaultingUnits > 0 ? '#f56565' : '#48bb78'};">
                        ${condo.defaultingUnits}
                    </div>
                    <div style="font-size: 0.8rem; color: #666;">unità</div>
                </td>
                
                <td style="text-align: center;">
                    <div style="font-size: 0.9rem; color: #666;">
                        ${Utils.Date.formatDate(condo.lastSync)}
                    </div>
                    <div style="font-size: 0.8rem; color: #999;">
                        ${Utils.Date.timeAgo(condo.lastSync)}
                    </div>
                </td>
                
                <td style="text-align: center;">
                    <span class="status-badge status-${this.getCondoStatusClass(condo.paymentRate)}">
                        ${this.getStatusText(condo.paymentRate)}
                    </span>
                </td>
                
                <td>
                    <div class="action-buttons" style="display: flex; gap: 0.5rem;" onclick="event.stopPropagation();">
                        <button class="btn btn-sm btn-primary" onclick="app.manageCondominium(${condo.id})" title="Gestisci">
                            ⚙️
                        </button>
                        <button class="btn btn-sm btn-secondary" onclick="app.viewCondoResidents(${condo.id})" title="Residenti">
                            👥
                        </button>
                        <button class="btn btn-sm btn-secondary" onclick="app.exportCondoReport(${condo.id})" title="Report">
                            📊
                        </button>
                        <button class="btn btn-sm btn-secondary" onclick="app.sendCondoCommunication(${condo.id})" title="Comunica">
                            📧
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // Generate transaction items for recent activity
    generateTransactionItems() {
        const payments = CONDOPAY_MOCK_DATA.payments.slice(0, 5);
        
        return payments.map(payment => {
            const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === payment.condominiumId);
            const resident = CONDOPAY_MOCK_DATA.residents.find(r => r.id === payment.residentId);
            const statusIcon = payment.status === 'completed' ? '✅' : payment.status === 'pending' ? '⏳' : '❌';
            
            return `
                <div class="activity-item transaction-item" style="cursor: pointer;" onclick="app.viewPaymentDetails('${payment.id}')">
                    <div class="activity-icon ${payment.status}" style="font-size: 1.2rem;">
                        ${statusIcon}
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">€${payment.amount.toLocaleString()}</div>
                        <div class="activity-description">
                            ${condo?.name || 'N/A'} - ${resident?.unit || 'N/A'}
                        </div>
                    </div>
                    <div class="activity-time">${this.formatTimeAgo(payment.date)}</div>
                </div>
            `;
        }).join('');
    }

    // Generate detailed payments table rows
    generatePaymentsTableRows() {
        const payments = CONDOPAY_MOCK_DATA.payments;
        
        return payments.map(payment => {
            const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === payment.condominiumId);
            const resident = CONDOPAY_MOCK_DATA.residents.find(r => r.id === payment.residentId);
            
            return `
                <tr style="cursor: pointer;" onclick="app.viewPaymentDetails('${payment.id}')"
                    onmouseenter="this.style.backgroundColor='#f7fafc'"
                    onmouseleave="this.style.backgroundColor='white'">
                    
                    <td class="font-semibold" style="font-family: monospace;">${payment.id}</td>
                    <td>${condo?.name || 'N/A'}</td>
                    <td>${resident?.unit || 'N/A'}</td>
                    <td style="text-align: right; font-weight: bold;">€${payment.amount.toLocaleString()}</td>
                    <td>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span>${this.getMethodIcon(payment.method)}</span>
                            <span>${payment.method === 'stripe' ? 'Stripe' : payment.method === 'bank_transfer' ? 'Bonifico' : 'Contanti'}</span>
                        </div>
                    </td>
                    <td>${Utils.Date.formatDate(payment.date)}</td>
                    <td>
                        <span class="status-badge status-${payment.status === 'completed' ? 'success' : payment.status === 'pending' ? 'warning' : 'danger'}">
                            ${payment.status === 'completed' ? 'Completato' : payment.status === 'pending' ? 'In attesa' : 'Fallito'}
                        </span>
                    </td>
                    <td onclick="event.stopPropagation();">
                        <button class="btn btn-secondary btn-sm" onclick="app.viewPaymentDetails('${payment.id}')" title="Dettagli">
                            👁️
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
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
        if (paymentRate >= 95) return '#48bb78';
        if (paymentRate >= 85) return '#ed8936';
        return '#f56565';
    }

    getStatusClass(paymentRate) {
        if (paymentRate >= 95) return 'success';
        if (paymentRate >= 85) return 'warning';
        return 'danger';
    }

    getCondoStatusClass(paymentRate) {
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

    getMethodIcon(method) {
        const icons = {
            'stripe': '💳',
            'bank_transfer': '🏦',
            'cash': '💰',
            'paypal': '💵'
        };
        return icons[method] || '💳';
    }

    formatTimeAgo(timestamp) {
        const now = new Date();
        const time = new Date(timestamp);
        const diffMs = now - time;
        
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 1) return 'Ora';
        if (diffMins < 60) return `${diffMins} min fa`;
        if (diffHours < 24) return `${diffHours} ore fa`;
        if (diffDays < 7) return `${diffDays} giorni fa`;
        return Utils.Date.formatDate(time);
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
    addCondominium() { 
        if (typeof this.addCondominium !== 'undefined' && window.app && window.app.addCondominium) {
            // Usa l'implementazione completa se disponibile
            return;
        }
        alert('Funzionalità in sviluppo'); 
    }
    manageCondominium(id) { 
        if (typeof window.app !== 'undefined' && window.app.manageCondominium && window.app.manageCondominium !== this.manageCondominium) {
            // Usa l'implementazione completa se disponibile
            return window.app.manageCondominium(id);
        }
        alert(`Gestione condominio ${id} in sviluppo`); 
    }
    exportChart() { alert('Export in sviluppo'); }
    exportCondominiums() { alert('Export in sviluppo'); }
    exportPayments() { alert('Export in sviluppo'); }
    processPayment() { alert('Funzionalità in sviluppo'); }
    viewPaymentDetails(id) { 
        if (typeof window.app !== 'undefined' && window.app.viewPaymentDetails && window.app.viewPaymentDetails !== this.viewPaymentDetails) {
            return window.app.viewPaymentDetails(id);
        }
        alert(`Dettagli pagamento ${id} in sviluppo`); 
    }
    viewCondoResidents(id) { 
        if (typeof window.app !== 'undefined' && window.app.viewCondoResidents && window.app.viewCondoResidents !== this.viewCondoResidents) {
            return window.app.viewCondoResidents(id);
        }
        alert(`Residenti condominio ${id} in sviluppo`); 
    }
    exportCondoReport(id) { 
        if (typeof window.app !== 'undefined' && window.app.exportCondoReport && window.app.exportCondoReport !== this.exportCondoReport) {
            return window.app.exportCondoReport(id);
        }
        alert(`Report condominio ${id} in sviluppo`); 
    }
    sendCondoCommunication(id) { 
        if (typeof window.app !== 'undefined' && window.app.sendCondoCommunication && window.app.sendCondoCommunication !== this.sendCondoCommunication) {
            return window.app.sendCondoCommunication(id);
        }
        alert(`Comunicazione condominio ${id} in sviluppo`); 
    }
    
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

function showNotifications() {
    if (typeof window.notificationCenter !== 'undefined') {
        window.notificationCenter.showNotificationCenter();
    } else {
        alert('Centro notifiche in sviluppo');
    }
}

function showUserMenu() {
    if (typeof window.showUserMenu !== 'undefined' && window.showUserMenu !== showUserMenu) {
        return window.showUserMenu();
    }
    alert('Menu utente in sviluppo');
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.app = new CondoPayApp();
});