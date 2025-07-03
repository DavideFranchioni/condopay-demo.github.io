// CondoPay App Demo - Modal Manager and Form Builder
// Sistema di modali e costruttore di form avanzati

// ===== MODAL MANAGER =====

class ModalManager {
    constructor() {
        this.currentModal = null;
        this.modalStack = [];
        this.createModalContainer();
        this.bindGlobalEvents();
    }

    createModalContainer() {
        if (document.getElementById('modalContainer')) return;

        const container = document.createElement('div');
        container.id = 'modalContainer';
        container.innerHTML = `
            <div class="modal-overlay" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: none;
                z-index: 9999;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            ">
                <div class="modal" style="
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    max-width: 90vw;
                    max-height: 90vh;
                    overflow: hidden;
                    transform: scale(0.95);
                    transition: transform 0.3s ease;
                    display: flex;
                    flex-direction: column;
                ">
                    <div class="modal-header" style="
                        padding: 1.5rem;
                        border-bottom: 1px solid #e2e8f0;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        background: #f8fafc;
                    ">
                        <h3 class="modal-title" style="margin: 0; font-size: 1.25rem; font-weight: 600;"></h3>
                        <button class="modal-close" style="
                            background: none;
                            border: none;
                            font-size: 1.5rem;
                            cursor: pointer;
                            padding: 0.25rem;
                            color: #666;
                            border-radius: 4px;
                            transition: background 0.2s;
                        " onmouseover="this.style.background='#f1f5f9'" onmouseout="this.style.background='none'">
                            ✕
                        </button>
                    </div>
                    <div class="modal-body" style="
                        padding: 1.5rem;
                        overflow-y: auto;
                        flex: 1;
                    "></div>
                </div>
            </div>
        `;

        document.body.appendChild(container);
    }

    bindGlobalEvents() {
        // Close modal on overlay click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closeModal();
            }
        });

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentModal) {
                this.closeModal();
            }
        });

        // Close button
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close')) {
                this.closeModal();
            }
        });
    }

    showModal(content, options = {}) {
        const defaultOptions = {
            title: 'Modal',
            width: '600px',
            height: 'auto',
            closable: true,
            backdrop: true
        };

        const modalOptions = { ...defaultOptions, ...options };
        
        const overlay = document.querySelector('.modal-overlay');
        const modal = document.querySelector('.modal');
        const modalTitle = document.querySelector('.modal-title');
        const modalBody = document.querySelector('.modal-body');
        const modalClose = document.querySelector('.modal-close');

        if (!overlay || !modal) return;

        // Set content
        modalTitle.textContent = modalOptions.title;
        modalBody.innerHTML = content;

        // Set dimensions
        modal.style.width = modalOptions.width;
        if (modalOptions.height !== 'auto') {
            modal.style.height = modalOptions.height;
        }

        // Show/hide close button
        modalClose.style.display = modalOptions.closable ? 'block' : 'none';

        // Store current modal
        this.currentModal = { content, options: modalOptions };
        this.modalStack.push(this.currentModal);

        // Show modal with animation
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Trigger animation
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        });

        // Auto-focus first input
        setTimeout(() => {
            const firstInput = modalBody.querySelector('input, textarea, select');
            if (firstInput) {
                firstInput.focus();
            }
        }, 300);
    }

    closeModal() {
        const overlay = document.querySelector('.modal-overlay');
        const modal = document.querySelector('.modal');

        if (!overlay || !this.currentModal) return;

        // Animation out
        overlay.style.opacity = '0';
        modal.style.transform = 'scale(0.95)';

        setTimeout(() => {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
            
            // Clear current modal
            this.modalStack.pop();
            this.currentModal = this.modalStack.length > 0 ? this.modalStack[this.modalStack.length - 1] : null;
            
            // If there's a previous modal, show it
            if (this.currentModal) {
                this.showModal(this.currentModal.content, this.currentModal.options);
            }
        }, 300);
    }

    confirm(message, title = 'Conferma') {
        return new Promise((resolve) => {
            const content = `
                <div class="confirm-dialog" style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">❓</div>
                    <p style="font-size: 1.1rem; margin-bottom: 2rem;">${message}</p>
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        <button class="btn btn-secondary" onclick="modalManager.closeModal(); resolve(false);">
                            Annulla
                        </button>
                        <button class="btn btn-primary" onclick="modalManager.closeModal(); resolve(true);">
                            Conferma
                        </button>
                    </div>
                </div>
            `;

            this.showModal(content, { title, width: '400px' });

            // Make resolve available globally for this modal
            window.modalConfirmResolve = resolve;

            // Update button handlers
            setTimeout(() => {
                const buttons = document.querySelectorAll('.confirm-dialog button');
                buttons[0].onclick = () => { this.closeModal(); resolve(false); };
                buttons[1].onclick = () => { this.closeModal(); resolve(true); };
            }, 100);
        });
    }

    alert(message, title = 'Avviso', type = 'info') {
        const icons = {
            info: 'ℹ️',
            success: '✅',
            warning: '⚠️',
            error: '❌'
        };

        const content = `
            <div class="alert-dialog" style="text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">${icons[type]}</div>
                <p style="font-size: 1.1rem; margin-bottom: 2rem;">${message}</p>
                <button class="btn btn-primary" onclick="modalManager.closeModal();">
                    OK
                </button>
            </div>
        `;

        this.showModal(content, { title, width: '400px' });
    }
}

// ===== FORM BUILDER =====

class FormBuilder {
    constructor() {
        this.validators = {
            required: (value) => value && value.toString().trim() !== '',
            email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            phone: (value) => /^(\+39)?[\s-]?[0-9]{2,3}[\s-]?[0-9]{3,4}[\s-]?[0-9]{3,4}$/.test(value),
            number: (value) => !isNaN(parseFloat(value)) && isFinite(value),
            min: (value, min) => parseFloat(value) >= parseFloat(min),
            max: (value, max) => parseFloat(value) <= parseFloat(max),
            minLength: (value, length) => value.toString().length >= parseInt(length),
            maxLength: (value, length) => value.toString().length <= parseInt(length)
        };
    }

    build(fields, onSubmit, options = {}) {
        const defaultOptions = {
            title: 'Form',
            submitText: 'Salva',
            cancelText: 'Annulla',
            showCancel: true,
            className: 'dynamic-form'
        };

        const formOptions = { ...defaultOptions, ...options };
        
        const form = document.createElement('form');
        form.className = formOptions.className;
        form.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        `;

        // Add title if provided
        if (formOptions.title) {
            const title = document.createElement('h3');
            title.textContent = formOptions.title;
            title.style.cssText = 'margin: 0 0 1rem 0; font-size: 1.25rem; font-weight: 600;';
            form.appendChild(title);
        }

        // Build fields
        fields.forEach(field => {
            const fieldElement = this.createField(field);
            form.appendChild(fieldElement);
        });

        // Add form actions
        const actions = document.createElement('div');
        actions.className = 'form-actions';
        actions.style.cssText = `
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            padding-top: 1rem;
            border-top: 1px solid #e2e8f0;
            margin-top: 1rem;
        `;

        if (formOptions.showCancel) {
            const cancelBtn = document.createElement('button');
            cancelBtn.type = 'button';
            cancelBtn.className = 'btn btn-secondary';
            cancelBtn.textContent = formOptions.cancelText;
            cancelBtn.onclick = () => modalManager.closeModal();
            actions.appendChild(cancelBtn);
        }

        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.className = 'btn btn-primary';
        submitBtn.textContent = formOptions.submitText;
        actions.appendChild(submitBtn);

        form.appendChild(actions);

        // Bind submit event
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateForm(form)) {
                const formData = this.getFormData(form);
                onSubmit(formData);
            }
        });

        // Bind real-time validation
        this.bindValidation(form);

        return form;
    }

    createField(field) {
        const container = document.createElement('div');
        container.className = 'form-field';
        container.style.cssText = 'display: flex; flex-direction: column; gap: 0.5rem;';

        // Label
        if (field.label) {
            const label = document.createElement('label');
            label.textContent = field.label;
            label.style.cssText = 'font-weight: 500; color: #374151;';
            if (field.required) {
                label.innerHTML += ' <span style="color: #ef4444;">*</span>';
            }
            container.appendChild(label);
        }

        // Input element
        let input;
        
        switch (field.type) {
            case 'select':
                input = this.createSelect(field);
                break;
            case 'textarea':
                input = this.createTextarea(field);
                break;
            case 'checkbox':
                input = this.createCheckbox(field);
                break;
            case 'radio':
                input = this.createRadioGroup(field);
                break;
            default:
                input = this.createInput(field);
        }

        container.appendChild(input);

        // Help text
        if (field.help) {
            const help = document.createElement('small');
            help.textContent = field.help;
            help.style.cssText = 'color: #6b7280; font-size: 0.875rem;';
            container.appendChild(help);
        }

        // Error container
        const error = document.createElement('div');
        error.className = 'field-error';
        error.style.cssText = 'color: #ef4444; font-size: 0.875rem; display: none;';
        container.appendChild(error);

        return container;
    }

    createInput(field) {
        const input = document.createElement('input');
        input.type = field.type || 'text';
        input.name = field.name;
        input.className = 'form-control';
        
        if (field.value !== undefined) input.value = field.value;
        if (field.placeholder) input.placeholder = field.placeholder;
        if (field.required) input.required = true;
        if (field.readonly) input.readOnly = true;
        if (field.disabled) input.disabled = true;

        // Validation attributes
        if (field.validation) {
            Object.keys(field.validation).forEach(rule => {
                input.setAttribute(`data-${rule}`, field.validation[rule]);
            });
        }

        this.applyFieldStyles(input);
        return input;
    }

    createSelect(field) {
        const select = document.createElement('select');
        select.name = field.name;
        select.className = 'form-control';
        
        if (field.required) select.required = true;
        if (field.disabled) select.disabled = true;

        // Add options
        if (field.options) {
            field.options.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option.value;
                opt.textContent = option.label;
                if (field.value === option.value) opt.selected = true;
                select.appendChild(opt);
            });
        }

        this.applyFieldStyles(select);
        return select;
    }

    createTextarea(field) {
        const textarea = document.createElement('textarea');
        textarea.name = field.name;
        textarea.className = 'form-control';
        
        if (field.value !== undefined) textarea.value = field.value;
        if (field.placeholder) textarea.placeholder = field.placeholder;
        if (field.required) textarea.required = true;
        if (field.rows) textarea.rows = field.rows;

        this.applyFieldStyles(textarea);
        return textarea;
    }

    createCheckbox(field) {
        const container = document.createElement('div');
        container.style.cssText = 'display: flex; align-items: center; gap: 0.5rem;';

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = field.name;
        input.value = field.value || '1';
        if (field.checked) input.checked = true;
        
        const label = document.createElement('label');
        label.textContent = field.label;
        label.style.cssText = 'margin: 0; cursor: pointer;';
        
        label.addEventListener('click', () => {
            input.checked = !input.checked;
        });

        container.appendChild(input);
        container.appendChild(label);
        
        return container;
    }

    createRadioGroup(field) {
        const container = document.createElement('div');
        container.style.cssText = 'display: flex; flex-direction: column; gap: 0.5rem;';

        if (field.options) {
            field.options.forEach(option => {
                const optionContainer = document.createElement('div');
                optionContainer.style.cssText = 'display: flex; align-items: center; gap: 0.5rem;';

                const input = document.createElement('input');
                input.type = 'radio';
                input.name = field.name;
                input.value = option.value;
                if (field.value === option.value) input.checked = true;

                const label = document.createElement('label');
                label.textContent = option.label;
                label.style.cssText = 'margin: 0; cursor: pointer;';
                
                label.addEventListener('click', () => {
                    input.checked = true;
                });

                optionContainer.appendChild(input);
                optionContainer.appendChild(label);
                container.appendChild(optionContainer);
            });
        }

        return container;
    }

    applyFieldStyles(element) {
        element.style.cssText = `
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 1rem;
            transition: border-color 0.2s, box-shadow 0.2s;
            background: white;
        `;

        element.addEventListener('focus', () => {
            element.style.borderColor = '#667eea';
            element.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
        });

        element.addEventListener('blur', () => {
            element.style.borderColor = '#d1d5db';
            element.style.boxShadow = 'none';
        });
    }

    bindValidation(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                // Clear error on input
                const errorElement = input.closest('.form-field').querySelector('.field-error');
                if (errorElement) {
                    errorElement.style.display = 'none';
                    input.style.borderColor = '#d1d5db';
                }
            });
        });
    }

    validateField(input) {
        const errors = [];
        const value = input.value;
        
        // Required validation
        if (input.required && !this.validators.required(value)) {
            errors.push('Questo campo è obbligatorio');
        }

        // Type validation
        if (value && input.type === 'email' && !this.validators.email(value)) {
            errors.push('Inserisci un indirizzo email valido');
        }

        // Custom validation attributes
        Object.keys(input.dataset).forEach(rule => {
            if (this.validators[rule] && value) {
                const param = input.dataset[rule];
                if (!this.validators[rule](value, param)) {
                    errors.push(this.getValidationMessage(rule, param));
                }
            }
        });

        // Show/hide errors
        const errorElement = input.closest('.form-field').querySelector('.field-error');
        if (errors.length > 0) {
            errorElement.textContent = errors[0];
            errorElement.style.display = 'block';
            input.style.borderColor = '#ef4444';
            return false;
        } else {
            errorElement.style.display = 'none';
            input.style.borderColor = '#d1d5db';
            return true;
        }
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    getFormData(form) {
        const formData = new FormData(form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                // Handle multiple values (checkboxes)
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }

        // Handle unchecked checkboxes
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (!checkbox.checked && !data[checkbox.name]) {
                data[checkbox.name] = false;
            }
        });

        return data;
    }

    getValidationMessage(rule, param) {
        const messages = {
            min: `Il valore deve essere almeno ${param}`,
            max: `Il valore non può superare ${param}`,
            minLength: `Inserisci almeno ${param} caratteri`,
            maxLength: `Non inserire più di ${param} caratteri`,
            number: 'Inserisci un numero valido'
        };

        return messages[rule] || 'Valore non valido';
    }
}

// ===== NOTIFICATION MANAGER =====

class NotificationManager {
    constructor() {
        this.notifications = [];
        this.container = null;
        this.createContainer();
    }

    createContainer() {
        if (document.getElementById('notificationContainer')) return;

        const container = document.createElement('div');
        container.id = 'notificationContainer';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        `;

        document.body.appendChild(container);
        this.container = container;
    }

    show(message, type = 'info', duration = 5000) {
        const notification = this.createNotification(message, type, duration);
        this.container.appendChild(notification);
        this.notifications.push(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        });

        // Auto remove
        if (duration > 0) {
            setTimeout(() => {
                this.remove(notification);
            }, duration);
        }

        return notification;
    }

    createNotification(message, type, duration) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const colors = {
            success: { bg: '#d1fae5', border: '#10b981', text: '#065f46' },
            error: { bg: '#fee2e2', border: '#ef4444', text: '#991b1b' },
            warning: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
            info: { bg: '#dbeafe', border: '#3b82f6', text: '#1e40af' }
        };

        const color = colors[type] || colors.info;

        notification.style.cssText = `
            background: ${color.bg};
            border: 1px solid ${color.border};
            color: ${color.text};
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
            pointer-events: auto;
            min-width: 300px;
            max-width: 400px;
            position: relative;
            display: flex;
            align-items: center;
            gap: 10px;
        `;

        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        notification.innerHTML = `
            <span style="font-size: 1.2rem;">${icons[type]}</span>
            <span style="flex: 1;">${message}</span>
            <button onclick="notificationManager.remove(this.parentElement)" style="
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                font-size: 1.2rem;
                padding: 0;
                opacity: 0.7;
                transition: opacity 0.2s;
            " onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'">
                ✕
            </button>
        `;

        // Progress bar for timed notifications
        if (duration > 0) {
            const progressBar = document.createElement('div');
            progressBar.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: ${color.border};
                width: 100%;
                transform-origin: left;
                animation: notificationProgress ${duration}ms linear;
            `;

            // Add CSS animation
            if (!document.getElementById('notificationStyles')) {
                const style = document.createElement('style');
                style.id = 'notificationStyles';
                style.textContent = `
                    @keyframes notificationProgress {
                        from { transform: scaleX(1); }
                        to { transform: scaleX(0); }
                    }
                `;
                document.head.appendChild(style);
            }

            notification.appendChild(progressBar);
        }

        return notification;
    }

    remove(notification) {
        if (notification && notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';

            setTimeout(() => {
                if (notification.parentElement) {
                    notification.parentElement.removeChild(notification);
                }
                
                const index = this.notifications.indexOf(notification);
                if (index > -1) {
                    this.notifications.splice(index, 1);
                }
            }, 300);
        }
    }

    clear() {
        this.notifications.forEach(notification => {
            this.remove(notification);
        });
    }
}

// ===== GLOBAL INSTANCES =====

// Create global instances
const modalManager = new ModalManager();
const formBuilder = new FormBuilder();
const notificationManager = new NotificationManager();

// Make available globally
window.modalManager = modalManager;
window.formBuilder = formBuilder;
window.notificationManager = notificationManager;

// Attach to app for easy access
if (typeof CondoPayApp !== 'undefined') {
    CondoPayApp.prototype.modal = modalManager;
    CondoPayApp.prototype.form = formBuilder;
    CondoPayApp.prototype.notify = notificationManager;
}