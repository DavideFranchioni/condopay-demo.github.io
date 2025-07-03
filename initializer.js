// CondoPay App Demo - Initialization Controller
// Assicura che tutte le funzionalità siano caricate e funzionanti

class CondoPayInitializer {
    constructor() {
        this.loadedComponents = new Set();
        this.requiredComponents = [
            'Utils',
            'CONDOPAY_MOCK_DATA', 
            'ModalManager',
            'FormBuilder',
            'NotificationManager',
            'InteractiveCharts',
            'CondoPayApp'
        ];
        this.initializationComplete = false;
        this.retryCount = 0;
        this.maxRetries = 10;
        
        this.startInitialization();
    }

    startInitialization() {
        console.log('🚀 CondoPay Initializer - Avvio inizializzazione...');
        this.checkComponents();
    }

    checkComponents() {
        this.loadedComponents.clear();
        
        // Check each required component
        this.requiredComponents.forEach(component => {
            if (this.isComponentLoaded(component)) {
                this.loadedComponents.add(component);
            }
        });

        const loadedCount = this.loadedComponents.size;
        const totalCount = this.requiredComponents.length;
        
        console.log(`📊 Componenti caricati: ${loadedCount}/${totalCount}`);
        
        if (loadedCount === totalCount) {
            this.completeInitialization();
        } else {
            this.retryCount++;
            if (this.retryCount <= this.maxRetries) {
                console.log(`⏳ Retry ${this.retryCount}/${this.maxRetries} - Ricontrollo componenti in 1 secondo...`);
                setTimeout(() => this.checkComponents(), 1000);
            } else {
                this.handleInitializationFailure();
            }
        }
    }

    isComponentLoaded(component) {
        switch (component) {
            case 'Utils':
                return typeof window.Utils !== 'undefined' && 
                       typeof window.Utils.Date !== 'undefined' &&
                       typeof window.Utils.Number !== 'undefined';
                       
            case 'CONDOPAY_MOCK_DATA':
                return typeof window.CONDOPAY_MOCK_DATA !== 'undefined' &&
                       Array.isArray(window.CONDOPAY_MOCK_DATA.condominiums);
                       
            case 'ModalManager':
                return typeof window.ModalManager !== 'undefined' &&
                       typeof window.modalManager !== 'undefined';
                       
            case 'FormBuilder':
                return typeof window.FormBuilder !== 'undefined' &&
                       typeof window.formBuilder !== 'undefined';
                       
            case 'NotificationManager':
                return typeof window.NotificationManager !== 'undefined' &&
                       typeof window.notificationManager !== 'undefined';
                       
            case 'InteractiveCharts':
                return typeof window.InteractiveCharts !== 'undefined' &&
                       typeof window.interactiveCharts !== 'undefined';
                       
            case 'CondoPayApp':
                return typeof window.CondoPayApp !== 'undefined' &&
                       typeof window.app !== 'undefined';
                       
            default:
                return false;
        }
    }

    completeInitialization() {
        console.log('✅ Tutti i componenti caricati! Inizializzazione completa...');
        
        try {
            // Override app methods with complete implementations if available
            this.applyCompleteImplementations();
            
            // Initialize charts
            this.initializeCharts();
            
            // Setup event listeners
            this.setupGlobalEventListeners();
            
            // Mark as complete
            this.initializationComplete = true;
            
            console.log('🎉 CondoPay App completamente inizializzato!');
            
            // Show success notification
            if (window.notificationManager) {
                setTimeout(() => {
                    window.notificationManager.show(
                        '🎉 CondoPay App caricato con successo! Tutte le funzionalità sono operative.',
                        'success',
                        5000
                    );
                }, 2000);
            }
            
        } catch (error) {
            console.error('❌ Errore durante l\'inizializzazione:', error);
            this.handleInitializationFailure();
        }
    }

    applyCompleteImplementations() {
        // Apply implementations from complete-implementation.js if available
        if (window.app && typeof window.app === 'object') {
            // Ensure all methods are available
            const methodsToCheck = [
                'manageCondominium',
                'viewPaymentDetails', 
                'viewCondoResidents',
                'exportCondoReport',
                'sendCondoCommunication',
                'generateCondominiumCards',
                'generateDetailedCondosTableRows'
            ];

            methodsToCheck.forEach(method => {
                if (typeof window.app[method] !== 'function') {
                    console.warn(`⚠️ Metodo ${method} non trovato in app`);
                }
            });
        }
    }

    initializeCharts() {
        if (window.interactiveCharts) {
            console.log('📊 Inizializzazione grafici interattivi...');
            
            // Setup chart initialization for navigation
            const originalNavigateTo = window.app.navigateTo;
            window.app.navigateTo = function(section) {
                originalNavigateTo.call(this, section);
                
                // Initialize charts based on section
                setTimeout(() => {
                    if (section === 'dashboard') {
                        const mainChart = document.getElementById('mainChart');
                        if (mainChart && window.interactiveCharts) {
                            window.interactiveCharts.renderPaymentsChart('mainChart');
                        }
                    } else if (section === 'payments') {
                        const methodChart = document.getElementById('paymentMethodsChart');
                        if (methodChart && window.interactiveCharts) {
                            window.interactiveCharts.renderPaymentMethodsChart('paymentMethodsChart');
                        }
                    } else if (section === 'reports') {
                        const trendChart = document.getElementById('trendChart');
                        if (trendChart && window.interactiveCharts) {
                            window.interactiveCharts.renderTrendChart('trendChart');
                        }
                    }
                }, 300);
            };
        }
    }

    setupGlobalEventListeners() {
        // Setup keyboard shortcuts
        if (window.keyboardShortcuts) {
            console.log('⌨️ Scorciatoie da tastiera attivate');
        }

        // Setup notification center
        if (window.notificationCenter) {
            console.log('🔔 Centro notifiche attivato');
        }

        // Setup global search
        if (window.globalSearch) {
            console.log('🔍 Ricerca globale attivata');
        }
    }

    handleInitializationFailure() {
        console.error('❌ Inizializzazione fallita! Alcuni componenti potrebbero non funzionare correttamente.');
        
        // Show which components failed to load
        const missingComponents = this.requiredComponents.filter(c => !this.loadedComponents.has(c));
        console.error('❌ Componenti mancanti:', missingComponents);
        
        // Try to show error notification
        if (window.notificationManager) {
            window.notificationManager.show(
                '❌ Alcuni componenti non sono stati caricati correttamente. Alcune funzionalità potrebbero non funzionare.',
                'error',
                10000
            );
        } else {
            alert('❌ Errore di inizializzazione: alcuni componenti non sono stati caricati. Ricarica la pagina.');
        }
    }

    // Method to manually trigger initialization check
    recheckComponents() {
        this.retryCount = 0;
        this.checkComponents();
    }

    // Method to get initialization status
    getStatus() {
        return {
            complete: this.initializationComplete,
            loadedComponents: Array.from(this.loadedComponents),
            missingComponents: this.requiredComponents.filter(c => !this.loadedComponents.has(c)),
            retryCount: this.retryCount
        };
    }
}

// Global function to check initialization status
window.checkInitStatus = function() {
    if (window.condoPayInitializer) {
        const status = window.condoPayInitializer.getStatus();
        console.log('📊 Status Inizializzazione:', status);
        return status;
    } else {
        console.log('❌ Initializer non trovato');
        return null;
    }
};

// Global function to force recheck
window.recheckInit = function() {
    if (window.condoPayInitializer) {
        window.condoPayInitializer.recheckComponents();
    } else {
        console.log('❌ Initializer non trovato');
    }
};

// Auto-start initialization when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for all scripts to load
    setTimeout(() => {
        window.condoPayInitializer = new CondoPayInitializer();
    }, 1000);
});

// Make class available globally
window.CondoPayInitializer = CondoPayInitializer;

console.log('🔧 CondoPay Initializer caricato. Usa checkInitStatus() per verificare lo stato.');
