// CondoPay - Fix Initialization Issues
// Questo file risolve i problemi di inizializzazione delle classi

// Verifica e inizializza InteractiveCharts
(function() {
    console.log('🔧 Verifico inizializzazione classi...');
    
    // Attendi che tutte le classi siano caricate
    function initializeClasses() {
        // InteractiveCharts
        if (typeof InteractiveCharts !== 'undefined' && typeof window.interactiveCharts === 'undefined') {
            window.interactiveCharts = new InteractiveCharts();
            console.log('✅ InteractiveCharts inizializzato');
        }
        
        // FixedInteractiveCharts
        if (typeof FixedInteractiveCharts !== 'undefined' && typeof window.fixedCharts === 'undefined') {
            window.fixedCharts = new FixedInteractiveCharts();
            console.log('✅ FixedInteractiveCharts inizializzato');
        }
        
        // Altre classi essenziali
        const classesToCheck = [
            { name: 'ModalManager', instance: 'modalManager' },
            { name: 'NotificationCenter', instance: 'notificationCenter' },
            { name: 'AdvancedFeatures', instance: 'advancedFeatures' }
        ];
        
        classesToCheck.forEach(({ name, instance }) => {
            if (typeof window[name] !== 'undefined' && typeof window[instance] === 'undefined') {
                window[instance] = new window[name]();
                console.log(`✅ ${name} inizializzato`);
            }
        });
    }
    
    // Prova subito
    initializeClasses();
    
    // Riprova dopo il caricamento del DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeClasses);
    } else {
        // DOM già caricato, aspetta un attimo per sicurezza
        setTimeout(initializeClasses, 100);
    }
    
    // Ultima verifica dopo 2 secondi
    setTimeout(() => {
        initializeClasses();
        console.log('✅ Verifica finale completata');
    }, 2000);
})();

// Funzione helper per verificare lo stato
window.checkCondoPayStatus = function() {
    const classes = {
        'InteractiveCharts': typeof InteractiveCharts,
        'interactiveCharts (instance)': typeof interactiveCharts,
        'FixedInteractiveCharts': typeof FixedInteractiveCharts,
        'fixedCharts (instance)': typeof fixedCharts,
        'ModalManager': typeof ModalManager,
        'modalManager (instance)': typeof modalManager
    };
    
    console.log('📊 Stato classi CondoPay:');
    Object.entries(classes).forEach(([name, type]) => {
        console.log(`   ${type !== 'undefined' ? '✅' : '❌'} ${name}: ${type}`);
    });
};
