// CondoPay App Demo - Complete Features Fixed
// Implementazione completa di tutte le funzionalità richieste

// ===== GRAFICI INTERATTIVI =====

class FixedInteractiveCharts {
    constructor() {
        this.chartData = {
            payments: [],
            methods: {},
            trends: []
        };
        this.initializeData();
    }

    initializeData() {
        // Genera dati mock per i grafici
        const months = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu'];
        const currentYear = new Date().getFullYear();
        
        // Dati pagamenti mensili
        this.chartData.payments = months.map((month, index) => ({
            month: month,
            incassi: Math.floor(Math.random() * 50000) + 100000,
            target: 150000,
            tasso: Math.floor(Math.random() * 20) + 75
        }));

        // Dati metodi di pagamento
        this.chartData.methods = {
            'Bonifico': 45,
            'PayPal': 30,
            'Carta': 20,
            'Contanti': 5
        };

        // Dati trend
        this.chartData.trends = months.map((month, index) => ({
            month: month,
            pagati: Math.floor(Math.random() * 100) + 400,
            pendenti: Math.floor(Math.random() * 50) + 50,
            scaduti: Math.floor(Math.random() * 30) + 10
        }));
    }

    // Grafico Pagamenti Interattivo per Dashboard
    renderPaymentsChart(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const data = this.chartData.payments;
        const maxValue = Math.max(...data.map(d => Math.max(d.incassi, d.target)));
        
        let chartHTML = `
            <div class="chart-container" style="background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div class="chart-header" style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <h3 style="margin: 0;">Andamento Pagamenti</h3>
                    <div class="chart-controls">
                        <button class="btn btn-sm" onclick="fixedCharts.changeChartView('${containerId}', 'bar')" style="padding: 0.25rem 0.5rem; margin-right: 0.5rem;">📊 Barre</button>
                        <button class="btn btn-sm" onclick="fixedCharts.changeChartView('${containerId}', 'line')" style="padding: 0.25rem 0.5rem; margin-right: 0.5rem;">📈 Linee</button>
                        <button class="btn btn-sm" onclick="fixedCharts.exportChart('${containerId}')" style="padding: 0.25rem 0.5rem;">💾 Esporta</button>
                    </div>
                </div>
                
                <div class="chart-legend" style="display: flex; gap: 2rem; margin-bottom: 1rem; font-size: 0.875rem;">
                    <span><span style="color: #667eea;">●</span> Incassi</span>
                    <span><span style="color: #48bb78;">●</span> Target</span>
                    <span><span style="color: #ed8936;">●</span> Tasso %</span>
                </div>
                
                <div class="chart-wrapper" style="position: relative; height: 300px;">
                    <canvas id="canvas-${containerId}" style="width: 100%; height: 100%;"></canvas>
                </div>
                
                <div class="chart-summary" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #e2e8f0;">
                    <div style="text-align: center;">
                        <div style="font-size: 0.875rem; color: #666;">Totale Incassi</div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: #667eea;">€${data.reduce((sum, d) => sum + d.incassi, 0).toLocaleString()}</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 0.875rem; color: #666;">Media Tasso</div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: #ed8936;">${Math.round(data.reduce((sum, d) => sum + d.tasso, 0) / data.length)}%</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 0.875rem; color: #666;">Differenza Target</div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: #48bb78;">€${(data.reduce((sum, d) => sum + (d.target - d.incassi), 0)).toLocaleString()}</div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = chartHTML;
        
        // Simula il rendering del grafico
        setTimeout(() => {
            this.drawBarChart(containerId, data, maxValue);
        }, 100);
    }

    drawBarChart(containerId, data, maxValue) {
        const canvas = document.getElementById(`canvas-${containerId}`);
        if (!canvas) return;

        // Simula un grafico a barre con div
        const chartContainer = canvas.parentElement;
        chartContainer.innerHTML = `
            <div style="display: flex; align-items: flex-end; justify-content: space-around; height: 100%; padding: 0 20px;">
                ${data.map((d, index) => `
                    <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding: 0 10px;">
                        <div style="width: 100%; display: flex; gap: 4px; align-items: flex-end;">
                            <div style="flex: 1; background: #667eea; height: ${(d.incassi / maxValue) * 250}px; position: relative; cursor: pointer; transition: opacity 0.2s;"
                                 onmouseover="this.style.opacity='0.8'; fixedCharts.showTooltip(event, 'Incassi', '€${d.incassi.toLocaleString()}')"
                                 onmouseout="this.style.opacity='1'; fixedCharts.hideTooltip()">
                            </div>
                            <div style="flex: 1; background: #48bb78; height: ${(d.target / maxValue) * 250}px; cursor: pointer; transition: opacity 0.2s;"
                                 onmouseover="this.style.opacity='0.8'; fixedCharts.showTooltip(event, 'Target', '€${d.target.toLocaleString()}')"
                                 onmouseout="this.style.opacity='1'; fixedCharts.hideTooltip()">
                            </div>
                        </div>
                        <div style="margin-top: 10px; font-size: 0.875rem; color: #666;">${d.month}</div>
                        <div style="font-size: 0.75rem; color: #ed8936; font-weight: bold;">${d.tasso}%</div>
                    </div>
                `).join('')}
            </div>
            <div id="chartTooltip" style="position: absolute; background: rgba(0,0,0,0.8); color: white; padding: 0.5rem; border-radius: 4px; font-size: 0.875rem; display: none; pointer-events: none;"></div>
        `;
    }

    // Grafico Metodi di Pagamento
    renderPaymentMethodsChart(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const data = this.chartData.methods;
        const total = Object.values(data).reduce((sum, val) => sum + val, 0);
        const colors = ['#667eea', '#764ba2', '#f59e0b', '#10b981'];
        
        let chartHTML = `
            <div class="chart-container" style="background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h3 style="margin: 0 0 1rem 0;">Metodi di Pagamento</h3>
                
                <div style="display: flex; align-items: center; gap: 2rem;">
                    <div style="position: relative; width: 200px; height: 200px;">
                        ${this.createPieChart(data, colors)}
                    </div>
                    
                    <div style="flex: 1;">
                        ${Object.entries(data).map(([method, value], index) => `
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <div style="width: 20px; height: 20px; background: ${colors[index]}; border-radius: 4px;"></div>
                                    <span>${method}</span>
                                </div>
                                <div style="text-align: right;">
                                    <div style="font-weight: bold;">${value}%</div>
                                    <div style="font-size: 0.75rem; color: #666;">${Math.round(total * value / 100)} transazioni</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = chartHTML;
    }

    createPieChart(data, colors) {
        const entries = Object.entries(data);
        let currentAngle = -90; // Start from top
        
        return `
            <svg viewBox="0 0 200 200" style="width: 100%; height: 100%; transform: rotate(0deg);">
                ${entries.map(([method, value], index) => {
                    const startAngle = currentAngle;
                    const endAngle = currentAngle + (value / 100) * 360;
                    currentAngle = endAngle;
                    
                    const path = this.createPiePath(100, 100, 80, startAngle, endAngle);
                    
                    return `
                        <path d="${path}" 
                              fill="${colors[index]}" 
                              stroke="white" 
                              stroke-width="2"
                              style="cursor: pointer; transition: transform 0.2s, filter 0.2s;"
                              onmouseover="this.style.transform='scale(1.05)'; this.style.filter='brightness(1.1)'; fixedCharts.showTooltip(event, '${method}', '${value}%')"
                              onmouseout="this.style.transform='scale(1)'; this.style.filter='brightness(1)'; fixedCharts.hideTooltip()">
                        </path>
                    `;
                }).join('')}
                
                <text x="100" y="100" text-anchor="middle" dominant-baseline="middle" style="font-size: 24px; font-weight: bold; fill: #333;">
                    ${Object.keys(data).length}
                </text>
                <text x="100" y="120" text-anchor="middle" style="font-size: 12px; fill: #666;">
                    Metodi
                </text>
            </svg>
        `;
    }

    createPiePath(cx, cy, radius, startAngle, endAngle) {
        const start = this.polarToCartesian(cx, cy, radius, endAngle);
        const end = this.polarToCartesian(cx, cy, radius, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        
        return [
            "M", cx, cy,
            "L", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
            "Z"
        ].join(" ");
    }

    polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    // Grafico Trend Pagamenti
    renderTrendChart(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const data = this.chartData.trends;
        
        let chartHTML = `
            <div class="chart-container" style="background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h3 style="margin: 0 0 1rem 0;">Trend Pagamenti</h3>
                
                <div class="chart-legend" style="display: flex; gap: 2rem; margin-bottom: 1rem; font-size: 0.875rem;">
                    <span><span style="color: #48bb78;">●</span> Pagati</span>
                    <span><span style="color: #f59e0b;">●</span> Pendenti</span>
                    <span><span style="color: #ef4444;">●</span> Scaduti</span>
                </div>
                
                <div style="position: relative; height: 250px; margin: 20px 0;">
                    ${this.createLineChart(data)}
                </div>
                
                <div style="display: flex; justify-content: space-around; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                    ${data.map(d => `
                        <div style="text-align: center; cursor: pointer;" 
                             onmouseover="this.style.background='#f3f4f6'"
                             onmouseout="this.style.background='transparent'">
                            <div style="font-size: 0.75rem; color: #666;">${d.month}</div>
                            <div style="font-size: 0.875rem; font-weight: bold;">${d.pagati + d.pendenti + d.scaduti}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        container.innerHTML = chartHTML;
    }

    createLineChart(data) {
        const maxValue = Math.max(...data.map(d => d.pagati + d.pendenti + d.scaduti));
        const width = 600;
        const height = 200;
        const padding = 20;
        
        const xStep = (width - 2 * padding) / (data.length - 1);
        
        const createPath = (values, color) => {
            const points = values.map((val, index) => ({
                x: padding + index * xStep,
                y: height - padding - (val / maxValue) * (height - 2 * padding)
            }));
            
            const path = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
            
            return `
                <path d="${path}" fill="none" stroke="${color}" stroke-width="2" />
                ${points.map((p, i) => `
                    <circle cx="${p.x}" cy="${p.y}" r="4" fill="${color}" 
                            style="cursor: pointer;"
                            onmouseover="fixedCharts.showTooltip(event, '${data[i].month}', '${values[i]} pagamenti')"
                            onmouseout="fixedCharts.hideTooltip()">
                    </circle>
                `).join('')}
            `;
        };
        
        return `
            <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: 100%;">
                <!-- Grid lines -->
                ${[0, 0.25, 0.5, 0.75, 1].map(ratio => {
                    const y = height - padding - ratio * (height - 2 * padding);
                    return `
                        <line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" 
                              stroke="#e5e7eb" stroke-width="1" />
                        <text x="5" y="${y + 5}" font-size="10" fill="#9ca3af">
                            ${Math.round(maxValue * ratio)}
                        </text>
                    `;
                }).join('')}
                
                <!-- Data lines -->
                ${createPath(data.map(d => d.pagati), '#48bb78')}
                ${createPath(data.map(d => d.pendenti), '#f59e0b')}
                ${createPath(data.map(d => d.scaduti), '#ef4444')}
            </svg>
        `;
    }

    // Utility functions
    showTooltip(event, label, value) {
        const tooltip = document.getElementById('chartTooltip');
        if (tooltip) {
            tooltip.innerHTML = `<strong>${label}:</strong> ${value}`;
            tooltip.style.display = 'block';
            tooltip.style.left = event.pageX + 10 + 'px';
            tooltip.style.top = event.pageY - 30 + 'px';
        }
    }

    hideTooltip() {
        const tooltip = document.getElementById('chartTooltip');
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    }

    changeChartView(containerId, viewType) {
        // Simula il cambio di visualizzazione
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = '<div style="text-align: center; padding: 2rem;">Caricamento vista ' + viewType + '...</div>';
            setTimeout(() => {
                this.renderPaymentsChart(containerId);
            }, 500);
        }
    }

    exportChart(containerId) {
        alert('Esportazione grafico in corso...\nIl file sarà salvato come: grafico_' + containerId + '.png');
    }
}

// Inizializza i grafici
const fixedCharts = new FixedInteractiveCharts();

// Inizializza anche la classe InteractiveCharts originale se non esiste
if (typeof window.interactiveCharts === 'undefined') {
    window.interactiveCharts = new InteractiveCharts();
}
// ===== FUNZIONALITÀ PULSANTI E FORM =====

class FixedButtonFunctions {
    constructor() {
        this.condominiums = this.loadCondominiums();
        this.residents = this.loadResidents();
        this.communications = this.loadCommunications();
    }

    loadCondominiums() {
        return [
            { id: 1, name: 'Condominio Aurora', address: 'Via Roma 15', units: 24, residents: 85 },
            { id: 2, name: 'Residenza Parco Verde', address: 'Via Garibaldi 8', units: 36, residents: 120 },
            { id: 3, name: 'Palazzo Centrale', address: 'Corso Italia 42', units: 18, residents: 65 }
        ];
    }

    loadResidents() {
        return [
            { id: 1, name: 'Mario Rossi', unit: 'A1', email: 'mario.rossi@email.it', phone: '333 1234567', condominium: 'Condominio Aurora' },
            { id: 2, name: 'Anna Bianchi', unit: 'B3', email: 'anna.bianchi@email.it', phone: '334 2345678', condominium: 'Condominio Aurora' },
            { id: 3, name: 'Giuseppe Verdi', unit: 'C2', email: 'giuseppe.verdi@email.it', phone: '335 3456789', condominium: 'Residenza Parco Verde' }
        ];
    }

    loadCommunications() {
        return [
            { id: 1, date: '2024-03-15', subject: 'Assemblea Ordinaria', recipients: 85, status: 'Inviata' },
            { id: 2, date: '2024-03-10', subject: 'Lavori Straordinari', recipients: 120, status: 'Letta da 95%' },
            { id: 3, date: '2024-03-05', subject: 'Chiusura Acqua', recipients: 65, status: 'Inviata' }
        ];
    }

    // Funzione Report Condominio
    showCondominiumReport(condominiumId) {
        const condominium = this.condominiums.find(c => c.id === condominiumId);
        if (!condominium) return;

        const reportHTML = `
            <div class="report-container" style="max-width: 800px; margin: 0 auto;">
                <div class="report-header" style="text-align: center; margin-bottom: 2rem;">
                    <h2>Report Condominio</h2>
                    <h3>${condominium.name}</h3>
                    <p style="color: #666;">${condominium.address}</p>
                </div>

                <div class="report-stats" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem;">
                    <div class="stat-card" style="background: #f8f9fa; padding: 1rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 2rem; font-weight: bold; color: #667eea;">${condominium.units}</div>
                        <div style="color: #666;">Unità Immobiliari</div>
                    </div>
                    <div class="stat-card" style="background: #f8f9fa; padding: 1rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 2rem; font-weight: bold; color: #48bb78;">${condominium.residents}</div>
                        <div style="color: #666;">Residenti</div>
                    </div>
                    <div class="stat-card" style="background: #f8f9fa; padding: 1rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 2rem; font-weight: bold; color: #f59e0b;">€${Math.floor(Math.random() * 50000 + 100000).toLocaleString()}</div>
                        <div style="color: #666;">Incasso Annuale</div>
                    </div>
                    <div class="stat-card" style="background: #f8f9fa; padding: 1rem; border-radius: 8px; text-align: center;">
                        <div style="font-size: 2rem; font-weight: bold; color: #ef4444;">92%</div>
                        <div style="color: #666;">Tasso Pagamento</div>
                    </div>
                </div>

                <div class="report-sections">
                    <div class="section" style="margin-bottom: 2rem;">
                        <h4>Andamento Pagamenti Ultimi 6 Mesi</h4>
                        <div id="reportPaymentChart" style="height: 300px; background: #f8f9fa; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                            <div>Grafico pagamenti del condominio</div>
                        </div>
                    </div>

                    <div class="section" style="margin-bottom: 2rem;">
                        <h4>Situazione Morosità</h4>
                        <table style="width: 100%; border-collapse: collapse;">
                            <thead>
                                <tr style="background: #f8f9fa;">
                                    <th style="padding: 0.75rem; text-align: left;">Unità</th>
                                    <th style="padding: 0.75rem; text-align: left;">Residente</th>
                                    <th style="padding: 0.75rem; text-align: right;">Importo</th>
                                    <th style="padding: 0.75rem; text-align: center;">Giorni Ritardo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="padding: 0.75rem;">A5</td>
                                    <td style="padding: 0.75rem;">Luigi Neri</td>
                                    <td style="padding: 0.75rem; text-align: right;">€450</td>
                                    <td style="padding: 0.75rem; text-align: center; color: #ef4444;">30</td>
                                </tr>
                                <tr style="background: #f8f9fa;">
                                    <td style="padding: 0.75rem;">B2</td>
                                    <td style="padding: 0.75rem;">Maria Gialli</td>
                                    <td style="padding: 0.75rem; text-align: right;">€225</td>
                                    <td style="padding: 0.75rem; text-align: center; color: #f59e0b;">15</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="report-actions" style="display: flex; justify-content: center; gap: 1rem; margin-top: 2rem;">
                    <button class="btn btn-primary" onclick="window.print()">🖨️ Stampa Report</button>
                    <button class="btn btn-secondary" onclick="fixedButtons.exportReport(${condominiumId})">📥 Esporta PDF</button>
                    <button class="btn btn-secondary" onclick="modalManager.closeModal()">Chiudi</button>
                </div>
            </div>
        `;

        modalManager.showModal(reportHTML, { 
            title: 'Report Dettagliato', 
            width: '900px',
            showCloseButton: true 
        });

        // Renderizza il grafico dopo che il modal è stato mostrato
        setTimeout(() => {
            const chartContainer = document.getElementById('reportPaymentChart');
            if (chartContainer) {
                fixedCharts.renderPaymentsChart('reportPaymentChart');
            }
        }, 100);
    }

    // Funzione Gestisci Residenti
    manageResidents() {
        const residentsHTML = `
            <div class="residents-management">
                <div class="residents-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3>Gestione Residenti</h3>
                    <button class="btn btn-primary" onclick="fixedButtons.addNewResident()">
                        ➕ Aggiungi Residente
                    </button>
                </div>

                <div class="residents-filters" style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
                    <input type="text" placeholder="Cerca per nome..." style="flex: 1; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;"
                           onkeyup="fixedButtons.filterResidents(this.value)">
                    <select style="padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                        <option>Tutti i condomini</option>
                        ${this.condominiums.map(c => `<option>${c.name}</option>`).join('')}
                    </select>
                </div>

                <div class="residents-list" id="residentsList">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f8f9fa; border-bottom: 2px solid #e2e8f0;">
                                <th style="padding: 0.75rem; text-align: left;">Nome</th>
                                <th style="padding: 0.75rem; text-align: left;">Unità</th>
                                <th style="padding: 0.75rem; text-align: left;">Email</th>
                                <th style="padding: 0.75rem; text-align: left;">Telefono</th>
                                <th style="padding: 0.75rem; text-align: left;">Condominio</th>
                                <th style="padding: 0.75rem; text-align: center;">Azioni</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.residents.map(resident => `
                                <tr style="border-bottom: 1px solid #e2e8f0;">
                                    <td style="padding: 0.75rem;">${resident.name}</td>
                                    <td style="padding: 0.75rem;">${resident.unit}</td>
                                    <td style="padding: 0.75rem;">${resident.email}</td>
                                    <td style="padding: 0.75rem;">${resident.phone}</td>
                                    <td style="padding: 0.75rem;">${resident.condominium}</td>
                                    <td style="padding: 0.75rem; text-align: center;">
                                        <button class="btn btn-sm" onclick="fixedButtons.editResident(${resident.id})" style="margin-right: 0.5rem;">✏️</button>
                                        <button class="btn btn-sm btn-danger" onclick="fixedButtons.deleteResident(${resident.id})">🗑️</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <div class="residents-summary" style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between;">
                    <span>Totale residenti: <strong>${this.residents.length}</strong></span>
                    <button class="btn btn-secondary" onclick="fixedButtons.exportResidents()">📥 Esporta Lista</button>
                </div>
            </div>
        `;

        modalManager.showModal(residentsHTML, { 
            title: 'Gestione Residenti', 
            width: '1000px',
            showCloseButton: true 
        });
    }

    // Funzione Invia Comunicazione
    sendCommunication() {
        const communicationHTML = `
            <div class="communication-form">
                <form onsubmit="event.preventDefault(); fixedButtons.processCommunication();">
                    <div class="form-group" style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Destinatari</label>
                        <select multiple style="width: 100%; height: 100px; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                            <option value="all" selected>Tutti i residenti</option>
                            ${this.condominiums.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                        </select>
                        <small style="color: #666;">Tieni premuto Ctrl per selezionare più opzioni</small>
                    </div>

                    <div class="form-group" style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Oggetto</label>
                        <input type="text" id="commSubject" required style="width: 100%; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                    </div>

                    <div class="form-group" style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Messaggio</label>
                        <textarea id="commMessage" rows="6" required style="width: 100%; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;"></textarea>
                    </div>

                    <div class="form-group" style="margin-bottom: 1rem;">
                        <label style="display: flex; align-items: center;">
                            <input type="checkbox" style="margin-right: 0.5rem;">
                            Invia anche via SMS
                        </label>
                    </div>

                    <div class="form-group" style="margin-bottom: 1rem;">
                        <label style="display: flex; align-items: center;">
                            <input type="checkbox" style="margin-right: 0.5rem;">
                            Richiedi conferma di lettura
                        </label>
                    </div>

                    <div class="form-actions" style="display: flex; justify-content: space-between; margin-top: 1.5rem;">
                        <button type="button" class="btn btn-secondary" onclick="fixedButtons.previewCommunication()">
                            👁️ Anteprima
                        </button>
                        <div>
                            <button type="button" class="btn btn-secondary" onclick="modalManager.closeModal()" style="margin-right: 0.5rem;">
                                Annulla
                            </button>
                            <button type="submit" class="btn btn-primary">
                                📤 Invia Comunicazione
                            </button>
                        </div>
                    </div>
                </form>

                <div class="recent-communications" style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #e2e8f0;">
                    <h4>Comunicazioni Recenti</h4>
                    <div style="max-height: 200px; overflow-y: auto;">
                        ${this.communications.map(comm => `
                            <div style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; cursor: pointer;"
                                 onmouseover="this.style.background='#f8f9fa'"
                                 onmouseout="this.style.background='white'">
                                <div style="display: flex; justify-content: space-between;">
                                    <strong>${comm.subject}</strong>
                                    <span style="color: #666; font-size: 0.875rem;">${comm.date}</span>
                                </div>
                                <div style="color: #666; font-size: 0.875rem;">
                                    Inviata a ${comm.recipients} destinatari - ${comm.status}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        modalManager.showModal(communicationHTML, { 
            title: 'Invia Comunicazione', 
            width: '700px',
            showCloseButton: true 
        });
    }

    // Funzioni di supporto
    addNewResident() {
        const formHTML = `
            <form onsubmit="event.preventDefault(); fixedButtons.saveNewResident();">
                <div class="form-group" style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem;">Nome Completo</label>
                    <input type="text" id="residentName" required style="width: 100%; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                </div>
                <div class="form-group" style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem;">Unità</label>
                    <input type="text" id="residentUnit" required style="width: 100%; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                </div>
                <div class="form-group" style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem;">Email</label>
                    <input type="email" id="residentEmail" required style="width: 100%; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                </div>
                <div class="form-group" style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem;">Telefono</label>
                    <input type="tel" id="residentPhone" required style="width: 100%; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                </div>
                <div class="form-group" style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem;">Condominio</label>
                    <select id="residentCondominium" required style="width: 100%; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                        ${this.condominiums.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
                    </select>
                </div>
                <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1.5rem;">
                    <button type="button" class="btn btn-secondary" onclick="modalManager.closeModal()">Annulla</button>
                    <button type="submit" class="btn btn-primary">Salva Residente</button>
                </div>
            </form>
        `;

        modalManager.showModal(formHTML, { 
            title: 'Aggiungi Nuovo Residente', 
            width: '500px' 
        });
    }

    saveNewResident() {
        const newResident = {
            id: this.residents.length + 1,
            name: document.getElementById('residentName').value,
            unit: document.getElementById('residentUnit').value,
            email: document.getElementById('residentEmail').value,
            phone: document.getElementById('residentPhone').value,
            condominium: document.getElementById('residentCondominium').value
        };

        this.residents.push(newResident);
        modalManager.closeModal();
        this.manageResidents();
        alert('Residente aggiunto con successo!');
    }

    editResident(residentId) {
        const resident = this.residents.find(r => r.id === residentId);
        if (!resident) return;

        alert(`Modifica residente: ${resident.name}\n(Funzionalità completa in sviluppo)`);
    }

    deleteResident(residentId) {
        if (confirm('Sei sicuro di voler eliminare questo residente?')) {
            this.residents = this.residents.filter(r => r.id !== residentId);
            this.manageResidents();
        }
    }

    filterResidents(searchTerm) {
        const tbody = document.querySelector('#residentsList tbody');
        if (!tbody) return;

        const filteredResidents = this.residents.filter(r => 
            r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.email.toLowerCase().includes(searchTerm.toLowerCase())
        );

        tbody.innerHTML = filteredResidents.map(resident => `
            <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 0.75rem;">${resident.name}</td>
                <td style="padding: 0.75rem;">${resident.unit}</td>
                <td style="padding: 0.75rem;">${resident.email}</td>
                <td style="padding: 0.75rem;">${resident.phone}</td>
                <td style="padding: 0.75rem;">${resident.condominium}</td>
                <td style="padding: 0.75rem; text-align: center;">
                    <button class="btn btn-sm" onclick="fixedButtons.editResident(${resident.id})" style="margin-right: 0.5rem;">✏️</button>
                    <button class="btn btn-sm btn-danger" onclick="fixedButtons.deleteResident(${resident.id})">🗑️</button>
                </td>
            </tr>
        `).join('');
    }

    exportResidents() {
        alert('Esportazione lista residenti in corso...\nFile: residenti_export.xlsx');
    }

    processCommunication() {
        const subject = document.getElementById('commSubject').value;
        const message = document.getElementById('commMessage').value;
        
        modalManager.closeModal();
        alert(`Comunicazione inviata con successo!\n\nOggetto: ${subject}\nDestinatari: Tutti i residenti\n\nLa comunicazione è stata inviata via email e notifica push.`);
    }

    previewCommunication() {
        const subject = document.getElementById('commSubject').value || 'Oggetto comunicazione';
        const message = document.getElementById('commMessage').value || 'Testo del messaggio...';
        
        alert(`ANTEPRIMA COMUNICAZIONE\n\nOggetto: ${subject}\n\nMessaggio:\n${message}\n\nDestinatari: Tutti i residenti (${this.residents.length} persone)`);
    }

    exportReport(condominiumId) {
        const condominium = this.condominiums.find(c => c.id === condominiumId);
        alert(`Esportazione report in corso...\nFile: report_${condominium.name.replace(/\s+/g, '_')}.pdf`);
    }
}

// Inizializza le funzioni dei pulsanti
const fixedButtons = new FixedButtonFunctions();
                                <td style="padding: 0.5rem 0; font-weight: 500;">${payment.unit}</td>
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem 0; color: #666;">Condominio:</td>
                                <td style="padding: 0.5rem 0; font-weight: 500;">${payment.condominium}</td>
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem 0; color: #666;">Metodo:</td>
                                <td style="padding: 0.5rem 0; font-weight: 500;">${payment.method}</td>
                            </tr>
                        </table>
                    </div>

                    <div>
                        <h4>Dettagli Transazione</h4>
                        <table style="width: 100%;">
                            <tr>
                                <td style="padding: 0.5rem 0; color: #666;">ID Transazione:</td>
                                <td style="padding: 0.5rem 0; font-weight: 500;">${payment.reference}</td>
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem 0; color: #666;">Data Valuta:</td>
                                <td style="padding: 0.5rem 0; font-weight: 500;">${payment.date}</td>
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem 0; color: #666;">Commissioni:</td>
                                <td style="padding: 0.5rem 0; font-weight: 500;">€2.50</td>
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem 0; color: #666;">Netto Incassato:</td>
                                <td style="padding: 0.5rem 0; font-weight: 500;">€${(payment.amount - 2.50).toFixed(2)}</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="payment-timeline" style="margin-top: 2rem;">
                    <h4>Timeline Pagamento</h4>
                    <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
                        <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                            <div style="width: 12px; height: 12px; background: #48bb78; border-radius: 50%; margin-right: 1rem;"></div>
                            <div>
                                <strong>Pagamento Completato</strong> - ${payment.date} 14:32
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                            <div style="width: 12px; height: 12px; background: #667eea; border-radius: 50%; margin-right: 1rem;"></div>
                            <div>
                                <strong>Pagamento Ricevuto</strong> - ${payment.date} 10:15
                            </div>
                        </div>
                        <div style="display: flex; align-items: center;">
                            <div style="width: 12px; height: 12px; background: #e2e8f0; border-radius: 50%; margin-right: 1rem;"></div>
                            <div>
                                <strong>Pagamento Iniziato</strong> - ${payment.date} 09:45
                            </div>
                        </div>
                    </div>
                </div>

                <div class="payment-actions" style="display: flex; justify-content: center; gap: 1rem; margin-top: 2rem;">
                    <button class="btn btn-primary" onclick="paymentDetails.printReceipt(${paymentId})">
                        🖨️ Stampa Ricevuta
                    </button>
                    <button class="btn btn-secondary" onclick="paymentDetails.sendReceipt(${paymentId})">
                        📧 Invia Ricevuta
                    </button>
                    <button class="btn btn-secondary" onclick="paymentDetails.refundPayment(${paymentId})">
                        💸 Rimborsa
                    </button>
                    <button class="btn btn-secondary" onclick="modalManager.closeModal()">
                        Chiudi
                    </button>
                </div>
            </div>
        `;

        modalManager.showModal(detailsHTML, { 
            title: 'Dettaglio Pagamento', 
            width: '800px',
            showCloseButton: true 
        });
    }

    printReceipt(paymentId) {
        alert(`Stampa ricevuta per pagamento #TRX-2024-0315-${String(paymentId).padStart(3, '0')}`);
        window.print();
    }

    sendReceipt(paymentId) {
        alert(`Invio ricevuta via email per pagamento #TRX-2024-0315-${String(paymentId).padStart(3, '0')}`);
    }

    refundPayment(paymentId) {
        if (confirm('Sei sicuro di voler rimborsare questo pagamento?')) {
            alert('Rimborso elaborato con successo. Il residente riceverà l\'accredito entro 3-5 giorni lavorativi.');
        }
    }
}

// Inizializza i dettagli pagamento
const paymentDetails = new PaymentDetails();

// ===== IMPOSTAZIONI AVANZATE =====

class SettingsManager {
    showSettingsSection(section) {
        let content = '';
        
        switch(section) {
            case 'general':
                content = this.getGeneralSettings();
                break;
            case 'payments':
                content = this.getPaymentSettings();
                break;
            case 'notifications':
                content = this.getNotificationSettings();
                break;
            case 'security':
                content = this.getSecuritySettings();
                break;
            case 'billing':
                content = this.getBillingSettings();
                break;
            default:
                content = '<p>Sezione non disponibile</p>';
        }

        modalManager.showModal(content, { 
            title: `Impostazioni - ${section.charAt(0).toUpperCase() + section.slice(1)}`, 
            width: '700px',
            showCloseButton: true 
        });
    }

    getGeneralSettings() {
        return `
            <div class="settings-general">
                <form onsubmit="event.preventDefault(); settingsManager.saveGeneralSettings();">
                    <div class="setting-group" style="margin-bottom: 2rem;">
                        <h4>Informazioni Studio</h4>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem;">Nome Studio</label>
                            <input type="text" value="Studio Amministrazioni Rossi" style="width: 100%; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                        </div>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem;">Partita IVA</label>
                            <input type="text" value="IT12345678901" style="width: 100%; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                        </div>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem;">Email</label>
                            <input type="email" value="info@studiorossi.it" style="width: 100%; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                        </div>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem;">Telefono</label>
                            <input type="tel" value="+39 02 1234567" style="width: 100%; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                        </div>
                    </div>

                    <div class="setting-group" style="margin-bottom: 2rem;">
                        <h4>Preferenze</h4>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem;">Lingua</label>
                            <select style="width: 100%; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                                <option>Italiano</option>
                                <option>English</option>
                            </select>
                        </div>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem;">Fuso Orario</label>
                            <select style="width: 100%; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                                <option>Europe/Rome (GMT+1)</option>
                                <option>Europe/London (GMT)</option>
                            </select>
                        </div>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem;">Formato Data</label>
                            <select style="width: 100%; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                                <option>DD/MM/YYYY</option>
                                <option>MM/DD/YYYY</option>
                                <option>YYYY-MM-DD</option>
                            </select>
                        </div>
                    </div>

                    <div style="display: flex; justify-content: flex-end; gap: 1rem;">
                        <button type="button" class="btn btn-secondary" onclick="modalManager.closeModal()">Annulla</button>
                        <button type="submit" class="btn btn-primary">Salva Modifiche</button>
                    </div>
                </form>
            </div>
        `;
    }

    getPaymentSettings() {
        return `
            <div class="settings-payments">
                <form onsubmit="event.preventDefault(); settingsManager.savePaymentSettings();">
                    <div class="setting-group" style="margin-bottom: 2rem;">
                        <h4>Metodi di Pagamento Accettati</h4>
                        <div style="space-y: 1rem;">
                            <label style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                                <input type="checkbox" checked style="margin-right: 0.5rem;">
                                <span>Bonifico Bancario</span>
                            </label>
                            <label style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                                <input type="checkbox" checked style="margin-right: 0.5rem;">
                                <span>PayPal</span>
                            </label>
                            <label style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                                <input type="checkbox" checked style="margin-right: 0.5rem;">
                                <span>Carta di Credito/Debito</span>
                            </label>
                            <label style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                                <input type="checkbox" style="margin-right: 0.5rem;">
                                <span>Contanti (presso ufficio)</span>
                            </label>
                            <label style="display: flex; align-items: center;">
                                <input type="checkbox" style="margin-right: 0.5rem;">
                                <span>SEPA Direct Debit</span>
                            </label>
                        </div>
                    </div>

                    <div class="setting-group" style="margin-bottom: 2rem;">
                        <h4>Configurazione Pagamenti</h4>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem;">Giorni di tolleranza ritardo</label>
                            <input type="number" value="5" style="width: 100px; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                        </div>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem;">Tasso interesse moratorio (%)</label>
                            <input type="number" value="8.5" step="0.1" style="width: 100px; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                        </div>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label style="display: flex; align-items: center;">
                                <input type="checkbox" checked style="margin-right: 0.5rem;">
                                Invia promemoria automatici
                            </label>
                        </div>
                        <div class="form-group">
                            <label style="display: flex; align-items: center;">
                                <input type="checkbox" checked style="margin-right: 0.5rem;">
                                Genera ricevute automaticamente
                            </label>
                        </div>
                    </div>

                    <div class="setting-group" style="margin-bottom: 2rem;">
                        <h4>Coordinate Bancarie</h4>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem;">IBAN</label>
                            <input type="text" value="IT60X0542811101000000123456" style="width: 100%; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                        </div>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem;">Intestatario</label>
                            <input type="text" value="Studio Amministrazioni Rossi SRL" style="width: 100%; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                        </div>
                    </div>

                    <div style="display: flex; justify-content: flex-end; gap: 1rem;">
                        <button type="button" class="btn btn-secondary" onclick="modalManager.closeModal()">Annulla</button>
                        <button type="submit" class="btn btn-primary">Salva Configurazione</button>
                    </div>
                </form>
            </div>
        `;
    }

    getNotificationSettings() {
        return `
            <div class="settings-notifications">
                <form onsubmit="event.preventDefault(); settingsManager.saveNotificationSettings();">
                    <div class="setting-group" style="margin-bottom: 2rem;">
                        <h4>Canali di Notifica</h4>
                        <div style="space-y: 1rem;">
                            <label style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                                <input type="checkbox" checked style="margin-right: 0.5rem;">
                                <span>Email</span>
                            </label>
                            <label style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                                <input type="checkbox" checked style="margin-right: 0.5rem;">
                                <span>SMS</span>
                            </label>
                            <label style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                                <input type="checkbox" checked style="margin-right: 0.5rem;">
                                <span>Notifiche Push (App Mobile)</span>
                            </label>
                            <label style="display: flex; align-items: center;">
                                <input type="checkbox" style="margin-right: 0.5rem;">
                                <span>WhatsApp Business</span>
                            </label>
                        </div>
                    </div>

                    <div class="setting-group" style="margin-bottom: 2rem;">
                        <h4>Tipologie di Notifiche</h4>
                        <table style="width: 100%; border-collapse: collapse;">
                            <thead>
                                <tr style="background: #f8f9fa;">
                                    <th style="padding: 0.75rem; text-align: left;">Evento</th>
                                    <th style="padding: 0.75rem; text-align: center;">Email</th>
                                    <th style="padding: 0.75rem; text-align: center;">SMS</th>
                                    <th style="padding: 0.75rem; text-align: center;">Push</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="border-bottom: 1px solid #e2e8f0;">
                                    <td style="padding: 0.75rem;">Nuovo Pagamento</td>
                                    <td style="padding: 0.75rem; text-align: center;"><input type="checkbox" checked></td>
                                    <td style="padding: 0.75rem; text-align: center;"><input type="checkbox"></td>
                                    <td style="padding: 0.75rem; text-align: center;"><input type="checkbox" checked></td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0;">
                                    <td style="padding: 0.75rem;">Pagamento in Ritardo</td>
                                    <td style="padding: 0.75rem; text-align: center;"><input type="checkbox" checked></td>
                                    <td style="padding: 0.75rem; text-align: center;"><input type="checkbox" checked></td>
                                    <td style="padding: 0.75rem; text-align: center;"><input type="checkbox" checked></td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0;">
                                    <td style="padding: 0.75rem;">Nuova Comunicazione</td>
                                    <td style="padding: 0.75rem; text-align: center;"><input type="checkbox" checked></td>
                                    <td style="padding: 0.75rem; text-align: center;"><input type="checkbox"></td>
                                    <td style="padding: 0.75rem; text-align: center;"><input type="checkbox" checked></td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0;">
                                    <td style="padding: 0.75rem;">Report Mensile</td>
                                    <td style="padding: 0.75rem; text-align: center;"><input type="checkbox" checked></td>
                                    <td style="padding: 0.75rem; text-align: center;"><input type="checkbox"></td>
                                    <td style="padding: 0.75rem; text-align: center;"><input type="checkbox"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="setting-group" style="margin-bottom: 2rem;">
                        <h4>Orari di Invio</h4>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem;">Non inviare notifiche prima delle</label>
                            <input type="time" value="08:00" style="padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                        </div>
                        <div class="form-group">
                            <label style="display: block; margin-bottom: 0.5rem;">Non inviare notifiche dopo le</label>
                            <input type="time" value="20:00" style="padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                        </div>
                    </div>

                    <div style="display: flex; justify-content: flex-end; gap: 1rem;">
                        <button type="button" class="btn btn-secondary" onclick="modalManager.closeModal()">Annulla</button>
                        <button type="submit" class="btn btn-primary">Salva Preferenze</button>
                    </div>
                </form>
            </div>
        `;
    }

    getSecuritySettings() {
        return `
            <div class="settings-security">
                <form onsubmit="event.preventDefault(); settingsManager.saveSecuritySettings();">
                    <div class="setting-group" style="margin-bottom: 2rem;">
                        <h4>Autenticazione</h4>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label style="display: flex; align-items: center;">
                                <input type="checkbox" checked style="margin-right: 0.5rem;">
                                Richiedi autenticazione a due fattori (2FA)
                            </label>
                        </div>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem;">Durata sessione (minuti)</label>
                            <input type="number" value="30" style="width: 100px; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                        </div>
                        <div class="form-group">
                            <label style="display: flex; align-items: center;">
                                <input type="checkbox" checked style="margin-right: 0.5rem;">
                                Logout automatico per inattività
                            </label>
                        </div>
                    </div>

                    <div class="setting-group" style="margin-bottom: 2rem;">
                        <h4>Password</h4>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem;">Lunghezza minima password</label>
                            <input type="number" value="8" min="6" style="width: 100px; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                        </div>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label style="display: flex; align-items: center;">
                                <input type="checkbox" checked style="margin-right: 0.5rem;">
                                Richiedi caratteri speciali
                            </label>
                        </div>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label style="display: flex; align-items: center;">
                                <input type="checkbox" checked style="margin-right: 0.5rem;">
                                Richiedi numeri e lettere
                            </label>
                        </div>
                        <div class="form-group">
                            <label style="display: block; margin-bottom: 0.5rem;">Scadenza password (giorni)</label>
                            <input type="number" value="90" style="width: 100px; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                        </div>
                    </div>

                    <div class="setting-group" style="margin-bottom: 2rem;">
                        <h4>Backup e Sicurezza Dati</h4>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label style="display: flex; align-items: center;">
                                <input type="checkbox" checked style="margin-right: 0.5rem;">
                                Backup automatico giornaliero
                            </label>
                        </div>
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label style="display: flex; align-items: center;">
                                <input type="checkbox" checked style="margin-right: 0.5rem;">
                                Crittografia dei dati sensibili
                            </label>
                        </div>
                        <div class="form-group">
                            <label style="display: flex; align-items: center;">
                                <input type="checkbox" checked style="margin-right: 0.5rem;">
                                Log delle attività utente
                            </label>
                        </div>
                    </div>

                    <div style="display: flex; justify-content: flex-end; gap: 1rem;">
                        <button type="button" class="btn btn-secondary" onclick="modalManager.closeModal()">Annulla</button>
                        <button type="submit" class="btn btn-primary">Salva Impostazioni</button>
                    </div>
                </form>
            </div>
        `;
    }

    getBillingSettings() {
        return `
            <div class="settings-billing">
                <div class="billing-summary" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
                    <h4 style="margin-top: 0;">Piano Attuale</h4>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h2 style="margin: 0; color: #667eea;">Piano Professional</h2>
                            <p style="margin: 0.5rem 0 0 0; color: #666;">€99/mese - Rinnovo automatico il 15/04/2024</p>
                        </div>
                        <button class="btn btn-primary">Upgrade Piano</button>
                    </div>
                </div>

                <div class="setting-group" style="margin-bottom: 2rem;">
                    <h4>Metodo di Pagamento</h4>
                    <div style="background: white; border: 1px solid #e2e8f0; padding: 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div style="font-size: 2rem;">💳</div>
                            <div>
                                <div style="font-weight: 500;">Visa •••• 4242</div>
                                <div style="color: #666; font-size: 0.875rem;">Scadenza: 12/2025</div>
                            </div>
                        </div>
                        <button class="btn btn-secondary btn-sm">Modifica</button>
                    </div>
                </div>

                <div class="setting-group" style="margin-bottom: 2rem;">
                    <h4>Storico Fatture</h4>
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f8f9fa;">
                                <th style="padding: 0.75rem; text-align: left;">Data</th>
                                <th style="padding: 0.75rem; text-align: left;">Numero</th>
                                <th style="padding: 0.75rem; text-align: right;">Importo</th>
                                <th style="padding: 0.75rem; text-align: center;">Stato</th>
                                <th style="padding: 0.75rem; text-align: center;">Azioni</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 0.75rem;">15/03/2024</td>
                                <td style="padding: 0.75rem;">FT-2024-003</td>
                                <td style="padding: 0.75rem; text-align: right;">€99.00</td>
                                <td style="padding: 0.75rem; text-align: center;">
                                    <span style="background: #48bb78; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem;">Pagata</span>
                                </td>
                                <td style="padding: 0.75rem; text-align: center;">
                                    <button class="btn btn-sm">📥</button>
                                </td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 0.75rem;">15/02/2024</td>
                                <td style="padding: 0.75rem;">FT-2024-002</td>
                                <td style="padding: 0.75rem; text-align: right;">€99.00</td>
                                <td style="padding: 0.75rem; text-align: center;">
                                    <span style="background: #48bb78; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem;">Pagata</span>
                                </td>
                                <td style="padding: 0.75rem; text-align: center;">
                                    <button class="btn btn-sm">📥</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="setting-group">
                    <h4>Dati Fatturazione</h4>
                    <button class="btn btn-secondary" onclick="settingsManager.editBillingInfo()">
                        ✏️ Modifica Dati Fatturazione
                    </button>
                </div>
            </div>
        `;
    }

    // Funzioni di salvataggio
    saveGeneralSettings() {
        alert('Impostazioni generali salvate con successo!');
        modalManager.closeModal();
    }

    savePaymentSettings() {
        alert('Configurazione pagamenti salvata con successo!');
        modalManager.closeModal();
    }

    saveNotificationSettings() {
        alert('Preferenze notifiche salvate con successo!');
        modalManager.closeModal();
    }

    saveSecuritySettings() {
        alert('Impostazioni di sicurezza aggiornate con successo!');
        modalManager.closeModal();
    }

    editBillingInfo() {
        alert('Apertura modulo modifica dati fatturazione...');
    }
}

// Inizializza il gestore impostazioni
const settingsManager = new SettingsManager();

// ===== FUNZIONI DI SUPPORTO GLOBALI =====

// Funzione per gestire i click sui pulsanti nelle sezioni
window.handleCondominiumAction = function(action, condominiumId) {
    switch(action) {
        case 'report':
            fixedButtons.showCondominiumReport(condominiumId);
            break;
        case 'details':
            condominiumDetails.showCondominiumDetails(condominiumId);
            break;
        default:
            alert('Azione non implementata: ' + action);
    }
};

window.handlePaymentDetails = function(paymentId) {
    paymentDetails.showPaymentDetails(paymentId);
};

window.handleSettingsClick = function(section) {
    settingsManager.showSettingsSection(section);
};

// Esporta le classi per l'uso globale
window.fixedCharts = fixedCharts;
window.fixedButtons = fixedButtons;
window.condominiumDetails = condominiumDetails;
window.paymentDetails = paymentDetails;
window.settingsManager = settingsManager;

console.log('✅ Complete Features Fixed - Tutte le funzionalità caricate correttamente!');
