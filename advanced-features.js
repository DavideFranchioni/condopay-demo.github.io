// CondoPay App Demo - Advanced Features
// Funzionalità avanzate e modali per operazioni CRUD

// ===== MODAL SYSTEM =====

class ModalManager {
    constructor() {
        this.activeModal = null;
        this.createModalOverlay();
    }

    createModalOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay hidden';
        overlay.id = 'modalOverlay';
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeModal();
            }
        });
        document.body.appendChild(overlay);
    }

    showModal(content, options = {}) {
        const overlay = document.getElementById('modalOverlay');
        const modal = this.createModal(content, options);
        
        overlay.innerHTML = '';
        overlay.appendChild(modal);
        overlay.classList.remove('hidden');
        
        this.activeModal = modal;
        
        // Focus first input
        const firstInput = modal.querySelector('input, select, textarea');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }

    createModal(content, options) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.maxWidth = options.width || '600px';
        
        const header = document.createElement('div');
        header.className = 'modal-header';
        header.innerHTML = `
            <h3 class="modal-title">${options.title || 'Modal'}</h3>
            <button class="modal-close" onclick="modalManager.closeModal()">&times;</button>
        `;
        
        const body = document.createElement('div');
        body.className = 'modal-body';
        body.innerHTML = content;
        
        modal.appendChild(header);
        modal.appendChild(body);
        
        return modal;
    }

    closeModal() {
        const overlay = document.getElementById('modalOverlay');
        overlay.classList.add('hidden');
        this.activeModal = null;
    }
}

// ===== NOTIFICATION SYSTEM =====

class NotificationManager {
    constructor() {
        this.createNotificationContainer();
    }

    createNotificationContainer() {
        const container = document.createElement('div');
        container.id = 'notificationContainer';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
        `;
        document.body.appendChild(container);
    }

    show(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            background: ${this.getBackgroundColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            margin-bottom: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideInRight 0.3s ease-out;
            cursor: pointer;
            position: relative;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span>${this.getIcon(type)}</span>
                <span>${message}</span>
                <button style="margin-left: auto; background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer;" onclick="this.parentElement.parentElement.remove()">&times;</button>
            </div>
        `;
        
        const container = document.getElementById('notificationContainer');
        container.appendChild(notification);
        
        if (duration > 0) {
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.style.animation = 'slideOutRight 0.3s ease-in';
                    setTimeout(() => notification.remove(), 300);
                }
            }, duration);
        }
        
        notification.addEventListener('click', () => notification.remove());
    }

    getBackgroundColor(type) {
        const colors = {
            success: '#38a169',
            error: '#e53e3e',
            warning: '#d69e2e',
            info: '#3182ce'
        };
        return colors[type] || colors.info;
    }

    getIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }
}

// ===== ADVANCED SEARCH & FILTER =====

class AdvancedFilter {
    constructor(containerId, data, config) {
        this.container = document.getElementById(containerId);
        this.data = data;
        this.filteredData = [...data];
        this.config = config;
        this.filters = {};
        this.sortConfig = { field: null, direction: 'asc' };
        
        this.render();
    }

    render() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="advanced-filter">
                <div class="filter-row">
                    <input type="text" placeholder="Ricerca globale..." class="search-input" id="globalSearch">
                    <button class="btn btn-secondary" onclick="this.clearAllFilters()">🔄 Reset</button>
                    <button class="btn btn-primary" onclick="this.exportFiltered()">📊 Esporta</button>
                </div>
                <div class="filter-controls" id="filterControls">
                    ${this.renderFilterControls()}
                </div>
                <div class="results-info">
                    <span id="resultsCount">${this.filteredData.length} di ${this.data.length} risultati</span>
                </div>
                <div class="results-container" id="resultsContainer">
                    ${this.renderResults()}
                </div>
            </div>
        `;
        
        this.bindEvents();
    }

    renderFilterControls() {
        return this.config.filters.map(filter => {
            switch (filter.type) {
                case 'select':
                    return `
                        <div class="form-field">
                            <label>${filter.label}</label>
                            <select data-filter="${filter.field}">
                                <option value="">Tutti</option>
                                ${filter.options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
                            </select>
                        </div>
                    `;
                case 'range':
                    return `
                        <div class="form-field">
                            <label>${filter.label}</label>
                            <div style="display: flex; gap: 0.5rem; align-items: center;">
                                <input type="number" placeholder="Min" data-filter="${filter.field}-min">
                                <span>-</span>
                                <input type="number" placeholder="Max" data-filter="${filter.field}-max">
                            </div>
                        </div>
                    `;
                case 'date':
                    return `
                        <div class="form-field">
                            <label>${filter.label}</label>
                            <div style="display: flex; gap: 0.5rem; align-items: center;">
                                <input type="date" data-filter="${filter.field}-from">
                                <span>-</span>
                                <input type="date" data-filter="${filter.field}-to">
                            </div>
                        </div>
                    `;
                default:
                    return '';
            }
        }).join('');
    }

    renderResults() {
        if (this.config.renderItem) {
            return `
                <div class="results-grid">
                    ${this.filteredData.map(item => this.config.renderItem(item)).join('')}
                </div>
            `;
        }
        
        // Default table rendering
        if (this.filteredData.length === 0) {
            return '<div class="no-results">Nessun risultato trovato</div>';
        }
        
        const headers = Object.keys(this.filteredData[0]);
        return `
            <table class="filter-table">
                <thead>
                    <tr>
                        ${headers.map(header => `
                            <th onclick="this.sort('${header}')" style="cursor: pointer;">
                                ${header} ${this.getSortIcon(header)}
                            </th>
                        `).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${this.filteredData.map(item => `
                        <tr>
                            ${headers.map(header => `<td>${item[header] || ''}</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    bindEvents() {
        // Global search
        const globalSearch = document.getElementById('globalSearch');
        if (globalSearch) {
            globalSearch.addEventListener('input', Utils.Event.debounce((e) => {
                this.applyFilters();
            }, 300));
        }

        // Filter controls
        const filterControls = document.querySelectorAll('[data-filter]');
        filterControls.forEach(control => {
            control.addEventListener('change', () => this.applyFilters());
            control.addEventListener('input', Utils.Event.debounce(() => this.applyFilters(), 300));
        });
    }

    applyFilters() {
        let filtered = [...this.data];
        
        // Global search
        const globalSearch = document.getElementById('globalSearch')?.value.toLowerCase();
        if (globalSearch) {
            filtered = filtered.filter(item => 
                Object.values(item).some(value => 
                    value?.toString().toLowerCase().includes(globalSearch)
                )
            );
        }
        
        // Specific filters
        const filterControls = document.querySelectorAll('[data-filter]');
        filterControls.forEach(control => {
            const filterKey = control.dataset.filter;
            const value = control.value;
            
            if (value) {
                if (filterKey.endsWith('-min')) {
                    const field = filterKey.replace('-min', '');
                    filtered = filtered.filter(item => parseFloat(item[field]) >= parseFloat(value));
                } else if (filterKey.endsWith('-max')) {
                    const field = filterKey.replace('-max', '');
                    filtered = filtered.filter(item => parseFloat(item[field]) <= parseFloat(value));
                } else if (filterKey.endsWith('-from')) {
                    const field = filterKey.replace('-from', '');
                    filtered = filtered.filter(item => new Date(item[field]) >= new Date(value));
                } else if (filterKey.endsWith('-to')) {
                    const field = filterKey.replace('-to', '');
                    filtered = filtered.filter(item => new Date(item[field]) <= new Date(value));
                } else {
                    filtered = filtered.filter(item => item[filterKey] === value);
                }
            }
        });
        
        this.filteredData = filtered;
        this.updateResults();
    }

    updateResults() {
        const resultsContainer = document.getElementById('resultsContainer');
        const resultsCount = document.getElementById('resultsCount');
        
        if (resultsContainer) {
            resultsContainer.innerHTML = this.renderResults();
        }
        
        if (resultsCount) {
            resultsCount.textContent = `${this.filteredData.length} di ${this.data.length} risultati`;
        }
    }

    sort(field) {
        if (this.sortConfig.field === field) {
            this.sortConfig.direction = this.sortConfig.direction === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortConfig.field = field;
            this.sortConfig.direction = 'asc';
        }
        
        this.filteredData.sort((a, b) => {
            let aVal = a[field];
            let bVal = b[field];
            
            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }
            
            if (this.sortConfig.direction === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });
        
        this.updateResults();
    }

    getSortIcon(field) {
        if (this.sortConfig.field !== field) return '↕️';
        return this.sortConfig.direction === 'asc' ? '↑' : '↓';
    }

    clearAllFilters() {
        const filterControls = document.querySelectorAll('[data-filter]');
        filterControls.forEach(control => {
            control.value = '';
        });
        
        const globalSearch = document.getElementById('globalSearch');
        if (globalSearch) globalSearch.value = '';
        
        this.filteredData = [...this.data];
        this.updateResults();
    }

    exportFiltered() {
        if (this.filteredData.length === 0) {
            notificationManager.show('Nessun dato da esportare', 'warning');
            return;
        }
        
        Utils.Export.toCSV(this.filteredData, 'condopay-export.csv');
        notificationManager.show(`Esportati ${this.filteredData.length} record`, 'success');
    }
}

// ===== FORM BUILDER =====

class FormBuilder {
    constructor() {
        this.validators = {};
    }

    build(fields, onSubmit, options = {}) {
        const form = document.createElement('form');
        form.className = 'dynamic-form';
        
        let formHTML = '';
        
        fields.forEach(field => {
            formHTML += this.renderField(field);
        });
        
        formHTML += `
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="modalManager.closeModal()">
                    Annulla
                </button>
                <button type="submit" class="btn btn-primary">
                    ${options.submitText || 'Salva'}
                </button>
            </div>
        `;
        
        form.innerHTML = formHTML;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = this.getFormData(form);
            const validation = this.validateForm(form, fields);
            
            if (validation.isValid) {
                onSubmit(formData);
                modalManager.closeModal();
            } else {
                this.showValidationErrors(form, validation.errors);
            }
        });
        
        return form;
    }

    renderField(field) {
        const id = `field_${field.name}`;
        let input = '';
        
        switch (field.type) {
            case 'text':
            case 'email':
            case 'tel':
            case 'number':
                input = `<input type="${field.type}" id="${id}" name="${field.name}" value="${field.value || ''}" ${field.required ? 'required' : ''} ${field.placeholder ? `placeholder="${field.placeholder}"` : ''}>`;
                break;
            case 'textarea':
                input = `<textarea id="${id}" name="${field.name}" rows="${field.rows || 3}" ${field.required ? 'required' : ''} ${field.placeholder ? `placeholder="${field.placeholder}"` : ''}>${field.value || ''}</textarea>`;
                break;
            case 'select':
                input = `
                    <select id="${id}" name="${field.name}" ${field.required ? 'required' : ''}>
                        <option value="">Seleziona...</option>
                        ${field.options.map(opt => `
                            <option value="${opt.value}" ${opt.value === field.value ? 'selected' : ''}>
                                ${opt.label}
                            </option>
                        `).join('')}
                    </select>
                `;
                break;
            case 'checkbox':
                input = `
                    <label style="display: flex; align-items: center; gap: 0.5rem;">
                        <input type="checkbox" id="${id}" name="${field.name}" value="1" ${field.value ? 'checked' : ''}>
                        ${field.label}
                    </label>
                `;
                return `<div class="form-field">${input}</div>`;
            case 'date':
                input = `<input type="date" id="${id}" name="${field.name}" value="${field.value || ''}" ${field.required ? 'required' : ''}>`;
                break;
            default:
                input = `<input type="text" id="${id}" name="${field.name}" value="${field.value || ''}" ${field.required ? 'required' : ''}>`;
        }
        
        return `
            <div class="form-field">
                ${field.type !== 'checkbox' ? `<label for="${id}">${field.label} ${field.required ? '*' : ''}</label>` : ''}
                ${input}
                <div class="field-error" id="${id}_error"></div>
            </div>
        `;
    }

    getFormData(form) {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        return data;
    }

    validateForm(form, fields) {
        const errors = {};
        let isValid = true;
        
        fields.forEach(field => {
            const input = form.querySelector(`[name="${field.name}"]`);
            const value = input ? input.value : '';
            
            // Required validation
            if (field.required && !value.trim()) {
                errors[field.name] = 'Campo obbligatorio';
                isValid = false;
                return;
            }
            
            // Type-specific validation
            if (value) {
                switch (field.type) {
                    case 'email':
                        if (!Utils.Validation.email(value)) {
                            errors[field.name] = 'Email non valida';
                            isValid = false;
                        }
                        break;
                    case 'number':
                        if (!Utils.Validation.number(value, field.validation)) {
                            errors[field.name] = 'Numero non valido';
                            isValid = false;
                        }
                        break;
                    case 'tel':
                        if (!Utils.String.isValidPhone(value)) {
                            errors[field.name] = 'Telefono non valido';
                            isValid = false;
                        }
                        break;
                }
            }
            
            // Custom validation
            if (field.validate && value) {
                const customError = field.validate(value);
                if (customError) {
                    errors[field.name] = customError;
                    isValid = false;
                }
            }
        });
        
        return { isValid, errors };
    }

    showValidationErrors(form, errors) {
        // Clear previous errors
        form.querySelectorAll('.field-error').forEach(el => el.textContent = '');
        form.querySelectorAll('.form-field').forEach(el => el.classList.remove('has-error'));
        
        // Show new errors
        Object.keys(errors).forEach(fieldName => {
            const errorElement = form.querySelector(`#field_${fieldName}_error`);
            const fieldElement = form.querySelector(`[name="${fieldName}"]`).closest('.form-field');
            
            if (errorElement) {
                errorElement.textContent = errors[fieldName];
                errorElement.style.color = '#e53e3e';
                errorElement.style.fontSize = '0.8rem';
            }
            
            if (fieldElement) {
                fieldElement.classList.add('has-error');
            }
        });
    }
}

// ===== CHART SIMULATOR =====

class ChartSimulator {
    static renderPaymentTrend(containerId, data) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const months = data.map(d => d.month);
        const values = data.map(d => d.actual);
        const max = Math.max(...values);
        
        container.innerHTML = `
            <div class="chart-simulator">
                <div class="chart-bars" style="display: flex; align-items: end; gap: 0.5rem; height: 200px; padding: 1rem;">
                    ${data.map((item, index) => `
                        <div class="chart-bar" style="
                            flex: 1;
                            background: linear-gradient(to top, #667eea, #764ba2);
                            height: ${(item.actual / max) * 100}%;
                            border-radius: 4px 4px 0 0;
                            position: relative;
                            transition: all 0.3s;
                            cursor: pointer;
                        " title="${item.month}: €${item.actual.toLocaleString()}">
                            <div style="
                                position: absolute;
                                bottom: -25px;
                                left: 50%;
                                transform: translateX(-50%);
                                font-size: 0.8rem;
                                color: #666;
                            ">${item.month}</div>
                            <div style="
                                position: absolute;
                                top: -25px;
                                left: 50%;
                                transform: translateX(-50%);
                                font-size: 0.8rem;
                                color: #333;
                                white-space: nowrap;
                            ">€${(item.actual / 1000).toFixed(0)}k</div>
                        </div>
                    `).join('')}
                </div>
                <div class="chart-legend" style="margin-top: 2rem; text-align: center;">
                    <div style="display: inline-flex; align-items: center; gap: 0.5rem;">
                        <div style="width: 12px; height: 12px; background: linear-gradient(45deg, #667eea, #764ba2); border-radius: 2px;"></div>
                        <span>Volume Mensile</span>
                    </div>
                </div>
            </div>
        `;
        
        // Add hover effects
        container.querySelectorAll('.chart-bar').forEach(bar => {
            bar.addEventListener('mouseenter', () => {
                bar.style.transform = 'scaleY(1.05)';
                bar.style.filter = 'brightness(1.1)';
            });
            
            bar.addEventListener('mouseleave', () => {
                bar.style.transform = 'scaleY(1)';
                bar.style.filter = 'brightness(1)';
            });
        });
    }

    static renderDonutChart(containerId, data) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const total = data.reduce((sum, item) => sum + item.value, 0);
        
        container.innerHTML = `
            <div class="donut-chart" style="display: flex; align-items: center; gap: 2rem;">
                <div style="position: relative; width: 200px; height: 200px;">
                    <svg width="200" height="200" style="transform: rotate(-90deg);">
                        ${this.generateDonutSlices(data, total)}
                    </svg>
                    <div style="
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        text-align: center;
                    ">
                        <div style="font-size: 1.5rem; font-weight: bold;">${total.toLocaleString()}</div>
                        <div style="font-size: 0.9rem; color: #666;">Totale</div>
                    </div>
                </div>
                <div class="chart-legend">
                    ${data.map((item, index) => `
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <div style="
                                width: 12px; 
                                height: 12px; 
                                background: ${this.getColor(index)}; 
                                border-radius: 2px;
                            "></div>
                            <span>${item.label}: ${item.value.toLocaleString()} (${((item.value / total) * 100).toFixed(1)}%)</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    static generateDonutSlices(data, total) {
        const radius = 80;
        const innerRadius = 50;
        const centerX = 100;
        const centerY = 100;
        
        let currentAngle = 0;
        
        return data.map((item, index) => {
            const percentage = item.value / total;
            const angle = percentage * 360;
            
            const x1 = centerX + radius * Math.cos(currentAngle * Math.PI / 180);
            const y1 = centerY + radius * Math.sin(currentAngle * Math.PI / 180);
            const x2 = centerX + radius * Math.cos((currentAngle + angle) * Math.PI / 180);
            const y2 = centerY + radius * Math.sin((currentAngle + angle) * Math.PI / 180);
            
            const x3 = centerX + innerRadius * Math.cos((currentAngle + angle) * Math.PI / 180);
            const y3 = centerY + innerRadius * Math.sin((currentAngle + angle) * Math.PI / 180);
            const x4 = centerX + innerRadius * Math.cos(currentAngle * Math.PI / 180);
            const y4 = centerY + innerRadius * Math.sin(currentAngle * Math.PI / 180);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            const path = `
                M ${x1} ${y1}
                A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
                L ${x3} ${y3}
                A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}
                Z
            `;
            
            currentAngle += angle;
            
            return `<path d="${path}" fill="${this.getColor(index)}" stroke="white" stroke-width="2"/>`;
        }).join('');
    }

    static getColor(index) {
        const colors = ['#667eea', '#764ba2', '#38a169', '#d69e2e', '#e53e3e', '#3182ce'];
        return colors[index % colors.length];
    }
}

// ===== INITIALIZE MANAGERS =====

let modalManager, notificationManager, formBuilder;

document.addEventListener('DOMContentLoaded', function() {
    modalManager = new ModalManager();
    notificationManager = new NotificationManager();
    formBuilder = new FormBuilder();
    
    // Add CSS animations for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        
        .modal {
            background: white;
            border-radius: 12px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            animation: modalSlideIn 0.3s ease-out;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem 2rem;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .modal-title {
            font-size: 1.2rem;
            font-weight: 600;
            color: #2d3748;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #a0aec0;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.2s;
        }
        
        .modal-close:hover {
            background: #f7fafc;
        }
        
        .modal-body {
            padding: 2rem;
        }
        
        .form-actions {
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid #e2e8f0;
        }
        
        .has-error input,
        .has-error select,
        .has-error textarea {
            border-color: #e53e3e;
        }
        
        .field-error {
            margin-top: 0.25rem;
            min-height: 1rem;
        }
        
        @keyframes modalSlideIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        
        .chart-simulator .chart-bar:hover {
            filter: brightness(1.1);
        }
        
        .no-results {
            text-align: center;
            padding: 3rem;
            color: #666;
            font-style: italic;
        }
        
        .advanced-filter {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .filter-row {
            display: flex;
            gap: 1rem;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        
        .filter-row .search-input {
            flex: 1;
        }
        
        .filter-controls {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        .results-info {
            margin-bottom: 1rem;
            color: #666;
            font-size: 0.9rem;
        }
        
        .results-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1rem;
        }
        
        .filter-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .filter-table th,
        .filter-table td {
            padding: 0.75rem 1rem;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .filter-table th {
            background: #f7fafc;
            font-weight: 600;
            color: #4a5568;
        }
        
        .filter-table tbody tr:hover {
            background: #f7fafc;
        }
    `;
    document.head.appendChild(style);
});

// Export for global use
window.modalManager = modalManager;
window.notificationManager = notificationManager;
window.formBuilder = formBuilder;
window.AdvancedFilter = AdvancedFilter;
window.ChartSimulator = ChartSimulator;