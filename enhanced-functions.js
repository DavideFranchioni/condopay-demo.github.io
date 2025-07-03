// CondoPay App Demo - Enhanced Functions
// Implementazioni complete delle funzioni precedentemente placeholder

// Estendi la classe CondoPayApp con funzioni operative complete
Object.assign(CondoPayApp.prototype, {

    // ===== CONDOMINIUM MANAGEMENT =====

    addCondominium() {
        const fields = [
            { name: 'name', type: 'text', label: 'Nome Condominio', required: true, placeholder: 'Es. Residenza Milano Centro' },
            { name: 'address', type: 'text', label: 'Indirizzo', required: true, placeholder: 'Via, numero civico, città' },
            { name: 'city', type: 'text', label: 'Città', required: true, value: 'Milano' },
            { name: 'zipCode', type: 'text', label: 'CAP', required: true, placeholder: '20121' },
            { name: 'units', type: 'number', label: 'Numero Unità', required: true, validation: { min: 1, max: 500 } },
            { name: 'totalValue', type: 'number', label: 'Valore Totale (€)', required: true, validation: { min: 0 } },
            { name: 'monthlyAmount', type: 'number', label: 'Importo Mensile (€)', required: true, validation: { min: 0 } },
            { name: 'yearBuilt', type: 'number', label: 'Anno Costruzione', validation: { min: 1800, max: 2025 } },
            { name: 'elevator', type: 'checkbox', label: 'Ascensore presente' },
            { name: 'parking', type: 'checkbox', label: 'Parcheggio presente' },
            { name: 'garden', type: 'checkbox', label: 'Giardino presente' },
            { name: 'nextAssembly', type: 'date', label: 'Prossima Assemblea' }
        ];

        const form = formBuilder.build(fields, (formData) => {
            const newCondo = {
                id: CONDOPAY_MOCK_DATA.condominiums.length + 1,
                ...formData,
                units: parseInt(formData.units),
                totalValue: parseFloat(formData.totalValue),
                monthlyAmount: parseFloat(formData.monthlyAmount),
                yearBuilt: parseInt(formData.yearBuilt) || new Date().getFullYear(),
                elevator: !!formData.elevator,
                parking: !!formData.parking,
                garden: !!formData.garden,
                paymentRate: 100.0,
                defaultingUnits: 0,
                status: 'excellent',
                administrator: this.currentUser.name,
                lastSync: new Date().toISOString(),
                defaultRate: 0
            };

            CONDOPAY_MOCK_DATA.condominiums.push(newCondo);
            this.saveToStorage();
            notificationManager.show(`Condominio "${newCondo.name}" aggiunto con successo!`, 'success');
            
            // Refresh current view
            if (this.currentSection === 'condominiums') {
                this.loadSectionContent('condominiums');
            } else if (this.currentSection === 'dashboard') {
                this.loadSectionContent('dashboard');
            }
        }, { title: 'Nuovo Condominio', submitText: 'Aggiungi Condominio' });

        modalManager.showModal(form.outerHTML, { title: 'Nuovo Condominio', width: '800px' });
        
        // Re-bind form events after modal is shown
        setTimeout(() => {
            const modalForm = document.querySelector('.modal form');
            if (modalForm) {
                modalForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const formData = this.getFormDataFromModal(modalForm);
                    const newCondo = this.createCondominiumFromData(formData);
                    if (newCondo) {
                        CONDOPAY_MOCK_DATA.condominiums.push(newCondo);
                        this.saveToStorage();
                        notificationManager.show(`Condominio "${newCondo.name}" aggiunto!`, 'success');
                        modalManager.closeModal();
                        this.refreshCurrentView();
                    }
                });
            }
        }, 100);
    },

    manageCondominium(id) {
        const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === id);
        if (!condo) return;

        const content = `
            <div class="condo-management">
                <div class="condo-header" style="margin-bottom: 2rem;">
                    <h3>${condo.name}</h3>
                    <p class="text-gray-600">${condo.address}</p>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    <div class="stat-card">
                        <div class="stat-title">Unità</div>
                        <div class="stat-value">${condo.units}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-title">Tasso Pagamento</div>
                        <div class="stat-value">${condo.paymentRate}%</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-title">Volume Mensile</div>
                        <div class="stat-value">€${condo.monthlyAmount.toLocaleString()}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-title">Unità Morose</div>
                        <div class="stat-value">${condo.defaultingUnits}</div>
                    </div>
                </div>
                
                <div class="condo-actions" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <button class="btn btn-primary" onclick="app.editCondominium(${id})">
                        ✏️ Modifica Dettagli
                    </button>
                    <button class="btn btn-secondary" onclick="app.viewCondoResidents(${id})">
                        👥 Gestisci Residenti
                    </button>
                    <button class="btn btn-secondary" onclick="app.sendCondoCommunication(${id})">
                        📧 Invia Comunicazione
                    </button>
                    <button class="btn btn-secondary" onclick="app.exportCondoReport(${id})">
                        📊 Report Condominio
                    </button>
                    <button class="btn btn-warning" onclick="app.sendPaymentReminders(${id})">
                        💳 Solleciti Pagamento
                    </button>
                    <button class="btn btn-danger" onclick="app.deleteCondominium(${id})">
                        🗑️ Elimina Condominio
                    </button>
                </div>
            </div>
        `;

        modalManager.showModal(content, { 
            title: `Gestione ${condo.name}`, 
            width: '900px' 
        });
    },

    editCondominium(id) {
        const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === id);
        if (!condo) return;

        const fields = [
            { name: 'name', type: 'text', label: 'Nome Condominio', required: true, value: condo.name },
            { name: 'address', type: 'text', label: 'Indirizzo', required: true, value: condo.address },
            { name: 'city', type: 'text', label: 'Città', required: true, value: condo.city },
            { name: 'zipCode', type: 'text', label: 'CAP', required: true, value: condo.zipCode },
            { name: 'units', type: 'number', label: 'Numero Unità', required: true, value: condo.units },
            { name: 'totalValue', type: 'number', label: 'Valore Totale (€)', required: true, value: condo.totalValue },
            { name: 'monthlyAmount', type: 'number', label: 'Importo Mensile (€)', required: true, value: condo.monthlyAmount },
            { name: 'yearBuilt', type: 'number', label: 'Anno Costruzione', value: condo.yearBuilt },
            { name: 'elevator', type: 'checkbox', label: 'Ascensore presente', value: condo.elevator },
            { name: 'parking', type: 'checkbox', label: 'Parcheggio presente', value: condo.parking },
            { name: 'garden', type: 'checkbox', label: 'Giardino presente', value: condo.garden },
            { name: 'nextAssembly', type: 'date', label: 'Prossima Assemblea', value: condo.nextAssembly ? condo.nextAssembly.split('T')[0] : '' }
        ];

        this.showEditModal(fields, (formData) => {
            Object.assign(condo, {
                ...formData,
                units: parseInt(formData.units),
                totalValue: parseFloat(formData.totalValue),
                monthlyAmount: parseFloat(formData.monthlyAmount),
                yearBuilt: parseInt(formData.yearBuilt) || condo.yearBuilt,
                elevator: !!formData.elevator,
                parking: !!formData.parking,
                garden: !!formData.garden,
                lastSync: new Date().toISOString()
            });

            this.saveToStorage();
            notificationManager.show(`Condominio "${condo.name}" aggiornato!`, 'success');
            this.refreshCurrentView();
        }, `Modifica ${condo.name}`);
    },

    deleteCondominium(id) {
        const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === id);
        if (!condo) return;

        if (confirm(`Sei sicuro di voler eliminare "${condo.name}"?\n\nQuesta azione non può essere annullata.`)) {
            const index = CONDOPAY_MOCK_DATA.condominiums.findIndex(c => c.id === id);
            CONDOPAY_MOCK_DATA.condominiums.splice(index, 1);
            
            // Remove related residents
            CONDOPAY_MOCK_DATA.residents = CONDOPAY_MOCK_DATA.residents.filter(r => r.condominiumId !== id);
            
            this.saveToStorage();
            notificationManager.show(`Condominio "${condo.name}" eliminato`, 'warning');
            modalManager.closeModal();
            this.refreshCurrentView();
        }
    },

    // ===== RESIDENT MANAGEMENT =====

    addResident() {
        const condominiumOptions = CONDOPAY_MOCK_DATA.condominiums.map(c => ({
            value: c.id.toString(),
            label: c.name
        }));

        const fields = [
            { name: 'condominiumId', type: 'select', label: 'Condominio', required: true, options: condominiumOptions },
            { name: 'unit', type: 'text', label: 'Unità', required: true, placeholder: 'Es. Apt. 12A' },
            { name: 'floor', type: 'number', label: 'Piano', required: true, validation: { min: 0, max: 50 } },
            { name: 'owner', type: 'text', label: 'Proprietario', required: true, placeholder: 'Nome e Cognome' },
            { name: 'email', type: 'email', label: 'Email', required: true, placeholder: 'email@esempio.it' },
            { name: 'phone', type: 'tel', label: 'Telefono', required: true, placeholder: '+39 333 1234567' },
            { name: 'monthlyFee', type: 'number', label: 'Quota Mensile (€)', required: true, validation: { min: 0 } },
            { name: 'joinDate', type: 'date', label: 'Data Ingresso', value: new Date().toISOString().split('T')[0] }
        ];

        this.showEditModal(fields, (formData) => {
            const newResident = {
                id: CONDOPAY_MOCK_DATA.residents.length + 1,
                ...formData,
                condominiumId: parseInt(formData.condominiumId),
                floor: parseInt(formData.floor),
                monthlyFee: parseFloat(formData.monthlyFee),
                paymentStatus: 'paid',
                lastPayment: new Date().toISOString().split('T')[0],
                balance: 0
            };

            CONDOPAY_MOCK_DATA.residents.push(newResident);
            this.saveToStorage();
            notificationManager.show(`Residente "${newResident.owner}" aggiunto!`, 'success');
            this.refreshCurrentView();
        }, 'Nuovo Condomino');
    },

    manageResident(id) {
        const resident = CONDOPAY_MOCK_DATA.residents.find(r => r.id === id);
        if (!resident) return;

        const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === resident.condominiumId);
        
        const content = `
            <div class="resident-management">
                <div class="resident-header" style="margin-bottom: 2rem;">
                    <h3>${resident.owner}</h3>
                    <p class="text-gray-600">${condo?.name} - ${resident.unit}</p>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    <div class="stat-card">
                        <div class="stat-title">Quota Mensile</div>
                        <div class="stat-value">€${resident.monthlyFee.toLocaleString()}</div>
                    </div>
                    <div class="stat-card ${resident.balance < 0 ? 'danger' : 'success'}">
                        <div class="stat-title">Saldo</div>
                        <div class="stat-value">€${resident.balance.toLocaleString()}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-title">Ultimo Pagamento</div>
                        <div class="stat-value">${resident.lastPayment ? Utils.Date.formatDate(resident.lastPayment) : 'Mai'}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-title">Status</div>
                        <div class="stat-value">
                            <span class="status-badge status-${resident.paymentStatus === 'paid' ? 'success' : resident.paymentStatus === 'pending' ? 'warning' : 'danger'}">
                                ${resident.paymentStatus === 'paid' ? 'Pagato' : resident.paymentStatus === 'pending' ? 'In attesa' : 'Scaduto'}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div class="resident-actions" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <button class="btn btn-primary" onclick="app.editResident(${id})">
                        ✏️ Modifica Dati
                    </button>
                    <button class="btn btn-secondary" onclick="app.viewResidentPayments(${id})">
                        💳 Storico Pagamenti
                    </button>
                    <button class="btn btn-secondary" onclick="app.sendResidentCommunication(${id})">
                        📧 Invia Messaggio
                    </button>
                    <button class="btn btn-warning" onclick="app.addResidentPayment(${id})">
                        💰 Registra Pagamento
                    </button>
                    ${resident.balance < 0 ? `
                        <button class="btn btn-warning" onclick="app.sendPaymentReminder(${id})">
                            📨 Invia Sollecito
                        </button>
                    ` : ''}
                    <button class="btn btn-danger" onclick="app.deleteResident(${id})">
                        🗑️ Rimuovi Residente
                    </button>
                </div>
            </div>
        `;

        modalManager.showModal(content, { 
            title: `Gestione ${resident.owner}`, 
            width: '900px' 
        });
    },

    editResident(id) {
        const resident = CONDOPAY_MOCK_DATA.residents.find(r => r.id === id);
        if (!resident) return;

        const condominiumOptions = CONDOPAY_MOCK_DATA.condominiums.map(c => ({
            value: c.id.toString(),
            label: c.name
        }));

        const fields = [
            { name: 'condominiumId', type: 'select', label: 'Condominio', required: true, value: resident.condominiumId.toString(), options: condominiumOptions },
            { name: 'unit', type: 'text', label: 'Unità', required: true, value: resident.unit },
            { name: 'floor', type: 'number', label: 'Piano', required: true, value: resident.floor },
            { name: 'owner', type: 'text', label: 'Proprietario', required: true, value: resident.owner },
            { name: 'email', type: 'email', label: 'Email', required: true, value: resident.email },
            { name: 'phone', type: 'tel', label: 'Telefono', required: true, value: resident.phone },
            { name: 'monthlyFee', type: 'number', label: 'Quota Mensile (€)', required: true, value: resident.monthlyFee },
            { name: 'balance', type: 'number', label: 'Saldo Attuale (€)', value: resident.balance }
        ];

        this.showEditModal(fields, (formData) => {
            Object.assign(resident, {
                ...formData,
                condominiumId: parseInt(formData.condominiumId),
                floor: parseInt(formData.floor),
                monthlyFee: parseFloat(formData.monthlyFee),
                balance: parseFloat(formData.balance)
            });

            this.saveToStorage();
            notificationManager.show(`Residente "${resident.owner}" aggiornato!`, 'success');
            this.refreshCurrentView();
        }, `Modifica ${resident.owner}`);
    },

    // ===== COMMUNICATION SYSTEM =====

    newCommunication() {
        const condominiumOptions = [
            { value: '', label: 'Tutti i condomini' },
            ...CONDOPAY_MOCK_DATA.condominiums.map(c => ({
                value: c.id.toString(),
                label: c.name
            }))
        ];

        const templateOptions = [
            { value: '', label: 'Messaggio personalizzato' },
            { value: 'payment_reminder', label: 'Sollecito pagamento' },
            { value: 'assembly_notice', label: 'Convocazione assemblea' },
            { value: 'maintenance_notice', label: 'Avviso manutenzione' },
            { value: 'general_notice', label: 'Comunicazione generale' }
        ];

        const fields = [
            { name: 'type', type: 'select', label: 'Tipo Comunicazione', required: true, options: [
                { value: 'notice', label: 'Avviso generale' },
                { value: 'reminder', label: 'Sollecito' },
                { value: 'maintenance', label: 'Manutenzione' },
                { value: 'assembly', label: 'Assemblea' }
            ]},
            { name: 'template', type: 'select', label: 'Template', options: templateOptions },
            { name: 'condominiumId', type: 'select', label: 'Condominio Destinatario', options: condominiumOptions },
            { name: 'channel', type: 'select', label: 'Canale di Invio', required: true, options: [
                { value: 'email', label: 'Solo Email' },
                { value: 'sms', label: 'Solo SMS' },
                { value: 'email_sms', label: 'Email + SMS' },
                { value: 'whatsapp', label: 'WhatsApp Business' }
            ]},
            { name: 'title', type: 'text', label: 'Oggetto', required: true, placeholder: 'Oggetto della comunicazione' },
            { name: 'message', type: 'textarea', label: 'Messaggio', required: true, rows: 5, placeholder: 'Scrivi qui il messaggio...' },
            { name: 'sendDate', type: 'date', label: 'Data Invio', value: new Date().toISOString().split('T')[0] },
            { name: 'sendTime', type: 'time', label: 'Ora Invio', value: '09:00' }
        ];

        this.showEditModal(fields, (formData) => {
            const newComm = {
                id: CONDOPAY_MOCK_DATA.communications.length + 1,
                ...formData,
                condominiumId: formData.condominiumId ? parseInt(formData.condominiumId) : null,
                recipientType: formData.condominiumId ? 'condo' : 'all',
                recipients: this.getRecipients(formData.condominiumId),
                sentDate: new Date(`${formData.sendDate}T${formData.sendTime}`).toISOString(),
                sentBy: this.currentUser.name,
                status: 'sent'
            };

            CONDOPAY_MOCK_DATA.communications.push(newComm);
            this.saveToStorage();
            this.addActivityLog('communication', `Comunicazione inviata: ${newComm.title}`, newComm.recipients.length);
            notificationManager.show(`Comunicazione "${newComm.title}" inviata a ${newComm.recipients.length} destinatari!`, 'success');
            this.refreshCurrentView();
        }, 'Nuova Comunicazione');
    },

    sendPaymentReminders(condoId = null) {
        const overdueResidents = CONDOPAY_MOCK_DATA.residents.filter(r => {
            const isOverdue = r.paymentStatus === 'overdue' || r.balance < 0;
            const matchesCondo = !condoId || r.condominiumId === condoId;
            return isOverdue && matchesCondo;
        });

        if (overdueResidents.length === 0) {
            notificationManager.show('Nessun pagamento scaduto trovato', 'info');
            return;
        }

        const content = `
            <div class="payment-reminders">
                <h4>Solleciti Automatici</h4>
                <p>Trovati ${overdueResidents.length} residenti con pagamenti scaduti.</p>
                
                <div style="margin: 1.5rem 0;">
                    <label>
                        <input type="checkbox" checked> Email
                    </label>
                    <label style="margin-left: 1rem;">
                        <input type="checkbox" checked> SMS
                    </label>
                </div>
                
                <div class="resident-list" style="max-height: 300px; overflow-y: auto;">
                    ${overdueResidents.map(r => {
                        const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === r.condominiumId);
                        return `
                            <div style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between;">
                                <div>
                                    <strong>${r.owner}</strong><br>
                                    <small>${condo?.name} - ${r.unit}</small>
                                </div>
                                <div style="text-align: right;">
                                    <strong style="color: #e53e3e;">€${Math.abs(r.balance).toLocaleString()}</strong><br>
                                    <small>in ritardo</small>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="modalManager.closeModal()">
                        Annulla
                    </button>
                    <button type="button" class="btn btn-warning" onclick="app.confirmSendReminders(${JSON.stringify(overdueResidents.map(r => r.id))})">
                        📧 Invia ${overdueResidents.length} Solleciti
                    </button>
                </div>
            </div>
        `;

        modalManager.showModal(content, { title: 'Solleciti Pagamento', width: '600px' });
    },

    confirmSendReminders(residentIds) {
        const residents = CONDOPAY_MOCK_DATA.residents.filter(r => residentIds.includes(r.id));
        
        // Simulate sending reminders
        residents.forEach(resident => {
            const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === resident.condominiumId);
            
            const reminder = {
                id: CONDOPAY_MOCK_DATA.communications.length + 1,
                type: 'reminder',
                title: 'Sollecito Pagamento',
                message: `Gentile ${resident.owner}, il pagamento delle spese condominiali per ${condo?.name} risulta scaduto. Importo: €${Math.abs(resident.balance).toFixed(2)}`,
                condominiumId: resident.condominiumId,
                recipientType: 'resident',
                recipients: [resident.id],
                sentDate: new Date().toISOString(),
                sentBy: this.currentUser.name,
                channel: 'email_sms',
                status: 'sent'
            };
            
            CONDOPAY_MOCK_DATA.communications.push(reminder);
        });

        this.saveToStorage();
        this.addActivityLog('alert', `Solleciti inviati a ${residents.length} residenti`);
        notificationManager.show(`${residents.length} solleciti inviati con successo!`, 'success');
        modalManager.closeModal();
        this.refreshCurrentView();
    },

    // ===== EXPORT FUNCTIONS =====

    exportPayments() {
        const payments = CONDOPAY_MOCK_DATA.payments.map(payment => {
            const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === payment.condominiumId);
            const resident = CONDOPAY_MOCK_DATA.residents.find(r => r.id === payment.residentId);
            
            return {
                'ID Transazione': payment.id,
                'Data': Utils.Date.formatDate(payment.date),
                'Condominio': condo?.name || 'N/A',
                'Unità': resident?.unit || 'N/A',
                'Residente': resident?.owner || 'N/A',
                'Importo': payment.amount,
                'Commissione': payment.commission || 0,
                'Metodo': payment.method === 'stripe' ? 'Stripe' : payment.method === 'bank_transfer' ? 'Bonifico' : 'Contanti',
                'Status': payment.status === 'completed' ? 'Completato' : payment.status === 'pending' ? 'In attesa' : 'Fallito',
                'ID Stripe': payment.transactionId || ''
            };
        });

        Utils.Export.toCSV(payments, `condopay-pagamenti-${new Date().toISOString().split('T')[0]}.csv`);
        notificationManager.show(`Esportati ${payments.length} pagamenti`, 'success');
    },

    exportCondominiums() {
        const condos = CONDOPAY_MOCK_DATA.condominiums.map(condo => ({
            'Nome': condo.name,
            'Indirizzo': condo.address,
            'Città': condo.city,
            'CAP': condo.zipCode,
            'Unità': condo.units,
            'Valore Totale': condo.totalValue,
            'Importo Mensile': condo.monthlyAmount,
            'Tasso Pagamento': condo.paymentRate + '%',
            'Unità Morose': condo.defaultingUnits,
            'Status': this.getStatusText(condo.paymentRate),
            'Anno Costruzione': condo.yearBuilt,
            'Ascensore': condo.elevator ? 'Sì' : 'No',
            'Parcheggio': condo.parking ? 'Sì' : 'No',
            'Giardino': condo.garden ? 'Sì' : 'No',
            'Prossima Assemblea': condo.nextAssembly ? Utils.Date.formatDate(condo.nextAssembly) : ''
        }));

        Utils.Export.toCSV(condos, `condopay-condomini-${new Date().toISOString().split('T')[0]}.csv`);
        notificationManager.show(`Esportati ${condos.length} condomini`, 'success');
    },

    exportResidents() {
        const residents = CONDOPAY_MOCK_DATA.residents.map(resident => {
            const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === resident.condominiumId);
            
            return {
                'Nome': resident.owner,
                'Email': resident.email,
                'Telefono': resident.phone,
                'Condominio': condo?.name || 'N/A',
                'Unità': resident.unit,
                'Piano': resident.floor,
                'Quota Mensile': resident.monthlyFee,
                'Saldo': resident.balance,
                'Status Pagamento': resident.paymentStatus === 'paid' ? 'Pagato' : resident.paymentStatus === 'pending' ? 'In attesa' : 'Scaduto',
                'Ultimo Pagamento': resident.lastPayment ? Utils.Date.formatDate(resident.lastPayment) : 'Mai',
                'Data Ingresso': resident.joinDate ? Utils.Date.formatDate(resident.joinDate) : ''
            };
        });

        Utils.Export.toCSV(residents, `condopay-residenti-${new Date().toISOString().split('T')[0]}.csv`);
        notificationManager.show(`Esportati ${residents.length} residenti`, 'success');
    },

    // ===== SETTINGS MANAGEMENT =====

    saveGeneralSettings() {
        const form = document.querySelector('.modal form, #settingsContent form');
        if (!form) return;

        const formData = new FormData(form);
        const settings = {};
        
        for (let [key, value] of formData.entries()) {
            settings[key] = value;
        }

        CONDOPAY_MOCK_DATA.settings.general = { ...CONDOPAY_MOCK_DATA.settings.general, ...settings };
        this.saveToStorage();
        notificationManager.show('Impostazioni salvate con successo!', 'success');
    },

    resetSettings() {
        if (confirm('Sei sicuro di voler ripristinare le impostazioni predefinite?')) {
            // Reset to default settings
            CONDOPAY_MOCK_DATA.settings = {
                general: {
                    companyName: "Studio Amministrazioni Rossi",
                    companyAddress: "Via Brera 15, 20121 Milano",
                    companyPhone: "+39 02 1234 5678",
                    companyEmail: "info@studiorossi.it",
                    companyVat: "IT12345678901",
                    timezone: "Europe/Rome",
                    language: "it",
                    currency: "EUR"
                }
            };
            
            this.saveToStorage();
            notificationManager.show('Impostazioni ripristinate', 'info');
            this.loadSectionContent('settings');
        }
    },

    // ===== UTILITY FUNCTIONS =====

    showEditModal(fields, onSubmit, title = 'Modifica') {
        const form = formBuilder.build(fields, onSubmit, { title, submitText: 'Salva' });
        modalManager.showModal(form.outerHTML, { title, width: '700px' });
        
        // Re-initialize form in modal
        setTimeout(() => {
            const modalForm = document.querySelector('.modal form');
            if (modalForm) {
                modalForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const formData = new FormData(modalForm);
                    const data = {};
                    for (let [key, value] of formData.entries()) {
                        data[key] = value;
                    }
                    onSubmit(data);
                    modalManager.closeModal();
                });
            }
        }, 100);
    },

    getFormDataFromModal(form) {
        const formData = new FormData(form);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        return data;
    },

    createCondominiumFromData(formData) {
        return {
            id: CONDOPAY_MOCK_DATA.condominiums.length + 1,
            name: formData.name,
            address: formData.address,
            city: formData.city || 'Milano',
            zipCode: formData.zipCode,
            units: parseInt(formData.units),
            totalValue: parseFloat(formData.totalValue),
            monthlyAmount: parseFloat(formData.monthlyAmount),
            paymentRate: 100.0,
            defaultingUnits: 0,
            status: 'excellent',
            administrator: this.currentUser.name,
            yearBuilt: parseInt(formData.yearBuilt) || new Date().getFullYear(),
            elevator: !!formData.elevator,
            parking: !!formData.parking,
            garden: !!formData.garden,
            lastSync: new Date().toISOString(),
            nextAssembly: formData.nextAssembly || null
        };
    },

    getRecipients(condominiumId) {
        if (!condominiumId) {
            return CONDOPAY_MOCK_DATA.residents.map(r => r.id);
        }
        return CONDOPAY_MOCK_DATA.residents
            .filter(r => r.condominiumId === parseInt(condominiumId))
            .map(r => r.id);
    },

    addActivityLog(type, title, description = '') {
        const activity = {
            id: CONDOPAY_MOCK_DATA.recentActivity.length + 1,
            type,
            title,
            description: description.toString(),
            timestamp: new Date().toISOString(),
            userId: this.currentUser.id
        };

        CONDOPAY_MOCK_DATA.recentActivity.unshift(activity);
        
        // Keep only last 20 activities
        if (CONDOPAY_MOCK_DATA.recentActivity.length > 20) {
            CONDOPAY_MOCK_DATA.recentActivity = CONDOPAY_MOCK_DATA.recentActivity.slice(0, 20);
        }
        
        this.saveToStorage();
    },

    saveToStorage() {
        Utils.Storage.save('condopay_data', CONDOPAY_MOCK_DATA);
    },

    loadFromStorage() {
        const saved = Utils.Storage.load('condopay_data');
        if (saved) {
            Object.assign(CONDOPAY_MOCK_DATA, saved);
        }
    },

    refreshCurrentView() {
        if (this.currentSection) {
            this.loadSectionContent(this.currentSection);
        }
    },

    // ===== INTEGRATION TESTING =====

    syncIntegration(integrationId) {
        const integration = CONDOPAY_MOCK_DATA.integrations.find(i => i.id === integrationId);
        if (!integration) return;

        notificationManager.show(`Sincronizzazione ${integration.name} in corso...`, 'info');
        
        // Simulate sync process
        setTimeout(() => {
            integration.lastSync = new Date().toISOString();
            this.saveToStorage();
            notificationManager.show(`${integration.name} sincronizzato con successo!`, 'success');
            this.refreshCurrentView();
        }, 2000);
    },

    testIntegration(integrationId) {
        const integration = CONDOPAY_MOCK_DATA.integrations.find(i => i.id === integrationId);
        if (!integration) return;

        notificationManager.show(`Test ${integration.name} in corso...`, 'info');
        
        // Simulate test
        setTimeout(() => {
            const isSuccess = Math.random() > 0.1; // 90% success rate
            
            if (isSuccess) {
                notificationManager.show(`${integration.name}: Test completato con successo!`, 'success');
            } else {
                notificationManager.show(`${integration.name}: Test fallito - verificare configurazione`, 'error');
            }
        }, 1500);
    },

    configureIntegration(integrationId) {
        const integration = CONDOPAY_MOCK_DATA.integrations.find(i => i.id === integrationId);
        if (!integration) return;

        const content = `
            <div class="integration-config">
                <h4>${integration.name} - Configurazione</h4>
                <p class="text-gray-600">${integration.description}</p>
                
                <div class="form-field">
                    <label>API Key</label>
                    <input type="password" value="${integration.apiKey}" readonly>
                    <small>Contatta il supporto per modificare la chiave API</small>
                </div>
                
                <div class="form-field">
                    <label>Webhook URL</label>
                    <input type="url" value="${integration.webhookUrl}" readonly>
                </div>
                
                <div class="form-field">
                    <label>Frequenza Sincronizzazione</label>
                    <select id="syncFrequency">
                        <option value="realtime" ${integration.syncFrequency === 'realtime' ? 'selected' : ''}>Real-time</option>
                        <option value="hourly" ${integration.syncFrequency === 'hourly' ? 'selected' : ''}>Ogni ora</option>
                        <option value="daily" ${integration.syncFrequency === 'daily' ? 'selected' : ''}>Giornaliera</option>
                        <option value="ondemand" ${integration.syncFrequency === 'ondemand' ? 'selected' : ''}>Su richiesta</option>
                    </select>
                </div>
                
                <div class="form-field">
                    <label>Tipi di Dati Sincronizzati</label>
                    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
                        ${integration.dataTypes.map(type => `
                            <label style="display: flex; align-items: center; gap: 0.5rem;">
                                <input type="checkbox" checked disabled>
                                ${type}
                            </label>
                        `).join('')}
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="modalManager.closeModal()">
                        Chiudi
                    </button>
                    <button type="button" class="btn btn-warning" onclick="app.testIntegration('${integrationId}')">
                        🧪 Test Connessione
                    </button>
                    <button type="button" class="btn btn-primary" onclick="app.syncIntegration('${integrationId}')">
                        🔄 Sincronizza Ora
                    </button>
                </div>
            </div>
        `;

        modalManager.showModal(content, { title: `Configurazione ${integration.name}`, width: '600px' });
    }
});

// Initialize storage on app start
document.addEventListener('DOMContentLoaded', function() {
    if (window.app) {
        app.loadFromStorage();
    }
});