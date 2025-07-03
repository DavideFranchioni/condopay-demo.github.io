// CondoPay App Demo - Debug and Fix System
// Sistema per identificare e risolvere problemi automaticamente

class CondoPayDebugger {
    constructor() {
        this.issues = [];
        this.fixes = [];
        this.checkInterval = null;
    }

    // Run comprehensive debug check
    runDiagnostics() {
        console.log('🔧 CondoPay Debugger - Avvio diagnostica completa...');
        
        this.issues = [];
        this.fixes = [];
        
        // Check core components
        this.checkCoreComponents();
        this.checkGraphics();
        this.checkButtonFunctions();
        this.checkDataIntegrity();
        this.checkDOMElements();
        
        // Report results
        this.reportResults();
        
        // Apply automatic fixes
        this.applyAutomaticFixes();
        
        return {
            issues: this.issues,
            fixes: this.fixes,
            status: this.issues.length === 0 ? 'healthy' : 'needs_attention'
        };
    }

    checkCoreComponents() {
        console.log('🔍 Checking core components...');
        
        // Check app instance
        if (!window.app) {
            this.addIssue('App instance not found', 'critical', () => {
                window.app = new CondoPayApp();
                return 'App instance created';
            });
        }

        // Check InteractiveCharts
        if (!window.interactiveCharts) {
            this.addIssue('InteractiveCharts not initialized', 'high', () => {
                if (window.InteractiveCharts) {
                    window.interactiveCharts = new window.InteractiveCharts();
                    return 'InteractiveCharts initialized';
                }
                return 'InteractiveCharts class not found';
            });
        }

        // Check modal system
        if (!window.modalManager) {
            this.addIssue('ModalManager not found', 'medium', () => {
                if (window.ModalManager) {
                    window.modalManager = new window.ModalManager();
                    return 'ModalManager initialized';
                }
                return 'ModalManager class not found';
            });
        }

        // Check notification system
        if (!window.notificationManager) {
            this.addIssue('NotificationManager not found', 'medium', () => {
                if (window.NotificationManager) {
                    window.notificationManager = new window.NotificationManager();
                    return 'NotificationManager initialized';
                }
                return 'NotificationManager class not found';
            });
        }

        // Check Utils
        if (!window.Utils || !window.Utils.Date || !window.Utils.Number) {
            this.addIssue('Utils not properly loaded', 'high', () => {
                // Try to reload utils functions
                console.warn('Utils missing - may cause formatting issues');
                return 'Utils check completed (may have issues)';
            });
        }
    }

    checkGraphics() {
        console.log('📊 Checking graphics rendering...');
        
        // Check if main chart container exists
        const mainChart = document.getElementById('mainChart');
        if (mainChart) {
            if (mainChart.innerHTML.includes('Grafico Pagamenti Interattivo') && !mainChart.querySelector('svg')) {
                this.addIssue('Main chart not rendered', 'high', () => {
                    if (window.interactiveCharts && window.interactiveCharts.renderPaymentsChart) {
                        window.interactiveCharts.renderPaymentsChart('mainChart');
                        return 'Main chart rendered';
                    }
                    return 'InteractiveCharts renderPaymentsChart method not found';
                });
            }
        }

        // Check payment methods chart
        const methodChart = document.getElementById('paymentMethodsChart');
        if (methodChart) {
            if (methodChart.innerHTML.includes('Grafico Metodi Pagamento') && !methodChart.querySelector('svg')) {
                this.addIssue('Payment methods chart not rendered', 'high', () => {
                    if (window.interactiveCharts && window.interactiveCharts.renderPaymentMethodsChart) {
                        window.interactiveCharts.renderPaymentMethodsChart('paymentMethodsChart');
                        return 'Payment methods chart rendered';
                    }
                    return 'InteractiveCharts renderPaymentMethodsChart method not found';
                });
            }
        }

        // Check trend chart
        const trendChart = document.getElementById('trendChart');
        if (trendChart) {
            if (trendChart.innerHTML.includes('Grafico Trend') && !trendChart.querySelector('svg')) {
                this.addIssue('Trend chart not rendered', 'high', () => {
                    if (window.interactiveCharts && window.interactiveCharts.renderTrendChart) {
                        window.interactiveCharts.renderTrendChart('trendChart');
                        return 'Trend chart rendered';
                    }
                    return 'InteractiveCharts renderTrendChart method not found';
                });
            }
        }
    }

    checkButtonFunctions() {
        console.log('🔘 Checking button functions...');
        
        // Check app methods
        const requiredMethods = [
            'manageCondominium',
            'viewCondoResidents', 
            'exportCondoReport',
            'sendCondoCommunication',
            'viewPaymentDetails',
            'generateCondominiumCards',
            'generateDetailedCondosTableRows'
        ];

        requiredMethods.forEach(method => {
            if (!window.app || typeof window.app[method] !== 'function') {
                this.addIssue(`Method ${method} not found in app`, 'medium', () => {
                    // Try to get from complete-implementation
                    if (typeof window[method] === 'function') {
                        window.app[method] = window[method];
                        return `Method ${method} assigned to app`;
                    }
                    return `Method ${method} not available`;
                });
            }
        });
    }

    checkDataIntegrity() {
        console.log('💾 Checking data integrity...');
        
        if (!window.CONDOPAY_MOCK_DATA) {
            this.addIssue('Mock data not loaded', 'critical', () => {
                console.error('CONDOPAY_MOCK_DATA is required for the demo to function');
                return 'Mock data missing - app will not function properly';
            });
            return;
        }

        // Check required data sections
        const requiredSections = ['condominiums', 'residents', 'payments', 'reports'];
        requiredSections.forEach(section => {
            if (!window.CONDOPAY_MOCK_DATA[section]) {
                this.addIssue(`Mock data section ${section} missing`, 'high', () => {
                    window.CONDOPAY_MOCK_DATA[section] = [];
                    return `Empty ${section} array created`;
                });
            }
        });

        // Check reports structure
        if (!window.CONDOPAY_MOCK_DATA.reports || !window.CONDOPAY_MOCK_DATA.reports.monthlyTrends) {
            this.addIssue('Reports data incomplete', 'medium', () => {
                if (!window.CONDOPAY_MOCK_DATA.reports) {
                    window.CONDOPAY_MOCK_DATA.reports = {};
                }
                if (!window.CONDOPAY_MOCK_DATA.reports.monthlyTrends) {
                    window.CONDOPAY_MOCK_DATA.reports.monthlyTrends = [
                        { month: "Gen", income: 175000, target: 180000, paymentRate: 97.2, defaults: 5.1 },
                        { month: "Feb", income: 180500, target: 182000, paymentRate: 99.2, defaults: 3.8 },
                        { month: "Mar", income: 183200, target: 185000, paymentRate: 99.0, defaults: 3.2 },
                        { month: "Apr", income: 185600, target: 188000, paymentRate: 98.7, defaults: 2.9 },
                        { month: "Mag", income: 189200, target: 190000, paymentRate: 99.6, defaults: 2.5 },
                        { month: "Giu", income: 185420, target: 185000, paymentRate: 94.2, defaults: 3.1 }
                    ];
                }
                return 'Reports data structure created';
            });
        }
    }

    checkDOMElements() {
        console.log('🏗️ Checking DOM elements...');
        
        // Check if main content area exists
        if (!document.getElementById('mainContent')) {
            this.addIssue('Main content area not found', 'critical', null);
        }

        // Check if sidebar exists
        if (!document.querySelector('.sidebar')) {
            this.addIssue('Sidebar not found', 'medium', null);
        }

        // Check if login screen exists
        if (!document.getElementById('loginScreen')) {
            this.addIssue('Login screen not found', 'medium', null);
        }

        // Check modal container
        if (!document.getElementById('modalContainer')) {
            this.addIssue('Modal container not found', 'medium', () => {
                if (window.modalManager && window.modalManager.createModalContainer) {
                    window.modalManager.createModalContainer();
                    return 'Modal container created';
                }
                return 'Modal manager not available';
            });
        }

        // Check notification container
        if (!document.getElementById('notificationContainer')) {
            this.addIssue('Notification container not found', 'medium', () => {
                if (window.notificationManager && window.notificationManager.createContainer) {
                    window.notificationManager.createContainer();
                    return 'Notification container created';
                }
                return 'Notification manager not available';
            });
        }
    }

    addIssue(description, severity, fixFunction) {
        this.issues.push({
            description,
            severity,
            timestamp: new Date().toISOString(),
            fixFunction
        });
    }

    applyAutomaticFixes() {
        console.log('🔧 Applying automatic fixes...');
        
        let fixesApplied = 0;
        
        this.issues.forEach(issue => {
            if (issue.fixFunction) {
                try {
                    const result = issue.fixFunction();
                    this.fixes.push({
                        issue: issue.description,
                        result: result,
                        timestamp: new Date().toISOString()
                    });
                    fixesApplied++;
                    console.log(`✅ Fixed: ${issue.description} -> ${result}`);
                } catch (error) {
                    console.error(`❌ Failed to fix: ${issue.description}`, error);
                    this.fixes.push({
                        issue: issue.description,
                        result: `Error: ${error.message}`,
                        timestamp: new Date().toISOString()
                    });
                }
            }
        });

        if (fixesApplied > 0) {
            console.log(`🎉 Applied ${fixesApplied} automatic fixes`);
            
            // Re-run diagnostics to check if issues were resolved
            setTimeout(() => {
                console.log('🔄 Re-running diagnostics after fixes...');
                this.runDiagnostics();
            }, 1000);
        }
    }

    reportResults() {
        const criticalIssues = this.issues.filter(i => i.severity === 'critical');
        const highIssues = this.issues.filter(i => i.severity === 'high');
        const mediumIssues = this.issues.filter(i => i.severity === 'medium');

        console.log('\n📊 DIAGNOSTICS REPORT');
        console.log('===================');
        
        if (this.issues.length === 0) {
            console.log('✅ No issues found - app is healthy!');
        } else {
            console.log(`❌ Critical Issues: ${criticalIssues.length}`);
            console.log(`⚠️ High Priority: ${highIssues.length}`);
            console.log(`ℹ️ Medium Priority: ${mediumIssues.length}`);
            
            // List critical issues
            if (criticalIssues.length > 0) {
                console.log('\n🚨 CRITICAL ISSUES:');
                criticalIssues.forEach(issue => {
                    console.log(`  - ${issue.description}`);
                });
            }
            
            // List high priority issues
            if (highIssues.length > 0) {
                console.log('\n⚠️ HIGH PRIORITY:');
                highIssues.forEach(issue => {
                    console.log(`  - ${issue.description}`);
                });
            }
        }
        
        console.log('===================\n');
    }

    // Manual fix functions
    fixCharts() {
        console.log('🔧 Manual chart fix...');
        
        setTimeout(() => {
            // Force render all visible charts
            const charts = [
                { id: 'mainChart', method: 'renderPaymentsChart' },
                { id: 'paymentMethodsChart', method: 'renderPaymentMethodsChart' },
                { id: 'trendChart', method: 'renderTrendChart' }
            ];

            charts.forEach(chart => {
                const element = document.getElementById(chart.id);
                if (element && window.interactiveCharts && window.interactiveCharts[chart.method]) {
                    console.log(`Rendering ${chart.id}...`);
                    window.interactiveCharts[chart.method](chart.id);
                }
            });
        }, 500);
    }

    fixButtons() {
        console.log('🔧 Manual button fix...');
        
        // Re-bind event listeners
        if (window.app && window.app.bindEvents) {
            window.app.bindEvents();
        }
        
        // Ensure all onclick handlers are working
        const buttons = document.querySelectorAll('button[onclick]');
        console.log(`Found ${buttons.length} buttons with onclick handlers`);
    }

    // Continuous monitoring
    startMonitoring() {
        console.log('👁️ Starting continuous monitoring...');
        
        this.checkInterval = setInterval(() => {
            this.runQuickCheck();
        }, 30000); // Check every 30 seconds
    }

    stopMonitoring() {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
            console.log('⏹️ Monitoring stopped');
        }
    }

    runQuickCheck() {
        // Quick health check for critical components
        const criticalChecks = [
            () => window.app !== undefined,
            () => window.interactiveCharts !== undefined,
            () => document.getElementById('mainContent') !== null
        ];

        const healthy = criticalChecks.every(check => check());
        
        if (!healthy) {
            console.warn('⚠️ Quick health check failed - running full diagnostics');
            this.runDiagnostics();
        }
    }
}

// Global debug functions
window.debugCondoPay = function() {
    if (!window.condoPayDebugger) {
        window.condoPayDebugger = new CondoPayDebugger();
    }
    return window.condoPayDebugger.runDiagnostics();
};

window.fixCharts = function() {
    if (!window.condoPayDebugger) {
        window.condoPayDebugger = new CondoPayDebugger();
    }
    window.condoPayDebugger.fixCharts();
};

window.fixButtons = function() {
    if (!window.condoPayDebugger) {
        window.condoPayDebugger = new CondoPayDebugger();
    }
    window.condoPayDebugger.fixButtons();
};

// Auto-run diagnostics after app loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        console.log('🔧 Auto-running CondoPay diagnostics...');
        if (!window.condoPayDebugger) {
            window.condoPayDebugger = new CondoPayDebugger();
        }
        window.condoPayDebugger.runDiagnostics();
    }, 3000);
});

// Make class available globally
window.CondoPayDebugger = CondoPayDebugger;

console.log('🔧 CondoPay Debugger loaded. Use debugCondoPay() to run diagnostics, fixCharts() to fix charts, fixButtons() to fix buttons.');
