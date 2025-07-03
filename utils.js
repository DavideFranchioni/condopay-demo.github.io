// CondoPay App Demo - Utility Functions
// Funzioni di supporto per l'applicativo

// ===== DATE & TIME UTILITIES =====

const DateUtils = {
    // Formatta data in formato italiano
    formatDate(date, options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };
        
        const formatOptions = { ...defaultOptions, ...options };
        return new Date(date).toLocaleDateString('it-IT', formatOptions);
    },

    // Formatta data e ora
    formatDateTime(date) {
        return new Date(date).toLocaleString('it-IT', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    // Calcola "tempo fa" relativo
    timeAgo(date) {
        const now = new Date();
        const past = new Date(date);
        const diffMs = now - past;
        
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 1) return 'Ora';
        if (diffMins < 60) return `${diffMins} min fa`;
        if (diffHours < 24) return `${diffHours} ore fa`;
        if (diffDays < 7) return `${diffDays} giorni fa`;
        return this.formatDate(date);
    },

    // Aggiunge giorni a una data
    addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    },

    // Verifica se una data è scaduta
    isOverdue(dueDate) {
        const now = new Date();
        const due = new Date(dueDate);
        now.setHours(0, 0, 0, 0);
        due.setHours(0, 0, 0, 0);
        return now > due;
    }
};

// ===== NUMBER & CURRENCY UTILITIES =====

const NumberUtils = {
    // Formatta valuta in Euro
    formatCurrency(amount, options = {}) {
        const defaultOptions = {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        };
        
        const formatOptions = { ...defaultOptions, ...options };
        return new Intl.NumberFormat('it-IT', formatOptions).format(amount);
    },

    // Formatta numero con separatori migliaia
    formatNumber(number, decimals = 0) {
        return new Intl.NumberFormat('it-IT', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(number);
    },

    // Formatta percentuale
    formatPercentage(value, decimals = 1) {
        return new Intl.NumberFormat('it-IT', {
            style: 'percent',
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(value / 100);
    },

    // Calcola percentuale di variazione
    calculateChange(newValue, oldValue) {
        if (oldValue === 0) return newValue > 0 ? 100 : 0;
        return ((newValue - oldValue) / oldValue) * 100;
    },

    // Genera numero random in range
    randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }
};

// ===== STRING UTILITIES =====

const StringUtils = {
    // Capitalizza prima lettera
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },

    // Titolizza stringa (ogni parola capitalizzata)
    titleCase(str) {
        return str.toLowerCase().split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    },

    // Tronca stringa con ellipsis
    truncate(str, length, suffix = '...') {
        if (str.length <= length) return str;
        return str.substring(0, length) + suffix;
    },

    // Genera slug da stringa
    slugify(str) {
        return str
            .toLowerCase()
            .replace(/[àáâäå]/g, 'a')
            .replace(/[èéêë]/g, 'e')
            .replace(/[ìíîï]/g, 'i')
            .replace(/[òóôöø]/g, 'o')
            .replace(/[ùúûü]/g, 'u')
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    },

    // Valida email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Valida telefono italiano
    isValidPhone(phone) {
        const phoneRegex = /^(\+39)?[\s-]?[0-9]{2,3}[\s-]?[0-9]{3,4}[\s-]?[0-9]{3,4}$/;
        return phoneRegex.test(phone);
    }
};

// ===== ARRAY UTILITIES =====

const ArrayUtils = {
    // Raggruppa array per proprietà
    groupBy(array, key) {
        return array.reduce((groups, item) => {
            const group = item[key];
            groups[group] = groups[group] || [];
            groups[group].push(item);
            return groups;
        }, {});
    },

    // Ordina array per proprietà
    sortBy(array, key, direction = 'asc') {
        return [...array].sort((a, b) => {
            const aVal = typeof a[key] === 'string' ? a[key].toLowerCase() : a[key];
            const bVal = typeof b[key] === 'string' ? b[key].toLowerCase() : b[key];
            
            if (direction === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });
    },

    // Filtra array con multiple condizioni
    filterBy(array, filters) {
        return array.filter(item => {
            return Object.keys(filters).every(key => {
                const filterValue = filters[key];
                const itemValue = item[key];
                
                if (filterValue === null || filterValue === undefined || filterValue === '') {
                    return true;
                }
                
                if (typeof filterValue === 'string') {
                    return itemValue?.toString().toLowerCase().includes(filterValue.toLowerCase());
                }
                
                return itemValue === filterValue;
            });
        });
    },

    // Trova item per ID
    findById(array, id) {
        return array.find(item => item.id === id);
    },

    // Calcola somma di proprietà
    sumBy(array, key) {
        return array.reduce((sum, item) => sum + (item[key] || 0), 0);
    },

    // Calcola media di proprietà
    averageBy(array, key) {
        if (array.length === 0) return 0;
        return this.sumBy(array, key) / array.length;
    }
};

// ===== STORAGE UTILITIES =====

const StorageUtils = {
    // Salva in localStorage con fallback
    save(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.warn('LocalStorage not available:', e);
            return false;
        }
    },

    // Carica da localStorage
    load(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.warn('Error loading from localStorage:', e);
            return defaultValue;
        }
    },

    // Rimuove da localStorage
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.warn('Error removing from localStorage:', e);
            return false;
        }
    },

    // Pulisce tutto localStorage
    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.warn('Error clearing localStorage:', e);
            return false;
        }
    }
};

// ===== DOM UTILITIES =====

const DomUtils = {
    // Selector shorthand
    $(selector, context = document) {
        return context.querySelector(selector);
    },

    // Selector all shorthand
    $$(selector, context = document) {
        return context.querySelectorAll(selector);
    },

    // Crea elemento con attributi
    createElement(tag, attributes = {}, textContent = '') {
        const element = document.createElement(tag);
        
        Object.keys(attributes).forEach(key => {
            if (key === 'className') {
                element.className = attributes[key];
            } else if (key === 'innerHTML') {
                element.innerHTML = attributes[key];
            } else {
                element.setAttribute(key, attributes[key]);
            }
        });
        
        if (textContent) {
            element.textContent = textContent;
        }
        
        return element;
    },

    // Nascondi elemento
    hide(element) {
        if (typeof element === 'string') {
            element = this.$(element);
        }
        if (element) {
            element.style.display = 'none';
        }
    },

    // Mostra elemento
    show(element, display = 'block') {
        if (typeof element === 'string') {
            element = this.$(element);
        }
        if (element) {
            element.style.display = display;
        }
    },

    // Toggle visibilità
    toggle(element) {
        if (typeof element === 'string') {
            element = this.$(element);
        }
        if (element) {
            const isHidden = element.style.display === 'none' || 
                           getComputedStyle(element).display === 'none';
            isHidden ? this.show(element) : this.hide(element);
        }
    },

    // Aggiungi classe
    addClass(element, className) {
        if (typeof element === 'string') {
            element = this.$(element);
        }
        if (element) {
            element.classList.add(className);
        }
    },

    // Rimuovi classe
    removeClass(element, className) {
        if (typeof element === 'string') {
            element = this.$(element);
        }
        if (element) {
            element.classList.remove(className);
        }
    },

    // Toggle classe
    toggleClass(element, className) {
        if (typeof element === 'string') {
            element = this.$(element);
        }
        if (element) {
            element.classList.toggle(className);
        }
    }
};

// ===== VALIDATION UTILITIES =====

const ValidationUtils = {
    // Valida campo required
    required(value) {
        return value !== null && value !== undefined && value.toString().trim() !== '';
    },

    // Valida email
    email(value) {
        return StringUtils.isValidEmail(value);
    },

    // Valida numero
    number(value, options = {}) {
        const num = parseFloat(value);
        if (isNaN(num)) return false;
        
        if (options.min !== undefined && num < options.min) return false;
        if (options.max !== undefined && num > options.max) return false;
        
        return true;
    },

    // Valida lunghezza stringa
    length(value, options = {}) {
        const str = value.toString();
        
        if (options.min !== undefined && str.length < options.min) return false;
        if (options.max !== undefined && str.length > options.max) return false;
        
        return true;
    },

    // Valida partita IVA italiana
    vatNumber(value) {
        const vat = value.replace(/\s/g, '');
        if (!/^IT[0-9]{11}$/.test(vat)) return false;
        
        const digits = vat.slice(2);
        let sum = 0;
        
        for (let i = 0; i < 10; i++) {
            let digit = parseInt(digits[i]);
            if (i % 2 === 1) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            sum += digit;
        }
        
        const checkDigit = (10 - (sum % 10)) % 10;
        return checkDigit === parseInt(digits[10]);
    }
};

// ===== ANIMATION UTILITIES =====

const AnimationUtils = {
    // Anima numero con counter effect
    animateNumber(element, targetValue, duration = 1000, options = {}) {
        const startValue = options.startValue || 0;
        const decimals = options.decimals || 0;
        const prefix = options.prefix || '';
        const suffix = options.suffix || '';
        
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            const currentValue = startValue + (targetValue - startValue) * easeOut;
            const displayValue = prefix + currentValue.toFixed(decimals) + suffix;
            
            element.textContent = displayValue;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    },

    // Fade in element
    fadeIn(element, duration = 300) {
        element.style.opacity = 0;
        element.style.display = 'block';
        
        const start = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = progress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    },

    // Fade out element
    fadeOut(element, duration = 300) {
        const start = performance.now();
        const startOpacity = parseFloat(getComputedStyle(element).opacity);
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = startOpacity * (1 - progress);
            
            if (progress === 1) {
                element.style.display = 'none';
            } else {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    },

    // Slide down element
    slideDown(element, duration = 300) {
        element.style.display = 'block';
        element.style.height = '0';
        element.style.overflow = 'hidden';
        
        const fullHeight = element.scrollHeight;
        const start = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.height = (fullHeight * progress) + 'px';
            
            if (progress === 1) {
                element.style.height = '';
                element.style.overflow = '';
            } else {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
};

// ===== EXPORT UTILITIES =====

const ExportUtils = {
    // Esporta dati come CSV
    toCSV(data, filename = 'export.csv') {
        if (!data.length) return;
        
        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => 
                headers.map(header => {
                    const value = row[header];
                    return typeof value === 'string' && value.includes(',') 
                        ? `"${value}"` 
                        : value;
                }).join(',')
            )
        ].join('\n');
        
        this.downloadFile(csvContent, filename, 'text/csv');
    },

    // Esporta dati come JSON
    toJSON(data, filename = 'export.json') {
        const jsonContent = JSON.stringify(data, null, 2);
        this.downloadFile(jsonContent, filename, 'application/json');
    },

    // Download file
    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }
};

// ===== EVENT UTILITIES =====

const EventUtils = {
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Event delegation
    delegate(parentSelector, childSelector, event, handler) {
        document.addEventListener(event, function(e) {
            const parent = e.target.closest(parentSelector);
            if (parent && e.target.matches(childSelector)) {
                handler.call(e.target, e);
            }
        });
    }
};

// ===== GLOBAL EXPORT =====

// Export utilities to global scope for easy access
window.Utils = {
    Date: DateUtils,
    Number: NumberUtils,
    String: StringUtils,
    Array: ArrayUtils,
    Storage: StorageUtils,
    Dom: DomUtils,
    Validation: ValidationUtils,
    Animation: AnimationUtils,
    Export: ExportUtils,
    Event: EventUtils
};

// Shorthand aliases
window.$ = DomUtils.$;
window.$$ = DomUtils.$$;