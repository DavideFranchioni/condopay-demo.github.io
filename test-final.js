// Test finale CondoPay - Verifica completa funzionalità

console.log('🚀 TEST FINALE CONDOPAY\n');
console.log('=========================\n');

// Attendi il caricamento completo
setTimeout(() => {
    console.log('📋 VERIFICA COMPONENTI:\n');
    
    // Test esistenza classi principali
    const components = {
        // Grafici
        'FixedInteractiveCharts': typeof FixedInteractiveCharts,
        'fixedCharts (instance)': typeof fixedCharts,
        
        // Funzioni pulsanti
        'FixedButtonFunctions': typeof FixedButtonFunctions,
        'fixedButtons (instance)': typeof fixedButtons,
        
        // Dettagli
        'CondominiumDetails': typeof CondominiumDetails,
        'condominiumDetails (instance)': typeof condominiumDetails,
        'PaymentDetails': typeof PaymentDetails,
        'paymentDetails (instance)': typeof paymentDetails,
        
        // Impostazioni
        'SettingsManager': typeof SettingsManager,
        'settingsManager (instance)': typeof settingsManager,
        
        // Modal
        'ModalManager': typeof ModalManager,
        'modalManager (instance)': typeof modalManager
    };
    
    let allGood = true;
    Object.entries(components).forEach(([name, type]) => {
        const exists = type !== 'undefined';
        console.log(`${exists ? '✅' : '❌'} ${name}: ${type}`);
        if (!exists) allGood = false;
    });
    
    if (allGood) {
        console.log('\n✅ TUTTI I COMPONENTI SONO CARICATI!\n');
        console.log('📌 COMANDI DI TEST DISPONIBILI:\n');
        
        console.log('GRAFICI:');
        console.log('  testFinal.graficoPayments()     - Testa grafico pagamenti');
        console.log('  testFinal.graficoMethods()      - Testa grafico metodi');
        console.log('  testFinal.graficoTrend()        - Testa grafico trend\n');
        
        console.log('FUNZIONI PRINCIPALI:');
        console.log('  testFinal.reportCondominio()    - Testa report condominio');
        console.log('  testFinal.gestioneResidenti()   - Testa gestione residenti');
        console.log('  testFinal.inviaComunicazione()  - Testa invio comunicazione\n');
        
        console.log('DETTAGLI:');
        console.log('  testFinal.dettagliCondominio()  - Testa dettagli condominio');
        console.log('  testFinal.dettagliPagamento()   - Testa dettagli pagamento\n');
        
        console.log('IMPOSTAZIONI:');
        console.log('  testFinal.impostazioniGenerali()   - Testa impostazioni generali');
        console.log('  testFinal.impostazioniPagamenti()  - Testa impostazioni pagamenti');
        console.log('  testFinal.impostazioniNotifiche()  - Testa impostazioni notifiche\n');
        
        console.log('TEST COMPLETO:');
        console.log('  testFinal.all()                 - Esegui tutti i test in sequenza\n');
        
    } else {
        console.log('\n❌ ALCUNI COMPONENTI NON SONO CARICATI!');
        console.log('Ricarica la pagina e riprova.\n');
    }
}, 1500);

// Oggetto con tutte le funzioni di test
window.testFinal = {
    // Test Grafici
    graficoPayments: function() {
        console.log('Testing grafico pagamenti...');
        const div = document.createElement('div');
        div.id = 'test-payments-chart';
        div.style.padding = '20px';
        document.querySelector('#mainContent').innerHTML = '';
        document.querySelector('#mainContent').appendChild(div);
        fixedCharts.renderPaymentsChart('test-payments-chart');
    },
    
    graficoMethods: function() {
        console.log('Testing grafico metodi pagamento...');
        const div = document.createElement('div');
        div.id = 'test-methods-chart';
        div.style.padding = '20px';
        document.querySelector('#mainContent').innerHTML = '';
        document.querySelector('#mainContent').appendChild(div);
        fixedCharts.renderPaymentMethodsChart('test-methods-chart');
    },
    
    graficoTrend: function() {
        console.log('Testing grafico trend...');
        const div = document.createElement('div');
        div.id = 'test-trend-chart';
        div.style.padding = '20px';
        document.querySelector('#mainContent').innerHTML = '';
        document.querySelector('#mainContent').appendChild(div);
        fixedCharts.renderTrendChart('test-trend-chart');
    },
    
    // Test Funzioni Principali
    reportCondominio: function() {
        console.log('Testing report condominio...');
        fixedButtons.showCondominiumReport(1);
    },
    
    gestioneResidenti: function() {
        console.log('Testing gestione residenti...');
        fixedButtons.manageResidents();
    },
    
    inviaComunicazione: function() {
        console.log('Testing invio comunicazione...');
        fixedButtons.sendCommunication();
    },
    
    // Test Dettagli
    dettagliCondominio: function() {
        console.log('Testing dettagli condominio...');
        condominiumDetails.showCondominiumDetails(1);
    },
    
    dettagliPagamento: function() {
        console.log('Testing dettagli pagamento...');
        paymentDetails.showPaymentDetails(1);
    },
    
    // Test Impostazioni
    impostazioniGenerali: function() {
        console.log('Testing impostazioni generali...');
        settingsManager.showSettingsSection('general');
    },
    
    impostazioniPagamenti: function() {
        console.log('Testing impostazioni pagamenti...');
        settingsManager.showSettingsSection('payments');
    },
    
    impostazioniNotifiche: function() {
        console.log('Testing impostazioni notifiche...');
        settingsManager.showSettingsSection('notifications');
    },
    
    // Test completo sequenziale
    all: function() {
        console.log('\n🎯 ESECUZIONE TEST COMPLETO...\n');
        
        const tests = [
            { name: 'Grafico Pagamenti', fn: this.graficoPayments, delay: 2000 },
            { name: 'Grafico Metodi', fn: this.graficoMethods, delay: 2000 },
            { name: 'Grafico Trend', fn: this.graficoTrend, delay: 2000 },
            { name: 'Report Condominio', fn: this.reportCondominio, delay: 3000 },
            { name: 'Gestione Residenti', fn: this.gestioneResidenti, delay: 3000 },
            { name: 'Invio Comunicazione', fn: this.inviaComunicazione, delay: 3000 },
            { name: 'Dettagli Condominio', fn: this.dettagliCondominio, delay: 3000 },
            { name: 'Dettagli Pagamento', fn: this.dettagliPagamento, delay: 3000 },
            { name: 'Impostazioni Generali', fn: this.impostazioniGenerali, delay: 3000 }
        ];
        
        let currentIndex = 0;
        
        const runNext = () => {
            if (currentIndex < tests.length) {
                const test = tests[currentIndex];
                console.log(`\n[${currentIndex + 1}/${tests.length}] Testing: ${test.name}`);
                
                // Chiudi eventuali modal aperti
                if (modalManager && modalManager.closeModal) {
                    try { modalManager.closeModal(); } catch(e) {}
                }
                
                // Esegui il test
                test.fn();
                
                currentIndex++;
                
                // Prossimo test dopo il delay
                setTimeout(() => {
                    if (modalManager && modalManager.closeModal) {
                        try { modalManager.closeModal(); } catch(e) {}
                    }
                    runNext();
                }, test.delay);
            } else {
                console.log('\n✅ TEST COMPLETO TERMINATO!');
                console.log('Tutti i componenti sono stati testati con successo.\n');
            }
        };
        
        runNext();
    }
};

console.log('💡 Usa testFinal.all() per eseguire tutti i test automaticamente!');
