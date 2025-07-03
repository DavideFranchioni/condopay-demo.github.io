// CondoPay App Demo - Charts & Visualizations
// Implementazione grafici interattivi con Canvas e SVG

class InteractiveCharts {
    
    // ===== PAYMENT TREND CHART =====
    static renderPaymentTrendChart(containerId, data) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const months = data.map(d => d.month);
        const actual = data.map(d => d.actual);
        const target = data.map(d => d.target);
        const maxValue = Math.max(...actual, ...target);

        container.innerHTML = `
            <div class="interactive-chart">
                <canvas id="paymentTrendCanvas" width="800" height="300" style="width: 100%; height: 300px; cursor: crosshair;"></canvas>
                <div class="chart-legend" style="display: flex; justify-content: center; gap: 2rem; margin-top: 1rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div style="width: 16px; height: 3px; background: #667eea;"></div>
                        <span>Effettivo</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div style="width: 16px; height: 3px; background: #64748b; border: 2px dashed #64748b; background: none;"></div>
                        <span>Target</span>
                    </div>
                </div>
                <div id="chartTooltip" style="
                    position: absolute; 
                    background: rgba(0,0,0,0.8); 
                    color: white; 
                    padding: 0.5rem; 
                    border-radius: 4px; 
                    font-size: 0.8rem;
                    pointer-events: none;
                    display: none;
                    z-index: 1000;
                "></div>
            </div>
        `;

        const canvas = document.getElementById('paymentTrendCanvas');
        const ctx = canvas.getContext('2d');
        const tooltip = document.getElementById('chartTooltip');
        
        // Set actual canvas size for crisp rendering
        canvas.width = 800;
        canvas.height = 300;

        this.drawPaymentTrendChart(ctx, { months, actual, target, maxValue });
        this.addChartInteractivity(canvas, tooltip, { months, actual, target });
    }

    static drawPaymentTrendChart(ctx, { months, actual, target, maxValue }) {
        const padding = 60;
        const chartWidth = ctx.canvas.width - 2 * padding;
        const chartHeight = ctx.canvas.height - 2 * padding;
        const stepX = chartWidth / (months.length - 1);

        // Clear canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Draw grid
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        
        // Horizontal grid lines
        for (let i = 0; i <= 5; i++) {
            const y = padding + (chartHeight / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(padding + chartWidth, y);
            ctx.stroke();
            
            // Y-axis labels
            const value = maxValue - (maxValue / 5) * i;
            ctx.fillStyle = '#64748b';
            ctx.font = '12px Arial';
            ctx.textAlign = 'right';
            ctx.fillText('€' + (value / 1000).toFixed(0) + 'k', padding - 10, y + 3);
        }

        // Vertical grid lines and X-axis labels
        months.forEach((month, i) => {
            const x = padding + stepX * i;
            
            ctx.strokeStyle = '#e2e8f0';
            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, padding + chartHeight);
            ctx.stroke();
            
            // X-axis labels
            ctx.fillStyle = '#64748b';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(month, x, padding + chartHeight + 20);
        });

        // Draw target line (dashed)
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        target.forEach((value, i) => {
            const x = padding + stepX * i;
            const y = padding + chartHeight - (value / maxValue) * chartHeight;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Draw actual line
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 3;
        ctx.setLineDash([]);
        ctx.beginPath();
        actual.forEach((value, i) => {
            const x = padding + stepX * i;
            const y = padding + chartHeight - (value / maxValue) * chartHeight;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Draw data points
        actual.forEach((value, i) => {
            const x = padding + stepX * i;
            const y = padding + chartHeight - (value / maxValue) * chartHeight;
            
            ctx.fillStyle = '#667eea';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
            
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    }

    static addChartInteractivity(canvas, tooltip, { months, actual, target }) {
        const padding = 60;
        const chartWidth = canvas.width - 2 * padding;
        const stepX = chartWidth / (months.length - 1);

        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) * (canvas.width / rect.width);
            const y = (e.clientY - rect.top) * (canvas.height / rect.height);

            // Find nearest data point
            let nearestIndex = -1;
            let nearestDistance = Infinity;

            months.forEach((_, i) => {
                const pointX = padding + stepX * i;
                const distance = Math.abs(x - pointX);
                if (distance < nearestDistance && distance < 30) {
                    nearestDistance = distance;
                    nearestIndex = i;
                }
            });

            if (nearestIndex >= 0) {
                tooltip.style.display = 'block';
                tooltip.style.left = (e.clientX + 10) + 'px';
                tooltip.style.top = (e.clientY - 50) + 'px';
                tooltip.innerHTML = `
                    <div><strong>${months[nearestIndex]}</strong></div>
                    <div>Effettivo: €${actual[nearestIndex].toLocaleString()}</div>
                    <div>Target: €${target[nearestIndex].toLocaleString()}</div>
                    <div>Variazione: ${((actual[nearestIndex] / target[nearestIndex] - 1) * 100).toFixed(1)}%</div>
                `;
            } else {
                tooltip.style.display = 'none';
            }
        });

        canvas.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });
    }

    // ===== PAYMENT METHODS DONUT CHART =====
    static renderPaymentMethodsChart(containerId, data) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const total = data.reduce((sum, item) => sum + item.volume, 0);
        const colors = ['#667eea', '#38a169', '#d69e2e', '#e53e3e'];

        container.innerHTML = `
            <div class="donut-chart-container" style="display: flex; align-items: center; justify-content: center; gap: 2rem;">
                <div style="position: relative;">
                    <svg width="220" height="220" id="donutSvg" style="cursor: pointer;">
                        ${this.generateDonutPaths(data, total, colors)}
                        <text x="110" y="105" text-anchor="middle" style="font-size: 20px; font-weight: bold; fill: #2d3748;">€${(total/1000).toFixed(0)}k</text>
                        <text x="110" y="125" text-anchor="middle" style="font-size: 14px; fill: #64748b;">Totale</text>
                    </svg>
                </div>
                <div class="chart-legend">
                    ${data.map((item, index) => `
                        <div class="legend-item" style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: background 0.2s;" 
                             onmouseenter="this.style.background='#f7fafc'" 
                             onmouseleave="this.style.background='transparent'"
                             onclick="interactiveCharts.highlightSegment(${index})">
                            <div style="width: 16px; height: 16px; background: ${colors[index]}; border-radius: 3px;"></div>
                            <div style="flex: 1;">
                                <div style="font-weight: 500;">${item.method}</div>
                                <div style="color: #64748b; font-size: 0.9rem;">€${item.volume.toLocaleString()} (${item.percentage}%)</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.addDonutInteractivity(data);
    }

    static generateDonutPaths(data, total, colors) {
        const centerX = 110;
        const centerY = 110;
        const outerRadius = 80;
        const innerRadius = 50;
        
        let currentAngle = -Math.PI / 2; // Start from top
        
        return data.map((item, index) => {
            const percentage = item.volume / total;
            const angle = percentage * 2 * Math.PI;
            
            const x1 = centerX + outerRadius * Math.cos(currentAngle);
            const y1 = centerY + outerRadius * Math.sin(currentAngle);
            const x2 = centerX + outerRadius * Math.cos(currentAngle + angle);
            const y2 = centerY + outerRadius * Math.sin(currentAngle + angle);
            
            const x3 = centerX + innerRadius * Math.cos(currentAngle + angle);
            const y3 = centerY + innerRadius * Math.sin(currentAngle + angle);
            const x4 = centerX + innerRadius * Math.cos(currentAngle);
            const y4 = centerY + innerRadius * Math.sin(currentAngle);
            
            const largeArcFlag = angle > Math.PI ? 1 : 0;
            
            const path = `
                M ${x1} ${y1}
                A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}
                L ${x3} ${y3}
                A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}
                Z
            `;
            
            currentAngle += angle;
            
            return `<path d="${path}" fill="${colors[index]}" stroke="white" stroke-width="2" 
                           style="transition: transform 0.2s; transform-origin: ${centerX}px ${centerY}px;" 
                           id="segment-${index}"
                           onmouseenter="this.style.transform='scale(1.05)'" 
                           onmouseleave="this.style.transform='scale(1)'"
                           onclick="interactiveCharts.showSegmentDetails(${index}, '${item.method}', ${item.volume}, ${item.percentage})"/>`;
        }).join('');
    }

    static addDonutInteractivity(data) {
        window.interactiveCharts = {
            highlightSegment: (index) => {
                // Reset all segments
                data.forEach((_, i) => {
                    const segment = document.getElementById(`segment-${i}`);
                    if (segment) segment.style.transform = 'scale(1)';
                });
                
                // Highlight selected segment
                const segment = document.getElementById(`segment-${index}`);
                if (segment) segment.style.transform = 'scale(1.1)';
            },
            
            showSegmentDetails: (index, method, volume, percentage) => {
                notificationManager.show(`${method}: €${volume.toLocaleString()} (${percentage}%)`, 'info');
            }
        };
    }

    // ===== SIMPLE BAR CHART =====
    static renderSimpleBarChart(containerId, data, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const maxValue = Math.max(...data.map(d => d.value));
        const colors = options.colors || ['#667eea', '#38a169', '#d69e2e', '#e53e3e', '#8b5cf6'];

        container.innerHTML = `
            <div class="bar-chart" style="padding: 1rem;">
                <div class="bars-container" style="display: flex; align-items: end; gap: 1rem; height: 200px; margin-bottom: 1rem;">
                    ${data.map((item, index) => `
                        <div class="bar-group" style="flex: 1; display: flex; flex-direction: column; align-items: center;">
                            <div class="bar" style="
                                width: 100%;
                                height: ${(item.value / maxValue) * 180}px;
                                background: linear-gradient(to top, ${colors[index % colors.length]}, ${colors[index % colors.length]}aa);
                                border-radius: 4px 4px 0 0;
                                transition: all 0.3s;
                                cursor: pointer;
                                position: relative;
                            " 
                            onmouseenter="this.style.transform='scaleY(1.05)'"
                            onmouseleave="this.style.transform='scaleY(1)'"
                            onclick="notificationManager.show('${item.label}: ${item.value.toLocaleString()}', 'info')">
                                <div style="
                                    position: absolute;
                                    top: -25px;
                                    left: 50%;
                                    transform: translateX(-50%);
                                    font-size: 0.8rem;
                                    font-weight: 500;
                                    color: #2d3748;
                                ">${item.value.toLocaleString()}</div>
                            </div>
                            <div style="margin-top: 0.5rem; font-size: 0.9rem; text-align: center; color: #64748b;">
                                ${item.label}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

// Make InteractiveCharts globally available
window.InteractiveCharts = InteractiveCharts;