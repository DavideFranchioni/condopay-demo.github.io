// CondoPay Full Features Implementation
// Implementazione completa di tutte le funzionalità richieste

// ===== GRAFICI INTERATTIVI =====

// Inizializza Chart.js con configurazioni personalizzate
Chart.defaults.font.family = 'system-ui, -apple-system, sans-serif';
Chart.defaults.color = '#333';

// Funzione per creare il grafico pagamenti interattivo
function createPaymentsChart() {
    const ctx = document.getElementById('paymentsChart');
    if (!ctx) return;

    const monthlyData = {
        labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
        datasets: [
            {
                label: 'Pagamenti Ricevuti',
                data: [42000, 45000, 38000, 52000, 48000, 55000, 51000, 47000, 49000, 53000, 48000, 58000],
                backgroundColor: 'rgba(34, 139, 34, 0.7)',
                borderColor: 'rgba(34, 139, 34, 1)',
                borderWidth: 2,
                tension: 0.2
            },
            {
                label: 'Importi Dovuti',
                data: [45000, 45000, 45000, 52000, 52000, 52000, 52000, 52000, 52000, 52000, 52000, 60000],
                backgroundColor: 'rgba(255, 99, 71, 0.3)',
                borderColor: 'rgba(255, 99, 71, 1)',
                borderWidth: 2,
                borderDash: [5, 5]
            }
        ]
    };

    new Chart(ctx, {
        type: 'line',
        data: monthlyData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            label += '€' + context.parsed.y.toLocaleString('it-IT');
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '€' + value.toLocaleString('it-IT');
                        }
                    }
                }
            },
            onClick: (event, activeElements) => {
                if (activeElements.length > 0) {
                    const dataIndex = activeElements[0].index;
                    const month = monthlyData.labels[dataIndex];
                    showPaymentDetails(month, monthlyData.datasets[0].data[dataIndex]);
                }
            }
        }
    });
}

// Funzione per mostrare i dettagli di un pagamento specifico
function showPaymentDetails(month, amount) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Dettagli Pagamenti - ${month}</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="payment-summary">
                    <h4>Riepilogo del mese</h4>
                    <p>Totale incassato: <strong>€${amount.toLocaleString('it-IT')}</strong></p>
                    <p>Numero transazioni: <strong>${Math.floor(Math.random() * 50) + 100}</strong></p>
                    <p>Tasso di raccolta: <strong>${(Math.random() * 10 + 90).toFixed(1)}%</strong></p>
                </div>
                <div class="payment-breakdown">
                    <h4>Suddivisione per condominio</h4>
                    <ul>
                        <li>Via Roma 1: €${(amount * 0.3).toLocaleString('it-IT')}</li>
                        <li>Piazza Garibaldi 23: €${(amount * 0.25).toLocaleString('it-IT')}</li>
                        <li>Corso Italia 45: €${(amount * 0.2).toLocaleString('it-IT')}</li>
                        <li>Via Mazzini 67: €${(amount * 0.15).toLocaleString('it-IT')}</li>
                        <li>Altri: €${(amount * 0.1).toLocaleString('it-IT')}</li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="exportPaymentData('${month}')">Esporta Dati</button>
                <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Chiudi</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Funzione per creare il grafico dei metodi di pagamento
function createPaymentMethodsChart() {
    const ctx = document.getElementById('paymentMethodsChart');
    if (!ctx) return;

    const data = {
        labels: ['Bonifico', 'Carta di Credito', 'PayPal', 'Addebito SEPA', 'Contanti'],
        datasets: [{
            data: [35, 28, 20, 12, 5],
            backgroundColor: [
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 99, 132, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 2
        }]
    };

    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        generateLabels: function(chart) {
                            const data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                                return data.labels.map(function(label, i) {
                                    const meta = chart.getDatasetMeta(0);
                                    const ds = data.datasets[0];
                                    const arc = meta.data[i];
                                    const value = ds.data[i];
                                    return {
                                        text: label + ': ' + value + '%',
                                        fillStyle: ds.backgroundColor[i],
                                        strokeStyle: ds.borderColor[i],
                                        lineWidth: ds.borderWidth,
                                        hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                                        index: i
                                    };
                                });
                            }
                            return [];
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            return label + ': ' + value + '%';
                        }
                    }
                }
            },
            onClick: (event, activeElements) => {
                if (activeElements.length > 0) {
                    const index = activeElements[0].index;
                    const method = data.labels[index];
                    const percentage = data.datasets[0].data[index];
                    showPaymentMethodDetails(method, percentage);
                }
            }
        }
    });
}

// Mostra dettagli metodo di pagamento
function showPaymentMethodDetails(method, percentage) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Dettagli Metodo: ${method}</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div class="modal-body">
                <p>Utilizzo: <strong>${percentage}%</strong> del totale</p>
                <p>Transazioni mensili: <strong>${Math.floor(Math.random() * 200) + 50}</strong></p>
                <p>Volume medio: <strong>€${(Math.random() * 1000 + 200).toFixed(2)}</strong></p>
                <h4>Trend ultimi 6 mesi:</h4>
                <canvas id="methodTrendChart" width="400" height="200"></canvas>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Chiudi</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Crea mini grafico trend
    setTimeout(() => createMethodTrendChart(method), 100);
}

// Mini grafico trend per metodo di pagamento
function createMethodTrendChart(method) {
    const ctx = document.getElementById('methodTrendChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu'],
            datasets: [{
                label: method,
                data: Array(6).fill(0).map(() => Math.random() * 20 + 10),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Funzione per creare il grafico trend pagamenti
function createPaymentTrendChart() {
    const ctx = document.getElementById('paymentTrendChart');
    if (!ctx) return;

    const data = {
        labels: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
        datasets: [
            {
                label: 'Questa settimana',
                data: [12, 19, 15, 25, 22, 18, 8],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.1)',
                tension: 0.4
            },
            {
                label: 'Settimana precedente',
                data: [10, 15, 13, 20, 18, 16, 5],
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.1)',
                borderDash: [5, 5],
                tension: 0.4
            }
        ]
    };

    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            label += context.parsed.y + ' pagamenti';
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5
                    }
                }
            }
        }
    });
}

// ===== FUNZIONI PULSANTI E AZIONI =====

// Report Condominio
function generateCondominiumReport(condominiumId) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal-content large">
            <div class="modal-header">
                <h3>Report Condominio</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="report-options">
                    <h4>Seleziona tipo di report:</h4>
                    <div class="report-grid">
                        <div class="report-option" onclick="generateReport('situazione-contabile', '${condominiumId}')">
                            <span class="report-icon">📊</span>
                            <h5>Situazione Contabile</h5>
                            <p>Bilancio completo e dettagli contabili</p>
                        </div>
                        <div class="report-option" onclick="generateReport('morosita', '${condominiumId}')">
                            <span class="report-icon">⚠️</span>
                            <h5>Report Morosità</h5>
                            <p>Elenco unità con pagamenti in sospeso</p>
                        </div>
                        <div class="report-option" onclick="generateReport('pagamenti-mensili', '${condominiumId}')">
                            <span class="report-icon">📅</span>
                            <h5>Pagamenti Mensili</h5>
                            <p>Dettaglio pagamenti ultimo mese</p>
                        </div>
                        <div class="report-option" onclick="generateReport('anagrafica', '${condominiumId}')">
                            <span class="report-icon">👥</span>
                            <h5>Anagrafica Completa</h5>
                            <p>Elenco residenti e proprietari</p>
                        </div>
                    </div>
                </div>
                <div class="report-settings">
                    <h4>Opzioni aggiuntive:</h4>
                    <label><input type="checkbox" checked> Includi grafici</label>
                    <label><input type="checkbox" checked> Includi dettagli unità</label>
                    <label><input type="checkbox"> Invia via email</label>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Annulla</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Genera report specifico
function generateReport(type, condominiumId) {
    showNotification('Generazione report in corso...', 'info');
    
    setTimeout(() => {
        const reportData = {
            type: type,
            condominium: condominiumId,
            date: new Date().toLocaleDateString('it-IT'),
            format: 'PDF'
        };
        
        showNotification(`Report ${type} generato con successo!`, 'success');
        
        // Simula download
        const link = document.createElement('a');
        link.href = '#';
        link.download = `report-${type}-${condominiumId}-${Date.now()}.pdf`;
        link.click();
        
        document.querySelector('.modal-overlay').remove();
    }, 2000);
}

// Gestisci Residenti
function manageResidents(condominiumId) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal-content large">
            <div class="modal-header">
                <h3>Gestione Residenti</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="residents-toolbar">
                    <input type="text" placeholder="Cerca residente..." class="search-input" onkeyup="filterResidents(this.value)">
                    <button class="btn btn-primary" onclick="addNewResident()">+ Aggiungi Residente</button>
                    <button class="btn btn-secondary" onclick="importResidents()">Importa CSV</button>
                </div>
                <div class="residents-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Unità</th>
                                <th>Email</th>
                                <th>Telefono</th>
                                <th>Stato</th>
                                <th>Azioni</th>
                            </tr>
                        </thead>
                        <tbody id="residentsTableBody">
                            ${generateResidentsRows()}
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="saveResidentsChanges()">Salva Modifiche</button>
                <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Chiudi</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}
