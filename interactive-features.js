// CondoPay App Demo - Interactive Features
// Funzionalità interattive avanzate e miglioramenti UX

// ===== NOTIFICATION CENTER =====

class NotificationCenter {
    constructor() {
        this.notifications = CONDOPAY_MOCK_DATA.notifications || [];
        this.unreadCount = this.notifications.filter(n => !n.read).length;
        this.updateNotificationBadge();
    }

    updateNotificationBadge() {
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            badge.textContent = this.unreadCount;
            badge.style.display = this.unreadCount > 0 ? 'flex' : 'none';
        }
    }

    showNotificationCenter() {
        const content = `
            <div class="notification-center">
                <div class="notification-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h4>Notifiche</h4>
                    <button class="btn btn-secondary" onclick="notificationCenter.markAllAsRead()">
                        ✓ Segna tutte come lette
                    </button>
                </div>
                
                <div class="notification-list" style="max-height: 400px; overflow-y: auto;">
                    ${this.notifications.length === 0 ? 
                        '<div class="no-notifications" style="text-align: center; padding: 2rem; color: #666;">Nessuna notifica</div>' :
                        this.notifications.map(notification => this.renderNotification(notification)).join('')
                    }
                </div>
                
                <div class="notification-actions" style="margin-top: 1rem; text-align: center;">
                    <button class="btn btn-secondary" onclick="notificationCenter.clearAll()">
                        🗑️ Cancella tutte
                    </button>
                </div>
            </div>
        `;

        modalManager.showModal(content, { title: 'Centro Notifiche', width: '600px' });
    }

    renderNotification(notification) {
        const timeAgo = Utils.Date.timeAgo(notification.timestamp);
        const typeIcons = {
            payment: '💳',
            alert: '⚠️',
            system: '⚙️',
            info: 'ℹ️'
        };

        return `
            <div class="notification-item ${notification.read ? 'read' : 'unread'}" 
                 style="padding: 1rem; border-bottom: 1px solid #e2e8f0; cursor: pointer; transition: background 0.2s;"
                 onclick="notificationCenter.handleNotificationClick('${notification.id}')"
                 onmouseenter="this.style.background='#f7fafc'"
                 onmouseleave="this.style.background='${notification.read ? 'white' : '#f0f9ff'}'">
                
                <div style="display: flex; align-items: flex-start; gap: 1rem;">
                    <div style="font-size: 1.5rem;">${typeIcons[notification.type] || '📝'}</div>
                    
                    <div style="flex: 1;">
                        <div style="font-weight: ${notification.read ? 'normal' : 'bold'}; margin-bottom: 0.25rem;">
                            ${notification.title}
                        </div>
                        <div style="color: #666; font-size: 0.9rem; margin-bottom: 0.5rem;">
                            ${notification.message}
                        </div>
                        <div style="color: #999; font-size: 0.8rem;">
                            ${timeAgo}
                        </div>
                    </div>
                    
                    ${!notification.read ? 
                        '<div style="width: 8px; height: 8px; background: #3182ce; border-radius: 50%; margin-top: 0.5rem;"></div>' : 
                        ''
                    }
                </div>
            </div>
        `;
    }

    handleNotificationClick(notificationId) {
        const notification = this.notifications.find(n => n.id.toString() === notificationId);
        if (!notification) return;

        // Mark as read
        notification.read = true;
        this.unreadCount = this.notifications.filter(n => !n.read).length;
        this.updateNotificationBadge();
        
        // Save to storage
        app.saveToStorage();
        
        // Navigate to relevant section if actionUrl exists
        if (notification.actionUrl) {
            modalManager.closeModal();
            // Simple routing based on URL
            if (notification.actionUrl.includes('/payments/')) {
                app.navigateTo('payments');
            } else if (notification.actionUrl.includes('/condominiums/')) {
                app.navigateTo('condominiums');
            } else if (notification.actionUrl.includes('/integrations/')) {
                app.navigateTo('integrations');
            }
        }
        
        // Refresh notification display
        setTimeout(() => {
            if (document.querySelector('.notification-center')) {
                this.showNotificationCenter();
            }
        }, 100);
    }

    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
        this.unreadCount = 0;
        this.updateNotificationBadge();
        app.saveToStorage();
        this.showNotificationCenter();
    }

    clearAll() {
        if (confirm('Sei sicuro di voler cancellare tutte le notifiche?')) {
            this.notifications = [];
            CONDOPAY_MOCK_DATA.notifications = [];
            this.unreadCount = 0;
            this.updateNotificationBadge();
            app.saveToStorage();
            this.showNotificationCenter();
        }
    }

    addNotification(type, title, message, actionUrl = null) {
        const newNotification = {
            id: this.notifications.length + 1,
            type,
            title,
            message,
            timestamp: new Date().toISOString(),
            read: false,
            actionUrl
        };

        this.notifications.unshift(newNotification);
        CONDOPAY_MOCK_DATA.notifications.unshift(newNotification);
        
        // Keep only last 50 notifications
        if (this.notifications.length > 50) {
            this.notifications = this.notifications.slice(0, 50);
            CONDOPAY_MOCK_DATA.notifications = CONDOPAY_MOCK_DATA.notifications.slice(0, 50);
        }

        this.unreadCount++;
        this.updateNotificationBadge();
        app.saveToStorage();
    }
}

// ===== ADVANCED SEARCH =====

class GlobalSearch {
    constructor() {
        this.searchData = [];
        this.buildSearchIndex();
    }

    buildSearchIndex() {
        // Index condominiums
        CONDOPAY_MOCK_DATA.condominiums.forEach(condo => {
            this.searchData.push({
                type: 'condominium',
                id: condo.id,
                title: condo.name,
                subtitle: condo.address,
                content: `${condo.name} ${condo.address} ${condo.city}`,
                section: 'condominiums'
            });
        });

        // Index residents
        CONDOPAY_MOCK_DATA.residents.forEach(resident => {
            const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === resident.condominiumId);
            this.searchData.push({
                type: 'resident',
                id: resident.id,
                title: resident.owner,
                subtitle: `${condo?.name} - ${resident.unit}`,
                content: `${resident.owner} ${resident.email} ${resident.phone} ${condo?.name} ${resident.unit}`,
                section: 'residents'
            });
        });

        // Index payments
        CONDOPAY_MOCK_DATA.payments.forEach(payment => {
            const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === payment.condominiumId);
            const resident = CONDOPAY_MOCK_DATA.residents.find(r => r.id === payment.residentId);
            this.searchData.push({
                type: 'payment',
                id: payment.id,
                title: `Pagamento ${payment.id}`,
                subtitle: `€${payment.amount} - ${resident?.owner}`,
                content: `${payment.id} ${payment.amount} ${resident?.owner} ${condo?.name}`,
                section: 'payments'
            });
        });
    }

    search(query) {
        if (!query || query.length < 2) return [];

        const lowerQuery = query.toLowerCase();
        const results = this.searchData.filter(item => 
            item.content.toLowerCase().includes(lowerQuery)
        );

        return results.slice(0, 10); // Limit to 10 results
    }

    showSearchModal() {
        const content = `
            <div class="global-search">
                <div class="search-input-container" style="margin-bottom: 1rem;">
                    <input type="text" 
                           id="globalSearchInput" 
                           placeholder="Cerca condomini, residenti, pagamenti..." 
                           style="width: 100%; padding: 0.75rem; font-size: 1rem; border: 2px solid #e2e8f0; border-radius: 8px;"
                           autocomplete="off">
                </div>
                
                <div id="searchResults" style="min-height: 200px; max-height: 400px; overflow-y: auto;">
                    <div style="text-align: center; color: #666; padding: 2rem;">
                        Digita almeno 2 caratteri per iniziare la ricerca
                    </div>
                </div>
            </div>
        `;

        modalManager.showModal(content, { title: 'Ricerca Globale', width: '700px' });

        // Focus and bind search
        setTimeout(() => {
            const searchInput = document.getElementById('globalSearchInput');
            if (searchInput) {
                searchInput.focus();
                searchInput.addEventListener('input', Utils.Event.debounce((e) => {
                    this.performSearch(e.target.value);
                }, 300));
            }
        }, 100);
    }

    performSearch(query) {
        const resultsContainer = document.getElementById('searchResults');
        if (!resultsContainer) return;

        if (query.length < 2) {
            resultsContainer.innerHTML = '<div style="text-align: center; color: #666; padding: 2rem;">Digita almeno 2 caratteri per iniziare la ricerca</div>';
            return;
        }

        const results = this.search(query);

        if (results.length === 0) {
            resultsContainer.innerHTML = '<div style="text-align: center; color: #666; padding: 2rem;">Nessun risultato trovato</div>';
            return;
        }

        resultsContainer.innerHTML = results.map(result => `
            <div class="search-result-item" 
                 style="padding: 1rem; border-bottom: 1px solid #e2e8f0; cursor: pointer; transition: background 0.2s;"
                 onclick="globalSearch.navigateToResult('${result.section}', '${result.type}', '${result.id}')"
                 onmouseenter="this.style.background='#f7fafc'"
                 onmouseleave="this.style.background='white'">
                
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="font-size: 1.5rem;">
                        ${result.type === 'condominium' ? '🏢' : result.type === 'resident' ? '👤' : '💳'}
                    </div>
                    <div style="flex: 1;">
                        <div style="font-weight: 500; margin-bottom: 0.25rem;">
                            ${result.title}
                        </div>
                        <div style="color: #666; font-size: 0.9rem;">
                            ${result.subtitle}
                        </div>
                    </div>
                    <div style="color: #999; font-size: 0.8rem;">
                        ${result.type === 'condominium' ? 'Condominio' : result.type === 'resident' ? 'Residente' : 'Pagamento'}
                    </div>
                </div>
            </div>
        `).join('');
    }

    navigateToResult(section, type, id) {
        modalManager.closeModal();
        
        // Navigate to section
        app.navigateTo(section);
        
        // Highlight specific item after navigation
        setTimeout(() => {
            if (type === 'condominium') {
                app.manageCondominium(parseInt(id));
            } else if (type === 'resident') {
                app.manageResident(parseInt(id));
            } else if (type === 'payment') {
                // Could implement payment details modal
                notificationManager.show(`Pagamento ${id} trovato nella sezione Pagamenti`, 'info');
            }
        }, 500);
    }
}

// ===== KEYBOARD SHORTCUTS =====

class KeyboardShortcuts {
    constructor() {
        this.shortcuts = {
            'ctrl+k': () => globalSearch.showSearchModal(),
            'ctrl+n': () => notificationCenter.showNotificationCenter(),
            'ctrl+h': () => app.navigateTo('dashboard'),
            'ctrl+c': () => app.navigateTo('condominiums'),
            'ctrl+p': () => app.navigateTo('payments'),
            'ctrl+r': () => app.navigateTo('residents'),
            'ctrl+m': () => app.navigateTo('communications'),
            'escape': () => modalManager.closeModal()
        };
        
        this.bindShortcuts();
    }

    bindShortcuts() {
        document.addEventListener('keydown', (e) => {
            const key = this.getKeyString(e);
            const shortcut = this.shortcuts[key];
            
            if (shortcut) {
                e.preventDefault();
                shortcut();
            }
        });
    }

    getKeyString(e) {
        const parts = [];
        
        if (e.ctrlKey) parts.push('ctrl');
        if (e.altKey) parts.push('alt');
        if (e.shiftKey) parts.push('shift');
        
        parts.push(e.key.toLowerCase());
        
        return parts.join('+');
    }

    showShortcutsHelp() {
        const content = `
            <div class="shortcuts-help">
                <h4>Scorciatoie da Tastiera</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
                    <div>
                        <h5>Navigazione</h5>
                        <div class="shortcut-item">
                            <kbd>Ctrl + H</kbd> Dashboard
                        </div>
                        <div class="shortcut-item">
                            <kbd>Ctrl + C</kbd> Condomini
                        </div>
                        <div class="shortcut-item">
                            <kbd>Ctrl + P</kbd> Pagamenti
                        </div>
                        <div class="shortcut-item">
                            <kbd>Ctrl + R</kbd> Residenti
                        </div>
                        <div class="shortcut-item">
                            <kbd>Ctrl + M</kbd> Comunicazioni
                        </div>
                    </div>
                    <div>
                        <h5>Azioni</h5>
                        <div class="shortcut-item">
                            <kbd>Ctrl + K</kbd> Ricerca Globale
                        </div>
                        <div class="shortcut-item">
                            <kbd>Ctrl + N</kbd> Notifiche
                        </div>
                        <div class="shortcut-item">
                            <kbd>Esc</kbd> Chiudi Modal
                        </div>
                    </div>
                </div>
            </div>
            
            <style>
                .shortcut-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid #f0f0f0;
                }
                
                kbd {
                    background: #f7fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 4px;
                    padding: 0.25rem 0.5rem;
                    font-size: 0.8rem;
                    font-family: monospace;
                }
            </style>
        `;

        modalManager.showModal(content, { title: 'Guida Scorciatoie', width: '600px' });
    }
}

// ===== PRINT FUNCTIONALITY =====

class PrintManager {
    static printSection(sectionName, data) {
        const printWindow = window.open('', '_blank');
        const printContent = this.generatePrintContent(sectionName, data);
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>CondoPay - ${sectionName}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 2cm; }
                    .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 1rem; margin-bottom: 2rem; }
                    .logo { font-size: 1.5rem; font-weight: bold; color: #667eea; }
                    .date { color: #666; font-size: 0.9rem; }
                    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; font-weight: bold; }
                    .footer { margin-top: 2rem; text-align: center; color: #666; font-size: 0.8rem; }
                    @media print { .no-print { display: none; } }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="logo">CondoPay</div>
                    <div>Studio Amministrazioni Rossi</div>
                    <div class="date">Generato il ${new Date().toLocaleDateString('it-IT')}</div>
                </div>
                
                ${printContent}
                
                <div class="footer">
                    <p>Documento generato automaticamente da CondoPay</p>
                    <button class="no-print" onclick="window.print()" style="padding: 0.5rem 1rem; margin-right: 1rem;">🖨️ Stampa</button>
                    <button class="no-print" onclick="window.close()" style="padding: 0.5rem 1rem;">❌ Chiudi</button>
                </div>
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
    }

    static generatePrintContent(sectionName, data) {
        switch (sectionName) {
            case 'condominiums':
                return this.printCondominiums(data);
            case 'residents':
                return this.printResidents(data);
            case 'payments':
                return this.printPayments(data);
            default:
                return '<p>Sezione non supportata per la stampa</p>';
        }
    }

    static printCondominiums(condos) {
        return `
            <h2>Elenco Condomini</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Indirizzo</th>
                        <th>Unità</th>
                        <th>Volume Mensile</th>
                        <th>Tasso Pagamento</th>
                    </tr>
                </thead>
                <tbody>
                    ${condos.map(condo => `
                        <tr>
                            <td>${condo.name}</td>
                            <td>${condo.address}</td>
                            <td>${condo.units}</td>
                            <td>€${condo.monthlyAmount.toLocaleString()}</td>
                            <td>${condo.paymentRate}%</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    static printResidents(residents) {
        return `
            <h2>Elenco Residenti</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Unità</th>
                        <th>Email</th>
                        <th>Telefono</th>
                        <th>Quota Mensile</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    ${residents.map(resident => `
                        <tr>
                            <td>${resident.owner}</td>
                            <td>${resident.unit}</td>
                            <td>${resident.email}</td>
                            <td>${resident.phone}</td>
                            <td>€${resident.monthlyFee.toLocaleString()}</td>
                            <td style="color: ${resident.balance < 0 ? 'red' : 'green'}">€${resident.balance.toLocaleString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    static printPayments(payments) {
        return `
            <h2>Elenco Pagamenti</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Data</th>
                        <th>Importo</th>
                        <th>Metodo</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${payments.map(payment => `
                        <tr>
                            <td>${payment.id}</td>
                            <td>${Utils.Date.formatDate(payment.date)}</td>
                            <td>€${payment.amount.toLocaleString()}</td>
                            <td>${payment.method}</td>
                            <td>${payment.status}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
}

// ===== ENHANCED APP FUNCTIONS =====

// Add print functions to app
Object.assign(CondoPayApp.prototype, {
    printCurrentSection() {
        const data = this.getCurrentSectionData();
        PrintManager.printSection(this.currentSection, data);
    },

    getCurrentSectionData() {
        switch (this.currentSection) {
            case 'condominiums':
                return CONDOPAY_MOCK_DATA.condominiums;
            case 'residents':
                return CONDOPAY_MOCK_DATA.residents;
            case 'payments':
                return CONDOPAY_MOCK_DATA.payments;
            default:
                return [];
        }
    },

    showKeyboardShortcuts() {
        keyboardShortcuts.showShortcutsHelp();
    }
});

// Update the showNotifications function
function showNotifications() {
    notificationCenter.showNotificationCenter();
}

// Update the showUserMenu function  
function showUserMenu() {
    const content = `
        <div class="user-menu-dropdown">
            <div class="user-info" style="padding: 1rem; border-bottom: 1px solid #e2e8f0;">
                <div style="font-weight: 500;">${app.currentUser?.name || 'Utente'}</div>
                <div style="color: #666; font-size: 0.9rem;">${app.currentUser?.email || ''}</div>
                <div style="color: #666; font-size: 0.8rem;">${app.currentUser?.company || ''}</div>
            </div>
            
            <div class="menu-items" style="padding: 0.5rem 0;">
                <div class="menu-item" onclick="app.navigateTo('settings')" style="padding: 0.75rem 1rem; cursor: pointer; transition: background 0.2s;" onmouseenter="this.style.background='#f7fafc'" onmouseleave="this.style.background='white'">
                    ⚙️ Impostazioni
                </div>
                <div class="menu-item" onclick="app.showKeyboardShortcuts()" style="padding: 0.75rem 1rem; cursor: pointer; transition: background 0.2s;" onmouseenter="this.style.background='#f7fafc'" onmouseleave="this.style.background='white'">
                    ⌨️ Scorciatoie
                </div>
                <div class="menu-item" onclick="app.printCurrentSection()" style="padding: 0.75rem 1rem; cursor: pointer; transition: background 0.2s;" onmouseenter="this.style.background='#f7fafc'" onmouseleave="this.style.background='white'">
                    🖨️ Stampa Sezione
                </div>
                <div class="menu-item" onclick="globalSearch.showSearchModal()" style="padding: 0.75rem 1rem; cursor: pointer; transition: background 0.2s;" onmouseenter="this.style.background='#f7fafc'" onmouseleave="this.style.background='white'">
                    🔍 Ricerca Globale
                </div>
                <div style="border-top: 1px solid #e2e8f0; margin: 0.5rem 0;"></div>
                <div class="menu-item" onclick="logout()" style="padding: 0.75rem 1rem; cursor: pointer; color: #e53e3e; transition: background 0.2s;" onmouseenter="this.style.background='#fed7d7'" onmouseleave="this.style.background='white'">
                    🚪 Logout
                </div>
            </div>
        </div>
    `;

    modalManager.showModal(content, { title: 'Menu Utente', width: '300px' });
}

// ===== INITIALIZE INTERACTIVE FEATURES =====

let notificationCenter, globalSearch, keyboardShortcuts;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize after other components
    setTimeout(() => {
        notificationCenter = new NotificationCenter();
        globalSearch = new GlobalSearch();
        keyboardShortcuts = new KeyboardShortcuts();
        
        // Make globally available
        window.notificationCenter = notificationCenter;
        window.globalSearch = globalSearch;
        window.keyboardShortcuts = keyboardShortcuts;
        
        // Update notification button handler
        const notificationBell = document.querySelector('.notification-bell');
        if (notificationBell) {
            notificationBell.onclick = () => notificationCenter.showNotificationCenter();
        }
        
    }, 1000);
});

// Export classes for global use
window.NotificationCenter = NotificationCenter;
window.GlobalSearch = GlobalSearch;
window.KeyboardShortcuts = KeyboardShortcuts;
window.PrintManager = PrintManager;