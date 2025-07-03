// Test e verifica funzionalità CondoPay
// Esegui questo file per verificare che tutte le funzionalità siano attive

console.log('🔍 Avvio test funzionalità CondoPay...\n');

// Test 1: Verifica caricamento classi principali
console.log('1️⃣ Test caricamento classi:');
const tests = {
    'fixedCharts': typeof fixedCharts !== 'undefined',
    'fixedButtons': typeof fixedButtons !== 'undefined',
    'condominiumDetails': typeof condominiumDetails !== 'undefined',
    'paymentDetails': typeof paymentDetails !== 'undefined',
    'settingsManager': typeof settingsManager !== 'undefined',
    'modalManager': typeof modalManager !== 'undefined'
};

Object.entries(tests).forEach(([name, loaded]) => {
    console.log(`   ${loaded ? '✅' : '❌'} ${name}: ${loaded ? 'Caricato' : 'NON CARICATO'}`);
});

// Test 2: Verifica funzioni grafici
console.log('\n2️⃣ Test funzioni grafici:');
const chartTests = {
    'renderPaymentsChart': typeof fixedCharts?.renderPaymentsChart === 'function',
    'renderPaymentMethodsChart': typeof fixedCharts?.renderPaymentMethodsChart === 'function',
    'renderTrendChart': typeof fixedCharts?.renderTrendChart === 'function'
};

Object.entries(chartTests).forEach(([name, exists]) => {
    console.log(`   ${exists ? '✅' : '❌'} ${name}: ${exists ? 'Disponibile' : 'NON TROVATA'}`);
});

// Test 3: Verifica funzioni pulsanti
console.log('\n3️⃣ Test funzioni pulsanti:');
const buttonTests = {
    'showCondominiumReport': typeof fixedButtons?.showCondominiumReport === 'function',
    'manageResidents': typeof fixedButtons?.manageResidents === 'function',
    'sendCommunication': typeof fixedButtons?.sendCommunication === 'function'
};

Object.entries(buttonTests).forEach(([name, exists]) => {
    console.log(`   ${exists ? '✅' : '❌'} ${name}: ${exists ? 'Disponibile' : 'NON TROVATA'}`);
});

// Test 4: Verifica funzioni dettagli
console.log('\n4️⃣ Test funzioni dettagli:');
const detailTests = {
    'showCondominiumDetails': typeof condominiumDetails?.showCondominiumDetails === 'function',
    'showPaymentDetails': typeof paymentDetails?.showPaymentDetails === 'function',
    'showSettingsSection': typeof settingsManager?.showSettingsSection === 'function'
};

Object.entries(detailTests).forEach(([name, exists]) => {
    console.log(`   ${exists ? '✅' : '❌'} ${name}: ${exists ? 'Disponibile' : 'NON TROVATA'}`);
});

// Test 5: Verifica handler globali
console.log('\n5️⃣ Test handler globali:');
const handlerTests = {
    'handleCondominiumAction': typeof window.handleCondominiumAction === 'function',
    'handlePaymentDetails': typeof window.handlePaymentDetails === 'function',
    'handleSettingsClick': typeof window.handleSettingsClick === 'function'
};

Object.entries(handlerTests).forEach(([name, exists]) => {
    console.log(`   ${exists ? '✅' : '❌'} ${name}: ${exists ? 'Disponibile' : 'NON TROVATA'}`);
});

// Riepilogo
const allTests = {...tests, ...chartTests, ...buttonTests, ...detailTests, ...handlerTests};
const passed = Object.values(allTests).filter(t => t).length;
const total = Object.values(allTests).length;

console.log(`\n📊 RIEPILOGO TEST: ${passed}/${total} test superati (${Math.round(passed/total*100)}%)`);

if (passed === total) {
    console.log('✅ Tutte le funzionalità sono attive e funzionanti!');
} else {
    console.log('❌ Alcune funzionalità non sono attive. Verifica i file mancanti.');
}

// Funzione di test interattivo
window.testCondoPay = function() {
    console.log('\n🎯 Test interattivi disponibili:');
    console.log('1. testCondoPay.grafico() - Testa il grafico pagamenti');
    console.log('2. testCondoPay.report(1) - Testa il report condominio');
    console.log('3. testCondoPay.residenti() - Testa gestione residenti');
    console.log('4. testCondoPay.comunicazione() - Testa invio comunicazione');
    console.log('5. testCondoPay.dettagliCondominio(1) - Testa dettagli condominio');
    console.log('6. testCondoPay.dettagliPagamento(1) - Testa dettagli pagamento');
    console.log('7. testCondoPay.impostazioni("general") - Testa impostazioni');
};

// Aggiungi metodi di test
testCondoPay.grafico = function() {
    console.log('Test grafico pagamenti...');
    const container = document.createElement('div');
    container.id = 'test-chart';
    document.body.appendChild(container);
    fixedCharts.renderPaymentsChart('test-chart');
    setTimeout(() => document.body.removeChild(container), 3000);
};

testCondoPay.report = function(id) {
    console.log('Test report condominio...');
    fixedButtons.showCondominiumReport(id || 1);
};

testCondoPay.residenti = function() {
    console.log('Test gestione residenti...');
    fixedButtons.manageResidents();
};

testCondoPay.comunicazione = function() {
    console.log('Test invio comunicazione...');
    fixedButtons.sendCommunication();
};

testCondoPay.dettagliCondominio = function(id) {
    console.log('Test dettagli condominio...');
    condominiumDetails.showCondominiumDetails(id || 1);
};

testCondoPay.dettagliPagamento = function(id) {
    console.log('Test dettagli pagamento...');
    paymentDetails.showPaymentDetails(id || 1);
};

testCondoPay.impostazioni = function(section) {
    console.log('Test impostazioni...');
    settingsManager.showSettingsSection(section || 'general');
};

console.log('\n💡 Suggerimento: Usa testCondoPay() per vedere tutti i test interattivi disponibili');
