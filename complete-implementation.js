// CondoPay App Demo - Complete Implementation
// Implementazione completa di tutte le funzionalità richieste

// ===== CHARTS AND INTERACTIVE GRAPHICS =====

class InteractiveCharts {
    constructor() {
        this.colors = {
            primary: '#667eea',
            secondary: '#764ba2',
            success: '#48bb78',
            warning: '#ed8936',
            danger: '#f56565',
            info: '#4299e1'
        };
    }

    // Grafico Pagamenti Interattivo per Dashboard
    renderPaymentsChart(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const data = CONDOPAY_MOCK_DATA.reports.monthlyTrends;
        
        const chartHTML = `
            <div class="interactive-chart" style="position: relative; padding: 1rem;">
                <div class="chart-controls" style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <div class="chart-legend">
                        <span style="color: ${this.colors.primary};">●</span> Incassi
                        <span style="color: ${this.colors.success}; margin-left: 1rem;">●</span> Target
                        <span style="color: ${this.colors.warning}; margin-left: 1rem;">●</span> Tasso Pagamento
                    </div>
                    <div class="chart-actions">
                        <button class="btn btn-secondary btn-sm" onclick="interactiveCharts.toggleChartView('${containerId}')">
                            📊 Cambia Vista
                        </button>
                        <button class="btn btn-secondary btn-sm" onclick="interactiveCharts.exportChart('${containerId}')">
                            📥 Esporta
                        </button>
                    </div>
                </div>
                
                <div class="chart-canvas" style="height: 300px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; background: white; position: relative;">
                    <svg width="100%" height="100%" viewBox="0 0 600 250" style="overflow: visible;">
                        ${this.generatePaymentsBars(data)}
                        ${this.generatePaymentsLine(data)}
                        ${this.generateAxisLabels(data)}
                    </svg>
                    
                    <div class="chart-tooltip" id="tooltip-${containerId}" style="
                        position: absolute; 
                        background: rgba(0,0,0,0.8); 
                        color: white; 
                        padding: 0.5rem; 
                        border-radius: 4px; 
                        font-size: 0.8rem; 
                        pointer-events: none; 
                        opacity: 0; 
                        transition: opacity 0.2s;
                        z-index: 1000;
                    "></div>
                </div>
                
                <div class="chart-summary" style="margin-top: 1rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
                    <div class="summary-item" style="text-align: center; padding: 0.5rem; background: #f7fafc; border-radius: 6px;">
                        <div style="font-size: 0.8rem; color: #666;">Media Mensile</div>
                        <div style="font-weight: bold; color: ${this.colors.primary};">€${Utils.Number.formatNumber(Utils.Array.averageBy(data, 'income'))}</div>
                    </div>
                    <div class="summary-item" style="text-align: center; padding: 0.5rem; background: #f0fff4; border-radius: 6px;">
                        <div style="font-size: 0.8rem; color: #666;">Crescita</div>
                        <div style="font-weight: bold; color: ${this.colors.success};">+${((data[data.length-1].income / data[0].income - 1) * 100).toFixed(1)}%</div>
                    </div>
                    <div class="summary-item" style="text-align: center; padding: 0.5rem; background: #fffaf0; border-radius: 6px;">
                        <div style="font-size: 0.8rem; color: #666;">Tasso Medio</div>
                        <div style="font-weight: bold; color: ${this.colors.warning};">${Utils.Array.averageBy(data, 'paymentRate').toFixed(1)}%</div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = chartHTML;
        this.addChartInteractivity(containerId);
    }

    // Grafico Metodi di Pagamento
    renderPaymentMethodsChart(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const data = CONDOPAY_MOCK_DATA.reports.paymentMethods;
        
        const chartHTML = `
            <div class="payment-methods-chart" style="position: relative; padding: 1rem;">
                <div class="chart-header" style="text-align: center; margin-bottom: 1rem;">
                    <h4>Distribuzione Metodi di Pagamento</h4>
                    <p style="color: #666; font-size: 0.9rem;">Volume totale: €${Utils.Number.formatNumber(Utils.Array.sumBy(data, 'volume'))}</p>
                </div>
                
                <div class="pie-chart-container" style="display: flex; align-items: center; gap: 2rem;">
                    <div class="pie-chart" style="position: relative; width: 200px; height: 200px;">
                        <svg width="200" height="200" viewBox="0 0 200 200">
                            ${this.generatePieChart(data)}
                        </svg>
                    </div>
                    
                    <div class="chart-legend" style="flex: 1;">
                        ${data.map((item, index) => `
                            <div class="legend-item" style="display: flex; align-items: center; margin-bottom: 1rem; cursor: pointer;"
                                 onclick="interactiveCharts.toggleMethodHighlight(${index})"
                                 onmouseenter="this.style.background='#f7fafc'"
                                 onmouseleave="this.style.background='transparent'">
                                <div style="width: 20px; height: 20px; border-radius: 50%; background: ${this.getMethodColor(index)}; margin-right: 1rem;"></div>
                                <div style="flex: 1;">
                                    <div style="font-weight: 500;">${item.method}</div>
                                    <div style="font-size: 0.9rem; color: #666;">€${Utils.Number.formatNumber(item.volume)} (${item.percentage}%)</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="method-details" style="margin-top: 2rem;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        ${data.map((item, index) => `
                            <div class="method-card" style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; text-align: center;">
                                <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">${this.getMethodIcon(item.method)}</div>
                                <div style="font-weight: bold; margin-bottom: 0.25rem;">${item.method}</div>
                                <div style="color: ${this.getMethodColor(index)}; font-size: 1.2rem; font-weight: bold;">€${Utils.Number.formatNumber(item.volume)}</div>
                                <div style="font-size: 0.9rem; color: #666;">${item.percentage}% del totale</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = chartHTML;
    }

    // Grafico Trend Pagamenti
    renderTrendChart(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const data = CONDOPAY_MOCK_DATA.reports.monthlyTrends;
        
        const chartHTML = `
            <div class="trend-chart" style="position: relative; padding: 1rem;">
                <div class="chart-controls" style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <div>
                        <h4>Trend Pagamenti (6 Mesi)</h4>
                        <p style="color: #666; font-size: 0.9rem;">Andamento incassi e performance</p>
                    </div>
                    <div class="time-selector">
                        <select class="form-control" onchange="interactiveCharts.changeTrendPeriod(this.value)">
                            <option value="6">Ultimi 6 mesi</option>
                            <option value="12">Ultimo anno</option>
                            <option value="24">Ultimi 2 anni</option>
                        </select>
                    </div>
                </div>
                
                <div class="trend-canvas" style="height: 350px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; background: white;">
                    <svg width="100%" height="100%" viewBox="0 0 700 300">
                        <!-- Grid lines -->
                        ${this.generateGridLines()}
                        
                        <!-- Income area chart -->
                        ${this.generateAreaChart(data, 'income')}
                        
                        <!-- Payment rate line -->
                        ${this.generateTrendLine(data, 'paymentRate')}
                        
                        <!-- Data points -->
                        ${this.generateDataPoints(data)}
                        
                        <!-- Axis labels -->
                        ${this.generateTrendLabels(data)}
                    </svg>
                </div>
                
                <div class="trend-stats" style="margin-top: 1rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    ${this.generateTrendStats(data)}
                </div>
            </div>
        `;

        container.innerHTML = chartHTML;
        this.addTrendInteractivity(containerId);
    }

    // Utility methods for chart generation
    generatePaymentsBars(data) {
        const barWidth = 60;
        const spacing = 20;
        const maxValue = Math.max(...data.map(d => Math.max(d.income, d.target)));
        const scale = 180 / maxValue;

        return data.map((item, index) => {
            const x = index * (barWidth + spacing) + 40;
            const incomeHeight = item.income * scale;
            const targetHeight = item.target * scale;

            return `
                <g>
                    <!-- Income bar -->
                    <rect x="${x}" y="${200 - incomeHeight}" width="${barWidth * 0.6}" height="${incomeHeight}" 
                          fill="${this.colors.primary}" opacity="0.8" rx="2"
                          onmouseover="interactiveCharts.showTooltip(event, 'Incassi ${item.month}: €${Utils.Number.formatNumber(item.income)}')"
                          onmouseout="interactiveCharts.hideTooltip()"/>
                    
                    <!-- Target bar -->
                    <rect x="${x + barWidth * 0.4}" y="${200 - targetHeight}" width="${barWidth * 0.6}" height="${targetHeight}" 
                          fill="${this.colors.success}" opacity="0.6" rx="2"
                          onmouseover="interactiveCharts.showTooltip(event, 'Target ${item.month}: €${Utils.Number.formatNumber(item.target)}')"
                          onmouseout="interactiveCharts.hideTooltip()"/>
                </g>
            `;
        }).join('');
    }

    generatePaymentsLine(data) {
        const barWidth = 60;
        const spacing = 20;
        const maxRate = 100;
        const scale = 180 / maxRate;

        const points = data.map((item, index) => {
            const x = index * (barWidth + spacing) + 40 + barWidth / 2;
            const y = 200 - (item.paymentRate * scale);
            return `${x},${y}`;
        }).join(' ');

        return `
            <polyline points="${points}" fill="none" stroke="${this.colors.warning}" stroke-width="3" 
                      stroke-linecap="round" stroke-linejoin="round"/>
            ${data.map((item, index) => {
                const x = index * (barWidth + spacing) + 40 + barWidth / 2;
                const y = 200 - (item.paymentRate * scale);
                return `
                    <circle cx="${x}" cy="${y}" r="4" fill="${this.colors.warning}"
                            onmouseover="interactiveCharts.showTooltip(event, 'Tasso ${item.month}: ${item.paymentRate}%')"
                            onmouseout="interactiveCharts.hideTooltip()"/>
                `;
            }).join('')}
        `;
    }

    generateAxisLabels(data) {
        const barWidth = 60;
        const spacing = 20;

        return data.map((item, index) => {
            const x = index * (barWidth + spacing) + 40 + barWidth / 2;
            return `
                <text x="${x}" y="230" text-anchor="middle" font-size="12" fill="#666">${item.month}</text>
            `;
        }).join('');
    }

    generatePieChart(data) {
        let currentAngle = 0;
        const total = Utils.Array.sumBy(data, 'percentage');
        const centerX = 100;
        const centerY = 100;
        const radius = 80;

        return data.map((item, index) => {
            const percentage = item.percentage;
            const angle = (percentage / total) * 360;
            const endAngle = currentAngle + angle;
            
            const x1 = centerX + radius * Math.cos(currentAngle * Math.PI / 180);
            const y1 = centerY + radius * Math.sin(currentAngle * Math.PI / 180);
            const x2 = centerX + radius * Math.cos(endAngle * Math.PI / 180);
            const y2 = centerY + radius * Math.sin(endAngle * Math.PI / 180);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
            
            currentAngle = endAngle;
            
            return `
                <path d="${pathData}" fill="${this.getMethodColor(index)}" stroke="white" stroke-width="2"
                      onmouseover="interactiveCharts.showTooltip(event, '${item.method}: ${item.percentage}%')"
                      onmouseout="interactiveCharts.hideTooltip()"
                      style="cursor: pointer; transition: opacity 0.2s;"
                      data-method-index="${index}"/>
            `;
        }).join('');
    }

    getMethodColor(index) {
        const colors = [this.colors.primary, this.colors.success, this.colors.warning, this.colors.info, this.colors.danger];
        return colors[index % colors.length];
    }

    getMethodIcon(method) {
        const icons = {
            'Stripe': '💳',
            'Bonifico': '🏦',
            'Contanti': '💰',
            'PayPal': '💵',
            'Altro': '📄'
        };
        return icons[method] || '💳';
    }

    // Interactivity methods
    showTooltip(event, content) {
        const tooltip = document.querySelector('.chart-tooltip');
        if (tooltip) {
            tooltip.innerHTML = content;
            tooltip.style.left = (event.pageX + 10) + 'px';
            tooltip.style.top = (event.pageY - 30) + 'px';
            tooltip.style.opacity = '1';
        }
    }

    hideTooltip() {
        const tooltip = document.querySelector('.chart-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
        }
    }

    addChartInteractivity(containerId) {
        // Add hover effects and click handlers
        const container = document.getElementById(containerId);
        if (!container) return;

        const bars = container.querySelectorAll('rect');
        bars.forEach(bar => {
            bar.addEventListener('mouseenter', function() {
                this.style.opacity = '1';
                this.style.filter = 'brightness(1.1)';
            });
            
            bar.addEventListener('mouseleave', function() {
                this.style.opacity = this.getAttribute('opacity') || '0.8';
                this.style.filter = 'none';
            });
        });
    }

    toggleChartView(containerId) {
        notificationManager.show('Vista del grafico cambiata', 'info');
        // Here you could implement different chart views (bar, line, area, etc.)
    }

    exportChart(containerId) {
        notificationManager.show('Grafico esportato come immagine', 'success');
        // Here you could implement chart export functionality
    }
}

// ===== DETAILED FUNCTIONS IMPLEMENTATION =====

// Extend CondoPayApp with missing functions
Object.assign(CondoPayApp.prototype, {

    // Generate Condominium Cards for overview
    generateCondominiumCards() {
        const condos = CONDOPAY_MOCK_DATA.condominiums;
        
        return condos.map(condo => `
            <div class="condo-card stat-card ${this.getCondoStatusClass(condo.paymentRate)}" 
                 style="cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;"
                 onclick="app.manageCondominium(${condo.id})"
                 onmouseenter="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)'"
                 onmouseleave="this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 3px rgba(0,0,0,0.1)'">
                
                <div class="card-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <div>
                        <h4 style="margin: 0; font-size: 1.1rem; font-weight: 600;">${condo.name}</h4>
                        <p style="margin: 0.25rem 0 0 0; color: #666; font-size: 0.9rem;">${condo.address}</p>
                    </div>
                    <div class="status-indicator" style="width: 12px; height: 12px; border-radius: 50%; background: ${this.getStatusColor(condo.paymentRate)};"></div>
                </div>
                
                <div class="card-stats" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                    <div>
                        <div style="font-size: 0.8rem; color: #666; margin-bottom: 0.25rem;">Unità</div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: ${this.colors.primary};">${condo.units}</div>
                    </div>
                    <div>
                        <div style="font-size: 0.8rem; color: #666; margin-bottom: 0.25rem;">Volume Mensile</div>
                        <div style="font-size: 1.1rem; font-weight: bold; color: ${this.colors.success};">€${Utils.Number.formatNumber(condo.monthlyAmount)}</div>
                    </div>
                </div>
                
                <div class="card-metrics" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                            <span style="font-size: 0.8rem; color: #666;">Pagamenti</span>
                            <span style="font-size: 0.9rem; font-weight: 600; color: ${this.getStatusColor(condo.paymentRate)};">${condo.paymentRate}%</span>
                        </div>
                        <div class="progress-bar" style="width: 100%; height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden;">
                            <div style="width: ${condo.paymentRate}%; height: 100%; background: ${this.getStatusColor(condo.paymentRate)}; transition: width 0.3s;"></div>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 0.8rem; color: #666;">Morosità</div>
                        <div style="font-size: 1rem; font-weight: bold; color: ${condo.defaultingUnits > 0 ? this.colors.danger : this.colors.success};">
                            ${condo.defaultingUnits} unità
                        </div>
                    </div>
                </div>
                
                <div class="card-actions" style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #f0f0f0;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.8rem; color: #666;">
                            ${condo.nextAssembly ? `Assemblea: ${Utils.Date.formatDate(condo.nextAssembly)}` : 'Nessuna assemblea programmata'}
                        </span>
                        <div class="quick-actions" style="display: flex; gap: 0.5rem;">
                            <button class="btn btn-sm btn-secondary" onclick="event.stopPropagation(); app.viewCondoResidents(${condo.id})" title="Gestisci Residenti">
                                👥
                            </button>
                            <button class="btn btn-sm btn-secondary" onclick="event.stopPropagation(); app.exportCondoReport(${condo.id})" title="Report Condominio">
                                📊
                            </button>
                            <button class="btn btn-sm btn-secondary" onclick="event.stopPropagation(); app.sendCondoCommunication(${condo.id})" title="Invia Comunicazione">
                                📧
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    },

    // Generate detailed condominiums table rows
    generateDetailedCondosTableRows() {
        const condos = CONDOPAY_MOCK_DATA.condominiums;
        
        return condos.map(condo => `
            <tr data-condo-id="${condo.id}" style="cursor: pointer;" 
                onclick="app.manageCondominium(${condo.id})"
                onmouseenter="this.style.backgroundColor='#f7fafc'"
                onmouseleave="this.style.backgroundColor='white'">
                
                <td>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div class="status-dot" style="width: 8px; height: 8px; border-radius: 50%; background: ${this.getStatusColor(condo.paymentRate)};"></div>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 0.25rem;">${condo.name}</div>
                            <div style="font-size: 0.9rem; color: #666;">${condo.city}, ${condo.zipCode}</div>
                        </div>
                    </div>
                </td>
                
                <td>
                    <div style="font-size: 0.9rem; color: #666; margin-bottom: 0.25rem;">${condo.address}</div>
                    <div style="display: flex; gap: 0.5rem; font-size: 0.8rem;">
                        ${condo.elevator ? '<span style="background: #e6fffa; color: #00695c; padding: 0.125rem 0.5rem; border-radius: 12px;">Ascensore</span>' : ''}
                        ${condo.parking ? '<span style="background: #e3f2fd; color: #1565c0; padding: 0.125rem 0.5rem; border-radius: 12px;">Parcheggio</span>' : ''}
                        ${condo.garden ? '<span style="background: #e8f5e8; color: #2e7d32; padding: 0.125rem 0.5rem; border-radius: 12px;">Giardino</span>' : ''}
                    </div>
                </td>
                
                <td style="text-align: center;">
                    <div style="font-size: 1.2rem; font-weight: bold; color: ${this.colors.primary};">${condo.units}</div>
                    <div style="font-size: 0.8rem; color: #666;">unità</div>
                </td>
                
                <td style="text-align: right;">
                    <div style="font-size: 1.1rem; font-weight: bold; color: ${this.colors.success};">€${Utils.Number.formatNumber(condo.monthlyAmount)}</div>
                    <div style="font-size: 0.8rem; color: #666;">mensile</div>
                </td>
                
                <td style="text-align: center;">
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <div style="font-size: 1.1rem; font-weight: bold; color: ${this.getStatusColor(condo.paymentRate)}; margin-bottom: 0.25rem;">
                            ${condo.paymentRate}%
                        </div>
                        <div class="mini-progress" style="width: 60px; height: 4px; background: #e2e8f0; border-radius: 2px; overflow: hidden;">
                            <div style="width: ${condo.paymentRate}%; height: 100%; background: ${this.getStatusColor(condo.paymentRate)}; transition: width 0.3s;"></div>
                        </div>
                    </div>
                </td>
                
                <td style="text-align: center;">
                    <div style="font-size: 1.1rem; font-weight: bold; color: ${condo.defaultingUnits > 0 ? this.colors.danger : this.colors.success};">
                        ${condo.defaultingUnits}
                    </div>
                    <div style="font-size: 0.8rem; color: #666;">unità</div>
                </td>
                
                <td style="text-align: center;">
                    <div style="font-size: 0.9rem; color: #666;">
                        ${Utils.Date.formatDate(condo.lastSync)}
                    </div>
                    <div style="font-size: 0.8rem; color: #999;">
                        ${Utils.Date.timeAgo(condo.lastSync)}
                    </div>
                </td>
                
                <td style="text-align: center;">
                    <span class="status-badge status-${this.getCondoStatusClass(condo.paymentRate)}">
                        ${this.getStatusText(condo.paymentRate)}
                    </span>
                </td>
                
                <td>
                    <div class="action-buttons" style="display: flex; gap: 0.5rem;" onclick="event.stopPropagation();">
                        <button class="btn btn-sm btn-primary" onclick="app.manageCondominium(${condo.id})" title="Gestisci">
                            ⚙️
                        </button>
                        <button class="btn btn-sm btn-secondary" onclick="app.viewCondoResidents(${condo.id})" title="Residenti">
                            👥
                        </button>
                        <button class="btn btn-sm btn-secondary" onclick="app.exportCondoReport(${condo.id})" title="Report">
                            📊
                        </button>
                        <button class="btn btn-sm btn-secondary" onclick="app.sendCondoCommunication(${condo.id})" title="Comunica">
                            📧
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    },

    // View and manage residents for a specific condominium
    viewCondoResidents(condoId) {
        const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === condoId);
        const residents = CONDOPAY_MOCK_DATA.residents.filter(r => r.condominiumId === condoId);
        
        if (!condo) return;

        const content = `
            <div class="condo-residents-manager">
                <div class="header" style="margin-bottom: 2rem;">
                    <h3>Gestisci Residenti - ${condo.name}</h3>
                    <p style="color: #666;">${residents.length} residenti registrati</p>
                </div>
                
                <div class="residents-actions" style="display: flex; gap: 1rem; margin-bottom: 2rem;">
                    <button class="btn btn-primary" onclick="app.addResidentToCondo(${condoId})">
                        + Nuovo Residente
                    </button>
                    <button class="btn btn-secondary" onclick="app.importResidentsFromFile(${condoId})">
                        📥 Importa da File
                    </button>
                    <button class="btn btn-secondary" onclick="app.exportCondoResidents(${condoId})">
                        📤 Esporta Elenco
                    </button>
                    <button class="btn btn-warning" onclick="app.sendBulkRemindersToCondo(${condoId})">
                        📧 Solleciti di Massa
                    </button>
                </div>
                
                <div class="residents-table" style="max-height: 400px; overflow-y: auto;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead style="position: sticky; top: 0; background: white; z-index: 10;">
                            <tr style="border-bottom: 2px solid #e2e8f0;">
                                <th style="padding: 1rem; text-align: left;">Residente</th>
                                <th style="padding: 1rem; text-align: left;">Unità</th>
                                <th style="padding: 1rem; text-align: right;">Quota</th>
                                <th style="padding: 1rem; text-align: right;">Saldo</th>
                                <th style="padding: 1rem; text-align: center;">Status</th>
                                <th style="padding: 1rem; text-align: center;">Azioni</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${residents.map(resident => `
                                <tr style="border-bottom: 1px solid #f0f0f0;" 
                                    onmouseenter="this.style.backgroundColor='#f7fafc'"
                                    onmouseleave="this.style.backgroundColor='white'">
                                    
                                    <td style="padding: 1rem;">
                                        <div>
                                            <div style="font-weight: 600; margin-bottom: 0.25rem;">${resident.owner}</div>
                                            <div style="font-size: 0.9rem; color: #666;">${resident.email}</div>
                                            <div style="font-size: 0.8rem; color: #999;">${resident.phone}</div>
                                        </div>
                                    </td>
                                    
                                    <td style="padding: 1rem;">
                                        <div style="font-weight: 600;">${resident.unit}</div>
                                        <div style="font-size: 0.9rem; color: #666;">Piano ${resident.floor}</div>
                                    </td>
                                    
                                    <td style="padding: 1rem; text-align: right;">
                                        <div style="font-weight: bold; color: ${this.colors.primary};">€${Utils.Number.formatNumber(resident.monthlyFee)}</div>
                                    </td>
                                    
                                    <td style="padding: 1rem; text-align: right;">
                                        <div style="font-weight: bold; color: ${resident.balance < 0 ? this.colors.danger : this.colors.success};">
                                            €${Utils.Number.formatNumber(resident.balance)}
                                        </div>
                                    </td>
                                    
                                    <td style="padding: 1rem; text-align: center;">
                                        <span class="status-badge status-${resident.paymentStatus === 'paid' ? 'success' : resident.paymentStatus === 'pending' ? 'warning' : 'danger'}">
                                            ${resident.paymentStatus === 'paid' ? 'Pagato' : resident.paymentStatus === 'pending' ? 'In attesa' : 'Scaduto'}
                                        </span>
                                    </td>
                                    
                                    <td style="padding: 1rem; text-align: center;">
                                        <div style="display: flex; gap: 0.5rem; justify-content: center;">
                                            <button class="btn btn-sm btn-secondary" onclick="app.manageResident(${resident.id})" title="Gestisci">
                                                ⚙️
                                            </button>
                                            <button class="btn btn-sm btn-secondary" onclick="app.sendResidentCommunication(${resident.id})" title="Contatta">
                                                📧
                                            </button>
                                            ${resident.balance < 0 ? `
                                                <button class="btn btn-sm btn-warning" onclick="app.sendPaymentReminder(${resident.id})" title="Sollecito">
                                                    💰
                                                </button>
                                            ` : ''}
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div class="residents-summary" style="margin-top: 2rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div class="summary-card" style="padding: 1rem; background: #f7fafc; border-radius: 8px; text-align: center;">
                        <div style="font-size: 0.9rem; color: #666; margin-bottom: 0.5rem;">Totale Residenti</div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: ${this.colors.primary};">${residents.length}</div>
                    </div>
                    <div class="summary-card" style="padding: 1rem; background: #f0fff4; border-radius: 8px; text-align: center;">
                        <div style="font-size: 0.9rem; color: #666; margin-bottom: 0.5rem;">Pagamenti Regolari</div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: ${this.colors.success};">
                            ${residents.filter(r => r.paymentStatus === 'paid').length}
                        </div>
                    </div>
                    <div class="summary-card" style="padding: 1rem; background: #fffaf0; border-radius: 8px; text-align: center;">
                        <div style="font-size: 0.9rem; color: #666; margin-bottom: 0.5rem;">In Ritardo</div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: ${this.colors.warning};">
                            ${residents.filter(r => r.paymentStatus === 'pending').length}
                        </div>
                    </div>
                    <div class="summary-card" style="padding: 1rem; background: #fed7d7; border-radius: 8px; text-align: center;">
                        <div style="font-size: 0.9rem; color: #666; margin-bottom: 0.5rem;">Morosi</div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: ${this.colors.danger};">
                            ${residents.filter(r => r.paymentStatus === 'overdue').length}
                        </div>
                    </div>
                </div>
            </div>
        `;

        modalManager.showModal(content, { 
            title: `Residenti - ${condo.name}`, 
            width: '1000px',
            height: '80vh'
        });
    },

    // Export condominium report
    exportCondoReport(condoId) {
        const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === condoId);
        if (!condo) return;

        const residents = CONDOPAY_MOCK_DATA.residents.filter(r => r.condominiumId === condoId);
        const payments = CONDOPAY_MOCK_DATA.payments.filter(p => p.condominiumId === condoId);

        const content = `
            <div class="report-generator">
                <h4>Genera Report - ${condo.name}</h4>
                
                <div class="report-options" style="margin: 2rem 0;">
                    <div class="option-group" style="margin-bottom: 1.5rem;">
                        <h5>Tipo di Report</h5>
                        <label style="display: block; margin: 0.5rem 0;">
                            <input type="radio" name="reportType" value="summary" checked> Report Riassuntivo
                        </label>
                        <label style="display: block; margin: 0.5rem 0;">
                            <input type="radio" name="reportType" value="detailed"> Report Dettagliato
                        </label>
                        <label style="display: block; margin: 0.5rem 0;">
                            <input type="radio" name="reportType" value="financial"> Report Finanziario
                        </label>
                        <label style="display: block; margin: 0.5rem 0;">
                            <input type="radio" name="reportType" value="residents"> Elenco Residenti
                        </label>
                    </div>
                    
                    <div class="option-group" style="margin-bottom: 1.5rem;">
                        <h5>Periodo</h5>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div>
                                <label>Data Inizio</label>
                                <input type="date" id="reportStartDate" class="form-control" value="${new Date(Date.now() - 30*24*60*60*1000).toISOString().split('T')[0]}">
                            </div>
                            <div>
                                <label>Data Fine</label>
                                <input type="date" id="reportEndDate" class="form-control" value="${new Date().toISOString().split('T')[0]}">
                            </div>
                        </div>
                    </div>
                    
                    <div class="option-group" style="margin-bottom: 1.5rem;">
                        <h5>Formato Export</h5>
                        <label style="display: block; margin: 0.5rem 0;">
                            <input type="radio" name="exportFormat" value="pdf" checked> PDF
                        </label>
                        <label style="display: block; margin: 0.5rem 0;">
                            <input type="radio" name="exportFormat" value="excel"> Excel
                        </label>
                        <label style="display: block; margin: 0.5rem 0;">
                            <input type="radio" name="exportFormat" value="csv"> CSV
                        </label>
                    </div>
                </div>
                
                <div class="report-preview" style="background: #f7fafc; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                    <h5>Anteprima Report</h5>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        <div>
                            <strong>Condominio:</strong> ${condo.name}<br>
                            <strong>Unità:</strong> ${condo.units}<br>
                            <strong>Residenti:</strong> ${residents.length}
                        </div>
                        <div>
                            <strong>Volume Mensile:</strong> €${Utils.Number.formatNumber(condo.monthlyAmount)}<br>
                            <strong>Tasso Pagamento:</strong> ${condo.paymentRate}%<br>
                            <strong>Morosità:</strong> ${condo.defaultingUnits} unità
                        </div>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="modalManager.closeModal()">
                        Annulla
                    </button>
                    <button type="button" class="btn btn-primary" onclick="app.generateCondoReport(${condoId})">
                        📊 Genera Report
                    </button>
                </div>
            </div>
        `;

        modalManager.showModal(content, { title: 'Report Condominio', width: '700px' });
    },

    // Generate the actual report
    generateCondoReport(condoId) {
        const reportType = document.querySelector('input[name="reportType"]:checked')?.value || 'summary';
        const exportFormat = document.querySelector('input[name="exportFormat"]:checked')?.value || 'pdf';
        const startDate = document.getElementById('reportStartDate')?.value;
        const endDate = document.getElementById('reportEndDate')?.value;

        const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === condoId);
        const residents = CONDOPAY_MOCK_DATA.residents.filter(r => r.condominiumId === condoId);
        const payments = CONDOPAY_MOCK_DATA.payments.filter(p => p.condominiumId === condoId);

        // Simulate report generation
        notificationManager.show('Generazione report in corso...', 'info');
        
        setTimeout(() => {
            const reportData = {
                condominium: condo,
                residents: residents,
                payments: payments,
                type: reportType,
                format: exportFormat,
                period: { start: startDate, end: endDate }
            };

            // Here you would generate the actual report
            this.downloadReport(reportData);
            notificationManager.show(`Report ${reportType} generato in formato ${exportFormat.toUpperCase()}!`, 'success');
            modalManager.closeModal();
        }, 2000);
    },

    // Download generated report
    downloadReport(reportData) {
        const filename = `report-${reportData.condominium.name}-${reportData.type}-${new Date().toISOString().split('T')[0]}.${reportData.format}`;
        
        if (reportData.format === 'csv') {
            // Generate CSV report
            const csvData = this.generateCSVReport(reportData);
            Utils.Export.toCSV(csvData, filename);
        } else {
            // For PDF/Excel, show download link simulation
            const blob = new Blob(['Report content simulation'], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }
    },

    // Payment details modal
    viewPaymentDetails(paymentId) {
        const payment = CONDOPAY_MOCK_DATA.payments.find(p => p.id === paymentId);
        if (!payment) return;

        const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === payment.condominiumId);
        const resident = CONDOPAY_MOCK_DATA.residents.find(r => r.id === payment.residentId);

        const content = `
            <div class="payment-details">
                <div class="payment-header" style="text-align: center; margin-bottom: 2rem; padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px; margin: -1rem -1rem 2rem -1rem;">
                    <h3 style="margin: 0; font-size: 1.5rem;">Dettagli Pagamento</h3>
                    <div style="font-size: 2rem; font-weight: bold; margin: 1rem 0;">€${Utils.Number.formatNumber(payment.amount)}</div>
                    <div style="opacity: 0.9;">${payment.id}</div>
                </div>
                
                <div class="payment-info" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                    <div>
                        <h5>Informazioni Generali</h5>
                        <div class="info-grid" style="display: grid; gap: 1rem;">
                            <div>
                                <label style="font-weight: 600; color: #666; display: block; margin-bottom: 0.25rem;">Data Pagamento</label>
                                <div>${Utils.Date.formatDateTime(payment.date)}</div>
                            </div>
                            <div>
                                <label style="font-weight: 600; color: #666; display: block; margin-bottom: 0.25rem;">Data Scadenza</label>
                                <div>${Utils.Date.formatDate(payment.dueDate)}</div>
                            </div>
                            <div>
                                <label style="font-weight: 600; color: #666; display: block; margin-bottom: 0.25rem;">Metodo di Pagamento</label>
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <span>${this.getMethodIcon(payment.method)}</span>
                                    <span>${payment.method === 'stripe' ? 'Stripe' : payment.method === 'bank_transfer' ? 'Bonifico Bancario' : 'Contanti'}</span>
                                </div>
                            </div>
                            <div>
                                <label style="font-weight: 600; color: #666; display: block; margin-bottom: 0.25rem;">Status</label>
                                <span class="status-badge status-${payment.status === 'completed' ? 'success' : payment.status === 'pending' ? 'warning' : 'danger'}">
                                    ${payment.status === 'completed' ? 'Completato' : payment.status === 'pending' ? 'In Elaborazione' : 'Fallito'}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h5>Dettagli Finanziari</h5>
                        <div class="financial-details" style="background: #f7fafc; padding: 1rem; border-radius: 8px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>Importo</span>
                                <span style="font-weight: bold;">€${Utils.Number.formatNumber(payment.amount)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>Commissione</span>
                                <span style="color: #666;">€${(payment.commission || 0).toFixed(2)}</span>
                            </div>
                            <hr style="margin: 0.5rem 0; border: none; border-top: 1px solid #e2e8f0;">
                            <div style="display: flex; justify-content: space-between; font-weight: bold;">
                                <span>Totale</span>
                                <span>€${Utils.Number.formatNumber(payment.amount + (payment.commission || 0))}</span>
                            </div>
                        </div>
                        
                        ${payment.transactionId ? `
                            <div style="margin-top: 1rem;">
                                <label style="font-weight: 600; color: #666; display: block; margin-bottom: 0.25rem;">ID Transazione</label>
                                <div style="font-family: monospace; background: #f0f0f0; padding: 0.5rem; border-radius: 4px; word-break: break-all;">
                                    ${payment.transactionId}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
                
                <div class="related-info" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                    <div>
                        <h5>Condominio</h5>
                        <div style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px;">
                            <div style="font-weight: 600; margin-bottom: 0.5rem;">${condo?.name || 'N/A'}</div>
                            <div style="color: #666; font-size: 0.9rem;">${condo?.address || 'N/A'}</div>
                            <div style="margin-top: 1rem;">
                                <button class="btn btn-secondary btn-sm" onclick="app.manageCondominium(${condo?.id})">
                                    Gestisci Condominio
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h5>Residente</h5>
                        <div style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px;">
                            <div style="font-weight: 600; margin-bottom: 0.5rem;">${resident?.owner || 'N/A'}</div>
                            <div style="color: #666; font-size: 0.9rem; margin-bottom: 0.25rem;">${resident?.unit || 'N/A'}</div>
                            <div style="color: #666; font-size: 0.9rem;">${resident?.email || 'N/A'}</div>
                            <div style="margin-top: 1rem;">
                                <button class="btn btn-secondary btn-sm" onclick="app.manageResident(${resident?.id})">
                                    Gestisci Residente
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="payment-actions" style="display: flex; gap: 1rem; justify-content: center; padding-top: 2rem; border-top: 1px solid #e2e8f0;">
                    ${payment.status === 'completed' ? `
                        <button class="btn btn-secondary" onclick="app.printPaymentReceipt('${payment.id}')">
                            🖨️ Stampa Ricevuta
                        </button>
                        <button class="btn btn-secondary" onclick="app.emailPaymentReceipt('${payment.id}')">
                            📧 Invia via Email
                        </button>
                    ` : ''}
                    
                    ${payment.status === 'pending' ? `
                        <button class="btn btn-warning" onclick="app.checkPaymentStatus('${payment.id}')">
                            🔄 Verifica Status
                        </button>
                    ` : ''}
                    
                    ${payment.status === 'failed' ? `
                        <button class="btn btn-danger" onclick="app.retryPayment('${payment.id}')">
                            🔄 Riprova Pagamento
                        </button>
                    ` : ''}
                    
                    <button class="btn btn-primary" onclick="app.exportPaymentDetails('${payment.id}')">
                        📥 Esporta Dettagli
                    </button>
                </div>
            </div>
        `;

        modalManager.showModal(content, { 
            title: `Pagamento ${payment.id}`, 
            width: '900px' 
        });
    },

    // Utility methods
    getCondoStatusClass(paymentRate) {
        if (paymentRate >= 95) return 'success';
        if (paymentRate >= 85) return 'warning';
        return 'danger';
    },

    getMethodIcon(method) {
        const icons = {
            'stripe': '💳',
            'bank_transfer': '🏦',
            'cash': '💰',
            'paypal': '💵'
        };
        return icons[method] || '💳';
    },

    colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        success: '#48bb78',
        warning: '#ed8936',
        danger: '#f56565',
        info: '#4299e1'
    }
});

// ===== GLOBAL INITIALIZATION =====

// Initialize the interactive charts
let interactiveCharts;

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        interactiveCharts = new InteractiveCharts();
        window.interactiveCharts = interactiveCharts;
    }, 1500);
});

// Export for global use
window.InteractiveCharts = InteractiveCharts;
// ===== SETTINGS MANAGEMENT - COMPLETE IMPLEMENTATION =====

// Extend CondoPayApp with complete settings functionality
Object.assign(CondoPayApp.prototype, {

    // Initialize settings section with tabs
    initSettings() {
        const tabs = document.querySelectorAll('.settings-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Load corresponding settings content
                const tabName = tab.dataset.tab;
                this.loadSettingsTab(tabName);
            });
        });
        
        // Load general settings by default
        this.loadSettingsTab('general');
    },

    // Load specific settings tab content
    loadSettingsTab(tabName) {
        const content = document.getElementById('settingsContent');
        if (!content) return;

        switch (tabName) {
            case 'general':
                content.innerHTML = this.generateGeneralSettingsHTML();
                break;
            case 'payments':
                content.innerHTML = this.generatePaymentSettingsHTML();
                break;
            case 'notifications':
                content.innerHTML = this.generateNotificationSettingsHTML();
                break;
            case 'security':
                content.innerHTML = this.generateSecuritySettingsHTML();
                break;
            case 'billing':
                content.innerHTML = this.generateBillingSettingsHTML();
                break;
            default:
                content.innerHTML = '<div>Sezione non trovata</div>';
        }
        
        // Re-bind form events
        this.bindSettingsEvents();
    },

    // Generate Payment Settings HTML
    generatePaymentSettingsHTML() {
        const settings = CONDOPAY_MOCK_DATA.settings?.payments || {};
        
        return `
            <div class="payment-settings">
                <h4 class="settings-title">Impostazioni Pagamenti</h4>
                <p class="settings-description">Configura le opzioni per la gestione dei pagamenti condominiali</p>
                
                <form id="paymentSettingsForm">
                    <div class="settings-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                        <div class="settings-section">
                            <h5>Scadenze e Termini</h5>
                            
                            <div class="form-field">
                                <label>Giorno di Scadenza Predefinito</label>
                                <select name="defaultDueDate" class="form-control">
                                    ${Array.from({length: 28}, (_, i) => i + 1).map(day => 
                                        `<option value="${day}" ${settings.defaultDueDate === day ? 'selected' : ''}>${day}</option>`
                                    ).join('')}
                                </select>
                                <small>Giorno del mese in cui scadono i pagamenti</small>
                            </div>
                            
                            <div class="form-field">
                                <label>Giorni di Sollecito</label>
                                <div class="checkbox-group">
                                    ${[1, 3, 7, 14, 30].map(day => `
                                        <label style="display: block; margin: 0.5rem 0;">
                                            <input type="checkbox" name="reminderDays" value="${day}" 
                                                   ${(settings.reminderDays || []).includes(day) ? 'checked' : ''}>
                                            ${day} giorni prima della scadenza
                                        </label>
                                    `).join('')}
                                </div>
                            </div>
                            
                            <div class="form-field">
                                <label>Mora Percentuale (%)</label>
                                <input type="number" name="lateFeePercentage" class="form-control" 
                                       value="${settings.lateFeePercentage || 2.0}" 
                                       min="0" max="10" step="0.1">
                                <small>Percentuale di mora applicata sui pagamenti in ritardo</small>
                            </div>
                            
                            <div class="form-field">
                                <label>Giorni Massimi di Ritardo</label>
                                <input type="number" name="maxLateDays" class="form-control" 
                                       value="${settings.maxLateDays || 30}" 
                                       min="1" max="365">
                                <small>Dopo questo periodo, il pagamento sarà considerato moroso</small>
                            </div>
                        </div>
                        
                        <div class="settings-section">
                            <h5>Commissioni e Costi</h5>
                            
                            <div class="form-field">
                                <label>Commissione Stripe (%)</label>
                                <input type="number" name="stripeCommission" class="form-control" 
                                       value="${settings.stripeCommission || 1.4}" 
                                       min="0" max="5" step="0.1">
                                <small>Commissione applicata sui pagamenti con carta</small>
                            </div>
                            
                            <div class="form-field">
                                <label>Costo Bonifico (€)</label>
                                <input type="number" name="bankTransferFee" class="form-control" 
                                       value="${settings.bankTransferFee || 0}" 
                                       min="0" max="10" step="0.01">
                                <small>Costo fisso per bonifici bancari</small>
                            </div>
                            
                            <div class="form-field">
                                <label>Valuta Predefinita</label>
                                <select name="defaultCurrency" class="form-control">
                                    <option value="EUR" ${settings.defaultCurrency === 'EUR' ? 'selected' : ''}>Euro (€)</option>
                                    <option value="USD" ${settings.defaultCurrency === 'USD' ? 'selected' : ''}>Dollaro US ($)</option>
                                    <option value="GBP" ${settings.defaultCurrency === 'GBP' ? 'selected' : ''}>Sterlina (£)</option>
                                </select>
                            </div>
                            
                            <div class="form-field">
                                <label>Metodi di Pagamento Attivi</label>
                                <div class="checkbox-group">
                                    ${['stripe', 'bank_transfer', 'cash', 'paypal'].map(method => `
                                        <label style="display: block; margin: 0.5rem 0;">
                                            <input type="checkbox" name="activePaymentMethods" value="${method}" 
                                                   ${(settings.activePaymentMethods || ['stripe', 'bank_transfer']).includes(method) ? 'checked' : ''}>
                                            ${method === 'stripe' ? 'Stripe (Carte)' : 
                                              method === 'bank_transfer' ? 'Bonifico Bancario' : 
                                              method === 'cash' ? 'Contanti' : 'PayPal'}
                                        </label>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="settings-actions" style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #e2e8f0;">
                        <button type="submit" class="btn btn-primary">💾 Salva Impostazioni</button>
                        <button type="button" class="btn btn-secondary" onclick="app.resetPaymentSettings()">🔄 Ripristina Predefinite</button>
                        <button type="button" class="btn btn-secondary" onclick="app.testPaymentSettings()">🧪 Test Configurazione</button>
                    </div>
                </form>
            </div>
        `;
    },

    // Generate Notification Settings HTML
    generateNotificationSettingsHTML() {
        const settings = CONDOPAY_MOCK_DATA.settings?.notifications || {};
        
        return `
            <div class="notification-settings">
                <h4 class="settings-title">Impostazioni Notifiche</h4>
                <p class="settings-description">Configura come e quando ricevere le notifiche</p>
                
                <form id="notificationSettingsForm">
                    <div class="settings-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                        <div class="settings-section">
                            <h5>Canali di Notifica</h5>
                            
                            <div class="form-field">
                                <label style="display: flex; align-items: center; gap: 0.5rem;">
                                    <input type="checkbox" name="emailEnabled" ${settings.emailEnabled ? 'checked' : ''}>
                                    <span>📧 Notifiche Email</span>
                                </label>
                                <small>Ricevi notifiche via email</small>
                            </div>
                            
                            <div class="form-field">
                                <label style="display: flex; align-items: center; gap: 0.5rem;">
                                    <input type="checkbox" name="smsEnabled" ${settings.smsEnabled ? 'checked' : ''}>
                                    <span>📱 Notifiche SMS</span>
                                </label>
                                <small>Ricevi notifiche via SMS</small>
                            </div>
                            
                            <div class="form-field">
                                <label style="display: flex; align-items: center; gap: 0.5rem;">
                                    <input type="checkbox" name="whatsappEnabled" ${settings.whatsappEnabled ? 'checked' : ''}>
                                    <span>💬 Notifiche WhatsApp</span>
                                </label>
                                <small>Ricevi notifiche via WhatsApp Business</small>
                            </div>
                            
                            <div class="form-field">
                                <label style="display: flex; align-items: center; gap: 0.5rem;">
                                    <input type="checkbox" name="pushEnabled" ${settings.pushEnabled ? 'checked' : ''}>
                                    <span>🔔 Notifiche Push</span>
                                </label>
                                <small>Notifiche push nel browser/app</small>
                            </div>
                        </div>
                        
                        <div class="settings-section">
                            <h5>Frequenza e Timing</h5>
                            
                            <div class="form-field">
                                <label>Frequenza Solleciti</label>
                                <select name="reminderFrequency" class="form-control">
                                    <option value="daily" ${settings.reminderFrequency === 'daily' ? 'selected' : ''}>Giornaliera</option>
                                    <option value="weekly" ${settings.reminderFrequency === 'weekly' ? 'selected' : ''}>Settimanale</option>
                                    <option value="monthly" ${settings.reminderFrequency === 'monthly' ? 'selected' : ''}>Mensile</option>
                                </select>
                            </div>
                            
                            <div class="form-field">
                                <label>Orario Invio Notifiche</label>
                                <input type="time" name="notificationTime" class="form-control" 
                                       value="${settings.notificationTime || '09:00'}">
                                <small>Orario preferito per l'invio delle notifiche automatiche</small>
                            </div>
                            
                            <div class="form-field">
                                <label style="display: flex; align-items: center; gap: 0.5rem;">
                                    <input type="checkbox" name="escalationEnabled" ${settings.escalationEnabled ? 'checked' : ''}>
                                    <span>Escalation Automatica</span>
                                </label>
                                <small>Intensifica le notifiche per pagamenti molto in ritardo</small>
                            </div>
                            
                            <div class="form-field">
                                <label>Giorni per Escalation</label>
                                <div class="checkbox-group">
                                    ${[30, 60, 90, 120].map(days => `
                                        <label style="display: block; margin: 0.5rem 0;">
                                            <input type="checkbox" name="escalationDays" value="${days}" 
                                                   ${(settings.escalationDays || []).includes(days) ? 'checked' : ''}>
                                            Dopo ${days} giorni
                                        </label>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="notification-types" style="margin-top: 2rem;">
                        <h5>Tipi di Notifica</h5>
                        <div class="types-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                            ${[
                                { key: 'paymentReceived', label: 'Pagamento Ricevuto', icon: '💳' },
                                { key: 'paymentOverdue', label: 'Pagamento Scaduto', icon: '⚠️' },
                                { key: 'newResident', label: 'Nuovo Residente', icon: '👤' },
                                { key: 'systemUpdates', label: 'Aggiornamenti Sistema', icon: '⚙️' },
                                { key: 'monthlyReports', label: 'Report Mensili', icon: '📊' },
                                { key: 'maintenanceAlerts', label: 'Avvisi Manutenzione', icon: '🔧' }
                            ].map(type => `
                                <div class="type-card" style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px;">
                                    <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                                        <input type="checkbox" name="notificationTypes" value="${type.key}" 
                                               ${(settings.notificationTypes || []).includes(type.key) ? 'checked' : ''}>
                                        <span style="font-size: 1.2rem;">${type.icon}</span>
                                        <span>${type.label}</span>
                                    </label>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="settings-actions" style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #e2e8f0;">
                        <button type="submit" class="btn btn-primary">💾 Salva Impostazioni</button>
                        <button type="button" class="btn btn-secondary" onclick="app.resetNotificationSettings()">🔄 Ripristina Predefinite</button>
                        <button type="button" class="btn btn-secondary" onclick="app.testNotifications()">🧪 Invia Notifica di Test</button>
                    </div>
                </form>
            </div>
        `;
    },

    // Generate Security Settings HTML
    generateSecuritySettingsHTML() {
        const settings = CONDOPAY_MOCK_DATA.settings?.security || {};
        
        return `
            <div class="security-settings">
                <h4 class="settings-title">Impostazioni Sicurezza</h4>
                <p class="settings-description">Configura le opzioni di sicurezza e accesso</p>
                
                <form id="securitySettingsForm">
                    <div class="settings-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                        <div class="settings-section">
                            <h5>Autenticazione</h5>
                            
                            <div class="form-field">
                                <label style="display: flex; align-items: center; gap: 0.5rem;">
                                    <input type="checkbox" name="twoFactorEnabled" ${settings.twoFactorEnabled ? 'checked' : ''}>
                                    <span>🔐 Autenticazione a Due Fattori</span>
                                </label>
                                <small>Aggiungi un livello extra di sicurezza al tuo account</small>
                            </div>
                            
                            <div class="form-field">
                                <label>Timeout Sessione (minuti)</label>
                                <select name="sessionTimeout" class="form-control">
                                    <option value="60" ${settings.sessionTimeout === 60 ? 'selected' : ''}>1 ora</option>
                                    <option value="240" ${settings.sessionTimeout === 240 ? 'selected' : ''}>4 ore</option>
                                    <option value="480" ${settings.sessionTimeout === 480 ? 'selected' : ''}>8 ore</option>
                                    <option value="720" ${settings.sessionTimeout === 720 ? 'selected' : ''}>12 ore</option>
                                    <option value="1440" ${settings.sessionTimeout === 1440 ? 'selected' : ''}>24 ore</option>
                                </select>
                                <small>Durata massima di una sessione di lavoro</small>
                            </div>
                            
                            <div class="form-field">
                                <label>Tentativi di Login Massimi</label>
                                <input type="number" name="maxLoginAttempts" class="form-control" 
                                       value="${settings.maxLoginAttempts || 5}" 
                                       min="3" max="10">
                                <small>Numero massimo di tentativi prima del blocco account</small>
                            </div>
                            
                            <div class="form-field">
                                <label>Scadenza Password (giorni)</label>
                                <input type="number" name="passwordExpiry" class="form-control" 
                                       value="${settings.passwordExpiry || 90}" 
                                       min="30" max="365">
                                <small>Frequenza di cambio password obbligatorio</small>
                            </div>
                        </div>
                        
                        <div class="settings-section">
                            <h5>Controlli di Accesso</h5>
                            
                            <div class="form-field">
                                <label>IP Autorizzati</label>
                                <textarea name="ipWhitelist" class="form-control" rows="4" 
                                          placeholder="192.168.1.1&#10;10.0.0.1&#10;Uno per riga...">${(settings.ipWhitelist || []).join('\n')}</textarea>
                                <small>Lista di indirizzi IP autorizzati (lascia vuoto per disabilitare)</small>
                            </div>
                            
                            <div class="form-field">
                                <label style="display: flex; align-items: center; gap: 0.5rem;">
                                    <input type="checkbox" name="auditLogEnabled" ${settings.auditLogEnabled ? 'checked' : ''}>
                                    <span>📝 Log di Audit</span>
                                </label>
                                <small>Registra tutte le azioni degli utenti</small>
                            </div>
                            
                            <div class="form-field">
                                <label style="display: flex; align-items: center; gap: 0.5rem;">
                                    <input type="checkbox" name="dataEncryption" ${settings.dataEncryption ? 'checked' : ''}>
                                    <span>🔒 Crittografia Dati</span>
                                </label>
                                <small>Cripta i dati sensibili nel database</small>
                            </div>
                            
                            <div class="form-field">
                                <label style="display: flex; align-items: center; gap: 0.5rem;">
                                    <input type="checkbox" name="backupEncryption" ${settings.backupEncryption ? 'checked' : ''}>
                                    <span>💾 Backup Crittografati</span>
                                </label>
                                <small>Cripta automaticamente i backup</small>
                            </div>
                        </div>
                    </div>
                    
                    <div class="security-policies" style="margin-top: 2rem;">
                        <h5>Politiche Password</h5>
                        <div class="policies-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
                            <div class="policy-card" style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px;">
                                <h6>Complessità Password</h6>
                                <div class="checkbox-group">
                                    <label style="display: block; margin: 0.5rem 0;">
                                        <input type="checkbox" name="passwordPolicies" value="minLength" checked disabled>
                                        Lunghezza minima 8 caratteri
                                    </label>
                                    <label style="display: block; margin: 0.5rem 0;">
                                        <input type="checkbox" name="passwordPolicies" value="uppercase" 
                                               ${(settings.passwordPolicies || []).includes('uppercase') ? 'checked' : ''}>
                                        Almeno una maiuscola
                                    </label>
                                    <label style="display: block; margin: 0.5rem 0;">
                                        <input type="checkbox" name="passwordPolicies" value="numbers" 
                                               ${(settings.passwordPolicies || []).includes('numbers') ? 'checked' : ''}>
                                        Almeno un numero
                                    </label>
                                    <label style="display: block; margin: 0.5rem 0;">
                                        <input type="checkbox" name="passwordPolicies" value="symbols" 
                                               ${(settings.passwordPolicies || []).includes('symbols') ? 'checked' : ''}>
                                        Almeno un simbolo
                                    </label>
                                </div>
                            </div>
                            
                            <div class="policy-card" style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px;">
                                <h6>Avvisi di Sicurezza</h6>
                                <div class="checkbox-group">
                                    <label style="display: block; margin: 0.5rem 0;">
                                        <input type="checkbox" name="securityAlerts" value="loginFromNewDevice" 
                                               ${(settings.securityAlerts || []).includes('loginFromNewDevice') ? 'checked' : ''}>
                                        Login da nuovo dispositivo
                                    </label>
                                    <label style="display: block; margin: 0.5rem 0;">
                                        <input type="checkbox" name="securityAlerts" value="passwordChanged" 
                                               ${(settings.securityAlerts || []).includes('passwordChanged') ? 'checked' : ''}>
                                        Password modificata
                                    </label>
                                    <label style="display: block; margin: 0.5rem 0;">
                                        <input type="checkbox" name="securityAlerts" value="failedLogins" 
                                               ${(settings.securityAlerts || []).includes('failedLogins') ? 'checked' : ''}>
                                        Tentativi di login falliti
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="settings-actions" style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #e2e8f0;">
                        <button type="submit" class="btn btn-primary">💾 Salva Impostazioni</button>
                        <button type="button" class="btn btn-secondary" onclick="app.resetSecuritySettings()">🔄 Ripristina Predefinite</button>
                        <button type="button" class="btn btn-warning" onclick="app.changePassword()">🔑 Cambia Password</button>
                        <button type="button" class="btn btn-secondary" onclick="app.viewSecurityLog()">📋 Visualizza Log</button>
                    </div>
                </form>
            </div>
        `;
    },

    // Generate Billing Settings HTML
    generateBillingSettingsHTML() {
        const settings = CONDOPAY_MOCK_DATA.settings?.billing || {};
        
        return `
            <div class="billing-settings">
                <h4 class="settings-title">Impostazioni Fatturazione</h4>
                <p class="settings-description">Gestisci i dettagli di fatturazione e pagamento del servizio</p>
                
                <div class="billing-overview" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
                        <div>
                            <h5 style="margin: 0 0 0.5rem 0; opacity: 0.9;">Piano Attuale</h5>
                            <div style="font-size: 1.5rem; font-weight: bold;">Professional</div>
                            <div style="opacity: 0.8;">€89/mese + commissioni</div>
                        </div>
                        <div>
                            <h5 style="margin: 0 0 0.5rem 0; opacity: 0.9;">Prossima Fattura</h5>
                            <div style="font-size: 1.5rem; font-weight: bold;">15 Luglio 2025</div>
                            <div style="opacity: 0.8;">€89.00 + IVA</div>
                        </div>
                        <div>
                            <h5 style="margin: 0 0 0.5rem 0; opacity: 0.9;">Volume Mensile</h5>
                            <div style="font-size: 1.5rem; font-weight: bold;">€185.420</div>
                            <div style="opacity: 0.8;">847 transazioni</div>
                        </div>
                        <div>
                            <h5 style="margin: 0 0 0.5rem 0; opacity: 0.9;">Commissioni Incassate</h5>
                            <div style="font-size: 1.5rem; font-weight: bold;">€127.50</div>
                            <div style="opacity: 0.8;">Questo mese</div>
                        </div>
                    </div>
                </div>
                
                <form id="billingSettingsForm">
                    <div class="settings-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                        <div class="settings-section">
                            <h5>Informazioni di Fatturazione</h5>
                            
                            <div class="form-field">
                                <label>Ragione Sociale</label>
                                <input type="text" name="companyName" class="form-control" 
                                       value="${settings.companyName || 'Studio Amministrazioni Rossi'}">
                            </div>
                            
                            <div class="form-field">
                                <label>Partita IVA</label>
                                <input type="text" name="vatNumber" class="form-control" 
                                       value="${settings.vatNumber || 'IT12345678901'}">
                            </div>
                            
                            <div class="form-field">
                                <label>Codice Fiscale</label>
                                <input type="text" name="taxCode" class="form-control" 
                                       value="${settings.taxCode || 'RSSMRC80A01F205X'}">
                            </div>
                            
                            <div class="form-field">
                                <label>Indirizzo di Fatturazione</label>
                                <textarea name="billingAddress" class="form-control" rows="3">${settings.billingAddress || 'Via Brera 15\n20121 Milano\nItalia'}</textarea>
                            </div>
                            
                            <div class="form-field">
                                <label>Email per Fatture</label>
                                <input type="email" name="billingEmail" class="form-control" 
                                       value="${settings.billingEmail || 'fatture@studiorossi.it'}">
                            </div>
                        </div>
                        
                        <div class="settings-section">
                            <h5>Metodo di Pagamento</h5>
                            
                            <div class="payment-method-card" style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 1rem;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="font-weight: 600;">💳 **** **** **** 4242</div>
                                        <div style="color: #666; font-size: 0.9rem;">Visa • Scade 12/26</div>
                                    </div>
                                    <span class="status-badge status-success">Principale</span>
                                </div>
                            </div>
                            
                            <div class="form-field">
                                <button type="button" class="btn btn-secondary" onclick="app.changePaymentMethod()">
                                    🔄 Cambia Metodo di Pagamento
                                </button>
                            </div>
                            
                            <div class="form-field">
                                <label style="display: flex; align-items: center; gap: 0.5rem;">
                                    <input type="checkbox" name="autoRenewal" ${settings.autoRenewal !== false ? 'checked' : ''}>
                                    <span>Rinnovo Automatico</span>
                                </label>
                                <small>Rinnova automaticamente l'abbonamento ogni mese</small>
                            </div>
                            
                            <div class="form-field">
                                <label style="display: flex; align-items: center; gap: 0.5rem;">
                                    <input type="checkbox" name="invoiceReminders" ${settings.invoiceReminders !== false ? 'checked' : ''}>
                                    <span>Promemoria Fatture</span>
                                </label>
                                <small>Ricevi promemoria via email prima della scadenza</small>
                            </div>
                        </div>
                    </div>
                    
                    <div class="billing-history" style="margin-top: 2rem;">
                        <h5>Cronologia Fatture</h5>
                        <div class="invoice-list" style="background: #f7fafc; border-radius: 8px; overflow: hidden;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <thead style="background: #e2e8f0;">
                                    <tr>
                                        <th style="padding: 1rem; text-align: left;">Data</th>
                                        <th style="padding: 1rem; text-align: left;">Numero</th>
                                        <th style="padding: 1rem; text-align: right;">Importo</th>
                                        <th style="padding: 1rem; text-align: center;">Status</th>
                                        <th style="padding: 1rem; text-align: center;">Azioni</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${[
                                        { date: '2025-06-15', number: 'INV-2025-006', amount: 89.00, status: 'paid' },
                                        { date: '2025-05-15', number: 'INV-2025-005', amount: 89.00, status: 'paid' },
                                        { date: '2025-04-15', number: 'INV-2025-004', amount: 89.00, status: 'paid' },
                                        { date: '2025-03-15', number: 'INV-2025-003', amount: 89.00, status: 'paid' }
                                    ].map(invoice => `
                                        <tr style="border-bottom: 1px solid #e2e8f0;">
                                            <td style="padding: 1rem;">${Utils.Date.formatDate(invoice.date)}</td>
                                            <td style="padding: 1rem; font-family: monospace;">${invoice.number}</td>
                                            <td style="padding: 1rem; text-align: right; font-weight: bold;">€${invoice.amount.toFixed(2)}</td>
                                            <td style="padding: 1rem; text-align: center;">
                                                <span class="status-badge status-${invoice.status === 'paid' ? 'success' : 'warning'}">
                                                    ${invoice.status === 'paid' ? 'Pagata' : 'In sospeso'}
                                                </span>
                                            </td>
                                            <td style="padding: 1rem; text-align: center;">
                                                <button class="btn btn-sm btn-secondary" onclick="app.downloadInvoice('${invoice.number}')">
                                                    📥 Download
                                                </button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div class="plan-management" style="margin-top: 2rem;">
                        <h5>Gestione Piano</h5>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                            <div class="plan-card" style="padding: 1.5rem; border: 2px solid #667eea; border-radius: 12px; text-align: center; background: #f7fafc;">
                                <h6 style="margin: 0 0 1rem 0; color: #667eea;">Piano Attuale</h6>
                                <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem;">Professional</div>
                                <div style="color: #666; margin-bottom: 1rem;">€89/mese</div>
                                <div style="font-size: 0.9rem; color: #666;">
                                    • Fino a 1000 unità<br>
                                    • Commissioni: 1.4%<br>
                                    • Supporto prioritario<br>
                                    • Integrazioni illimitate
                                </div>
                            </div>
                            
                            <div class="plan-actions" style="display: flex; flex-direction: column; gap: 1rem; justify-content: center;">
                                <button class="btn btn-primary" onclick="app.upgradePlan()">
                                    ⬆️ Aggiorna Piano
                                </button>
                                <button class="btn btn-secondary" onclick="app.viewPlanDetails()">
                                    📋 Dettagli Piano
                                </button>
                                <button class="btn btn-secondary" onclick="app.contactBilling()">
                                    💬 Contatta Billing
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="settings-actions" style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #e2e8f0;">
                        <button type="submit" class="btn btn-primary">💾 Salva Impostazioni</button>
                        <button type="button" class="btn btn-secondary" onclick="app.exportBillingData()">📤 Esporta Dati</button>
                        <button type="button" class="btn btn-danger" onclick="app.cancelSubscription()">❌ Cancella Abbonamento</button>
                    </div>
                </form>
            </div>
        `;
    },

    // Bind settings form events
    bindSettingsEvents() {
        // Bind all settings forms
        const forms = ['paymentSettingsForm', 'notificationSettingsForm', 'securitySettingsForm', 'billingSettingsForm'];
        
        forms.forEach(formId => {
            const form = document.getElementById(formId);
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.saveSettings(formId);
                });
            }
        });
    },

    // Save settings based on form
    saveSettings(formId) {
        const form = document.getElementById(formId);
        if (!form) return;

        const formData = new FormData(form);
        const settings = {};
        
        // Handle checkboxes properly
        for (let [key, value] of formData.entries()) {
            if (form.querySelector(`[name="${key}"][type="checkbox"]`)) {
                if (!settings[key]) settings[key] = [];
                settings[key].push(value);
            } else {
                settings[key] = value;
            }
        }

        // Handle unchecked checkboxes
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (!checkbox.checked && !checkbox.name.includes('Days') && !checkbox.name.includes('Types') && !checkbox.name.includes('Methods')) {
                settings[checkbox.name] = false;
            }
        });

        // Save to appropriate settings section
        const settingType = formId.replace('SettingsForm', '');
        
        if (!CONDOPAY_MOCK_DATA.settings) {
            CONDOPAY_MOCK_DATA.settings = {};
        }
        
        CONDOPAY_MOCK_DATA.settings[settingType] = { ...CONDOPAY_MOCK_DATA.settings[settingType], ...settings };
        
        this.saveToStorage();
        notificationManager.show(`Impostazioni ${settingType} salvate con successo!`, 'success');
    },

    // Reset specific settings
    resetPaymentSettings() {
        if (confirm('Ripristinare le impostazioni di pagamento predefinite?')) {
            CONDOPAY_MOCK_DATA.settings.payments = {
                defaultDueDate: 1,
                reminderDays: [7, 3, 1],
                lateFeePercentage: 2.0,
                maxLateDays: 30,
                stripeCommission: 1.4,
                bankTransferFee: 0.0
            };
            this.saveToStorage();
            this.loadSettingsTab('payments');
            notificationManager.show('Impostazioni di pagamento ripristinate', 'info');
        }
    },

    resetNotificationSettings() {
        if (confirm('Ripristinare le impostazioni di notifica predefinite?')) {
            CONDOPAY_MOCK_DATA.settings.notifications = {
                emailEnabled: true,
                smsEnabled: true,
                whatsappEnabled: false,
                reminderFrequency: 'daily',
                escalationEnabled: true,
                escalationDays: [30, 60, 90]
            };
            this.saveToStorage();
            this.loadSettingsTab('notifications');
            notificationManager.show('Impostazioni di notifica ripristinate', 'info');
        }
    },

    resetSecuritySettings() {
        if (confirm('Ripristinare le impostazioni di sicurezza predefinite?')) {
            CONDOPAY_MOCK_DATA.settings.security = {
                twoFactorEnabled: false,
                sessionTimeout: 480,
                maxLoginAttempts: 5,
                passwordExpiry: 90,
                ipWhitelist: [],
                auditLogEnabled: true
            };
            this.saveToStorage();
            this.loadSettingsTab('security');
            notificationManager.show('Impostazioni di sicurezza ripristinate', 'info');
        }
    },

    // Test functions
    testPaymentSettings() {
        notificationManager.show('Test configurazione pagamenti in corso...', 'info');
        setTimeout(() => {
            notificationManager.show('✅ Configurazione pagamenti testata con successo!', 'success');
        }, 2000);
    },

    testNotifications() {
        notificationManager.show('Invio notifica di test...', 'info');
        setTimeout(() => {
            notificationManager.show('🧪 Notifica di test inviata! Controlla email/SMS.', 'success');
        }, 1500);
    },

    // Security functions
    changePassword() {
        const content = `
            <div class="change-password">
                <h4>Cambia Password</h4>
                <form id="changePasswordForm">
                    <div class="form-field">
                        <label>Password Attuale</label>
                        <input type="password" name="currentPassword" class="form-control" required>
                    </div>
                    <div class="form-field">
                        <label>Nuova Password</label>
                        <input type="password" name="newPassword" class="form-control" required>
                    </div>
                    <div class="form-field">
                        <label>Conferma Nuova Password</label>
                        <input type="password" name="confirmPassword" class="form-control" required>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="modalManager.closeModal()">Annulla</button>
                        <button type="submit" class="btn btn-primary">🔑 Cambia Password</button>
                    </div>
                </form>
            </div>
        `;
        
        modalManager.showModal(content, { title: 'Cambia Password', width: '500px' });
        
        setTimeout(() => {
            const form = document.getElementById('changePasswordForm');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    // Simulate password change
                    notificationManager.show('Password cambiata con successo!', 'success');
                    modalManager.closeModal();
                });
            }
        }, 100);
    },

    viewSecurityLog() {
        const content = `
            <div class="security-log">
                <h4>Log di Sicurezza</h4>
                <div style="max-height: 400px; overflow-y: auto;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="border-bottom: 2px solid #e2e8f0;">
                                <th style="padding: 0.5rem; text-align: left;">Data</th>
                                <th style="padding: 0.5rem; text-align: left;">Evento</th>
                                <th style="padding: 0.5rem; text-align: left;">IP</th>
                                <th style="padding: 0.5rem; text-align: left;">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${CONDOPAY_MOCK_DATA.auditLog.map(log => `
                                <tr style="border-bottom: 1px solid #f0f0f0;">
                                    <td style="padding: 0.5rem;">${Utils.Date.formatDateTime(log.timestamp)}</td>
                                    <td style="padding: 0.5rem;">${log.action}</td>
                                    <td style="padding: 0.5rem; font-family: monospace;">${log.ipAddress}</td>
                                    <td style="padding: 0.5rem;">
                                        <span class="status-badge status-success">Successo</span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div style="margin-top: 1rem; text-align: center;">
                    <button class="btn btn-secondary" onclick="modalManager.closeModal()">Chiudi</button>
                    <button class="btn btn-secondary" onclick="app.exportSecurityLog()">📤 Esporta Log</button>
                </div>
            </div>
        `;
        
        modalManager.showModal(content, { title: 'Log di Sicurezza', width: '800px' });
    },

    // Billing functions
    changePaymentMethod() {
        notificationManager.show('Reindirizzamento al gestore pagamenti...', 'info');
        setTimeout(() => {
            notificationManager.show('✅ Metodo di pagamento aggiornato!', 'success');
        }, 2000);
    },

    downloadInvoice(invoiceNumber) {
        notificationManager.show(`Download fattura ${invoiceNumber} in corso...`, 'info');
        // Simulate file download
        setTimeout(() => {
            notificationManager.show(`✅ Fattura ${invoiceNumber} scaricata!`, 'success');
        }, 1500);
    },

    upgradePlan() {
        notificationManager.show('Apertura pannello upgrade piano...', 'info');
        // This would typically open a plan selection modal
    },

    contactBilling() {
        notificationManager.show('📧 Email inviata al supporto billing', 'success');
    }
});

// CondoPay App Demo - Interactive Charts Implementation
// Implementazione completa dei grafici interattivi

// Extend InteractiveCharts with missing methods
Object.assign(InteractiveCharts.prototype, {

    // Initialize charts on dashboard
    initDashboardCharts() {
        // Main payments chart
        const mainChart = document.getElementById('mainChart');
        if (mainChart) {
            this.renderPaymentsChart('mainChart');
        }

        // Method chart in payments section
        const methodChart = document.querySelector('.chart-area');
        if (methodChart && methodChart.textContent.includes('Grafico Metodi Pagamento')) {
            methodChart.id = 'paymentMethodsChart';
            this.renderPaymentMethodsChart('paymentMethodsChart');
        }
    },

    // Generate grid lines for charts
    generateGridLines() {
        const lines = [];
        for (let i = 0; i <= 10; i++) {
            const y = 20 + (i * 26);
            lines.push(`<line x1="40" y1="${y}" x2="660" y2="${y}" stroke="#f0f0f0" stroke-width="1"/>`);
        }
        for (let i = 0; i <= 12; i++) {
            const x = 40 + (i * 50);
            lines.push(`<line x1="${x}" y1="20" x2="${x}" y2="280" stroke="#f0f0f0" stroke-width="1"/>`);
        }
        return lines.join('');
    },

    // Generate area chart
    generateAreaChart(data, property) {
        const maxValue = Math.max(...data.map(d => d[property]));
        const scale = 200 / maxValue;
        const width = 600 / data.length;

        const points = data.map((item, index) => {
            const x = 60 + (index * width);
            const y = 250 - (item[property] * scale * 0.0001); // Scale down for proper display
            return `${x},${y}`;
        }).join(' ');

        const pathData = `M 60,250 L ${points} L ${60 + ((data.length - 1) * width)},250 Z`;

        return `
            <path d="${pathData}" fill="url(#areaGradient)" opacity="0.3"/>
            <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:${this.colors.primary};stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:${this.colors.primary};stop-opacity:0.1" />
                </linearGradient>
            </defs>
        `;
    },

    // Generate trend line
    generateTrendLine(data, property) {
        const maxValue = 100; // For percentage values
        const scale = 200 / maxValue;
        const width = 600 / data.length;

        const points = data.map((item, index) => {
            const x = 60 + (index * width);
            const y = 250 - (item[property] * scale);
            return `${x},${y}`;
        }).join(' ');

        return `
            <polyline points="${points}" fill="none" stroke="${this.colors.warning}" 
                      stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        `;
    },

    // Generate data points
    generateDataPoints(data) {
        const maxIncome = Math.max(...data.map(d => d.income));
        const maxRate = 100;
        const incomeScale = 200 / maxIncome;
        const rateScale = 200 / maxRate;
        const width = 600 / data.length;

        return data.map((item, index) => {
            const x = 60 + (index * width);
            const yIncome = 250 - (item.income * incomeScale * 0.0001);
            const yRate = 250 - (item.paymentRate * rateScale);

            return `
                <circle cx="${x}" cy="${yIncome}" r="4" fill="${this.colors.primary}" 
                        onmouseover="interactiveCharts.showTooltip(event, 'Incassi ${item.month}: €${Utils.Number.formatNumber(item.income)}')"
                        onmouseout="interactiveCharts.hideTooltip()" style="cursor: pointer;"/>
                <circle cx="${x}" cy="${yRate}" r="4" fill="${this.colors.warning}"
                        onmouseover="interactiveCharts.showTooltip(event, 'Tasso ${item.month}: ${item.paymentRate}%')"
                        onmouseout="interactiveCharts.hideTooltip()" style="cursor: pointer;"/>
            `;
        }).join('');
    },

    // Generate trend labels
    generateTrendLabels(data) {
        const width = 600 / data.length;

        return data.map((item, index) => {
            const x = 60 + (index * width);
            return `
                <text x="${x}" y="270" text-anchor="middle" font-size="11" fill="#666">${item.month}</text>
            `;
        }).join('');
    },

    // Generate trend statistics
    generateTrendStats(data) {
        const totalIncome = Utils.Array.sumBy(data, 'income');
        const avgRate = Utils.Array.averageBy(data, 'paymentRate');
        const growth = ((data[data.length - 1].income / data[0].income - 1) * 100);
        const trend = data[data.length - 1].paymentRate > data[0].paymentRate ? 'up' : 'down';

        return `
            <div class="trend-stat" style="text-align: center; padding: 1rem; background: #f7fafc; border-radius: 8px;">
                <div style="font-size: 0.9rem; color: #666; margin-bottom: 0.5rem;">Volume Totale</div>
                <div style="font-size: 1.2rem; font-weight: bold; color: ${this.colors.primary};">
                    €${Utils.Number.formatNumber(totalIncome)}
                </div>
            </div>
            <div class="trend-stat" style="text-align: center; padding: 1rem; background: #f0fff4; border-radius: 8px;">
                <div style="font-size: 0.9rem; color: #666; margin-bottom: 0.5rem;">Tasso Medio</div>
                <div style="font-size: 1.2rem; font-weight: bold; color: ${this.colors.success};">
                    ${avgRate.toFixed(1)}%
                </div>
            </div>
            <div class="trend-stat" style="text-align: center; padding: 1rem; background: ${growth >= 0 ? '#f0fff4' : '#fef2f2'}; border-radius: 8px;">
                <div style="font-size: 0.9rem; color: #666; margin-bottom: 0.5rem;">Crescita</div>
                <div style="font-size: 1.2rem; font-weight: bold; color: ${growth >= 0 ? this.colors.success : this.colors.danger};">
                    ${growth >= 0 ? '+' : ''}${growth.toFixed(1)}%
                </div>
            </div>
            <div class="trend-stat" style="text-align: center; padding: 1rem; background: #fffaf0; border-radius: 8px;">
                <div style="font-size: 0.9rem; color: #666; margin-bottom: 0.5rem;">Tendenza</div>
                <div style="font-size: 1.2rem; font-weight: bold; color: ${this.colors.warning};">
                    ${trend === 'up' ? '📈' : '📉'} ${trend === 'up' ? 'Crescita' : 'Calo'}
                </div>
            </div>
        `;
    },

    // Add trend interactivity
    addTrendInteractivity(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Add hover effects to data points
        const circles = container.querySelectorAll('circle');
        circles.forEach(circle => {
            circle.addEventListener('mouseenter', function() {
                this.setAttribute('r', '6');
                this.style.filter = 'brightness(1.2)';
            });
            
            circle.addEventListener('mouseleave', function() {
                this.setAttribute('r', '4');
                this.style.filter = 'none';
            });
        });

        // Add click handlers for detailed view
        circles.forEach((circle, index) => {
            circle.addEventListener('click', function() {
                const monthData = CONDOPAY_MOCK_DATA.reports.monthlyTrends[Math.floor(index / 2)];
                interactiveCharts.showMonthDetails(monthData);
            });
        });
    },

    // Show month details modal
    showMonthDetails(monthData) {
        const content = `
            <div class="month-details">
                <div class="month-header" style="text-align: center; margin-bottom: 2rem; padding: 2rem; background: linear-gradient(135deg, ${this.colors.primary} 0%, ${this.colors.secondary} 100%); color: white; border-radius: 8px; margin: -1rem -1rem 2rem -1rem;">
                    <h3 style="margin: 0; font-size: 1.5rem;">Dettagli ${monthData.month} 2025</h3>
                    <div style="font-size: 2rem; font-weight: bold; margin: 1rem 0;">€${Utils.Number.formatNumber(monthData.income)}</div>
                    <div style="opacity: 0.9;">Target: €${Utils.Number.formatNumber(monthData.target)}</div>
                </div>
                
                <div class="metrics-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                    <div class="metric-card" style="padding: 1.5rem; background: #f7fafc; border-radius: 8px; text-align: center;">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">💰</div>
                        <div style="font-size: 0.9rem; color: #666; margin-bottom: 0.5rem;">Incassi Effettivi</div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: ${this.colors.primary};">€${Utils.Number.formatNumber(monthData.income)}</div>
                        <div style="font-size: 0.8rem; color: ${monthData.income >= monthData.target ? this.colors.success : this.colors.danger};">
                            ${monthData.income >= monthData.target ? '✅ Obiettivo raggiunto' : '❌ Sotto target'}
                        </div>
                    </div>
                    
                    <div class="metric-card" style="padding: 1.5rem; background: #f0fff4; border-radius: 8px; text-align: center;">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">📊</div>
                        <div style="font-size: 0.9rem; color: #666; margin-bottom: 0.5rem;">Tasso di Pagamento</div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: ${this.colors.success};">${monthData.paymentRate}%</div>
                        <div style="font-size: 0.8rem; color: ${monthData.paymentRate >= 95 ? this.colors.success : this.colors.warning};">
                            ${monthData.paymentRate >= 95 ? '✅ Eccellente' : monthData.paymentRate >= 85 ? '⚠️ Buono' : '❌ Da migliorare'}
                        </div>
                    </div>
                    
                    <div class="metric-card" style="padding: 1.5rem; background: #fef2f2; border-radius: 8px; text-align: center;">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">⚠️</div>
                        <div style="font-size: 0.9rem; color: #666; margin-bottom: 0.5rem;">Morosità</div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: ${this.colors.danger};">${monthData.defaults}%</div>
                        <div style="font-size: 0.8rem; color: ${monthData.defaults <= 3 ? this.colors.success : this.colors.danger};">
                            ${monthData.defaults <= 3 ? '✅ Sotto controllo' : '❌ Richiede attenzione'}
                        </div>
                    </div>
                </div>
                
                <div class="month-analysis" style="background: #f8fafc; padding: 1.5rem; border-radius: 8px;">
                    <h5 style="margin: 0 0 1rem 0;">Analisi Performance</h5>
                    <div style="display: grid; gap: 1rem;">
                        <div style="display: flex; justify-content: space-between;">
                            <span>Variazione rispetto al target:</span>
                            <span style="font-weight: bold; color: ${monthData.income >= monthData.target ? this.colors.success : this.colors.danger};">
                                ${((monthData.income / monthData.target - 1) * 100).toFixed(1)}%
                            </span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Transazioni elaborate:</span>
                            <span style="font-weight: bold;">${Math.floor(monthData.income / 200)} circa</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Commissioni generate:</span>
                            <span style="font-weight: bold; color: ${this.colors.primary};">€${(monthData.income * 0.014).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                
                <div class="month-actions" style="margin-top: 2rem; text-align: center;">
                    <button class="btn btn-primary" onclick="app.generateMonthReport('${monthData.month}')">
                        📊 Report Dettagliato
                    </button>
                    <button class="btn btn-secondary" onclick="app.compareWithPrevious('${monthData.month}')">
                        📈 Confronta con Precedente
                    </button>
                </div>
            </div>
        `;

        modalManager.showModal(content, { title: `Analisi ${monthData.month} 2025`, width: '800px' });
    },

    // Toggle method highlight in pie chart
    toggleMethodHighlight(index) {
        const paths = document.querySelectorAll(`[data-method-index]`);
        
        paths.forEach((path, i) => {
            if (i === index) {
                path.style.opacity = path.style.opacity === '0.7' ? '1' : '0.7';
                path.style.filter = path.style.filter === 'brightness(1.2)' ? 'none' : 'brightness(1.2)';
            } else {
                path.style.opacity = '0.5';
            }
        });
    },

    // Change trend period
    changeTrendPeriod(period) {
        // This would normally fetch different data based on period
        notificationManager.show(`Caricamento dati per ${period} mesi...`, 'info');
        
        // Simulate data loading
        setTimeout(() => {
            notificationManager.show('Dati aggiornati con successo!', 'success');
        }, 1500);
    }
});

// ===== EXTEND APP WITH MISSING FUNCTIONS =====

Object.assign(CondoPayApp.prototype, {

    // Initialize charts when sections load
    initDashboard() {
        this.animateCounters();
        this.setupSearchFilter();
        this.loadRecentActivity();
        
        // Initialize charts
        setTimeout(() => {
            if (window.interactiveCharts) {
                interactiveCharts.initDashboardCharts();
            }
        }, 500);
        
        // Simulate real-time updates
        setInterval(() => {
            this.updateActivityFeed();
        }, 30000);
    },

    initPayments() {
        this.setupPaymentFilters();
        
        // Initialize payment method chart
        setTimeout(() => {
            if (window.interactiveCharts) {
                const methodChart = document.querySelector('#paymentMethodsChart');
                if (methodChart) {
                    interactiveCharts.renderPaymentMethodsChart('paymentMethodsChart');
                }
            }
        }, 500);
        
        setInterval(() => {
            this.refreshPayments();
        }, 10000);
    },

    initReports() {
        // Initialize trend chart
        setTimeout(() => {
            if (window.interactiveCharts) {
                const trendChart = document.querySelector('#trendChart');
                if (trendChart) {
                    interactiveCharts.renderTrendChart('trendChart');
                }
            }
        }, 500);
    },

    // Generate transaction items for recent activity
    generateTransactionItems() {
        const payments = CONDOPAY_MOCK_DATA.payments.slice(0, 5);
        
        return payments.map(payment => {
            const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === payment.condominiumId);
            const resident = CONDOPAY_MOCK_DATA.residents.find(r => r.id === payment.residentId);
            const statusIcon = payment.status === 'completed' ? '✅' : payment.status === 'pending' ? '⏳' : '❌';
            
            return `
                <div class="activity-item transaction-item" style="cursor: pointer;" onclick="app.viewPaymentDetails('${payment.id}')">
                    <div class="activity-icon ${payment.status}" style="font-size: 1.2rem;">
                        ${statusIcon}
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">€${payment.amount.toLocaleString()}</div>
                        <div class="activity-description">
                            ${condo?.name || 'N/A'} - ${resident?.unit || 'N/A'}
                        </div>
                    </div>
                    <div class="activity-time">${this.formatTimeAgo(payment.date)}</div>
                </div>
            `;
        }).join('');
    },

    // Generate detailed payments table rows
    generatePaymentsTableRows() {
        const payments = CONDOPAY_MOCK_DATA.payments;
        
        return payments.map(payment => {
            const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === payment.condominiumId);
            const resident = CONDOPAY_MOCK_DATA.residents.find(r => r.id === payment.residentId);
            
            return `
                <tr style="cursor: pointer;" onclick="app.viewPaymentDetails('${payment.id}')"
                    onmouseenter="this.style.backgroundColor='#f7fafc'"
                    onmouseleave="this.style.backgroundColor='white'">
                    
                    <td class="font-semibold" style="font-family: monospace;">${payment.id}</td>
                    <td>${condo?.name || 'N/A'}</td>
                    <td>${resident?.unit || 'N/A'}</td>
                    <td style="text-align: right; font-weight: bold;">€${payment.amount.toLocaleString()}</td>
                    <td>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span>${this.getMethodIcon(payment.method)}</span>
                            <span>${payment.method === 'stripe' ? 'Stripe' : payment.method === 'bank_transfer' ? 'Bonifico' : 'Contanti'}</span>
                        </div>
                    </td>
                    <td>${Utils.Date.formatDate(payment.date)}</td>
                    <td>
                        <span class="status-badge status-${payment.status === 'completed' ? 'success' : payment.status === 'pending' ? 'warning' : 'danger'}">
                            ${payment.status === 'completed' ? 'Completato' : payment.status === 'pending' ? 'In attesa' : 'Fallito'}
                        </span>
                    </td>
                    <td onclick="event.stopPropagation();">
                        <button class="btn btn-secondary btn-sm" onclick="app.viewPaymentDetails('${payment.id}')" title="Dettagli">
                            👁️
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    },

    // Month report generation
    generateMonthReport(month) {
        notificationManager.show(`Generazione report ${month} in corso...`, 'info');
        
        setTimeout(() => {
            const reportData = CONDOPAY_MOCK_DATA.reports.monthlyTrends.find(t => t.month === month);
            if (reportData) {
                Utils.Export.toCSV([reportData], `report-${month}-2025.csv`);
                notificationManager.show(`Report ${month} generato con successo!`, 'success');
            }
            modalManager.closeModal();
        }, 2000);
    },

    // Compare with previous month
    compareWithPrevious(month) {
        const months = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu'];
        const currentIndex = months.indexOf(month);
        
        if (currentIndex > 0) {
            const currentData = CONDOPAY_MOCK_DATA.reports.monthlyTrends[currentIndex];
            const previousData = CONDOPAY_MOCK_DATA.reports.monthlyTrends[currentIndex - 1];
            
            const content = `
                <div class="month-comparison">
                    <h4>Confronto ${previousData.month} vs ${currentData.month}</h4>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin: 2rem 0;">
                        <div style="text-align: center;">
                            <h5>${previousData.month}</h5>
                            <div style="font-size: 1.5rem; font-weight: bold; color: #666;">€${Utils.Number.formatNumber(previousData.income)}</div>
                            <div style="color: #666;">${previousData.paymentRate}%</div>
                        </div>
                        
                        <div style="text-align: center; display: flex; align-items: center; justify-content: center;">
                            <div style="font-size: 2rem;">
                                ${currentData.income > previousData.income ? '📈' : '📉'}
                            </div>
                        </div>
                        
                        <div style="text-align: center;">
                            <h5>${currentData.month}</h5>
                            <div style="font-size: 1.5rem; font-weight: bold; color: ${this.colors.primary};">€${Utils.Number.formatNumber(currentData.income)}</div>
                            <div style="color: ${this.colors.primary};">${currentData.paymentRate}%</div>
                        </div>
                    </div>
                    
                    <div class="comparison-stats" style="background: #f8fafc; padding: 1.5rem; border-radius: 8px;">
                        <div style="display: grid; gap: 1rem;">
                            <div style="display: flex; justify-content: space-between;">
                                <span>Variazione Incassi:</span>
                                <span style="font-weight: bold; color: ${currentData.income > previousData.income ? this.colors.success : this.colors.danger};">
                                    ${((currentData.income / previousData.income - 1) * 100).toFixed(1)}%
                                </span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span>Variazione Tasso Pagamento:</span>
                                <span style="font-weight: bold; color: ${currentData.paymentRate > previousData.paymentRate ? this.colors.success : this.colors.danger};">
                                    ${(currentData.paymentRate - previousData.paymentRate).toFixed(1)} punti
                                </span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span>Differenza Assoluta:</span>
                                <span style="font-weight: bold;">€${Utils.Number.formatNumber(Math.abs(currentData.income - previousData.income))}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            modalManager.showModal(content, { title: 'Confronto Mensile', width: '600px' });
        } else {
            notificationManager.show('Nessun mese precedente disponibile per il confronto', 'info');
        }
    },

    // Print payment receipt
    printPaymentReceipt(paymentId) {
        const payment = CONDOPAY_MOCK_DATA.payments.find(p => p.id === paymentId);
        if (!payment) return;

        const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === payment.condominiumId);
        const resident = CONDOPAY_MOCK_DATA.residents.find(r => r.id === payment.residentId);

        PrintManager.printSection('payment_receipt', { payment, condo, resident });
        notificationManager.show('Ricevuta inviata alla stampante', 'success');
    },

    // Email payment receipt
    emailPaymentReceipt(paymentId) {
        const payment = CONDOPAY_MOCK_DATA.payments.find(p => p.id === paymentId);
        if (!payment) return;

        notificationManager.show('Ricevuta inviata via email', 'success');
        modalManager.closeModal();
    },

    // Check payment status
    checkPaymentStatus(paymentId) {
        notificationManager.show('Verifica status in corso...', 'info');
        
        setTimeout(() => {
            // Simulate status check
            const newStatus = Math.random() > 0.5 ? 'completed' : 'pending';
            notificationManager.show(`Status aggiornato: ${newStatus === 'completed' ? 'Completato' : 'Ancora in elaborazione'}`, 
                                   newStatus === 'completed' ? 'success' : 'warning');
        }, 2000);
    },

    // Retry failed payment
    retryPayment(paymentId) {
        notificationManager.show('Nuovo tentativo di pagamento in corso...', 'info');
        
        setTimeout(() => {
            notificationManager.show('Pagamento completato con successo!', 'success');
            modalManager.closeModal();
            this.refreshCurrentView();
        }, 3000);
    },

    // Export payment details
    exportPaymentDetails(paymentId) {
        const payment = CONDOPAY_MOCK_DATA.payments.find(p => p.id === paymentId);
        if (!payment) return;

        const condo = CONDOPAY_MOCK_DATA.condominiums.find(c => c.id === payment.condominiumId);
        const resident = CONDOPAY_MOCK_DATA.residents.find(r => r.id === payment.residentId);

        const exportData = [{
            'ID Pagamento': payment.id,
            'Data': Utils.Date.formatDateTime(payment.date),
            'Condominio': condo?.name || 'N/A',
            'Unità': resident?.unit || 'N/A',
            'Residente': resident?.owner || 'N/A',
            'Importo': payment.amount,
            'Commissione': payment.commission || 0,
            'Metodo': payment.method,
            'Status': payment.status,
            'ID Transazione': payment.transactionId || '',
            'Descrizione': payment.description || ''
        }];

        Utils.Export.toCSV(exportData, `pagamento-${payment.id}-dettagli.csv`);
        notificationManager.show('Dettagli pagamento esportati', 'success');
    }
});

// ===== ENHANCED REPORTS SECTION =====

// Update the report generation to include trend chart
Object.assign(CondoPayApp.prototype, {
    
    generateReportsHTML() {
        return `
            <div class="content-header mb-4">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h2>Report e Analytics</h2>
                    <div>
                        <button class="btn btn-secondary" onclick="app.scheduleReport()">⏰ Programma Report</button>
                        <button class="btn btn-primary" onclick="app.generateCustomReport()">📊 Report Personalizzato</button>
                    </div>
                </div>
            </div>

            <!-- Report Quick Stats -->
            <div class="stats-grid">
                <div class="stat-card success">
                    <div class="stat-header">
                        <div class="stat-title">Performance Globale</div>
                        <div class="stat-icon">📈</div>
                    </div>
                    <div class="stat-value">8.7/10</div>
                    <div class="stat-change positive">+0.3 vs mese scorso</div>
                </div>
                
                <div class="stat-card info">
                    <div class="stat-header">
                        <div class="stat-title">ROI Medio</div>
                        <div class="stat-icon">💰</div>
                    </div>
                    <div class="stat-value">1.247%</div>
                    <div class="stat-change positive">vs metodi tradizionali</div>
                </div>
                
                <div class="stat-card warning">
                    <div class="stat-header">
                        <div class="stat-title">Tempo Medio Incasso</div>
                        <div class="stat-icon">⏱️</div>
                    </div>
                    <div class="stat-value">2.3 giorni</div>
                    <div class="stat-change positive">-87% vs cartaceo</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-title">Soddisfazione Clienti</div>
                        <div class="stat-icon">😊</div>
                    </div>
                    <div class="stat-value">9.2/10</div>
                    <div class="stat-change positive">+0.5 vs trimestre</div>
                </div>
            </div>

            <!-- Interactive Trend Chart -->
            <div class="chart-container">
                <div class="chart-header">
                    <h3 class="chart-title">Grafico Trend Pagamenti</h3>
                    <div>
                        <select class="btn btn-secondary" style="border: 1px solid #e2e8f0;" onchange="interactiveCharts.changeTrendPeriod(this.value)">
                            <option value="6">Ultimi 6 mesi</option>
                            <option value="12">Ultimo anno</option>
                            <option value="24">Ultimi 2 anni</option>
                        </select>
                        <button class="btn btn-secondary" onclick="interactiveCharts.exportChart('trendChart')">📥 Esporta</button>
                    </div>
                </div>
                <div class="chart-area" id="trendChart">
                    📈 Caricamento grafico trend...
                </div>
            </div>

            <!-- Reports Table -->
            <div class="data-table">
                <div class="table-header">
                    <h3 class="table-title">Report Disponibili</h3>
                    <div class="table-filters">
                        <select class="search-input" id="reportCategory">
                            <option value="">Tutte le categorie</option>
                            <option value="financial">Finanziari</option>
                            <option value="operational">Operativi</option>
                            <option value="performance">Performance</option>
                            <option value="compliance">Compliance</option>
                        </select>
                    </div>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th>Report</th>
                            <th>Categoria</th>
                            <th>Periodo</th>
                            <th>Ultimo Aggiornamento</th>
                            <th>Formato</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.generateReportsTableRows()}
                    </tbody>
                </table>
            </div>
        `;
    }
});

// Initialize interactive charts when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (window.interactiveCharts && window.app) {
            // Set up chart initialization for different sections
            const originalNavigation = app.navigateTo;
            app.navigateTo = function(section) {
                originalNavigation.call(this, section);
                
                // Initialize charts based on section
                setTimeout(() => {
                    if (section === 'dashboard') {
                        interactiveCharts.initDashboardCharts();
                    } else if (section === 'reports') {
                        const trendChart = document.getElementById('trendChart');
                        if (trendChart) {
                            interactiveCharts.renderTrendChart('trendChart');
                        }
                    }
                }, 300);
            };
        }
    }, 2000);
});
// ===== COMPLETE INTERACTIVE CHARTS IMPLEMENTATION =====

// Overwrite any partial InteractiveCharts implementation
class InteractiveChartsComplete {
    constructor() {
        this.colors = {
            primary: '#667eea',
            secondary: '#764ba2',
            success: '#48bb78',
            warning: '#ed8936',
            danger: '#f56565',
            info: '#4299e1'
        };
    }

    // Render payments chart for dashboard
    renderPaymentsChart(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found for payments chart`);
            return;
        }

        const data = CONDOPAY_MOCK_DATA.reports.monthlyTrends;
        
        const chartHTML = `
            <div class="interactive-chart" style="position: relative; width: 100%; height: 100%; min-height: 300px;">
                <div class="chart-controls" style="display: flex; justify-content: space-between; margin-bottom: 1rem; padding: 0 1rem;">
                    <div class="chart-legend" style="display: flex; gap: 2rem; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <div style="width: 12px; height: 12px; background: ${this.colors.primary}; border-radius: 2px;"></div>
                            <span style="font-size: 0.9rem; color: #666;">Incassi</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <div style="width: 12px; height: 12px; background: ${this.colors.success}; border-radius: 2px;"></div>
                            <span style="font-size: 0.9rem; color: #666;">Target</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <div style="width: 12px; height: 12px; background: ${this.colors.warning}; border-radius: 50%;"></div>
                            <span style="font-size: 0.9rem; color: #666;">Tasso Pagamento</span>
                        </div>
                    </div>
                    <div class="chart-actions">
                        <button class="btn btn-secondary btn-sm" onclick="interactiveCharts.exportChart('${containerId}')">
                            📥 Esporta
                        </button>
                    </div>
                </div>
                
                <div class="chart-canvas" style="height: 280px; border: 1px solid #e2e8f0; border-radius: 8px; background: white; position: relative; overflow: hidden;">
                    <svg width="100%" height="100%" viewBox="0 0 600 250" style="display: block;">
                        <!-- Grid lines -->
                        ${this.generateGridLines()}
                        
                        <!-- Payment bars -->
                        ${this.generatePaymentsBars(data)}
                        
                        <!-- Payment rate line -->
                        ${this.generatePaymentsLine(data)}
                        
                        <!-- Axis labels -->
                        ${this.generateAxisLabels(data)}
                        
                        <!-- Y-axis labels -->
                        ${this.generateYAxisLabels()}
                    </svg>
                    
                    <div class="chart-tooltip" id="tooltip-${containerId}" style="
                        position: absolute; 
                        background: rgba(0,0,0,0.8); 
                        color: white; 
                        padding: 0.5rem; 
                        border-radius: 4px; 
                        font-size: 0.8rem; 
                        pointer-events: none; 
                        opacity: 0; 
                        transition: opacity 0.2s;
                        z-index: 1000;
                        white-space: nowrap;
                    "></div>
                </div>
                
                <div class="chart-summary" style="margin-top: 1rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; padding: 0 1rem;">
                    <div class="summary-item" style="text-align: center; padding: 0.75rem; background: #f7fafc; border-radius: 6px;">
                        <div style="font-size: 0.8rem; color: #666; margin-bottom: 0.25rem;">Media Mensile</div>
                        <div style="font-weight: bold; color: ${this.colors.primary};">€${this.formatNumber(this.average(data, 'income'))}</div>
                    </div>
                    <div class="summary-item" style="text-align: center; padding: 0.75rem; background: #f0fff4; border-radius: 6px;">
                        <div style="font-size: 0.8rem; color: #666; margin-bottom: 0.25rem;">Crescita</div>
                        <div style="font-weight: bold; color: ${this.colors.success};">+${((data[data.length-1].income / data[0].income - 1) * 100).toFixed(1)}%</div>
                    </div>
                    <div class="summary-item" style="text-align: center; padding: 0.75rem; background: #fffaf0; border-radius: 6px;">
                        <div style="font-size: 0.8rem; color: #666; margin-bottom: 0.25rem;">Tasso Medio</div>
                        <div style="font-weight: bold; color: ${this.colors.warning};">${this.average(data, 'paymentRate').toFixed(1)}%</div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = chartHTML;
        this.addChartInteractivity(containerId);
    }

    // Render payment methods pie chart
    renderPaymentMethodsChart(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found for payment methods chart`);
            return;
        }

        const data = CONDOPAY_MOCK_DATA.reports.paymentMethods;
        const total = data.reduce((sum, item) => sum + item.volume, 0);
        
        const chartHTML = `
            <div class="payment-methods-chart" style="position: relative; width: 100%; height: 100%; min-height: 300px; padding: 1rem;">
                <div class="chart-header" style="text-align: center; margin-bottom: 1.5rem;">
                    <div style="font-size: 0.9rem; color: #666; margin-bottom: 0.5rem;">Volume totale mensile</div>
                    <div style="font-size: 1.5rem; font-weight: bold; color: ${this.colors.primary};">€${this.formatNumber(total)}</div>
                </div>
                
                <div class="pie-chart-container" style="display: flex; align-items: center; justify-content: center; gap: 3rem;">
                    <div class="pie-chart" style="position: relative; width: 200px; height: 200px;">
                        <svg width="200" height="200" viewBox="0 0 200 200" style="transform: rotate(-90deg);">
                            ${this.generatePieChart(data, total)}
                        </svg>
                    </div>
                    
                    <div class="chart-legend" style="flex: 1; max-width: 250px;">
                        ${data.map((item, index) => `
                            <div class="legend-item" style="display: flex; align-items: center; margin-bottom: 1rem; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: background 0.2s;"
                                 onclick="interactiveCharts.toggleMethodHighlight(${index})"
                                 onmouseenter="this.style.background='#f7fafc'"
                                 onmouseleave="this.style.background='transparent'">
                                <div style="width: 16px; height: 16px; border-radius: 50%; background: ${this.getMethodColor(index)}; margin-right: 1rem; flex-shrink: 0;"></div>
                                <div style="flex: 1;">
                                    <div style="font-weight: 600; margin-bottom: 0.125rem;">${item.method}</div>
                                    <div style="font-size: 0.9rem; color: #666;">€${this.formatNumber(item.volume)} • ${item.percentage}%</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="method-details" style="margin-top: 2rem;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        ${data.map((item, index) => `
                            <div class="method-card" style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; text-align: center; transition: all 0.3s ease; cursor: pointer;" 
                                 onmouseenter="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'"
                                 onmouseleave="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                                <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">${this.getMethodIcon(item.method)}</div>
                                <div style="font-weight: bold; margin-bottom: 0.25rem;">${item.method}</div>
                                <div style="color: ${this.getMethodColor(index)}; font-size: 1.2rem; font-weight: bold; margin-bottom: 0.25rem;">€${this.formatNumber(item.volume)}</div>
                                <div style="font-size: 0.9rem; color: #666;">${item.percentage}% del totale</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = chartHTML;
    }

    // Render trend chart for reports
    renderTrendChart(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found for trend chart`);
            return;
        }

        const data = CONDOPAY_MOCK_DATA.reports.monthlyTrends;
        
        const chartHTML = `
            <div class="trend-chart" style="position: relative; width: 100%; height: 100%; min-height: 400px; padding: 1rem;">
                <div class="chart-controls" style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <div>
                        <h4 style="margin: 0 0 0.5rem 0;">Trend Pagamenti (6 Mesi)</h4>
                        <p style="margin: 0; color: #666; font-size: 0.9rem;">Andamento incassi e performance</p>
                    </div>
                    <div class="time-selector">
                        <select class="form-control" style="border: 1px solid #e2e8f0; padding: 0.5rem;" onchange="interactiveCharts.changeTrendPeriod(this.value)">
                            <option value="6">Ultimi 6 mesi</option>
                            <option value="12">Ultimo anno</option>
                            <option value="24">Ultimi 2 anni</option>
                        </select>
                    </div>
                </div>
                
                <div class="trend-canvas" style="height: 300px; border: 1px solid #e2e8f0; border-radius: 8px; background: white; position: relative;">
                    <svg width="100%" height="100%" viewBox="0 0 700 280">
                        <!-- Grid -->
                        ${this.generateTrendGrid()}
                        
                        <!-- Area chart -->
                        ${this.generateAreaChart(data)}
                        
                        <!-- Payment rate line -->
                        ${this.generateTrendLine(data)}
                        
                        <!-- Data points -->
                        ${this.generateDataPoints(data)}
                        
                        <!-- Labels -->
                        ${this.generateTrendLabels(data)}
                        
                        <!-- Y-axis -->
                        ${this.generateTrendYAxis()}
                    </svg>
                </div>
                
                <div class="trend-stats" style="margin-top: 1.5rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    ${this.generateTrendStats(data)}
                </div>
            </div>
        `;

        container.innerHTML = chartHTML;
        this.addTrendInteractivity(containerId);
    }

    // Generate helper methods
    generateGridLines() {
        let lines = '';
        // Horizontal lines
        for (let i = 0; i <= 8; i++) {
            const y = 30 + (i * 25);
            lines += `<line x1="60" y1="${y}" x2="580" y2="${y}" stroke="#f0f0f0" stroke-width="1"/>`;
        }
        // Vertical lines
        for (let i = 0; i <= 6; i++) {
            const x = 60 + (i * 86);
            lines += `<line x1="${x}" y1="30" x2="${x}" y2="230" stroke="#f0f0f0" stroke-width="1"/>`;
        }
        return lines;
    }

    generatePaymentsBars(data) {
        const maxValue = Math.max(...data.map(d => Math.max(d.income, d.target)));
        const scale = 180 / maxValue;
        const barWidth = 70;
        const spacing = 86;

        return data.map((item, index) => {
            const x = 70 + (index * spacing);
            const incomeHeight = (item.income / 1000) * scale * 0.8; // Scale down for display
            const targetHeight = (item.target / 1000) * scale * 0.8;

            return `
                <g>
                    <!-- Income bar -->
                    <rect x="${x}" y="${220 - incomeHeight}" width="${barWidth * 0.5}" height="${incomeHeight}" 
                          fill="${this.colors.primary}" opacity="0.8" rx="2"
                          onmouseover="interactiveCharts.showTooltip(event, 'Incassi ${item.month}: €${this.formatNumber(item.income)}', '${containerId || 'mainChart'}')"
                          onmouseout="interactiveCharts.hideTooltip('${containerId || 'mainChart'}')"
                          style="cursor: pointer;"/>
                    
                    <!-- Target bar -->
                    <rect x="${x + barWidth * 0.3}" y="${220 - targetHeight}" width="${barWidth * 0.5}" height="${targetHeight}" 
                          fill="${this.colors.success}" opacity="0.6" rx="2"
                          onmouseover="interactiveCharts.showTooltip(event, 'Target ${item.month}: €${this.formatNumber(item.target)}', '${containerId || 'mainChart'}')"
                          onmouseout="interactiveCharts.hideTooltip('${containerId || 'mainChart'}')"
                          style="cursor: pointer;"/>
                </g>
            `;
        }).join('');
    }

    generatePaymentsLine(data) {
        const maxRate = 100;
        const scale = 180 / maxRate;
        const spacing = 86;

        const points = data.map((item, index) => {
            const x = 95 + (index * spacing);
            const y = 220 - (item.paymentRate * scale * 1.8);
            return `${x},${y}`;
        }).join(' ');

        let result = `<polyline points="${points}" fill="none" stroke="${this.colors.warning}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
        
        // Add data points
        data.forEach((item, index) => {
            const x = 95 + (index * spacing);
            const y = 220 - (item.paymentRate * scale * 1.8);
            result += `
                <circle cx="${x}" cy="${y}" r="4" fill="${this.colors.warning}" stroke="white" stroke-width="2"
                        onmouseover="interactiveCharts.showTooltip(event, 'Tasso ${item.month}: ${item.paymentRate}%', '${containerId || 'mainChart'}')"
                        onmouseout="interactiveCharts.hideTooltip('${containerId || 'mainChart'}')"
                        style="cursor: pointer;"/>
            `;
        });

        return result;
    }

    generateAxisLabels(data) {
        const spacing = 86;
        return data.map((item, index) => {
            const x = 95 + (index * spacing);
            return `<text x="${x}" y="245" text-anchor="middle" font-size="12" fill="#666">${item.month}</text>`;
        }).join('');
    }

    generateYAxisLabels() {
        let labels = '';
        const values = ['0', '50k', '100k', '150k', '200k'];
        values.forEach((value, index) => {
            const y = 230 - (index * 45);
            labels += `<text x="50" y="${y}" text-anchor="end" font-size="11" fill="#999">${value}</text>`;
        });
        return labels;
    }

    generatePieChart(data, total) {
        let currentAngle = 0;
        const centerX = 100;
        const centerY = 100;
        const radius = 80;

        return data.map((item, index) => {
            const percentage = item.percentage;
            const angle = (percentage / 100) * 360;
            const endAngle = currentAngle + angle;
            
            const x1 = centerX + radius * Math.cos(currentAngle * Math.PI / 180);
            const y1 = centerY + radius * Math.sin(currentAngle * Math.PI / 180);
            const x2 = centerX + radius * Math.cos(endAngle * Math.PI / 180);
            const y2 = centerY + radius * Math.sin(endAngle * Math.PI / 180);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
            
            currentAngle = endAngle;
            
            return `
                <path d="${pathData}" fill="${this.getMethodColor(index)}" stroke="white" stroke-width="2"
                      onmouseover="interactiveCharts.showTooltip(event, '${item.method}: ${item.percentage}% (€${this.formatNumber(item.volume)})', 'paymentMethodsChart')"
                      onmouseout="interactiveCharts.hideTooltip('paymentMethodsChart')"
                      style="cursor: pointer; transition: opacity 0.2s;"
                      data-method-index="${index}"/>
            `;
        }).join('');
    }

    // Generate methods for trend chart
    generateTrendGrid() {
        let lines = '';
        for (let i = 0; i <= 10; i++) {
            const y = 20 + (i * 24);
            lines += `<line x1="60" y1="${y}" x2="640" y2="${y}" stroke="#f8f9fa" stroke-width="1"/>`;
        }
        for (let i = 0; i <= 12; i++) {
            const x = 60 + (i * 48);
            lines += `<line x1="${x}" y1="20" x2="${x}" y2="260" stroke="#f8f9fa" stroke-width="1"/>`;
        }
        return lines;
    }

    generateAreaChart(data) {
        const maxValue = Math.max(...data.map(d => d.income));
        const scale = 200 / maxValue;
        const width = 580 / data.length;

        const points = data.map((item, index) => {
            const x = 80 + (index * width);
            const y = 240 - (item.income * scale * 0.001);
            return `${x},${y}`;
        }).join(' ');

        const pathData = `M 80,240 L ${points} L ${80 + ((data.length - 1) * width)},240 Z`;

        return `
            <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:${this.colors.primary};stop-opacity:0.3" />
                    <stop offset="100%" style="stop-color:${this.colors.primary};stop-opacity:0.05" />
                </linearGradient>
            </defs>
            <path d="${pathData}" fill="url(#areaGradient)"/>
        `;
    }

    generateTrendLine(data) {
        const maxValue = 100;
        const scale = 200 / maxValue;
        const width = 580 / data.length;

        const points = data.map((item, index) => {
            const x = 80 + (index * width);
            const y = 240 - (item.paymentRate * scale * 2);
            return `${x},${y}`;
        }).join(' ');

        return `<polyline points="${points}" fill="none" stroke="${this.colors.warning}" stroke-width="3" stroke-linecap="round"/>`;
    }

    generateDataPoints(data) {
        const maxIncome = Math.max(...data.map(d => d.income));
        const maxRate = 100;
        const incomeScale = 200 / maxIncome;
        const rateScale = 200 / maxRate;
        const width = 580 / data.length;

        return data.map((item, index) => {
            const x = 80 + (index * width);
            const yIncome = 240 - (item.income * incomeScale * 0.001);
            const yRate = 240 - (item.paymentRate * rateScale * 2);

            return `
                <circle cx="${x}" cy="${yIncome}" r="4" fill="${this.colors.primary}" stroke="white" stroke-width="2"
                        onmouseover="interactiveCharts.showTooltip(event, 'Incassi ${item.month}: €${this.formatNumber(item.income)}', 'trendChart')"
                        onmouseout="interactiveCharts.hideTooltip('trendChart')" style="cursor: pointer;"/>
                <circle cx="${x}" cy="${yRate}" r="4" fill="${this.colors.warning}" stroke="white" stroke-width="2"
                        onmouseover="interactiveCharts.showTooltip(event, 'Tasso ${item.month}: ${item.paymentRate}%', 'trendChart')"
                        onmouseout="interactiveCharts.hideTooltip('trendChart')" style="cursor: pointer;"/>
            `;
        }).join('');
    }

    generateTrendLabels(data) {
        const width = 580 / data.length;
        return data.map((item, index) => {
            const x = 80 + (index * width);
            return `<text x="${x}" y="275" text-anchor="middle" font-size="11" fill="#666">${item.month}</text>`;
        }).join('');
    }

    generateTrendYAxis() {
        const values = ['0', '50k', '100k', '150k', '200k'];
        return values.map((value, index) => {
            const y = 240 - (index * 40);
            return `<text x="50" y="${y}" text-anchor="end" font-size="10" fill="#999">${value}</text>`;
        }).join('');
    }

    generateTrendStats(data) {
        const totalIncome = data.reduce((sum, item) => sum + item.income, 0);
        const avgRate = data.reduce((sum, item) => sum + item.paymentRate, 0) / data.length;
        const growth = ((data[data.length - 1].income / data[0].income - 1) * 100);
        const trend = data[data.length - 1].paymentRate > data[0].paymentRate ? 'up' : 'down';

        return `
            <div class="trend-stat" style="text-align: center; padding: 1rem; background: #f7fafc; border-radius: 8px;">
                <div style="font-size: 0.9rem; color: #666; margin-bottom: 0.5rem;">Volume Totale</div>
                <div style="font-size: 1.2rem; font-weight: bold; color: ${this.colors.primary};">€${this.formatNumber(totalIncome)}</div>
            </div>
            <div class="trend-stat" style="text-align: center; padding: 1rem; background: #f0fff4; border-radius: 8px;">
                <div style="font-size: 0.9rem; color: #666; margin-bottom: 0.5rem;">Tasso Medio</div>
                <div style="font-size: 1.2rem; font-weight: bold; color: ${this.colors.success};">${avgRate.toFixed(1)}%</div>
            </div>
            <div class="trend-stat" style="text-align: center; padding: 1rem; background: ${growth >= 0 ? '#f0fff4' : '#fef2f2'}; border-radius: 8px;">
                <div style="font-size: 0.9rem; color: #666; margin-bottom: 0.5rem;">Crescita</div>
                <div style="font-size: 1.2rem; font-weight: bold; color: ${growth >= 0 ? this.colors.success : this.colors.danger};">${growth >= 0 ? '+' : ''}${growth.toFixed(1)}%</div>
            </div>
            <div class="trend-stat" style="text-align: center; padding: 1rem; background: #fffaf0; border-radius: 8px;">
                <div style="font-size: 0.9rem; color: #666; margin-bottom: 0.5rem;">Tendenza</div>
                <div style="font-size: 1.2rem; font-weight: bold; color: ${this.colors.warning};">${trend === 'up' ? '📈' : '📉'} ${trend === 'up' ? 'Crescita' : 'Calo'}</div>
            </div>
        `;
    }

    // Utility methods
    getMethodColor(index) {
        const colors = [this.colors.primary, this.colors.success, this.colors.warning, this.colors.info, this.colors.danger];
        return colors[index % colors.length];
    }

    getMethodIcon(method) {
        const icons = {
            'Stripe': '💳',
            'Bonifico': '🏦',
            'Contanti': '💰',
            'PayPal': '💵',
            'Altro': '📄'
        };
        return icons[method] || '💳';
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'k';
        }
        return num.toLocaleString('it-IT');
    }

    average(data, property) {
        return data.reduce((sum, item) => sum + item[property], 0) / data.length;
    }

    // Interactive methods
    showTooltip(event, content, containerId = 'mainChart') {
        const tooltip = document.getElementById(`tooltip-${containerId}`);
        if (tooltip) {
            tooltip.innerHTML = content;
            tooltip.style.left = (event.pageX + 10) + 'px';
            tooltip.style.top = (event.pageY - 30) + 'px';
            tooltip.style.opacity = '1';
        }
    }

    hideTooltip(containerId = 'mainChart') {
        const tooltip = document.getElementById(`tooltip-${containerId}`);
        if (tooltip) {
            tooltip.style.opacity = '0';
        }
    }

    addChartInteractivity(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const elements = container.querySelectorAll('rect, circle, path');
        elements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.filter = 'brightness(1.1)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.filter = 'none';
            });
        });
    }

    addTrendInteractivity(containerId) {
        this.addChartInteractivity(containerId);
        
        const container = document.getElementById(containerId);
        if (!container) return;

        const circles = container.querySelectorAll('circle');
        circles.forEach((circle, index) => {
            circle.addEventListener('click', function() {
                const monthIndex = Math.floor(index / 2);
                const monthData = CONDOPAY_MOCK_DATA.reports.monthlyTrends[monthIndex];
                if (monthData && window.interactiveCharts.showMonthDetails) {
                    window.interactiveCharts.showMonthDetails(monthData);
                }
            });
        });
    }

    toggleMethodHighlight(index) {
        const paths = document.querySelectorAll(`[data-method-index]`);
        
        paths.forEach((path, i) => {
            if (i === index) {
                const currentOpacity = path.style.opacity;
                path.style.opacity = currentOpacity === '0.7' ? '1' : '0.7';
                path.style.filter = path.style.filter === 'brightness(1.2)' ? 'none' : 'brightness(1.2)';
            } else {
                path.style.opacity = '0.5';
            }
        });
    }

    changeTrendPeriod(period) {
        if (window.notificationManager) {
            window.notificationManager.show(`Caricamento dati per ${period} mesi...`, 'info');
            setTimeout(() => {
                window.notificationManager.show('Dati aggiornati con successo!', 'success');
            }, 1500);
        }
    }

    exportChart(containerId) {
        if (window.notificationManager) {
            window.notificationManager.show('Grafico esportato come immagine', 'success');
        }
    }

    showMonthDetails(monthData) {
        // This would be implemented in the main app
        console.log('Month details:', monthData);
    }
}

// Replace any existing InteractiveCharts with the complete version
window.InteractiveCharts = InteractiveChartsComplete;
window.interactiveCharts = new InteractiveChartsComplete();

console.log('✅ InteractiveCharts completo caricato e inizializzato');
