// CondoPay App Demo - Complete Functions Implementation
// Implementazione completa di tutte le funzioni richieste

// Estendi CondoPayApp con tutte le funzioni operative
Object.assign(CondoPayApp.prototype, {

    // ===== CONDOMINIUM MANAGEMENT COMPLETE =====

    generateCondominiumCards() {
        const condos = CONDOPAY_MOCK_DATA.condominiums || [];
        
        return condos.map(condo => `
            <div class="stat-card" style="cursor: pointer; transition: all 0.3s;" 
                 onclick="app.manageCondominium(${condo.id})"
                 onmouseenter="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 25px rgba(0,0,0,0.1)'"
                 onmouseleave="this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 3px rgba(0,0,0,0.1)'">
                
                <div class="stat-header" style="margin-bottom: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div>
                            <h4 style="margin: 0; color: #2d3748; font-size: 1.1rem;">${condo.name}</h4>
                            <p style="margin: 0.25rem 0 0 0; color: #64748b; font-size: 0.9rem;">${condo.address}</p>
                        </div>
                        <span class="status-badge status-${this.getStatusColor(condo.paymentRate)}">
                            ${this.getStatusText(condo.paymentRate)}
                        </span>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                    <div>
                        <div style="color: #64748b; font-size: 0.8rem;">Unità</div>
                        <div style="font-weight: 600; font-size: 1.1rem;">${condo.units}</div>
                    </div>
                    <div>
                        <div style="color: #64748b; font-size: 0.8rem;">Volume Mensile</div>
                        <div style="font-weight: 600; font-size: 1.1rem;">€${condo.monthlyAmount.toLocaleString()}</div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div>
                        <div style="color: #64748b; font-size: 0.8rem;">Tasso Pagamento</div>
                        <div style="font-weight: 600; font-size: 1.1rem; color: ${condo.paymentRate >= 95 ? '#38a169' : condo.paymentRate >= 85 ? '#d69e2e' : '#e53e3e'};">
                            ${condo.paymentRate}%
                        </div>
                    </div>
                    <div>
                        <div style="color: #64748b; font-size: 0.8rem;">Morosità</div>
                        <div style="font-weight: 600; font-size: 1.1rem;">
                            ${condo.defaultingUnits} unità
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; display: flex; gap: 0.5rem;">
                    <button class="btn btn-secondary" style="flex: 1; font-size: 0.8rem; padding: 0.5rem;" 
                            onclick="event.stopPropagation(); app.viewCondoResidents(${condo.id})">
                        👥 Residenti
                    </button>
                    <button class="btn btn-secondary" style="flex: 1; font-size: 0.8rem; padding: 0.5rem;"
                            onclick="event.stopPropagation(); app.exportCondoReport(${condo.id})">
                        📊 Report
                    </button>
                </div>
            </div>
        `).join('');
    },

    generateDetailedCondosTableRows() {
        const condos = CONDOPAY_MOCK_DATA.condominiums || [];
        
        return condos.map(condo => `
            <tr onclick="app.manageCondominium(${condo.id})" style="cursor: pointer;" 
                onmouseenter="this.style.backgroundColor='#f7fafc'" 
                onmouseleave="this.style.backgroundColor=''">
                <td>
                    <div>
                        <div style="font-weight: 500;">${condo.name}</div>
                        <div style="font-size: 0.8rem; color: #718096;">${condo.city}</div>
                    </div>
                </td>
                <td>
                    <div style="font-size: 0.9rem;">${condo.address}</div>
                </td>
                <td>${condo.units}</td>
                <td>€${condo.monthlyAmount.toLocaleString()}</td>
                <td>
                    <div style="color: ${condo.paymentRate >= 95 ? '#38a169' : condo.paymentRate >= 85 ? '#d69e2e' : '#e53e3e'};">
                        ${condo.paymentRate}%
                    </div>
                </td>
                <td>
                    <span style="color: ${condo.defaultingUnits > 0 ? '#e53e3e' : '#38a169'};">
                        ${condo.defaultingUnits} unità
                    </span>
                </td>
                <td>
                    <div style="font-size: 0.9rem;">
                        ${condo.lastSync ? Utils.Date.formatDate(condo.lastSync) : 'Mai'}
                    </div>
                </td>
                <td>
                    <span class="status-badge status-${this.getStatusColor(condo.paymentRate)}">
                        ${this.getStatusText(condo.paymentRate)}
                    </span>
                </td>
                <td onclick="event.stopPropagation()">
                    <button class="btn btn-secondary" onclick="app.manageCondominium(${condo.id})">
                        Gestisci
                    </button>
                </td>
            </tr>
        `).join('');
    },

    // ===== RESIDENTS MANAGEMENT FOR CONDOMINIUM =====

    viewCondoResidents(condoId) {
        const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === condoId);
        const residents = CONDOPAY_MOCK_DATA.residents.filter(r => r.condominiumId === condoId);
        
        if (!condo) return;

        const content = `
            <div class="condo-residents-management">
                <div class="header" style="margin-bottom: 2rem;">
                    <h3>Residenti - ${condo.name}</h3>
                    <p class="text-gray-600">${residents.length} residenti totali</p>
                </div>
                
                <div class="residents-stats" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    <div class="stat-card success">
                        <div class="stat-title">Paganti</div>
                        <div class="stat-value">${residents.filter(r => r.paymentStatus === 'paid').length}</div>
                    </div>
                    <div class="stat-card warning">
                        <div class="stat-title">In Ritardo</div>
                        <div class="stat-value">${residents.filter(r => r.paymentStatus === 'pending').length}</div>
                    </div>
                    <div class="stat-card danger">
                        <div class="stat-title">Morosi</div>
                        <div class="stat-value">${residents.filter(r => r.paymentStatus === 'overdue').length}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-title">Saldo Totale</div>
                        <div class="stat-value">€${residents.reduce((sum, r) => sum + r.balance, 0).toLocaleString()}</div>
                    </div>
                </div>
                
                <div class="residents-actions" style="margin-bottom: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
                    <button class="btn btn-primary" onclick="app.addResidentToCondo(${condoId})">
                        + Nuovo Residente
                    </button>
                    <button class="btn btn-secondary" onclick="app.sendCondoCommunication(${condoId})">
                        📧 Invia Comunicazione
                    </button>
                    <button class="btn btn-warning" onclick="app.sendPaymentReminders(${condoId})">
                        💳 Solleciti Pagamento
                    </button>
                    <button class="btn btn-secondary" onclick="app.exportCondoResidents(${condoId})">
                        📊 Esporta Residenti
                    </button>
                </div>
                
                <div class="residents-table" style="max-height: 400px; overflow-y: auto;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead style="position: sticky; top: 0; background: white;">
                            <tr>
                                <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #e2e8f0;">Residente</th>
                                <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #e2e8f0;">Unità</th>
                                <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #e2e8f0;">Quota</th>
                                <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #e2e8f0;">Saldo</th>
                                <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #e2e8f0;">Status</th>
                                <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #e2e8f0;">Azioni</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${residents.map(resident => `
                                <tr style="border-bottom: 1px solid #f7fafc;">
                                    <td style="padding: 0.75rem;">
                                        <div>
                                            <div style="font-weight: 500;">${resident.owner}</div>
                                            <div style="font-size: 0.8rem; color: #64748b;">${resident.email}</div>
                                        </div>
                                    </td>
                                    <td style="padding: 0.75rem; font-weight: 500;">${resident.unit}</td>
                                    <td style="padding: 0.75rem;">€${resident.monthlyFee.toLocaleString()}</td>
                                    <td style="padding: 0.75rem; color: ${resident.balance < 0 ? '#e53e3e' : '#38a169'};">
                                        €${resident.balance.toLocaleString()}
                                    </td>
                                    <td style="padding: 0.75rem;">
                                        <span class="status-badge status-${resident.paymentStatus === 'paid' ? 'success' : resident.paymentStatus === 'pending' ? 'warning' : 'danger'}">
                                            ${resident.paymentStatus === 'paid' ? 'Pagato' : resident.paymentStatus === 'pending' ? 'In attesa' : 'Scaduto'}
                                        </span>
                                    </td>
                                    <td style="padding: 0.75rem;">
                                        <button class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.25rem 0.5rem;" 
                                                onclick="app.manageResident(${resident.id})">
                                            Gestisci
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
            title: `Residenti ${condo.name}`, 
            width: '1000px' 
        });
    },

    // ===== COMMUNICATION FOR CONDOMINIUM =====

    sendCondoCommunication(condoId) {
        const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === condoId);
        if (!condo) return;

        const residents = CONDOPAY_MOCK_DATA.residents.filter(r => r.condominiumId === condoId);

        const fields = [
            { name: 'type', type: 'select', label: 'Tipo Comunicazione', required: true, options: [
                { value: 'notice', label: 'Avviso generale' },
                { value: 'assembly', label: 'Convocazione assemblea' },
                { value: 'maintenance', label: 'Avviso manutenzione' },
                { value: 'reminder', label: 'Sollecito pagamento' }
            ]},
            { name: 'channel', type: 'select', label: 'Canale', required: true, options: [
                { value: 'email', label: 'Solo Email' },
                { value: 'sms', label: 'Solo SMS' },
                { value: 'email_sms', label: 'Email + SMS' },
                { value: 'whatsapp', label: 'WhatsApp Business' }
            ]},
            { name: 'title', type: 'text', label: 'Oggetto', required: true, placeholder: 'Oggetto della comunicazione' },
            { name: 'message', type: 'textarea', label: 'Messaggio', required: true, rows: 6, placeholder: 'Scrivi qui il messaggio per tutti i residenti...' },
            { name: 'urgent', type: 'checkbox', label: 'Comunicazione urgente (invio immediato)' }
        ];

        this.showEditModal(fields, (formData) => {
            const newComm = {
                id: CONDOPAY_MOCK_DATA.communications.length + 1,
                ...formData,
                condominiumId: condoId,
                recipientType: 'condo',
                recipients: residents.map(r => r.id),
                sentDate: new Date().toISOString(),
                sentBy: this.currentUser.name,
                status: 'sent'
            };

            CONDOPAY_MOCK_DATA.communications.push(newComm);
            this.saveToStorage();
            this.addActivityLog('notification', `Comunicazione inviata a ${condo.name}`, residents.length);
            notificationManager.show(`Comunicazione "${newComm.title}" inviata a ${residents.length} residenti di ${condo.name}!`, 'success');
            this.refreshCurrentView();
        }, `Comunicazione per ${condo.name}`);
    },

    // ===== CONDOMINIUM REPORT =====

    exportCondoReport(condoId) {
        const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === condoId);
        if (!condo) return;

        const residents = CONDOPAY_MOCK_DATA.residents.filter(r => r.condominiumId === condoId);
        const payments = CONDOPAY_MOCK_DATA.payments.filter(p => p.condominiumId === condoId);

        // Simulate report generation
        const reportData = {
            condominio: condo.name,
            dataGenerazione: new Date().toLocaleDateString('it-IT'),
            riepilogo: {
                unitaTotali: condo.units,
                residentiRegistrati: residents.length,
                volumeMensile: condo.monthlyAmount,
                tassoIncasso: condo.paymentRate,
                unitaMorose: condo.defaultingUnits
            },
            residenti: residents.map(r => ({
                nome: r.owner,
                unita: r.unit,
                quotaMensile: r.monthlyFee,
                saldo: r.balance,
                status: r.paymentStatus
            })),
            pagamenti: payments.map(p => ({
                data: Utils.Date.formatDate(p.date),
                importo: p.amount,
                metodo: p.method,
                status: p.status
            }))
        };

        // Create detailed report window
        const reportWindow = window.open('', '_blank', 'width=800,height=600');
        reportWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Report ${condo.name}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 2rem; color: #333; }
                    .header { text-align: center; border-bottom: 2px solid #667eea; padding-bottom: 1rem; margin-bottom: 2rem; }
                    .logo { font-size: 1.8rem; font-weight: bold; color: #667eea; }
                    .report-section { margin-bottom: 2rem; }
                    .section-title { font-size: 1.2rem; font-weight: bold; color: #2d3748; margin-bottom: 1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem; }
                    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
                    .stat-box { background: #f7fafc; padding: 1rem; border-radius: 8px; text-align: center; }
                    .stat-value { font-size: 1.5rem; font-weight: bold; color: #667eea; }
                    .stat-label { color: #64748b; font-size: 0.9rem; }
                    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
                    th, td { border: 1px solid #e2e8f0; padding: 0.5rem; text-align: left; font-size: 0.9rem; }
                    th { background-color: #f7fafc; font-weight: bold; }
                    .actions { margin-top: 2rem; text-align: center; }
                    .btn { padding: 0.5rem 1rem; margin: 0 0.5rem; border: none; border-radius: 4px; cursor: pointer; }
                    .btn-primary { background: #667eea; color: white; }
                    .btn-secondary { background: #e2e8f0; color: #4a5568; }
                    @media print { .actions { display: none; } }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="logo">CondoPay</div>
                    <h2>Report Condominio</h2>
                    <h3>${condo.name}</h3>
                    <p>Generato il ${reportData.dataGenerazione}</p>
                </div>

                <div class="report-section">
                    <div class="section-title">Riepilogo Generale</div>
                    <div class="stats-grid">
                        <div class="stat-box">
                            <div class="stat-value">${reportData.riepilogo.unitaTotali}</div>
                            <div class="stat-label">Unità Totali</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-value">${reportData.riepilogo.residentiRegistrati}</div>
                            <div class="stat-label">Residenti</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-value">€${reportData.riepilogo.volumeMensile.toLocaleString()}</div>
                            <div class="stat-label">Volume Mensile</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-value">${reportData.riepilogo.tassoIncasso}%</div>
                            <div class="stat-label">Tasso Incasso</div>
                        </div>
                    </div>
                </div>

                <div class="report-section">
                    <div class="section-title">Residenti (${residents.length})</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Unità</th>
                                <th>Quota Mensile</th>
                                <th>Saldo</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${reportData.residenti.map(r => `
                                <tr>
                                    <td>${r.nome}</td>
                                    <td>${r.unita}</td>
                                    <td>€${r.quotaMensile.toLocaleString()}</td>
                                    <td style="color: ${r.saldo < 0 ? 'red' : 'green'}">€${r.saldo.toLocaleString()}</td>
                                    <td>${r.status === 'paid' ? 'Pagato' : r.status === 'pending' ? 'In attesa' : 'Scaduto'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <div class="report-section">
                    <div class="section-title">Pagamenti Recenti (${payments.length})</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Importo</th>
                                <th>Metodo</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${reportData.pagamenti.slice(0, 10).map(p => `
                                <tr>
                                    <td>${p.data}</td>
                                    <td>€${p.importo.toLocaleString()}</td>
                                    <td>${p.metodo}</td>
                                    <td>${p.status}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <div class="actions">
                    <button class="btn btn-primary" onclick="window.print()">🖨️ Stampa Report</button>
                    <button class="btn btn-secondary" onclick="window.close()">❌ Chiudi</button>
                </div>
            </body>
            </html>
        `);

        reportWindow.document.close();
        reportWindow.focus();

        notificationManager.show(`Report per ${condo.name} generato!`, 'success');
    },

    // ===== PAYMENT DETAILS =====

    viewPaymentDetails(paymentId) {
        const payment = CONDOPAY_MOCK_DATA.payments.find(p => p.id === paymentId);
        if (!payment) return;

        const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === payment.condominiumId);
        const resident = CONDOPAY_MOCK_DATA.residents.find(r => r.id === payment.residentId);

        const content = `
            <div class="payment-details">
                <div class="payment-header" style="margin-bottom: 2rem; text-align: center;">
                    <h3>Dettagli Pagamento</h3>
                    <div style="font-size: 1.5rem; font-weight: bold; color: #667eea; margin: 0.5rem 0;">
                        €${payment.amount.toLocaleString()}
                    </div>
                    <span class="status-badge status-${payment.status === 'completed' ? 'success' : payment.status === 'pending' ? 'warning' : 'danger'}">
                        ${payment.status === 'completed' ? 'Completato' : payment.status === 'pending' ? 'In attesa' : 'Fallito'}
                    </span>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    <div>
                        <h4 style="margin-bottom: 1rem; color: #2d3748;">Informazioni Pagamento</h4>
                        <div class="detail-row" style="margin-bottom: 0.75rem;">
                            <strong>ID Transazione:</strong> ${payment.id}
                        </div>
                        <div class="detail-row" style="margin-bottom: 0.75rem;">
                            <strong>Data Pagamento:</strong> ${Utils.Date.formatDateTime(payment.date)}
                        </div>
                        <div class="detail-row" style="margin-bottom: 0.75rem;">
                            <strong>Data Scadenza:</strong> ${Utils.Date.formatDate(payment.dueDate)}
                        </div>
                        <div class="detail-row" style="margin-bottom: 0.75rem;">
                            <strong>Metodo:</strong> ${payment.method === 'stripe' ? 'Stripe' : payment.method === 'bank_transfer' ? 'Bonifico Bancario' : 'Contanti'}
                        </div>
                        <div class="detail-row" style="margin-bottom: 0.75rem;">
                            <strong>Commissione:</strong> €${(payment.commission || 0).toFixed(2)}
                        </div>
                        ${payment.transactionId ? `
                            <div class="detail-row" style="margin-bottom: 0.75rem;">
                                <strong>ID Stripe:</strong> <code style="background: #f7fafc; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">${payment.transactionId}</code>
                            </div>
                        ` : ''}
                    </div>

                    <div>
                        <h4 style="margin-bottom: 1rem; color: #2d3748;">Informazioni Residente</h4>
                        <div class="detail-row" style="margin-bottom: 0.75rem;">
                            <strong>Nome:</strong> ${resident?.owner || 'N/A'}
                        </div>
                        <div class="detail-row" style="margin-bottom: 0.75rem;">
                            <strong>Unità:</strong> ${resident?.unit || 'N/A'}
                        </div>
                        <div class="detail-row" style="margin-bottom: 0.75rem;">
                            <strong>Email:</strong> ${resident?.email || 'N/A'}
                        </div>
                        <div class="detail-row" style="margin-bottom: 0.75rem;">
                            <strong>Condominio:</strong> ${condo?.name || 'N/A'}
                        </div>
                        <div class="detail-row" style="margin-bottom: 0.75rem;">
                            <strong>Indirizzo:</strong> ${condo?.address || 'N/A'}
                        </div>
                    </div>
                </div>

                <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #e2e8f0;">
                    <h4 style="margin-bottom: 1rem; color: #2d3748;">Descrizione</h4>
                    <p style="background: #f7fafc; padding: 1rem; border-radius: 8px; margin: 0;">
                        ${payment.description || 'Pagamento spese condominiali'}
                    </p>
                </div>

                ${payment.status === 'failed' ? `
                    <div style="margin-top: 1.5rem; padding: 1rem; background: #fed7d7; border-radius: 8px; color: #742a2a;">
                        <strong>⚠️ Pagamento Fallito</strong><br>
                        Questo pagamento non è andato a buon fine. Contattare il residente per verificare i dati di pagamento.
                    </div>
                ` : ''}

                <div class="payment-actions" style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center;">
                    ${payment.status === 'completed' ? `
                        <button class="btn btn-secondary" onclick="app.printPaymentReceipt('${payment.id}')">
                            🖨️ Stampa Ricevuta
                        </button>
                    ` : ''}
                    
                    ${payment.status === 'failed' ? `
                        <button class="btn btn-warning" onclick="app.retryPayment('${payment.id}')">
                            🔄 Riprova Pagamento
                        </button>
                    ` : ''}
                    
                    <button class="btn btn-secondary" onclick="app.sendPaymentCommunication('${payment.id}')">
                        📧 Invia Comunicazione
                    </button>
                    
                    <button class="btn btn-secondary" onclick="modalManager.closeModal()">
                        ❌ Chiudi
                    </button>
                </div>
            </div>
        `;

        modalManager.showModal(content, { 
            title: `Pagamento ${payment.id}`, 
            width: '800px' 
        });
    },

    // ===== REPORTS DOWNLOAD & VIEW =====

    downloadReport(reportIndex) {
        const reports = [
            { name: "Report Finanziario Mensile", format: "PDF", data: this.generateFinancialReport() },
            { name: "Performance Condomini", format: "Excel", data: this.generatePerformanceReport() },
            { name: "Analisi Morosità", format: "PDF", data: this.generateDefaultAnalysis() },
            { name: "Compliance GDPR", format: "PDF", data: this.generateComplianceReport() },
            { name: "Trend Pagamenti", format: "Excel", data: this.generateTrendReport() }
        ];

        const report = reports[reportIndex];
        if (!report) return;

        if (report.format === "Excel") {
            Utils.Export.toCSV(report.data, `${report.name.toLowerCase().replace(/\s+/g, '-')}.csv`);
        } else {
            // Simulate PDF download
            const blob = new Blob([JSON.stringify(report.data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${report.name.toLowerCase().replace(/\s+/g, '-')}.json`;
            a.click();
            URL.revokeObjectURL(url);
        }

        notificationManager.show(`${report.name} scaricato!`, 'success');
    },

    viewReport(reportIndex) {
        const reports = [
            { name: "Report Finanziario Mensile", data: this.generateFinancialReport() },
            { name: "Performance Condomni", data: this.generatePerformanceReport() },
            { name: "Analisi Morosità", data: this.generateDefaultAnalysis() },
            { name: "Compliance GDPR", data: this.generateComplianceReport() },
            { name: "Trend Pagamenti", data: this.generateTrendReport() }
        ];

        const report = reports[reportIndex];
        if (!report) return;

        this.showReportModal(report.name, report.data);
    },

    showReportModal(reportName, reportData) {
        const content = `
            <div class="report-viewer">
                <div class="report-header" style="margin-bottom: 2rem; text-align: center;">
                    <h3>${reportName}</h3>
                    <p style="color: #64748b;">Generato il ${new Date().toLocaleDateString('it-IT')}</p>
                </div>

                <div class="report-content" style="max-height: 500px; overflow-y: auto;">
                    ${this.formatReportForDisplay(reportData)}
                </div>

                <div class="report-actions" style="margin-top: 2rem; text-align: center;">
                    <button class="btn btn-primary" onclick="app.printReport('${reportName}', ${JSON.stringify(reportData).replace(/"/g, '&quot;')})">
                        🖨️ Stampa
                    </button>
                    <button class="btn btn-secondary" onclick="modalManager.closeModal()">
                        ❌ Chiudi
                    </button>
                </div>
            </div>
        `;

        modalManager.showModal(content, { 
            title: reportName, 
            width: '900px' 
        });
    },

    // ===== SETTINGS TABS =====

    generateSettingsHTML() {
        return `
            <div class="content-header mb-4">
                <h2>Impostazioni</h2>
            </div>

            <!-- Settings Navigation -->
            <div class="data-table mb-4">
                <div style="padding: 1rem;">
                    <div style="display: flex; gap: 1rem; border-bottom: 1px solid #e2e8f0; margin-bottom: 1rem; flex-wrap: wrap;">
                        <button class="btn btn-secondary settings-tab active" data-tab="general" onclick="app.showSettingsTab('general')">
                            Generali
                        </button>
                        <button class="btn btn-secondary settings-tab" data-tab="payments" onclick="app.showSettingsTab('payments')">
                            Pagamenti
                        </button>
                        <button class="btn btn-secondary settings-tab" data-tab="notifications" onclick="app.showSettingsTab('notifications')">
                            Notifiche
                        </button>
                        <button class="btn btn-secondary settings-tab" data-tab="security" onclick="app.showSettingsTab('security')">
                            Sicurezza
                        </button>
                        <button class="btn btn-secondary settings-tab" data-tab="billing" onclick="app.showSettingsTab('billing')">
                            Fatturazione
                        </button>
                    </div>
                    
                    <div id="settingsContent">
                        ${this.generateGeneralSettingsHTML()}
                    </div>
                </div>
            </div>
        `;
    },

    showSettingsTab(tabName) {
        // Update active tab
        document.querySelectorAll('.settings-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Generate content for tab
        const settingsContent = document.getElementById('settingsContent');
        if (!settingsContent) return;

        switch (tabName) {
            case 'general':
                settingsContent.innerHTML = this.generateGeneralSettingsHTML();
                break;
            case 'payments':
                settingsContent.innerHTML = this.generatePaymentSettingsHTML();
                break;
            case 'notifications':
                settingsContent.innerHTML = this.generateNotificationSettingsHTML();
                break;
            case 'security':
                settingsContent.innerHTML = this.generateSecuritySettingsHTML();
                break;
            case 'billing':
                settingsContent.innerHTML = this.generateBillingSettingsHTML();
                break;
        }
    },

    generatePaymentSettingsHTML() {
        const settings = CONDOPAY_MOCK_DATA.settings?.payments || {};
        
        return `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div>
                    <h4 class="font-semibold mb-3">Configurazione Pagamenti</h4>
                    <div class="form-field">
                        <label>Giorno Scadenza Default</label>
                        <select id="defaultDueDate">
                            <option value="1" ${settings.defaultDueDate === 1 ? 'selected' : ''}>1° del mese</option>
                            <option value="15" ${settings.defaultDueDate === 15 ? 'selected' : ''}>15 del mese</option>
                            <option value="30" ${settings.defaultDueDate === 30 ? 'selected' : ''}>Fine mese</option>
                        </select>
                    </div>
                    <div class="form-field">
                        <label>Commissione Stripe (%)</label>
                        <input type="number" step="0.1" value="${settings.stripeCommission || 1.4}" id="stripeCommission">
                    </div>
                    <div class="form-field">
                        <label>Commissione Bonifico (€)</label>
                        <input type="number" step="0.01" value="${settings.bankTransferFee || 0}" id="bankTransferFee">
                    </div>
                    <div class="form-field">
                        <label>Mora Ritardo (%)</label>
                        <input type="number" step="0.1" value="${settings.lateFeePercentage || 2.0}" id="lateFeePercentage">
                    </div>
                </div>
                
                <div>
                    <h4 class="font-semibold mb-3">Solleciti Automatici</h4>
                    <div class="form-field">
                        <label>Giorni Prima Scadenza</label>
                        <input type="text" value="${(settings.reminderDays || [7,3,1]).join(',')}" id="reminderDays" placeholder="7,3,1">
                        <small>Separati da virgole</small>
                    </div>
                    <div class="form-field">
                        <label>Massimo Giorni Ritardo</label>
                        <input type="number" value="${settings.maxLateDays || 30}" id="maxLateDays">
                    </div>
                    
                    <div style="margin-top: 2rem;">
                        <button class="btn btn-primary" onclick="app.savePaymentSettings()">💾 Salva Impostazioni</button>
                        <button class="btn btn-secondary" onclick="app.testPaymentSettings()">🧪 Test Configurazione</button>
                    </div>
                </div>
            </div>
        `;
    },

    generateNotificationSettingsHTML() {
        const settings = CONDOPAY_MOCK_DATA.settings?.notifications || {};
        
        return `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div>
                    <h4 class="font-semibold mb-3">Canali Attivi</h4>
                    <div class="form-field">
                        <label style="display: flex; align-items: center; gap: 0.5rem;">
                            <input type="checkbox" ${settings.emailEnabled !== false ? 'checked' : ''} id="emailEnabled">
                            📧 Email Notifications
                        </label>
                    </div>
                    <div class="form-field">
                        <label style="display: flex; align-items: center; gap: 0.5rem;">
                            <input type="checkbox" ${settings.smsEnabled !== false ? 'checked' : ''} id="smsEnabled">
                            📱 SMS Notifications
                        </label>
                    </div>
                    <div class="form-field">
                        <label style="display: flex; align-items: center; gap: 0.5rem;">
                            <input type="checkbox" ${settings.whatsappEnabled !== false ? 'checked' : ''} id="whatsappEnabled">
                            💬 WhatsApp Business
                        </label>
                    </div>
                    
                    <h4 class="font-semibold mb-3" style="margin-top: 2rem;">Frequenza</h4>
                    <div class="form-field">
                        <label>Frequenza Solleciti</label>
                        <select id="reminderFrequency">
                            <option value="daily" ${settings.reminderFrequency === 'daily' ? 'selected' : ''}>Giornaliera</option>
                            <option value="weekly" ${settings.reminderFrequency === 'weekly' ? 'selected' : ''}>Settimanale</option>
                            <option value="monthly" ${settings.reminderFrequency === 'monthly' ? 'selected' : ''}>Mensile</option>
                        </select>
                    </div>
                </div>
                
                <div>
                    <h4 class="font-semibold mb-3">Escalation Automatica</h4>
                    <div class="form-field">
                        <label style="display: flex; align-items: center; gap: 0.5rem;">
                            <input type="checkbox" ${settings.escalationEnabled !== false ? 'checked' : ''} id="escalationEnabled">
                            Abilita Escalation
                        </label>
                    </div>
                    <div class="form-field">
                        <label>Giorni Escalation</label>
                        <input type="text" value="${(settings.escalationDays || [30,60,90]).join(',')}" id="escalationDays" placeholder="30,60,90">
                        <small>Giorni per escalation automatica</small>
                    </div>
                    
                    <h4 class="font-semibold mb-3" style="margin-top: 2rem;">Template Email</h4>
                    <div class="form-field">
                        <label>Oggetto Default</label>
                        <input type="text" value="Sollecito Pagamento Spese Condominiali" id="defaultSubject">
                    </div>
                    
                    <div style="margin-top: 2rem;">
                        <button class="btn btn-primary" onclick="app.saveNotificationSettings()">💾 Salva Impostazioni</button>
                        <button class="btn btn-secondary" onclick="app.testNotifications()">🧪 Test Notifiche</button>
                    </div>
                </div>
            </div>
        `;
    },

    generateSecuritySettingsHTML() {
        const settings = CONDOPAY_MOCK_DATA.settings?.security || {};
        
        return `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div>
                    <h4 class="font-semibold mb-3">Autenticazione</h4>
                    <div class="form-field">
                        <label style="display: flex; align-items: center; gap: 0.5rem;">
                            <input type="checkbox" ${settings.twoFactorEnabled ? 'checked' : ''} id="twoFactorEnabled">
                            🔒 Autenticazione a Due Fattori
                        </label>
                    </div>
                    <div class="form-field">
                        <label>Timeout Sessione (minuti)</label>
                        <input type="number" value="${settings.sessionTimeout || 480}" id="sessionTimeout">
                    </div>
                    <div class="form-field">
                        <label>Max Tentativi Login</label>
                        <input type="number" value="${settings.maxLoginAttempts || 5}" id="maxLoginAttempts">
                    </div>
                    <div class="form-field">
                        <label>Scadenza Password (giorni)</label>
                        <input type="number" value="${settings.passwordExpiry || 90}" id="passwordExpiry">
                    </div>
                </div>
                
                <div>
                    <h4 class="font-semibold mb-3">Audit e Logging</h4>
                    <div class="form-field">
                        <label style="display: flex; align-items: center; gap: 0.5rem;">
                            <input type="checkbox" ${settings.auditLogEnabled !== false ? 'checked' : ''} id="auditLogEnabled">
                            📝 Log Attività
                        </label>
                    </div>
                    
                    <h4 class="font-semibold mb-3" style="margin-top: 2rem;">IP Whitelist</h4>
                    <div class="form-field">
                        <label>Indirizzi IP Autorizzati</label>
                        <textarea rows="4" id="ipWhitelist" placeholder="192.168.1.0/24&#10;10.0.0.1">${(settings.ipWhitelist || []).join('\n')}</textarea>
                        <small>Un IP per riga</small>
                    </div>
                    
                    <div style="margin-top: 2rem;">
                        <button class="btn btn-primary" onclick="app.saveSecuritySettings()">💾 Salva Impostazioni</button>
                        <button class="btn btn-warning" onclick="app.generateBackup()">💾 Genera Backup</button>
                    </div>
                </div>
            </div>
        `;
    },

    generateBillingSettingsHTML() {
        return `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div>
                    <h4 class="font-semibold mb-3">Piano Attuale</h4>
                    <div class="stat-card success" style="margin-bottom: 1rem;">
                        <div class="stat-title">Piano Professional</div>
                        <div class="stat-value">€49/mese</div>
                        <div style="color: #38a169; font-size: 0.9rem;">✅ Attivo fino al 31/12/2025</div>
                    </div>
                    
                    <div class="form-field">
                        <label>Metodo Pagamento</label>
                        <div style="background: #f7fafc; padding: 1rem; border-radius: 8px;">
                            💳 **** **** **** 4242<br>
                            <small>Expires 12/2027</small>
                        </div>
                    </div>
                    
                    <div class="form-field">
                        <label>Fatturazione</label>
                        <select id="billingCycle">
                            <option value="monthly">Mensile</option>
                            <option value="yearly">Annuale (-20%)</option>
                        </select>
                    </div>
                </div>
                
                <div>
                    <h4 class="font-semibold mb-3">Utilizzo Corrente</h4>
                    <div style="margin-bottom: 1rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span>Condomini</span>
                            <span>25 / 50</span>
                        </div>
                        <div style="background: #e2e8f0; border-radius: 4px; height: 8px;">
                            <div style="background: #38a169; width: 50%; height: 100%; border-radius: 4px;"></div>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span>Comunicazioni</span>
                            <span>1.247 / 5.000</span>
                        </div>
                        <div style="background: #e2e8f0; border-radius: 4px; height: 8px;">
                            <div style="background: #667eea; width: 25%; height: 100%; border-radius: 4px;"></div>
                        </div>
                    </div>
                    
                    <h4 class="font-semibold mb-3" style="margin-top: 2rem;">Fatture</h4>
                    <div style="max-height: 200px; overflow-y: auto;">
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">
                            <span>Dicembre 2024</span>
                            <span>€49.00 <a href="#" style="color: #667eea;">📥</a></span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">
                            <span>Novembre 2024</span>
                            <span>€49.00 <a href="#" style="color: #667eea;">📥</a></span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">
                            <span>Ottobre 2024</span>
                            <span>€49.00 <a href="#" style="color: #667eea;">📥</a></span>
                        </div>
                    </div>
                    
                    <div style="margin-top: 2rem;">
                        <button class="btn btn-primary" onclick="app.upgradePlan()">⬆️ Upgrade Piano</button>
                        <button class="btn btn-secondary" onclick="app.updateBilling()">💳 Aggiorna Pagamento</button>
                    </div>
                </div>
            </div>
        `;
    },

    // ===== HELPER FUNCTIONS =====

    generateFinancialReport() {
        const condos = CONDOPAY_MOCK_DATA.condominiums;
        const payments = CONDOPAY_MOCK_DATA.payments;
        
        return {
            totalRevenue: payments.reduce((sum, p) => sum + (p.status === 'completed' ? p.amount : 0), 0),
            totalCommissions: payments.reduce((sum, p) => sum + (p.commission || 0), 0),
            condominiumCount: condos.length,
            averagePaymentRate: condos.reduce((sum, c) => sum + c.paymentRate, 0) / condos.length,
            monthlyBreakdown: CONDOPAY_MOCK_DATA.reports.monthlyTrends
        };
    },

    generatePerformanceReport() {
        return CONDOPAY_MOCK_DATA.condominiums.map(condo => ({
            name: condo.name,
            paymentRate: condo.paymentRate,
            volume: condo.monthlyAmount,
            units: condo.units,
            defaultRate: (condo.defaultingUnits / condo.units * 100).toFixed(1)
        }));
    },

    generateDefaultAnalysis() {
        const residents = CONDOPAY_MOCK_DATA.residents;
        return {
            totalResidents: residents.length,
            defaultingResidents: residents.filter(r => r.balance < 0).length,
            totalDefault: residents.reduce((sum, r) => sum + (r.balance < 0 ? Math.abs(r.balance) : 0), 0),
            averageDefault: residents.filter(r => r.balance < 0).reduce((sum, r) => sum + Math.abs(r.balance), 0) / residents.filter(r => r.balance < 0).length || 0
        };
    },

    generateComplianceReport() {
        return {
            gdprCompliant: true,
            lastAudit: "2024-12-01",
            dataRetention: "7 years",
            consentRecords: 847,
            dataRequests: 3,
            breaches: 0
        };
    },

    generateTrendReport() {
        return CONDOPAY_MOCK_DATA.reports.monthlyTrends;
    },

    formatReportForDisplay(data) {
        return `<pre style="background: #f7fafc; padding: 1rem; border-radius: 8px; overflow-x: auto;">${JSON.stringify(data, null, 2)}</pre>`;
    },

    // Settings save functions
    savePaymentSettings() {
        const formData = {
            defaultDueDate: parseInt(document.getElementById('defaultDueDate').value),
            stripeCommission: parseFloat(document.getElementById('stripeCommission').value),
            bankTransferFee: parseFloat(document.getElementById('bankTransferFee').value),
            lateFeePercentage: parseFloat(document.getElementById('lateFeePercentage').value),
            reminderDays: document.getElementById('reminderDays').value.split(',').map(d => parseInt(d.trim())),
            maxLateDays: parseInt(document.getElementById('maxLateDays').value)
        };

        CONDOPAY_MOCK_DATA.settings.payments = { ...CONDOPAY_MOCK_DATA.settings.payments, ...formData };
        this.saveToStorage();
        notificationManager.show('Impostazioni pagamenti salvate!', 'success');
    },

    saveNotificationSettings() {
        const formData = {
            emailEnabled: document.getElementById('emailEnabled').checked,
            smsEnabled: document.getElementById('smsEnabled').checked,
            whatsappEnabled: document.getElementById('whatsappEnabled').checked,
            reminderFrequency: document.getElementById('reminderFrequency').value,
            escalationEnabled: document.getElementById('escalationEnabled').checked,
            escalationDays: document.getElementById('escalationDays').value.split(',').map(d => parseInt(d.trim())),
            defaultSubject: document.getElementById('defaultSubject').value
        };

        CONDOPAY_MOCK_DATA.settings.notifications = { ...CONDOPAY_MOCK_DATA.settings.notifications, ...formData };
        this.saveToStorage();
        notificationManager.show('Impostazioni notifiche salvate!', 'success');
    },

    saveSecuritySettings() {
        const formData = {
            twoFactorEnabled: document.getElementById('twoFactorEnabled').checked,
            sessionTimeout: parseInt(document.getElementById('sessionTimeout').value),
            maxLoginAttempts: parseInt(document.getElementById('maxLoginAttempts').value),
            passwordExpiry: parseInt(document.getElementById('passwordExpiry').value),
            auditLogEnabled: document.getElementById('auditLogEnabled').checked,
            ipWhitelist: document.getElementById('ipWhitelist').value.split('\n').filter(ip => ip.trim())
        };

        CONDOPAY_MOCK_DATA.settings.security = { ...CONDOPAY_MOCK_DATA.settings.security, ...formData };
        this.saveToStorage();
        notificationManager.show('Impostazioni sicurezza salvate!', 'success');
    },

    // Placeholder functions for complete implementation
    addResidentToCondo(condoId) {
        // Pre-fill condominium in add resident form
        const condoField = { name: 'condominiumId', type: 'hidden', value: condoId.toString() };
        this.addResident();
    },

    exportCondoResidents(condoId) {
        const residents = CONDOPAY_MOCK_DATA.residents.filter(r => r.condominiumId === condoId);
        Utils.Export.toCSV(residents, `residenti-condominio-${condoId}.csv`);
        notificationManager.show(`Esportati ${residents.length} residenti`, 'success');
    },

    printPaymentReceipt(paymentId) {
        notificationManager.show('Ricevuta pagamento stampata!', 'success');
    },

    retryPayment(paymentId) {
        notificationManager.show('Retry pagamento simulato', 'info');
    },

    sendPaymentCommunication(paymentId) {
        notificationManager.show('Comunicazione pagamento inviata', 'success');
    },

    printReport(reportName, reportData) {
        PrintManager.printSection('report', [{ name: reportName, data: reportData }]);
    },

    testPaymentSettings() {
        notificationManager.show('Configurazione pagamenti testata con successo!', 'success');
    },

    testNotifications() {
        notificationManager.show('Test notifica inviato!', 'success');
    },

    generateBackup() {
        const backup = {
            timestamp: new Date().toISOString(),
            data: CONDOPAY_MOCK_DATA,
            version: '1.0'
        };
        
        Utils.Export.toJSON(backup, `condopay-backup-${new Date().toISOString().split('T')[0]}.json`);
        notificationManager.show('Backup generato e scaricato!', 'success');
    },

    upgradePlan() {
        notificationManager.show('Redirect a pagina upgrade piano', 'info');
    },

    updateBilling() {
        notificationManager.show('Redirect a aggiornamento metodo pagamento', 'info');
    }
});

// Initialize charts when needed
document.addEventListener('DOMContentLoaded', function() {
    // Auto-render charts when sections load
    const originalLoadSectionContent = CondoPayApp.prototype.loadSectionContent;
    CondoPayApp.prototype.loadSectionContent = function(section) {
        const result = originalLoadSectionContent.call(this, section);
        
        // Add chart rendering after content load
        setTimeout(() => {
            this.renderChartsForSection(section);
        }, 500);
        
        return result;
    };
    
    CondoPayApp.prototype.renderChartsForSection = function(section) {
        if (section === 'dashboard') {
            // Render payment trend chart
            const mainChart = document.getElementById('mainChart');
            if (mainChart) {
                InteractiveCharts.renderPaymentTrendChart('mainChart', CONDOPAY_MOCK_DATA.reports.monthlyTrends);
            }
        } else if (section === 'payments') {
            // Render payment methods chart
            setTimeout(() => {
                const paymentMethodsChart = document.querySelector('.chart-area');
                if (paymentMethodsChart && paymentMethodsChart.textContent.includes('Metodi Pagamento')) {
                    paymentMethodsChart.id = 'paymentMethodsChart';
                    InteractiveCharts.renderPaymentMethodsChart('paymentMethodsChart', CONDOPAY_MOCK_DATA.reports.paymentMethods);
                }
            }, 100);
        } else if (section === 'reports') {
            // Render trend chart
            setTimeout(() => {
                const trendChart = document.querySelector('.chart-area');
                if (trendChart && trendChart.textContent.includes('Trend Pagamenti')) {
                    trendChart.id = 'trendChart';
                    InteractiveCharts.renderPaymentTrendChart('trendChart', CONDOPAY_MOCK_DATA.reports.monthlyTrends);
                }
            }, 100);
        }
    };
});