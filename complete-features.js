// CondoPay App Demo - Complete Features Implementation
// Implementazione completa di tutte le funzionalità richieste

// ===== INIZIALIZZAZIONE GLOBALE =====
window.completeFeatures = {
    initialized: false,
    init() {
        if (this.initialized) return;
        this.initialized = true;
        
        // Inizializza tutti i moduli
        this.initCondominiumFeatures();
        this.initPaymentDetails();
        this.initReportsDownload();
        this.initSettingsTabs();
        this.initInteractiveCharts();
        
        console.log('✅ Complete Features initialized successfully');
    }
};

// ===== FUNZIONALITÀ CONDOMINIO =====
completeFeatures.initCondominiumFeatures = function() {
    // Report Condominio
    window.generateCondoReport = function(condoId) {
        const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === condoId);
        if (!condo) {
            Utils.Toast.show('Condominio non trovato', 'error');
            return;
        }

        const reportContent = `
            <div class="condo-report">
                <div class="report-header" style="text-align: center; margin-bottom: 2rem;">
                    <h2>${condo.name} - Report Completo</h2>
                    <p style="color: #666;">Generato il ${new Date().toLocaleDateString('it-IT')}</p>
                </div>

                <div class="report-section">
                    <h3>📊 Riepilogo Generale</h3>
                    <div class="stats-grid" style="grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem;">
                        <div class="stat-card">
                            <div class="stat-title">Unità Totali</div>
                            <div class="stat-value">${condo.units}</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-title">Tasso Pagamento</div>
                            <div class="stat-value">${condo.paymentRate}%</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-title">Bilancio Annuale</div>
                            <div class="stat-value">€${Utils.Number.formatNumber(condo.annualBudget)}</div>
                        </div>
                    </div>
                </div>

                <div class="report-section" style="margin-top: 2rem;">
                    <h3>💰 Situazione Finanziaria</h3>
                    <table style="width: 100%; margin-top: 1rem;">
                        <tr>
                            <td>Incassi Anno Corrente:</td>
                            <td style="text-align: right; font-weight: bold;">€${Utils.Number.formatNumber(condo.annualBudget * 0.85)}</td>
                        </tr>
                        <tr>
                            <td>Spese Ordinarie:</td>
                            <td style="text-align: right;">€${Utils.Number.formatNumber(condo.annualBudget * 0.6)}</td>
                        </tr>
                        <tr>
                            <td>Spese Straordinarie:</td>
                            <td style="text-align: right;">€${Utils.Number.formatNumber(condo.annualBudget * 0.15)}</td>
                        </tr>
                        <tr style="border-top: 2px solid #333;">
                            <td><strong>Saldo Attuale:</strong></td>
                            <td style="text-align: right; font-weight: bold; color: #48bb78;">€${Utils.Number.formatNumber(condo.annualBudget * 0.1)}</td>
                        </tr>
                    </table>
                </div>

                <div class="report-section" style="margin-top: 2rem;">
                    <h3>📈 Trend Pagamenti</h3>
                    <div id="condoTrendChart" style="height: 300px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; background: #f7fafc;">
                        <canvas id="condoCanvas${condoId}"></canvas>
                    </div>
                </div>

                <div class="report-actions" style="margin-top: 2rem; text-align: center;">
                    <button class="btn btn-primary" onclick="completeFeatures.downloadCondoReport('${condoId}')">
                        📥 Scarica PDF
                    </button>
                    <button class="btn btn-secondary" onclick="completeFeatures.printCondoReport('${condoId}')">
                        🖨️ Stampa
                    </button>
                    <button class="btn btn-secondary" onclick="completeFeatures.shareCondoReport('${condoId}')">
                        📧 Invia via Email
                    </button>
                </div>
            </div>
        `;

        modalManager.showModal(reportContent, { 
            title: 'Report Condominio', 
            width: '800px' 
        });

        // Genera grafico dopo che il modal è visibile
        setTimeout(() => {
            completeFeatures.generateCondoTrendChart(condoId);
        }, 100);
    };

    // Gestisci Residenti
    window.manageResidents = function(condoId) {
        const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === condoId);
        if (!condo) return;

        const residents = CONDOPAY_MOCK_DATA.residents
            .filter(r => r.condominiumName === condo.name)
            .slice(0, 10);

        const content = `
            <div class="residents-management">
                <div class="management-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h3>Residenti - ${condo.name}</h3>
                    <button class="btn btn-primary btn-sm" onclick="completeFeatures.addNewResident('${condoId}')">
                        + Aggiungi Residente
                    </button>
                </div>

                <div class="residents-list">
                    <table style="width: 100%;">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Unità</th>
                                <th>Telefono</th>
                                <th>Email</th>
                                <th>Stato</th>
                                <th>Azioni</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${residents.map(resident => `
                                <tr>
                                    <td>${resident.name}</td>
                                    <td>${resident.unit}</td>
                                    <td>${resident.phone}</td>
                                    <td>${resident.email}</td>
                                    <td>
                                        <span class="badge ${resident.status === 'active' ? 'badge-success' : 'badge-warning'}">
                                            ${resident.status === 'active' ? 'Attivo' : 'Inattivo'}
                                        </span>
                                    </td>
                                    <td>
                                        <button class="btn btn-secondary btn-sm" onclick="completeFeatures.editResident('${resident.id}')">
                                            ✏️
                                        </button>
                                        <button class="btn btn-secondary btn-sm" onclick="completeFeatures.sendMessageToResident('${resident.id}')">
                                            📧
                                        </button>
                                        <button class="btn btn-danger btn-sm" onclick="completeFeatures.removeResident('${resident.id}')">
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        modalManager.showModal(content, { 
            title: 'Gestione Residenti', 
            width: '900px' 
        });
    };
};
// ===== COMUNICAZIONI =====
completeFeatures.sendCommunication = function(condoId) {
    const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === condoId);
    if (!condo) return;

    const content = `
        <div class="communication-form">
            <form id="communicationForm">
                <div class="form-group">
                    <label>Destinatari</label>
                    <select class="form-control" id="recipients" multiple style="height: 100px;">
                        <option value="all" selected>Tutti i residenti</option>
                        <option value="debtors">Solo morosi</option>
                        <option value="owners">Solo proprietari</option>
                        <option value="tenants">Solo inquilini</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Tipo Comunicazione</label>
                    <select class="form-control" id="commType">
                        <option value="email">Email</option>
                        <option value="sms">SMS</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="push">Notifica Push</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Oggetto</label>
                    <input type="text" class="form-control" id="subject" placeholder="Es: Convocazione assemblea">
                </div>

                <div class="form-group">
                    <label>Messaggio</label>
                    <textarea class="form-control" id="message" rows="6" placeholder="Scrivi il tuo messaggio..."></textarea>
                </div>

                <div class="form-group">
                    <label>
                        <input type="checkbox" id="schedule"> Programma invio
                    </label>
                    <div id="scheduleOptions" style="display: none; margin-top: 0.5rem;">
                        <input type="datetime-local" class="form-control" id="scheduleTime">
                    </div>
                </div>

                <div class="form-group">
                    <label>Allegati</label>
                    <div class="file-upload-area" style="border: 2px dashed #ddd; padding: 1rem; text-align: center; cursor: pointer;"
                         onclick="completeFeatures.selectFiles()">
                        <div>📎 Clicca per allegare file</div>
                        <div style="font-size: 0.8rem; color: #666;">Max 10MB per file</div>
                    </div>
                </div>

                <div class="form-actions" style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button type="button" class="btn btn-secondary" onclick="completeFeatures.previewCommunication()">
                        👁️ Anteprima
                    </button>
                    <button type="submit" class="btn btn-primary">
                        📤 Invia Comunicazione
                    </button>
                </div>
            </form>
        </div>
    `;

    modalManager.showModal(content, { 
        title: `Invia Comunicazione - ${condo.name}`, 
        width: '600px' 
    });

    // Event listeners
    document.getElementById('schedule').addEventListener('change', function(e) {
        document.getElementById('scheduleOptions').style.display = e.target.checked ? 'block' : 'none';
    });

    document.getElementById('communicationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        completeFeatures.processCommunication(condoId);
    });
};

// ===== DETTAGLI CONDOMINI TABLE =====
completeFeatures.enhanceCondominiumsTable = function() {
    // Aggiungi event listeners per tutte le azioni della tabella condomini
    document.addEventListener('click', function(e) {
        if (e.target.matches('.condo-details-btn')) {
            const condoId = e.target.dataset.condoId;
            completeFeatures.showCondoDetails(condoId);
        }
    });
};

completeFeatures.showCondoDetails = function(condoId) {
    const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id == condoId);
    if (!condo) return;

    const content = `
        <div class="condo-details">
            <div class="details-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <div>
                    <h2>${condo.name}</h2>
                    <p style="color: #666;">${condo.address}</p>
                </div>
                <div class="status-badge ${condo.status === 'active' ? 'badge-success' : 'badge-warning'}">
                    ${condo.status === 'active' ? '🟢 Attivo' : '🟡 In Revisione'}
                </div>
            </div>

            <div class="details-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;">
                <div class="detail-section">
                    <h4>📊 Informazioni Generali</h4>
                    <table class="detail-table">
                        <tr><td>Codice Fiscale:</td><td><strong>${condo.id}0000${condo.units}</strong></td></tr>
                        <tr><td>Unità Immobiliari:</td><td><strong>${condo.units}</strong></td></tr>
                        <tr><td>Anno Costruzione:</td><td><strong>${2010 - condo.id}</strong></td></tr>
                        <tr><td>Amministratore:</td><td><strong>Dott. Marco Rossi</strong></td></tr>
                    </table>
                </div>

                <div class="detail-section">
                    <h4>💰 Situazione Economica</h4>
                    <table class="detail-table">
                        <tr><td>Bilancio Annuale:</td><td><strong>€${Utils.Number.formatNumber(condo.annualBudget)}</strong></td></tr>
                        <tr><td>Tasso Pagamento:</td><td><strong>${condo.paymentRate}%</strong></td></tr>
                        <tr><td>Morosità:</td><td><strong style="color: #e53e3e;">€${Utils.Number.formatNumber(condo.annualBudget * 0.05)}</strong></td></tr>
                        <tr><td>Fondo Cassa:</td><td><strong style="color: #48bb78;">€${Utils.Number.formatNumber(condo.annualBudget * 0.15)}</strong></td></tr>
                    </table>
                </div>
            </div>

            <div class="details-actions" style="margin-top: 2rem; display: flex; gap: 1rem; flex-wrap: wrap;">
                <button class="btn btn-primary" onclick="generateCondoReport(${condoId})">
                    📊 Report Completo
                </button>
                <button class="btn btn-secondary" onclick="manageResidents(${condoId})">
                    👥 Gestisci Residenti
                </button>
                <button class="btn btn-secondary" onclick="completeFeatures.viewPayments(${condoId})">
                    💳 Visualizza Pagamenti
                </button>
                <button class="btn btn-secondary" onclick="completeFeatures.manageBudget(${condoId})">
                    💰 Gestisci Bilancio
                </button>
                <button class="btn btn-secondary" onclick="completeFeatures.sendCommunication(${condoId})">
                    📧 Invia Comunicazione
                </button>
            </div>

            <div class="recent-activities" style="margin-top: 2rem;">
                <h4>📋 Attività Recenti</h4>
                <div class="activity-list" style="max-height: 200px; overflow-y: auto;">
                    ${completeFeatures.generateRecentActivities(condoId)}
                </div>
            </div>
        </div>
    `;

    modalManager.showModal(content, { 
        title: 'Dettagli Condominio', 
        width: '800px' 
    });
};
// ===== CARDS CONDOMINI IN SVILUPPO =====
completeFeatures.renderDevelopmentCards = function() {
    const developmentProjects = [
        {
            id: 1,
            name: "Residence Aurora",
            status: "In costruzione",
            progress: 75,
            units: 48,
            expectedCompletion: "Marzo 2025",
            investment: 2500000
        },
        {
            id: 2,
            name: "Palazzo Centrale",
            status: "Progettazione",
            progress: 25,
            units: 32,
            expectedCompletion: "Dicembre 2025",
            investment: 1800000
        },
        {
            id: 3,
            name: "Green Park Residence",
            status: "Permessi",
            progress: 40,
            units: 64,
            expectedCompletion: "Giugno 2026",
            investment: 3200000
        }
    ];

    return developmentProjects.map(project => `
        <div class="development-card" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem; background: white; cursor: pointer;"
             onclick="completeFeatures.showDevelopmentDetails(${project.id})"
             onmouseenter="this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'"
             onmouseleave="this.style.boxShadow='none'">
            
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                <div>
                    <h3 style="margin: 0;">${project.name}</h3>
                    <span class="badge ${
                        project.status === 'In costruzione' ? 'badge-primary' : 
                        project.status === 'Progettazione' ? 'badge-warning' : 
                        'badge-info'
                    }">${project.status}</span>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 0.9rem; color: #666;">Investimento</div>
                    <div style="font-weight: bold; color: #667eea;">€${Utils.Number.formatNumber(project.investment)}</div>
                </div>
            </div>

            <div class="progress-section" style="margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="font-size: 0.9rem;">Progresso</span>
                    <span style="font-weight: bold;">${project.progress}%</span>
                </div>
                <div style="background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden;">
                    <div style="background: #667eea; width: ${project.progress}%; height: 100%; transition: width 0.3s;"></div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.9rem;">
                <div>
                    <div style="color: #666;">Unità</div>
                    <div style="font-weight: bold;">${project.units}</div>
                </div>
                <div>
                    <div style="color: #666;">Completamento</div>
                    <div style="font-weight: bold;">${project.expectedCompletion}</div>
                </div>
            </div>

            <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); completeFeatures.viewProjectTimeline(${project.id})">
                    📅 Timeline
                </button>
                <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); completeFeatures.viewProjectDocuments(${project.id})">
                    📄 Documenti
                </button>
                <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); completeFeatures.updateProjectStatus(${project.id})">
                    ✏️ Aggiorna
                </button>
            </div>
        </div>
    `).join('');
};

// ===== DETTAGLI PAGAMENTI =====
completeFeatures.showPaymentDetails = function(paymentId) {
    const payment = {
        id: paymentId,
        transactionId: `TRX-2025-${paymentId}`,
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        amount: Math.floor(Math.random() * 1000) + 100,
        fee: 0,
        method: ['Stripe', 'Bonifico', 'Contanti'][Math.floor(Math.random() * 3)],
        condominium: CONDOPAY_MOCK_DATA.condominiums[Math.floor(Math.random() * 5)].name,
        unit: `${Math.floor(Math.random() * 10) + 1}${['A', 'B', 'C'][Math.floor(Math.random() * 3)]}`,
        resident: CONDOPAY_MOCK_DATA.residents[Math.floor(Math.random() * 10)].name,
        description: 'Quota condominiale mensile',
        status: 'completed'
    };
    
    payment.fee = payment.method === 'Stripe' ? payment.amount * 0.021 : 0;

    const content = `
        <div class="payment-details">
            <div class="detail-header" style="text-align: center; margin-bottom: 2rem;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">✅</div>
                <h3 style="color: #48bb78; margin: 0;">Pagamento Completato</h3>
                <div style="font-size: 2rem; font-weight: bold; margin-top: 1rem;">€${Utils.Number.formatNumber(payment.amount)}</div>
            </div>

            <div class="detail-info" style="background: #f7fafc; padding: 1.5rem; border-radius: 8px;">
                <h4>📋 Dettagli Transazione</h4>
                <table style="width: 100%; margin-top: 1rem;">
                    <tr>
                        <td style="padding: 0.5rem 0;">ID Transazione:</td>
                        <td style="text-align: right; font-family: monospace;">${payment.transactionId}</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0;">Data:</td>
                        <td style="text-align: right;">${payment.date.toLocaleString('it-IT')}</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0;">Metodo:</td>
                        <td style="text-align: right;">
                            <span class="badge badge-info">${payment.method}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0;">Commissione:</td>
                        <td style="text-align: right;">€${payment.fee.toFixed(2)}</td>
                    </tr>
                    <tr style="border-top: 1px solid #e2e8f0;">
                        <td style="padding: 0.5rem 0;"><strong>Netto:</strong></td>
                        <td style="text-align: right;"><strong>€${(payment.amount - payment.fee).toFixed(2)}</strong></td>
                    </tr>
                </table>
            </div>

            <div class="payer-info" style="margin-top: 1.5rem; background: #f7fafc; padding: 1.5rem; border-radius: 8px;">
                <h4>👤 Informazioni Pagatore</h4>
                <table style="width: 100%; margin-top: 1rem;">
                    <tr>
                        <td style="padding: 0.5rem 0;">Nome:</td>
                        <td style="text-align: right;">${payment.resident}</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0;">Condominio:</td>
                        <td style="text-align: right;">${payment.condominium}</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0;">Unità:</td>
                        <td style="text-align: right;">${payment.unit}</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0;">Causale:</td>
                        <td style="text-align: right;">${payment.description}</td>
                    </tr>
                </table>
            </div>

            <div class="payment-actions" style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center;">
                <button class="btn btn-primary" onclick="completeFeatures.downloadReceipt('${paymentId}')">
                    📄 Scarica Ricevuta
                </button>
                <button class="btn btn-secondary" onclick="completeFeatures.sendReceipt('${paymentId}')">
                    📧 Invia Ricevuta
                </button>
                <button class="btn btn-secondary" onclick="completeFeatures.refundPayment('${paymentId}')">
                    💸 Rimborsa
                </button>
            </div>
        </div>
    `;

    modalManager.showModal(content, { 
        title: 'Dettagli Pagamento', 
        width: '600px' 
    });
};
// ===== DOWNLOAD E VISUALIZZA REPORT =====
completeFeatures.downloadReport = function(reportId) {
    const report = CONDOPAY_MOCK_DATA.reports.availableReports.find(r => r.id == reportId);
    if (!report) return;

    // Simula download
    Utils.Toast.show(`Download di "${report.name}" avviato...`, 'info');
    
    setTimeout(() => {
        // Crea un blob fittizio e scaricalo
        const content = `Report: ${report.name}\nGenerato il: ${new Date().toLocaleString('it-IT')}\n\nContenuto del report...`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${report.name.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        Utils.Toast.show('Download completato!', 'success');
    }, 1500);
};

completeFeatures.viewReport = function(reportId) {
    const report = CONDOPAY_MOCK_DATA.reports.availableReports.find(r => r.id == reportId);
    if (!report) return;

    const content = `
        <div class="report-viewer">
            <div class="viewer-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <div>
                    <h3>${report.name}</h3>
                    <p style="color: #666; margin: 0;">Generato il ${new Date(report.date).toLocaleDateString('it-IT')}</p>
                </div>
                <div>
                    <button class="btn btn-primary" onclick="completeFeatures.downloadReport(${reportId})">
                        📥 Scarica
                    </button>
                    <button class="btn btn-secondary" onclick="completeFeatures.printReport(${reportId})">
                        🖨️ Stampa
                    </button>
                </div>
            </div>

            <div class="report-content" style="background: #f7fafc; padding: 2rem; border-radius: 8px; min-height: 400px;">
                ${completeFeatures.generateReportContent(report)}
            </div>

            <div class="report-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; text-align: center; color: #666;">
                <small>CondoPay - Sistema di Gestione Condominiale</small>
            </div>
        </div>
    `;

    modalManager.showModal(content, { 
        title: 'Visualizza Report', 
        width: '900px' 
    });
};

completeFeatures.generateReportContent = function(report) {
    const templates = {
        'Bilancio Mensile': `
            <h4>📊 Riepilogo Finanziario</h4>
            <table style="width: 100%; margin-top: 1rem;">
                <tr><td>Incassi Totali:</td><td style="text-align: right;">€185.420</td></tr>
                <tr><td>Spese Ordinarie:</td><td style="text-align: right;">€92.100</td></tr>
                <tr><td>Spese Straordinarie:</td><td style="text-align: right;">€15.300</td></tr>
                <tr style="border-top: 2px solid #333;"><td><strong>Saldo:</strong></td><td style="text-align: right;"><strong>€78.020</strong></td></tr>
            </table>
        `,
        'Analisi Morosità': `
            <h4>⚠️ Situazione Morosità</h4>
            <div style="margin-top: 1rem;">
                <p>Totale Insoluti: <strong style="color: #e53e3e;">€23.450</strong></p>
                <p>Numero Morosi: <strong>12</strong></p>
                <p>Tasso Morosità: <strong>5.8%</strong></p>
            </div>
            <h5 style="margin-top: 1.5rem;">Top 5 Morosi:</h5>
            <ol>
                <li>Rossi Mario - Via Roma 15/A - €3.200</li>
                <li>Bianchi Luigi - Via Roma 15/B - €2.800</li>
                <li>Verdi Anna - Via Roma 15/C - €2.400</li>
                <li>Neri Paolo - Via Roma 15/D - €2.100</li>
                <li>Gialli Sara - Via Roma 15/E - €1.950</li>
            </ol>
        `,
        'Performance Pagamenti': `
            <h4>📈 Analisi Performance</h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin-top: 1rem;">
                <div>
                    <h5>Metriche Chiave</h5>
                    <ul>
                        <li>Tasso Pagamento: <strong>94.2%</strong></li>
                        <li>Tempo Medio Incasso: <strong>2.3 giorni</strong></li>
                        <li>Pagamenti Digitali: <strong>85%</strong></li>
                    </ul>
                </div>
                <div>
                    <h5>Trend Mensile</h5>
                    <ul>
                        <li>Crescita: <strong style="color: #48bb78;">+12%</strong></li>
                        <li>Nuovi Paganti: <strong>23</strong></li>
                        <li>Recupero Crediti: <strong>€8.900</strong></li>
                    </ul>
                </div>
            </div>
        `
    };

    return templates[report.name] || '<p>Contenuto del report in elaborazione...</p>';
};

// ===== IMPOSTAZIONI TABS =====
completeFeatures.initSettingsTabs = function() {
    window.showSettingsTab = function(tab) {
        // Aggiorna tab attivo
        document.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
        event.target.classList.add('active');

        const content = {
            general: `
                <h3>⚙️ Impostazioni Generali</h3>
                <form class="settings-form">
                    <div class="form-group">
                        <label>Nome Studio</label>
                        <input type="text" class="form-control" value="Studio Amministrazioni Rossi">
                    </div>
                    <div class="form-group">
                        <label>Indirizzo</label>
                        <input type="text" class="form-control" value="Via Roma 123, Milano">
                    </div>
                    <div class="form-group">
                        <label>Partita IVA</label>
                        <input type="text" class="form-control" value="12345678901">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-control" value="info@studiorossi.it">
                    </div>
                    <div class="form-group">
                        <label>Telefono</label>
                        <input type="tel" class="form-control" value="+39 02 1234567">
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" checked> Abilita modalità demo
                        </label>
                    </div>
                    <button type="submit" class="btn btn-primary">💾 Salva Modifiche</button>
                </form>
            `,
            payments: `
                <h3>💳 Impostazioni Pagamenti</h3>
                <form class="settings-form">
                    <h4>Metodi di Pagamento Accettati</h4>
                    <div class="payment-methods" style="margin-bottom: 2rem;">
                        <label style="display: block; margin-bottom: 0.5rem;">
                            <input type="checkbox" checked> Stripe (Carte di credito/debito)
                        </label>
                        <label style="display: block; margin-bottom: 0.5rem;">
                            <input type="checkbox" checked> Bonifico Bancario
                        </label>
                        <label style="display: block; margin-bottom: 0.5rem;">
                            <input type="checkbox" checked> PayPal
                        </label>
                        <label style="display: block; margin-bottom: 0.5rem;">
                            <input type="checkbox"> Contanti
                        </label>
                        <label style="display: block; margin-bottom: 0.5rem;">
                            <input type="checkbox"> Satispay
                        </label>
                    </div>
                    
                    <h4>Commissioni</h4>
                    <div class="form-group">
                        <label>Commissione Stripe (%)</label>
                        <input type="number" class="form-control" value="2.1" step="0.1">
                    </div>
                    <div class="form-group">
                        <label>Commissione PayPal (%)</label>
                        <input type="number" class="form-control" value="2.5" step="0.1">
                    </div>
                    
                    <h4>Configurazione Promemoria</h4>
                    <div class="form-group">
                        <label>Giorni prima della scadenza</label>
                        <input type="number" class="form-control" value="5">
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" checked> Invia promemoria automatici
                        </label>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">💾 Salva Configurazione</button>
                </form>
            `,            notifications: `
                <h3>🔔 Impostazioni Notifiche</h3>
                <form class="settings-form">
                    <h4>Canali di Notifica</h4>
                    <div style="margin-bottom: 2rem;">
                        <label style="display: block; margin-bottom: 0.5rem;">
                            <input type="checkbox" checked> Email
                        </label>
                        <label style="display: block; margin-bottom: 0.5rem;">
                            <input type="checkbox" checked> SMS
                        </label>
                        <label style="display: block; margin-bottom: 0.5rem;">
                            <input type="checkbox" checked> Notifiche Push App
                        </label>
                        <label style="display: block; margin-bottom: 0.5rem;">
                            <input type="checkbox"> WhatsApp Business
                        </label>
                    </div>
                    
                    <h4>Tipologie di Notifiche</h4>
                    <div style="margin-bottom: 2rem;">
                        <label style="display: block; margin-bottom: 0.5rem;">
                            <input type="checkbox" checked> Nuovi pagamenti ricevuti
                        </label>
                        <label style="display: block; margin-bottom: 0.5rem;">
                            <input type="checkbox" checked> Pagamenti in scadenza
                        </label>
                        <label style="display: block; margin-bottom: 0.5rem;">
                            <input type="checkbox" checked> Nuove registrazioni residenti
                        </label>
                        <label style="display: block; margin-bottom: 0.5rem;">
                            <input type="checkbox"> Report giornalieri
                        </label>
                        <label style="display: block; margin-bottom: 0.5rem;">
                            <input type="checkbox" checked> Alert sistema
                        </label>
                    </div>
                    
                    <h4>Frequenza Digest</h4>
                    <div class="form-group">
                        <select class="form-control">
                            <option>In tempo reale</option>
                            <option selected>Ogni ora</option>
                            <option>Giornaliero</option>
                            <option>Settimanale</option>
                        </select>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">💾 Salva Preferenze</button>
                </form>
            `,
            security: `
                <h3>🔒 Impostazioni Sicurezza</h3>
                <form class="settings-form">
                    <h4>Autenticazione</h4>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" checked> Richiedi autenticazione a due fattori
                        </label>
                    </div>
                    <div class="form-group">
                        <label>Timeout sessione (minuti)</label>
                        <input type="number" class="form-control" value="30">
                    </div>
                    
                    <h4>Cambio Password</h4>
                    <div class="form-group">
                        <label>Password Attuale</label>
                        <input type="password" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Nuova Password</label>
                        <input type="password" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Conferma Nuova Password</label>
                        <input type="password" class="form-control">
                    </div>
                    
                    <h4>Accessi Recenti</h4>
                    <div class="access-log" style="background: #f7fafc; padding: 1rem; border-radius: 4px; margin-bottom: 1rem;">
                        <div style="margin-bottom: 0.5rem;">📍 Milano, IT - Chrome - 3 luglio 2025, 10:30</div>
                        <div style="margin-bottom: 0.5rem;">📍 Milano, IT - Firefox - 2 luglio 2025, 15:45</div>
                        <div>📍 Roma, IT - Safari Mobile - 1 luglio 2025, 09:15</div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">🔐 Aggiorna Sicurezza</button>
                </form>
            `,
            billing: `
                <h3>💰 Fatturazione e Abbonamento</h3>
                <div class="billing-info">
                    <div class="current-plan" style="background: #f0f9ff; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
                        <h4>Piano Attuale: Professional</h4>
                        <p>€299/mese - Fino a 1000 unità immobiliari</p>
                        <div style="margin-top: 1rem;">
                            <strong>Prossimo rinnovo:</strong> 1 Agosto 2025<br>
                            <strong>Metodo di pagamento:</strong> •••• 4242
                        </div>
                    </div>
                    
                    <h4>Dettagli Fatturazione</h4>
                    <form class="settings-form">
                        <div class="form-group">
                            <label>Intestazione Fattura</label>
                            <input type="text" class="form-control" value="Studio Amministrazioni Rossi S.r.l.">
                        </div>
                        <div class="form-group">
                            <label>Codice Fiscale/P.IVA</label>
                            <input type="text" class="form-control" value="12345678901">
                        </div>
                        <div class="form-group">
                            <label>Codice SDI</label>
                            <input type="text" class="form-control" value="ABCDEFG">
                        </div>
                        <div class="form-group">
                            <label>Email PEC</label>
                            <input type="email" class="form-control" value="fatture@pec.studiorossi.it">
                        </div>
                        
                        <h4>Storico Fatture</h4>
                        <div class="invoice-list" style="margin-bottom: 1rem;">
                            <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">
                                <span>Fattura #2025-06</span>
                                <span>€299.00</span>
                                <span>01/06/2025</span>
                                <a href="#" onclick="completeFeatures.downloadInvoice('2025-06')">📥 Scarica</a>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">
                                <span>Fattura #2025-05</span>
                                <span>€299.00</span>
                                <span>01/05/2025</span>
                                <a href="#" onclick="completeFeatures.downloadInvoice('2025-05')">📥 Scarica</a>
                            </div>
                        </div>
                        
                        <button type="submit" class="btn btn-primary">💾 Aggiorna Dati</button>
                        <button type="button" class="btn btn-secondary" onclick="completeFeatures.upgradePlan()">⬆️ Upgrade Piano</button>
                    </form>
                </div>
            `
        };

        document.getElementById('settingsContent').innerHTML = content[tab] || '<p>Seleziona una sezione</p>';
        
        // Aggiungi event listeners ai form
        const forms = document.querySelectorAll('.settings-form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                Utils.Toast.show('Impostazioni salvate con successo!', 'success');
            });
        });
    };
};