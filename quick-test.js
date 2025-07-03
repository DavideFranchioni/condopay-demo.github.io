// Quick Test - Verifica rapida funzionalità CondoPay

console.log('🚀 Test rapido CondoPay\n');

// Attendi che tutto sia caricato
setTimeout(() => {
    console.log('1️⃣ Verifico classi principali:');
    
    // Test esistenza classi
    const checks = {
        'InteractiveCharts class': typeof InteractiveCharts !== 'undefined',
        'interactiveCharts instance': typeof interactiveCharts !== 'undefined',
        'fixedCharts': typeof fixedCharts !== 'undefined',
        'fixedButtons': typeof fixedButtons !== 'undefined',
        'modalManager': typeof modalManager !== 'undefined'
    };
    
    Object.entries(checks).forEach(([name, exists]) => {
        console.log(`   ${exists ? '✅' : '❌'} ${name}`);
    });
    
    // Se tutto ok, mostra esempi di test
    const allOk = Object.values(checks).every(v => v);
    if (allOk) {
        console.log('\n✅ Tutto pronto! Ecco alcuni test che puoi fare:');
        console.log('\n📊 GRAFICI:');
        console.log('   fixedCharts.renderPaymentsChart("mainContent")');
        console.log('   fixedCharts.renderPaymentMethodsChart("mainContent")');
        console.log('   fixedCharts.renderTrendChart("mainContent")');
        
        console.log('\n🏢 CONDOMINI:');
        console.log('   fixedButtons.showCondominiumReport(1)');
        console.log('   condominiumDetails.showCondominiumDetails(1)');
        
        console.log('\n👥 RESIDENTI:');
        console.log('   fixedButtons.manageResidents()');
        console.log('   fixedButtons.sendCommunication()');
        
        console.log('\n💳 PAGAMENTI:');
        console.log('   paymentDetails.showPaymentDetails(1)');
        
        console.log('\n⚙️ IMPOSTAZIONI:');
        console.log('   settingsManager.showSettingsSection("general")');
        console.log('   settingsManager.showSettingsSection("payments")');
        console.log('   settingsManager.showSettingsSection("notifications")');
        
        console.log('\n💡 Copia e incolla uno di questi comandi nella console per testare!');
    } else {
        console.log('\n❌ Alcune classi non sono caricate. Ricarica la pagina o controlla la console per errori.');
    }
    
}, 1000);

// Funzione helper per test veloce
window.quickTest = {
    grafico: () => {
        const div = document.createElement('div');
        div.id = 'quick-test-chart';
        div.style.margin = '20px';
        document.querySelector('#mainContent').appendChild(div);
        fixedCharts.renderPaymentsChart('quick-test-chart');
    },
    
    report: () => fixedButtons.showCondominiumReport(1),
    residenti: () => fixedButtons.manageResidents(),
    comunicazione: () => fixedButtons.sendCommunication(),
    dettagli: () => condominiumDetails.showCondominiumDetails(1),
    pagamento: () => paymentDetails.showPaymentDetails(1),
    impostazioni: () => settingsManager.showSettingsSection('general'),
    
    tutti: function() {
        console.log('🎯 Test di tutte le funzionalità principali...\n');
        
        // Test sequenziale con delay
        const tests = [
            { name: 'Report Condominio', fn: this.report },
            { name: 'Gestione Residenti', fn: this.residenti },
            { name: 'Invio Comunicazione', fn: this.comunicazione },
            { name: 'Dettagli Condominio', fn: this.dettagli },
            { name: 'Dettagli Pagamento', fn: this.pagamento },
            { name: 'Impostazioni', fn: this.impostazioni }
        ];
        
        tests.forEach((test, index) => {
            setTimeout(() => {
                console.log(`Testing: ${test.name}`);
                test.fn();
                
                // Chiudi modal dopo 2 secondi
                setTimeout(() => {
                    if (modalManager && modalManager.closeModal) {
                        modalManager.closeModal();
                    }
                }, 2000);
            }, index * 3000);
        });
        
        console.log('I test verranno eseguiti uno alla volta ogni 3 secondi...');
    }
};

console.log('\n🎯 Usa quickTest.tutti() per testare tutte le funzionalità in sequenza!');
