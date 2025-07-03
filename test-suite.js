// CondoPay App Demo - Test Suite and Validation
// Sistema di test per verificare che tutte le funzionalità siano operative

class CondoPayTestSuite {
    constructor() {
        this.tests = [];
        this.results = { passed: 0, failed: 0, total: 0 };
        this.init();
    }

    init() {
        console.log('🧪 CondoPay Test Suite - Inizializzazione');
        this.registerTests();
    }

    registerTests() {
        // Test componenti base
        this.addTest('App Initialization', () => this.testAppInit());
        this.addTest('Modal Manager', () => this.testModalManager());
        this.addTest('Form Builder', () => this.testFormBuilder());
        this.addTest('Notification Manager', () => this.testNotificationManager());
        
        // Test dati e storage
        this.addTest('Mock Data Loading', () => this.testMockData());
        this.addTest('Local Storage', () => this.testLocalStorage());
        
        // Test UI Components
        this.addTest('Interactive Charts', () => this.testInteractiveCharts());
        this.addTest('Condominium Cards', () => this.testCondominiumCards());
        this.addTest('Payment Details', () => this.testPaymentDetails());
        
        // Test funzionalità principali
        this.addTest('Report Generation', () => this.testReportGeneration());
        this.addTest('Settings Management', () => this.testSettingsManagement());
        this.addTest('Communication System', () => this.testCommunicationSystem());
        
        // Test responsive e accessibility
        this.addTest('Responsive Design', () => this.testResponsiveDesign());
        this.addTest('Keyboard Navigation', () => this.testKeyboardNavigation());
    }

    addTest(name, testFunction) {
        this.tests.push({ name, test: testFunction });
    }

    async runAllTests() {
        console.log('🏃‍♂️ Esecuzione Test Suite Completa...');
        
        const startTime = performance.now();
        this.results = { passed: 0, failed: 0, total: this.tests.length };

        for (const { name, test } of this.tests) {
            try {
                console.log(`🧪 Testing: ${name}`);
                await test();
                this.results.passed++;
                console.log(`✅ ${name} - PASSED`);
            } catch (error) {
                this.results.failed++;
                console.error(`❌ ${name} - FAILED:`, error);
            }
        }

        const endTime = performance.now();
        const duration = (endTime - startTime).toFixed(2);

        this.displayResults(duration);
    }

    displayResults(duration) {
        const { passed, failed, total } = this.results;
        const percentage = ((passed / total) * 100).toFixed(1);

        console.log('\n📊 RISULTATI TEST SUITE');
        console.log('========================');
        console.log(`✅ Test Passati: ${passed}/${total} (${percentage}%)`);
        console.log(`❌ Test Falliti: ${failed}`);
        console.log(`⏱️ Durata: ${duration}ms`);
        console.log('========================\n');

        // Show results in UI
        if (typeof notificationManager !== 'undefined') {
            notificationManager.show(
                `Test Suite: ${passed}/${total} test passati (${percentage}%)`,
                failed === 0 ? 'success' : 'warning',
                8000
            );
        }

        return { passed, failed, total, percentage, duration };
    }

    // Individual Test Methods
    testAppInit() {
        if (typeof window.app === 'undefined') {
            throw new Error('App non inizializzata');
        }
        if (!window.app.currentSection) {
            throw new Error('Sezione corrente non definita');
        }
        return true;
    }

    testModalManager() {
        if (typeof window.modalManager === 'undefined') {
            throw new Error('ModalManager non disponibile');
        }
        
        // Test modal creation
        modalManager.showModal('<p>Test Modal</p>', { title: 'Test' });
        
        if (!document.querySelector('.modal-overlay')) {
            throw new Error('Modal non creato correttamente');
        }
        
        modalManager.closeModal();
        return true;
    }

    testFormBuilder() {
        if (typeof window.formBuilder === 'undefined') {
            throw new Error('FormBuilder non disponibile');
        }

        const fields = [
            { name: 'test', type: 'text', label: 'Test Field', required: true }
        ];

        const form = formBuilder.build(fields, () => {}, { title: 'Test Form' });
        
        if (!form || form.tagName !== 'FORM') {
            throw new Error('Form non generato correttamente');
        }

        return true;
    }

    testNotificationManager() {
        if (typeof window.notificationManager === 'undefined') {
            throw new Error('NotificationManager non disponibile');
        }

        const notification = notificationManager.show('Test notification', 'info', 1000);
        
        if (!notification || !notification.classList.contains('notification')) {
            throw new Error('Notifica non creata correttamente');
        }

        return true;
    }

    testMockData() {
        if (typeof CONDOPAY_MOCK_DATA === 'undefined') {
            throw new Error('Mock data non caricati');
        }

        const requiredSections = ['condominiums', 'residents', 'payments', 'communications'];
        
        for (const section of requiredSections) {
            if (!CONDOPAY_MOCK_DATA[section] || !Array.isArray(CONDOPAY_MOCK_DATA[section])) {
                throw new Error(`Sezione ${section} mancante o non valida`);
            }
        }

        return true;
    }

    testLocalStorage() {
        try {
            const testKey = 'condopay_test';
            const testData = { test: true, timestamp: Date.now() };
            
            Utils.Storage.save(testKey, testData);
            const loaded = Utils.Storage.load(testKey);
            
            if (!loaded || loaded.test !== true) {
                throw new Error('Storage locale non funziona correttamente');
            }
            
            Utils.Storage.remove(testKey);
            return true;
        } catch (error) {
            throw new Error('Local storage non disponibile: ' + error.message);
        }
    }

    testInteractiveCharts() {
        if (typeof window.interactiveCharts === 'undefined') {
            throw new Error('InteractiveCharts non disponibile');
        }

        // Test chart colors
        if (!interactiveCharts.colors || !interactiveCharts.colors.primary) {
            throw new Error('Configurazione colori mancante');
        }

        // Test chart methods
        const requiredMethods = ['renderPaymentsChart', 'renderPaymentMethodsChart', 'renderTrendChart'];
        
        for (const method of requiredMethods) {
            if (typeof interactiveCharts[method] !== 'function') {
                throw new Error(`Metodo ${method} non disponibile`);
            }
        }

        return true;
    }

    testCondominiumCards() {
        if (!window.app || typeof window.app.generateCondominiumCards !== 'function') {
            throw new Error('Funzione generateCondominiumCards non disponibile');
        }

        const cardsHTML = window.app.generateCondominiumCards();
        
        if (!cardsHTML || !cardsHTML.includes('condo-card')) {
            throw new Error('Cards condomini non generate correttamente');
        }

        return true;
    }

    testPaymentDetails() {
        if (!window.app || typeof window.app.viewPaymentDetails !== 'function') {
            throw new Error('Funzione viewPaymentDetails non disponibile');
        }

        // Test with first payment in mock data
        if (CONDOPAY_MOCK_DATA.payments && CONDOPAY_MOCK_DATA.payments.length > 0) {
            const paymentId = CONDOPAY_MOCK_DATA.payments[0].id;
            // This would normally open modal, just test function exists
            return typeof window.app.viewPaymentDetails === 'function';
        }

        return true;
    }

    testReportGeneration() {
        const reportMethods = [
            'exportCondoReport',
            'generateCondoReport', 
            'exportPayments',
            'exportCondominiums',
            'exportResidents'
        ];

        for (const method of reportMethods) {
            if (!window.app || typeof window.app[method] !== 'function') {
                throw new Error(`Metodo report ${method} non disponibile`);
            }
        }

        return true;
    }

    testSettingsManagement() {
        const settingsMethods = [
            'saveGeneralSettings',
            'resetSettings',
            'initSettings',
            'loadSettingsTab'
        ];

        for (const method of settingsMethods) {
            if (!window.app || typeof window.app[method] !== 'function') {
                throw new Error(`Metodo impostazioni ${method} non disponibile`);
            }
        }

        return true;
    }

    testCommunicationSystem() {
        const commMethods = [
            'newCommunication',
            'sendPaymentReminders',
            'confirmSendReminders'
        ];

        for (const method of commMethods) {
            if (!window.app || typeof window.app[method] !== 'function') {
                throw new Error(`Metodo comunicazione ${method} non disponibile`);
            }
        }

        return true;
    }

    testResponsiveDesign() {
        // Check if CSS media queries are loaded
        const testElement = document.createElement('div');
        testElement.className = 'stats-grid';
        document.body.appendChild(testElement);
        
        const styles = window.getComputedStyle(testElement);
        const hasGridDisplay = styles.display === 'grid';
        
        document.body.removeChild(testElement);
        
        if (!hasGridDisplay) {
            throw new Error('CSS Grid non supportato o non caricato');
        }

        return true;
    }

    testKeyboardNavigation() {
        if (typeof window.keyboardShortcuts === 'undefined') {
            throw new Error('Sistema scorciatoie tastiera non disponibile');
        }

        // Test if escape key handler is bound
        const hasEscapeHandler = window.keyboardShortcuts.shortcuts && 
                                window.keyboardShortcuts.shortcuts['escape'];
        
        if (!hasEscapeHandler) {
            throw new Error('Handler tasto Escape non configurato');
        }

        return true;
    }

    // Quick test method for development
    async quickTest() {
        console.log('🚀 Esecuzione Quick Test...');
        
        const criticalTests = [
            'App Initialization',
            'Mock Data Loading', 
            'Interactive Charts',
            'Report Generation'
        ];

        let passed = 0;
        
        for (const testName of criticalTests) {
            const test = this.tests.find(t => t.name === testName);
            if (test) {
                try {
                    await test.test();
                    console.log(`✅ ${testName}`);
                    passed++;
                } catch (error) {
                    console.error(`❌ ${testName}:`, error);
                }
            }
        }

        console.log(`\n🎯 Quick Test: ${passed}/${criticalTests.length} critici passati`);
        return passed === criticalTests.length;
    }
}

// Auto-run tests when page loads (for development)
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (window.location.search.includes('test=true')) {
            window.condoPayTests = new CondoPayTestSuite();
            window.condoPayTests.runAllTests();
        } else if (window.location.search.includes('quicktest=true')) {
            window.condoPayTests = new CondoPayTestSuite();
            window.condoPayTests.quickTest();
        }
    }, 3000); // Wait for all components to load
});

// Make available globally
window.CondoPayTestSuite = CondoPayTestSuite;

// Console helper functions
window.runTests = function() {
    if (!window.condoPayTests) {
        window.condoPayTests = new CondoPayTestSuite();
    }
    return window.condoPayTests.runAllTests();
};

window.quickTest = function() {
    if (!window.condoPayTests) {
        window.condoPayTests = new CondoPayTestSuite();
    }
    return window.condoPayTests.quickTest();
};

console.log('🧪 CondoPay Test Suite caricato. Usa runTests() o quickTest() per testare.');
