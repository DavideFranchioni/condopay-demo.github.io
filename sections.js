// CondoPay App Demo - Additional Sections
// Sezioni complete per Pagamenti, Residenti, Comunicazioni, Report, etc.

// Extend the main CondoPayApp class with additional sections
CondoPayApp.prototype.generatePaymentsHTML = function() {
    return `
        <div class="content-header mb-4">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h2>Pagamenti e Transazioni</h2>
                <div>
                    <button class="btn btn-secondary" onclick="app.exportPayments()">📊 Esporta</button>
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

        <!-- Payments Chart and Recent -->
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
                <div class="chart-area">
                    📊 Grafico Metodi Pagamento<br>
                    <div style="margin-top: 1rem; font-size: 0.9rem;">
                        <div>🟦 Stripe: 75% (€139.065)</div>
                        <div>🟨 Bonifico: 20% (€37.084)</div>
                        <div>🟩 Contanti: 5% (€9.271)</div>
                    </div>
                </div>
            </div>
            
            <div class="activity-list">
                <div class="activity-header">Transazioni Recenti</div>
                ${this.generateDetailedTransactionItems()}
            </div>
        </div>

        <!-- Payments Table -->
        <div class="data-table">
            <div class="table-header">
                <h3 class="table-title">Tutti i Pagamenti</h3>
                <div class="table-filters">
                    <input type="date" class="search-input" id="filterDate" value="2025-07-01">
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
                        <th>Commissione</th>
                        <th>Metodo</th>
                        <th>Data</th>
                        <th>Status</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.generateDetailedPaymentsTableRows()}
                </tbody>
            </table>
        </div>
    `;
};

CondoPayApp.prototype.generateResidentsHTML = function() {
    return `
        <div class="content-header mb-4">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h2>Gestione Condomini</h2>
                <div>
                    <button class="btn btn-secondary" onclick="app.importResidents()">📥 Importa</button>
                    <button class="btn btn-primary" onclick="app.addResident()">+ Nuovo Condomino</button>
                </div>
            </div>
        </div>

        <!-- Residents Stats -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-title">Totale Condomini</div>
                    <div class="stat-icon">👥</div>
                </div>
                <div class="stat-value">847</div>
                <div class="stat-change positive">+12 questo mese</div>
            </div>
            
            <div class="stat-card success">
                <div class="stat-header">
                    <div class="stat-title">Pagamenti Regolari</div>
                    <div class="stat-icon">✅</div>
                </div>
                <div class="stat-value">798</div>
                <div class="stat-change positive">94.2% del totale</div>
            </div>
            
            <div class="stat-card warning">
                <div class="stat-header">
                    <div class="stat-title">In Ritardo</div>
                    <div class="stat-icon">⏰</div>
                </div>
                <div class="stat-value">23</div>
                <div class="stat-change negative">2.7% del totale</div>
            </div>
            
            <div class="stat-card danger">
                <div class="stat-header">
                    <div class="stat-title">Morosi</div>
                    <div class="stat-icon">❌</div>
                </div>
                <div class="stat-value">26</div>
                <div class="stat-change negative">3.1% del totale</div>
            </div>
        </div>

        <!-- Filters and Search -->
        <div class="data-table mb-4">
            <div class="table-header">
                <h3 class="table-title">Filtri e Ricerca</h3>
            </div>
            <div style="padding: 1.5rem;">
                <div class="form-row">
                    <div class="form-field">
                        <label>Cerca per nome/email</label>
                        <input type="text" placeholder="Nome o email..." id="searchResidents">
                    </div>
                    <div class="form-field">
                        <label>Condominio</label>
                        <select id="filterCondominium">
                            <option value="">Tutti i condomini</option>
                            <option value="1">Residenza Milano Centro</option>
                            <option value="2">Palazzo Navigli</option>
                            <option value="3">Condominio Porta Nuova</option>
                            <option value="4">Residenza Sempione</option>
                            <option value="5">Palazzo San Siro</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field">
                        <label>Status Pagamento</label>
                        <select id="filterPaymentStatus">
                            <option value="">Tutti</option>
                            <option value="paid">Pagato</option>
                            <option value="pending">In attesa</option>
                            <option value="overdue">Scaduto</option>
                        </select>
                    </div>
                    <div class="form-field">
                        <label>Piano</label>
                        <select id="filterFloor">
                            <option value="">Tutti i piani</option>
                            <option value="0">Piano Terra</option>
                            <option value="1">Primo Piano</option>
                            <option value="2">Secondo Piano</option>
                            <option value="3">Terzo Piano</option>
                            <option value="4">Quarto Piano</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <!-- Residents Table -->
        <div class="data-table">
            <div class="table-header">
                <h3 class="table-title">Elenco Condomini</h3>
                <div class="table-filters">
                    <button class="btn btn-secondary" onclick="app.exportResidents()">📊 Esporta</button>
                    <button class="btn btn-secondary" onclick="app.sendBulkCommunication()">📧 Invio Multiplo</button>
                </div>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" id="selectAll" onchange="app.toggleSelectAll()"></th>
                        <th>Condomino</th>
                        <th>Condominio</th>
                        <th>Unità</th>
                        <th>Quota Mensile</th>
                        <th>Saldo</th>
                        <th>Ultimo Pagamento</th>
                        <th>Status</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.generateResidentsTableRows()}
                </tbody>
            </table>
        </div>
    `;
};

CondoPayApp.prototype.generateCommunicationsHTML = function() {
    return `
        <div class="content-header mb-4">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h2>Comunicazioni</h2>
                <div>
                    <button class="btn btn-secondary" onclick="app.viewTemplates()">📝 Template</button>
                    <button class="btn btn-primary" onclick="app.newCommunication()">+ Nuova Comunicazione</button>
                </div>
            </div>
        </div>

        <!-- Communication Stats -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-title">Email Inviate (Oggi)</div>
                    <div class="stat-icon">📧</div>
                </div>
                <div class="stat-value">142</div>
                <div class="stat-change positive">+23% vs ieri</div>
            </div>
            
            <div class="stat-card info">
                <div class="stat-header">
                    <div class="stat-title">SMS Inviati</div>
                    <div class="stat-icon">📱</div>
                </div>
                <div class="stat-value">67</div>
                <div class="stat-change positive">+12% vs ieri</div>
            </div>
            
            <div class="stat-card success">
                <div class="stat-header">
                    <div class="stat-title">Tasso Apertura</div>
                    <div class="stat-icon">👁️</div>
                </div>
                <div class="stat-value">87.3%</div>
                <div class="stat-change positive">+2.1% vs media</div>
            </div>
            
            <div class="stat-card warning">
                <div class="stat-header">
                    <div class="stat-title">WhatsApp</div>
                    <div class="stat-icon">💬</div>
                </div>
                <div class="stat-value">28</div>
                <div class="stat-change positive">+8 vs ieri</div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="data-table mb-4">
            <div class="table-header">
                <h3 class="table-title">Azioni Rapide</h3>
            </div>
            <div style="padding: 1.5rem;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <button class="btn btn-primary" onclick="app.sendPaymentReminders()">
                        📧 Solleciti Pagamento
                    </button>
                    <button class="btn btn-secondary" onclick="app.sendAssemblyNotice()">
                        📅 Convocazione Assemblea
                    </button>
                    <button class="btn btn-secondary" onclick="app.sendMaintenanceNotice()">
                        🔧 Avviso Manutenzione
                    </button>
                    <button class="btn btn-secondary" onclick="app.sendCustomMessage()">
                        ✏️ Messaggio Personalizzato
                    </button>
                </div>
            </div>
        </div>

        <!-- Recent Communications -->
        <div class="dashboard-grid">
            <div class="data-table">
                <div class="table-header">
                    <h3 class="table-title">Comunicazioni Recenti</h3>
                    <select class="btn btn-secondary" style="border: 1px solid #e2e8f0;">
                        <option>Ultimi 7 giorni</option>
                        <option>Ultimo mese</option>
                        <option>Ultimo trimestre</option>
                    </select>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Oggetto</th>
                            <th>Destinatari</th>
                            <th>Canale</th>
                            <th>Data Invio</th>
                            <th>Status</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.generateCommunicationsTableRows()}
                    </tbody>
                </table>
            </div>

            <!-- Templates Section -->
            <div class="data-table">
                <div class="table-header">
                    <h3 class="table-title">Template Più Usati</h3>
                    <button class="btn btn-primary" onclick="app.manageTemplates()">Gestisci Template</button>
                </div>
                
                <div style="padding: 1rem;">
                    <div class="activity-item" style="cursor: pointer;" onclick="app.useTemplate('payment_reminder')">
                        <div class="activity-icon payment">📧</div>
                        <div class="activity-content">
                            <div class="activity-title">Sollecito Pagamento</div>
                            <div class="activity-description">Template standard per solleciti</div>
                        </div>
                        <div class="activity-time">Usato 45 volte</div>
                    </div>
                    
                    <div class="activity-item" style="cursor: pointer;" onclick="app.useTemplate('assembly_notice')">
                        <div class="activity-icon notification">📅</div>
                        <div class="activity-content">
                            <div class="activity-title">Convocazione Assemblea</div>
                            <div class="activity-description">Convocazione assemblea condominiale</div>
                        </div>
                        <div class="activity-time">Usato 12 volte</div>
                    </div>
                    
                    <div class="activity-item" style="cursor: pointer;" onclick="app.useTemplate('maintenance')">
                        <div class="activity-icon alert">🔧</div>
                        <div class="activity-content">
                            <div class="activity-title">Avviso Manutenzione</div>
                            <div class="activity-description">Comunicazione lavori manutenzione</div>
                        </div>
                        <div class="activity-time">Usato 8 volte</div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

CondoPayApp.prototype.generateReportsHTML = function() {
    return `
        <div class="content-header mb-4">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h2>Report e Analytics</h2>
                <div>
                    <button class="btn btn-secondary" onclick="app.scheduleReport()">⏰ Programma Report</button>
                    <button class="btn btn-primary" onclick="app.generateCustomReport()">📊 Report Personalizzato</button>
                </div>
            </div>
        </div>

        <!-- Report Quick Stats -->
        <div class="stats-grid">
            <div class="stat-card success">
                <div class="stat-header">
                    <div class="stat-title">Performance Globale</div>
                    <div class="stat-icon">📈</div>
                </div>
                <div class="stat-value">8.7/10</div>
                <div class="stat-change positive">+0.3 vs mese scorso</div>
            </div>
            
            <div class="stat-card info">
                <div class="stat-header">
                    <div class="stat-title">ROI Medio</div>
                    <div class="stat-icon">💰</div>
                </div>
                <div class="stat-value">1.247%</div>
                <div class="stat-change positive">vs metodi tradizionali</div>
            </div>
            
            <div class="stat-card warning">
                <div class="stat-header">
                    <div class="stat-title">Tempo Medio Incasso</div>
                    <div class="stat-icon">⏱️</div>
                </div>
                <div class="stat-value">2.3 giorni</div>
                <div class="stat-change positive">-87% vs cartaceo</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-title">Soddisfazione Clienti</div>
                    <div class="stat-icon">😊</div>
                </div>
                <div class="stat-value">9.2/10</div>
                <div class="stat-change positive">+0.5 vs trimestre</div>
            </div>
        </div>

        <!-- Charts Section -->
        <div class="dashboard-grid">
            <div class="chart-container">
                <div class="chart-header">
                    <h3 class="chart-title">Trend Pagamenti (6 Mesi)</h3>
                    <div>
                        <select class="btn btn-secondary" style="border: 1px solid #e2e8f0;">
                            <option>Ultimi 6 mesi</option>
                            <option>Ultimo anno</option>
                            <option>Ultimi 2 anni</option>
                        </select>
                    </div>
                </div>
                <div class="chart-area">
                    📈 Grafico Trend Pagamenti<br>
                    <div style="margin-top: 1rem; font-size: 0.9rem; text-align: left;">
                        <div>Gen: €175k (97.2%) | Feb: €180k (99.2%)</div>
                        <div>Mar: €183k (99.0%) | Apr: €186k (98.7%)</div>
                        <div>Mag: €189k (99.6%) | Giu: €185k (94.2%)</div>
                        <div style="color: #38a169; margin-top: 0.5rem;">
                            <strong>↗️ Crescita media: +2.1% mensile</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div class="chart-container">
                <div class="chart-header">
                    <h3 class="chart-title">Performance per Condominio</h3>
                </div>
                <div class="chart-area">
                    📊 Grafico Performance<br>
                    <div style="margin-top: 1rem; font-size: 0.9rem; text-align: left;">
                        <div>🟢 Palazzo Navigli: 10.0/10</div>
                        <div>🟢 Residenza Milano Centro: 9.5/10</div>
                        <div>🟡 Residenza Sempione: 8.9/10</div>
                        <div>🟡 Condominio Porta Nuova: 7.8/10</div>
                        <div>🔴 Palazzo San Siro: 6.2/10</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Detailed Reports Table -->
        <div class="data-table">
            <div class="table-header">
                <h3 class="table-title">Report Disponibili</h3>
                <div class="table-filters">
                    <select class="search-input" id="reportCategory">
                        <option value="">Tutte le categorie</option>
                        <option value="financial">Finanziari</option>
                        <option value="operational">Operativi</option>
                        <option value="performance">Performance</option>
                        <option value="compliance">Compliance</option>
                    </select>
                    <select class="search-input" id="reportPeriod">
                        <option value="monthly">Mensili</option>
                        <option value="quarterly">Trimestrali</option>
                        <option value="yearly">Annuali</option>
                        <option value="custom">Personalizzato</option>
                    </select>
                </div>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Report</th>
                        <th>Categoria</th>
                        <th>Periodo</th>
                        <th>Ultimo Aggiornamento</th>
                        <th>Formato</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.generateReportsTableRows()}
                </tbody>
            </table>
        </div>

        <!-- KPI Dashboard -->
        <div class="data-table">
            <div class="table-header">
                <h3 class="table-title">KPI Dashboard</h3>
            </div>
            <div style="padding: 1.5rem;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                    <div class="stat-card success">
                        <div class="stat-title">Efficienza Incassi</div>
                        <div class="stat-value">94.2%</div>
                        <div class="stat-change positive">Target: 90% ✅</div>
                    </div>
                    <div class="stat-card warning">
                        <div class="stat-title">Tempo Medio Recupero</div>
                        <div class="stat-value">45 giorni</div>
                        <div class="stat-change positive">Target: 60 giorni ✅</div>
                    </div>
                    <div class="stat-card info">
                        <div class="stat-title">Soddisfazione NPS</div>
                        <div class="stat-value">+72</div>
                        <div class="stat-change positive">Target: +50 ✅</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-title">Cost per Collection</div>
                        <div class="stat-value">€0.45</div>
                        <div class="stat-change positive">-€1.23 vs cartaceo</div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

CondoPayApp.prototype.generateIntegrationsHTML = function() {
    return `
        <div class="content-header mb-4">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h2>Integrazioni</h2>
                <div>
                    <button class="btn btn-secondary" onclick="app.syncAll()">🔄 Sincronizza Tutto</button>
                    <button class="btn btn-primary" onclick="app.addIntegration()">+ Nuova Integrazione</button>
                </div>
            </div>
        </div>

        <!-- Integration Status -->
        <div class="stats-grid">
            <div class="stat-card success">
                <div class="stat-header">
                    <div class="stat-title">Integrazioni Attive</div>
                    <div class="stat-icon">🔗</div>
                </div>
                <div class="stat-value">5/5</div>
                <div class="stat-change positive">Tutte funzionanti</div>
            </div>
            
            <div class="stat-card info">
                <div class="stat-header">
                    <div class="stat-title">Ultima Sincronizzazione</div>
                    <div class="stat-icon">⏰</div>
                </div>
                <div class="stat-value">2 min fa</div>
                <div class="stat-change positive">Domu Studio</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-title">Dati Sincronizzati</div>
                    <div class="stat-icon">📊</div>
                </div>
                <div class="stat-value">1.247</div>
                <div class="stat-change positive">Record oggi</div>
            </div>
            
            <div class="stat-card success">
                <div class="stat-header">
                    <div class="stat-title">Uptime</div>
                    <div class="stat-icon">✅</div>
                </div>
                <div class="stat-value">99.8%</div>
                <div class="stat-change positive">Ultimo mese</div>
            </div>
        </div>

        <!-- Integration Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
            ${this.generateIntegrationCards()}
        </div>

        <!-- API Logs -->
        <div class="data-table">
            <div class="table-header">
                <h3 class="table-title">Log Attività API</h3>
                <div class="table-filters">
                    <select class="search-input" id="logLevel">
                        <option value="">Tutti i livelli</option>
                        <option value="info">Info</option>
                        <option value="warning">Warning</option>
                        <option value="error">Error</option>
                    </select>
                    <select class="search-input" id="logService">
                        <option value="">Tutti i servizi</option>
                        <option value="domu">Domu Studio</option>
                        <option value="stripe">Stripe</option>
                        <option value="twilio">Twilio</option>
                        <option value="mailgun">Mailgun</option>
                    </select>
                </div>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Servizio</th>
                        <th>Operazione</th>
                        <th>Status</th>
                        <th>Durata</th>
                        <th>Record</th>
                        <th>Dettagli</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.generateAPILogsTableRows()}
                </tbody>
            </table>
        </div>
    `;
};

CondoPayApp.prototype.generateSettingsHTML = function() {
    return `
        <div class="content-header mb-4">
            <h2>Impostazioni</h2>
        </div>

        <!-- Settings Navigation -->
        <div class="data-table mb-4">
            <div style="padding: 1rem;">
                <div style="display: flex; gap: 1rem; border-bottom: 1px solid #e2e8f0; margin-bottom: 1rem;">
                    <button class="btn btn-secondary settings-tab active" data-tab="general">Generali</button>
                    <button class="btn btn-secondary settings-tab" data-tab="payments">Pagamenti</button>
                    <button class="btn btn-secondary settings-tab" data-tab="notifications">Notifiche</button>
                    <button class="btn btn-secondary settings-tab" data-tab="security">Sicurezza</button>
                    <button class="btn btn-secondary settings-tab" data-tab="billing">Fatturazione</button>
                </div>
                
                <div id="settingsContent">
                    ${this.generateGeneralSettingsHTML()}
                </div>
            </div>
        </div>
    `;
};

// Helper methods for generating table rows and components
CondoPayApp.prototype.generateDetailedTransactionItems = function() {
    const transactions = CONDOPAY_MOCK_DATA.payments || [];
    
    return transactions.slice(0, 5).map(payment => {
        const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === payment.condominiumId);
        const resident = CONDOPAY_MOCK_DATA.residents.find(r => r.id === payment.residentId);
        
        return `
            <div class="activity-item">
                <div class="activity-icon ${payment.status === 'completed' ? 'payment' : payment.status === 'pending' ? 'notification' : 'alert'}">
                    ${payment.status === 'completed' ? '💳' : payment.status === 'pending' ? '⏳' : '❌'}
                </div>
                <div class="activity-content">
                    <div class="activity-title">€${payment.amount.toLocaleString()}</div>
                    <div class="activity-description">${condo?.name} - ${resident?.unit}</div>
                </div>
                <div class="activity-time">${this.formatTimeAgo(payment.date)}</div>
            </div>
        `;
    }).join('');
};

CondoPayApp.prototype.generateDetailedPaymentsTableRows = function() {
    const payments = CONDOPAY_MOCK_DATA.payments || [];
    
    return payments.map(payment => {
        const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === payment.condominiumId);
        const resident = CONDOPAY_MOCK_DATA.residents.find(r => r.id === payment.residentId);
        
        return `
            <tr>
                <td class="font-semibold">${payment.id}</td>
                <td>${condo?.name || 'N/A'}</td>
                <td>${resident?.unit || 'N/A'}</td>
                <td>€${payment.amount.toLocaleString()}</td>
                <td>€${payment.commission?.toFixed(2) || '0.00'}</td>
                <td>
                    <span class="status-badge status-${payment.method === 'stripe' ? 'info' : 'secondary'}">
                        ${payment.method === 'stripe' ? 'Stripe' : payment.method === 'bank_transfer' ? 'Bonifico' : 'Contanti'}
                    </span>
                </td>
                <td>${new Date(payment.date).toLocaleDateString('it-IT')}</td>
                <td>
                    <span class="status-badge status-${payment.status === 'completed' ? 'success' : payment.status === 'pending' ? 'warning' : 'danger'}">
                        ${payment.status === 'completed' ? 'Completato' : payment.status === 'pending' ? 'In attesa' : 'Fallito'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-secondary" onclick="app.viewPaymentDetails('${payment.id}')">Dettagli</button>
                </td>
            </tr>
        `;
    }).join('');
};

CondoPayApp.prototype.generateResidentsTableRows = function() {
    const residents = CONDOPAY_MOCK_DATA.residents || [];
    
    return residents.map(resident => {
        const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === resident.condominiumId);
        
        return `
            <tr>
                <td><input type="checkbox" name="selectedResidents" value="${resident.id}"></td>
                <td>
                    <div>
                        <div class="font-semibold">${resident.owner}</div>
                        <div class="text-sm text-gray-500">${resident.email}</div>
                        <div class="text-sm text-gray-500">${resident.phone}</div>
                    </div>
                </td>
                <td>${condo?.name || 'N/A'}</td>
                <td>${resident.unit}</td>
                <td>€${resident.monthlyFee.toLocaleString()}</td>
                <td class="${resident.balance < 0 ? 'text-red-600' : 'text-green-600'}">
                    €${resident.balance.toLocaleString()}
                </td>
                <td>${resident.lastPayment ? new Date(resident.lastPayment).toLocaleDateString('it-IT') : 'Mai'}</td>
                <td>
                    <span class="status-badge status-${resident.paymentStatus === 'paid' ? 'success' : resident.paymentStatus === 'pending' ? 'warning' : 'danger'}">
                        ${resident.paymentStatus === 'paid' ? 'Pagato' : resident.paymentStatus === 'pending' ? 'In attesa' : 'Scaduto'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-secondary" onclick="app.manageResident(${resident.id})">Gestisci</button>
                </td>
            </tr>
        `;
    }).join('');
};

CondoPayApp.prototype.generateCommunicationsTableRows = function() {
    const communications = CONDOPAY_MOCK_DATA.communications || [];
    
    return communications.map(comm => {
        const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === comm.condominiumId);
        
        return `
            <tr>
                <td>
                    <span class="status-badge status-${comm.type === 'reminder' ? 'warning' : comm.type === 'notice' ? 'info' : 'secondary'}">
                        ${comm.type === 'reminder' ? '📧 Sollecito' : comm.type === 'notice' ? '📢 Avviso' : '🔧 Manutenzione'}
                    </span>
                </td>
                <td class="font-semibold">${comm.title}</td>
                <td>
                    ${comm.recipientType === 'all' ? 'Tutti i condomini' : `${comm.recipients.length} condomini`}<br>
                    <span class="text-sm text-gray-500">${condo?.name || 'Tutti i condomini'}</span>
                </td>
                <td>
                    <span class="status-badge status-info">
                        ${comm.channel === 'email' ? '📧 Email' : comm.channel === 'sms' ? '📱 SMS' : comm.channel === 'email_sms' ? '📧📱 Email+SMS' : '💬 WhatsApp'}
                    </span>
                </td>
                <td>${new Date(comm.sentDate).toLocaleDateString('it-IT')}</td>
                <td>
                    <span class="status-badge status-${comm.status === 'sent' ? 'success' : comm.status === 'scheduled' ? 'warning' : 'pending'}">
                        ${comm.status === 'sent' ? 'Inviato' : comm.status === 'scheduled' ? 'Programmato' : 'Bozza'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-secondary" onclick="app.viewCommunication(${comm.id})">Dettagli</button>
                </td>
            </tr>
        `;
    }).join('');
};

CondoPayApp.prototype.generateReportsTableRows = function() {
    const reports = [
        { name: "Report Finanziario Mensile", category: "financial", period: "monthly", updated: "2025-07-01", format: "PDF" },
        { name: "Performance Condomini", category: "performance", period: "monthly", updated: "2025-07-01", format: "Excel" },
        { name: "Analisi Morosità", category: "operational", period: "weekly", updated: "2025-07-03", format: "PDF" },
        { name: "Compliance GDPR", category: "compliance", period: "quarterly", updated: "2025-04-01", format: "PDF" },
        { name: "Trend Pagamenti", category: "financial", period: "monthly", updated: "2025-07-01", format: "Excel" }
    ];
    
    return reports.map((report, index) => `
        <tr>
            <td class="font-semibold">${report.name}</td>
            <td>
                <span class="status-badge status-${report.category === 'financial' ? 'success' : report.category === 'operational' ? 'info' : report.category === 'performance' ? 'warning' : 'secondary'}">
                    ${report.category === 'financial' ? 'Finanziario' : report.category === 'operational' ? 'Operativo' : report.category === 'performance' ? 'Performance' : 'Compliance'}
                </span>
            </td>
            <td>${report.period === 'monthly' ? 'Mensile' : report.period === 'weekly' ? 'Settimanale' : report.period === 'quarterly' ? 'Trimestrale' : 'Annuale'}</td>
            <td>${new Date(report.updated).toLocaleDateString('it-IT')}</td>
            <td>
                <span class="status-badge status-info">${report.format}</span>
            </td>
            <td>
                <button class="btn btn-secondary" onclick="app.downloadReport(${index})">📥 Download</button>
                <button class="btn btn-secondary" onclick="app.viewReport(${index})">👁️ Visualizza</button>
            </td>
        </tr>
    `).join('');
};

CondoPayApp.prototype.generateIntegrationCards = function() {
    const integrations = CONDOPAY_MOCK_DATA.integrations || [];
    
    return integrations.map(integration => `
        <div class="data-table">
            <div class="table-header">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="font-size: 1.5rem;">
                        ${integration.id === 'domu' ? '🏢' : integration.id === 'stripe' ? '💳' : integration.id === 'twilio' ? '📱' : integration.id === 'mailgun' ? '📧' : '🔐'}
                    </div>
                    <div>
                        <h3 class="table-title">${integration.name}</h3>
                        <span class="status-badge status-${integration.status === 'connected' ? 'success' : 'danger'}">
                            ${integration.status === 'connected' ? 'Connesso' : 'Disconnesso'}
                        </span>
                    </div>
                </div>
                <button class="btn btn-secondary" onclick="app.configureIntegration('${integration.id}')">
                    ⚙️ Configura
                </button>
            </div>
            <div style="padding: 1rem;">
                <p class="text-sm text-gray-600 mb-3">${integration.description}</p>
                <div class="text-sm">
                    <div><strong>Ultima Sync:</strong> ${this.formatTimeAgo(integration.lastSync)}</div>
                    <div><strong>Frequenza:</strong> ${integration.syncFrequency === 'realtime' ? 'Real-time' : integration.syncFrequency === 'hourly' ? 'Ogni ora' : 'Su richiesta'}</div>
                    <div><strong>Dati:</strong> ${integration.dataTypes.join(', ')}</div>
                </div>
                <div style="margin-top: 1rem;">
                    <button class="btn btn-primary" onclick="app.syncIntegration('${integration.id}')">🔄 Sincronizza</button>
                    <button class="btn btn-secondary" onclick="app.testIntegration('${integration.id}')">🧪 Test</button>
                </div>
            </div>
        </div>
    `).join('');
};

CondoPayApp.prototype.generateAPILogsTableRows = function() {
    const logs = [
        { time: "2025-07-03T14:30:00Z", service: "domu", operation: "sync_residents", status: "success", duration: "1.2s", records: 847 },
        { time: "2025-07-03T14:25:00Z", service: "stripe", operation: "process_payment", status: "success", duration: "0.8s", records: 1 },
        { time: "2025-07-03T14:20:00Z", service: "twilio", operation: "send_sms", status: "success", duration: "2.1s", records: 3 },
        { time: "2025-07-03T14:15:00Z", service: "mailgun", operation: "send_email", status: "warning", duration: "5.2s", records: 15 },
        { time: "2025-07-03T14:10:00Z", service: "domu", operation: "sync_payments", status: "error", duration: "10.0s", records: 0 }
    ];
    
    return logs.map(log => `
        <tr>
            <td>${new Date(log.time).toLocaleString('it-IT')}</td>
            <td>
                <span class="status-badge status-info">
                    ${log.service.charAt(0).toUpperCase() + log.service.slice(1)}
                </span>
            </td>
            <td>${log.operation}</td>
            <td>
                <span class="status-badge status-${log.status === 'success' ? 'success' : log.status === 'warning' ? 'warning' : 'danger'}">
                    ${log.status === 'success' ? 'Successo' : log.status === 'warning' ? 'Warning' : 'Errore'}
                </span>
            </td>
            <td>${log.duration}</td>
            <td>${log.records}</td>
            <td>
                <button class="btn btn-secondary" onclick="app.viewLogDetails()">Dettagli</button>
            </td>
        </tr>
    `).join('');
};

CondoPayApp.prototype.generateGeneralSettingsHTML = function() {
    const settings = CONDOPAY_MOCK_DATA.settings?.general || {};
    
    return `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
            <div>
                <h4 class="font-semibold mb-3">Informazioni Azienda</h4>
                <div class="form-field">
                    <label>Nome Azienda</label>
                    <input type="text" value="${settings.companyName || ''}" id="companyName">
                </div>
                <div class="form-field">
                    <label>Indirizzo</label>
                    <input type="text" value="${settings.companyAddress || ''}" id="companyAddress">
                </div>
                <div class="form-field">
                    <label>Telefono</label>
                    <input type="tel" value="${settings.companyPhone || ''}" id="companyPhone">
                </div>
                <div class="form-field">
                    <label>Email</label>
                    <input type="email" value="${settings.companyEmail || ''}" id="companyEmail">
                </div>
                <div class="form-field">
                    <label>Partita IVA</label>
                    <input type="text" value="${settings.companyVat || ''}" id="companyVat">
                </div>
            </div>
            
            <div>
                <h4 class="font-semibold mb-3">Preferenze Regionali</h4>
                <div class="form-field">
                    <label>Fuso Orario</label>
                    <select id="timezone">
                        <option value="Europe/Rome" ${settings.timezone === 'Europe/Rome' ? 'selected' : ''}>Europe/Rome</option>
                        <option value="Europe/London">Europe/London</option>
                        <option value="America/New_York">America/New_York</option>
                    </select>
                </div>
                <div class="form-field">
                    <label>Lingua</label>
                    <select id="language">
                        <option value="it" ${settings.language === 'it' ? 'selected' : ''}>Italiano</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                    </select>
                </div>
                <div class="form-field">
                    <label>Valuta</label>
                    <select id="currency">
                        <option value="EUR" ${settings.currency === 'EUR' ? 'selected' : ''}>Euro (€)</option>
                        <option value="USD">US Dollar ($)</option>
                        <option value="GBP">British Pound (£)</option>
                    </select>
                </div>
                
                <div style="margin-top: 2rem;">
                    <button class="btn btn-primary" onclick="app.saveGeneralSettings()">💾 Salva Impostazioni</button>
                    <button class="btn btn-secondary" onclick="app.resetSettings()">🔄 Ripristina</button>
                </div>
            </div>
        </div>
    `;
};

// Additional placeholder methods
CondoPayApp.prototype.viewPaymentDetails = function(id) { alert(`Dettagli pagamento ${id} in sviluppo`); };
CondoPayApp.prototype.manageResident = function(id) { alert(`Gestione residente ${id} in sviluppo`); };
CondoPayApp.prototype.viewCommunication = function(id) { alert(`Visualizza comunicazione ${id} in sviluppo`); };
CondoPayApp.prototype.downloadReport = function(index) { alert(`Download report ${index} in sviluppo`); };
CondoPayApp.prototype.viewReport = function(index) { alert(`Visualizza report ${index} in sviluppo`); };
CondoPayApp.prototype.configureIntegration = function(id) { alert(`Configura integrazione ${id} in sviluppo`); };
CondoPayApp.prototype.syncIntegration = function(id) { alert(`Sincronizza ${id} in sviluppo`); };
CondoPayApp.prototype.testIntegration = function(id) { alert(`Test integrazione ${id} in sviluppo`); };
CondoPayApp.prototype.saveGeneralSettings = function() { alert('Impostazioni salvate!'); };
CondoPayApp.prototype.resetSettings = function() { alert('Impostazioni ripristinate!'); };