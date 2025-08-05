// Minecraft Bedwars Leaderboard - Enhanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Bedwars Leaderboard initialized successfully!');

    // Initialize all components
    initializeCursor();
    initializeRippleEffect();
    initializeAnimations();
    initializeStatCalculators();
    initializeFormValidation();
    initializeMobileOptimizations();
    initializePerformanceMetrics();
    initializeAccessibility();
    initializeAdvancedFeatures();

    // Apply current theme if set
    applyCurrentTheme();
});

// Enhanced Custom Cursor System - DISABLED for stability
function initializeCursor() {
    // Минималистичный курсор
    document.addEventListener('DOMContentLoaded', function() {
        const cursor = document.getElementById('customCursor');

        if (cursor) {
            let mouseX = 0;
            let mouseY = 0;
            let cursorX = 0;
            let cursorY = 0;

            document.addEventListener('mousemove', function(e) {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            document.addEventListener('mousedown', function() {
                cursor.classList.add('clicking');
            });

            document.addEventListener('mouseup', function() {
                cursor.classList.remove('clicking');
            });

            function animateCursor() {
                cursorX += (mouseX - cursorX) * 0.2;
                cursorY += (mouseY - cursorY) * 0.2;

                cursor.style.left = cursorX + 'px';
                cursor.style.top = cursorY + 'px';

                requestAnimationFrame(animateCursor);
            }

            animateCursor();
        }
    });
}

// Enhanced click ripple effect - DISABLED for stability
function createClickRipple(x, y) {
    // Ripple effects disabled to prevent scrolling issues
    return;
}

// Performance Metrics
function initializePerformanceMetrics() {
    const startTime = performance.now();

    window.addEventListener('load', function() {
        const loadTime = performance.now() - startTime;
        const navTime = performance.getEntriesByType('navigation')[0];

        console.log('🚀 Performance Metrics:', {
            'Load Time': `${loadTime.toFixed(2)}ms`,
            'DOM Content Loaded': `${navTime.domContentLoadedEventEnd - navTime.domContentLoadedEventStart}ms`,
            'Total Page Load': `${navTime.loadEventEnd - navTime.loadEventStart}ms`
        });
    });
}



// Ripple Effect System - Simplified for stability
function initializeRippleEffect() {
    // Only track interactions without visual effects to prevent scrolling issues
    document.addEventListener('click', function(e) {
        if (e.target.closest('button, .btn, .card, .stat-card, .player-row')) {
            logUserInteraction('click', e.target);
        }
    });

    // Track form submissions
    document.addEventListener('submit', function(e) {
        logUserInteraction('form_submit', e.target);
    });

    // Track button clicks
    document.addEventListener('click', function(e) {
        if (e.target.matches('button, .btn')) {
            logUserInteraction('button_click', e.target);
        }
    });
}

function createRipple(event) {
    // Ripple effects disabled to prevent scrolling interference
    return;
}

// User Interaction Analytics
function logUserInteraction(type, element) {
    const data = {
        timestamp: new Date().toISOString(),
        type: type,
        element: element.tagName?.toLowerCase() || 'unknown'
    };

    // Add specific data based on element type
    if (element.textContent) {
        data.text = element.textContent.trim().substring(0, 50);
    }
    if (element.className) {
        data.classes = element.className;
    }
    if (element.action) {
        data.action = element.action;
    }

    console.log(`📊 User Interaction: ${type}`, data);
}

// Animations
function initializeAnimations() {
    // Animate stat cards on load
    const statCards = document.querySelectorAll('.stat-card, .admin-stat-card, .chart-card');
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'fadeInUp 0.6s ease forwards';
            card.style.opacity = '1';
        }, index * 100);
    });

    // Animate table rows
    const playerRows = document.querySelectorAll('.player-row');
    playerRows.forEach((row, index) => {
        setTimeout(() => {
            row.style.animation = 'fadeInUp 0.4s ease forwards';
            row.style.opacity = '1';
        }, index * 50);
    });

    // Initialize gradient text animations
    initializeGradientAnimations();
}

function initializeGradientAnimations() {
    // Apply gradient animations to stats
    document.querySelectorAll('.stat-value-gradient, .gradient-text').forEach(element => {
        if (!element.style.background) {
            // Apply default gradient if none set
            element.style.background = 'linear-gradient(45deg, #ff6b35, #f7931e, #ffaa00)';
            element.style.backgroundSize = '200% 200%';
            element.style.webkitBackgroundClip = 'text';
            element.style.webkitTextFillColor = 'transparent';
            element.style.backgroundClip = 'text';
        }
    });

    // Fix level and experience display
    document.querySelectorAll('[data-stat="level"], [data-stat="experience"]').forEach(element => {
        if (element.style.webkitTextFillColor === 'transparent' && !element.style.background.includes('gradient')) {
            // Reset to normal text if no gradient is properly set
            element.style.webkitTextFillColor = '';
            element.style.background = '';
            element.classList.add('text-warning');
        }
    });
}

// Form Validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                return false;
            }
        });

        // Real-time validation for number inputs
        const numberInputs = form.querySelectorAll('input[type="number"]');
        numberInputs.forEach(input => {
            input.addEventListener('input', function() {
                validateNumberInput(this);
                formatNumberInput(this);
            });
        });

        // Nickname validation
        const nicknameInputs = form.querySelectorAll('input[name="nickname"]');
        nicknameInputs.forEach(input => {
            input.addEventListener('input', function() {
                validateNickname(this);
            });
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const errors = [];

    // Clear previous errors
    clearFormErrors(form);

    // Validate required fields
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'Это поле обязательно для заполнения');
            isValid = false;
        }
    });

    // Validate specific field types
    const numberFields = form.querySelectorAll('input[type="number"]');
    numberFields.forEach(field => {
        if (field.value && (isNaN(field.value) || parseFloat(field.value) < 0)) {
            showFieldError(field, 'Введите корректное неотрицательное число');
            isValid = false;
        }
    });

    // Validate nickname length
    const nicknameField = form.querySelector('input[name="nickname"]');
    if (nicknameField && nicknameField.value) {
        if (nicknameField.value.length > 20) {
            showFieldError(nicknameField, 'Ник не может быть длиннее 20 символов');
            isValid = false;
        }
        if (!/^[a-zA-Z0-9_]+$/.test(nicknameField.value)) {
            showFieldError(nicknameField, 'Ник может содержать только буквы, цифры и подчеркивания');
            isValid = false;
        }
    }

    return isValid;
}

function validateNumberInput(input) {
    const value = parseFloat(input.value);
    const max = 999999;

    if (value > max) {
        input.value = max;
        showFieldError(input, `Максимальное значение: ${max.toLocaleString()}`);
    } else if (value < 0) {
        input.value = 0;
        showFieldError(input, 'Значение не может быть отрицательным');
    } else {
        clearFieldError(input);
    }
}

function validateNickname(input) {
    const value = input.value;

    if (value.length > 20) {
        showFieldError(input, 'Максимум 20 символов');
    } else if (value && !/^[a-zA-Z0-9_]+$/.test(value)) {
        showFieldError(input, 'Только буквы, цифры и _');
    } else {
        clearFieldError(input);
    }
}

function showFieldError(field, message) {
    clearFieldError(field);

    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error text-danger small mt-1';
    errorDiv.textContent = message;
    errorDiv.setAttribute('data-error', 'true');

    field.classList.add('is-invalid');
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('is-invalid');
    const errorDiv = field.parentNode.querySelector('[data-error="true"]');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function clearFormErrors(form) {
    const errorDivs = form.querySelectorAll('[data-error="true"]');
    errorDivs.forEach(div => div.remove());

    const invalidFields = form.querySelectorAll('.is-invalid');
    invalidFields.forEach(field => field.classList.remove('is-invalid'));
}

function formatNumberInput(input) {
    if (input.value && !isNaN(input.value)) {
        input.value = parseInt(input.value).toString();
    }
}

function initializeStatCalculators() {
    const form = document.querySelector('.add-player-form');
    if (!form) return;

    const killsInput = form.querySelector('input[name="kills"]');
    const deathsInput = form.querySelector('input[name="deaths"]');
    const winsInput = form.querySelector('input[name="wins"]');
    const gamesInput = form.querySelector('input[name="games_played"]');

    if (killsInput && deathsInput) {
        [killsInput, deathsInput].forEach(input => {
            input.addEventListener('input', () => updateKDPreview(killsInput, deathsInput));
        });
    }

    if (winsInput && gamesInput) {
        [winsInput, gamesInput].forEach(input => {
            input.addEventListener('input', () => updateWinRatePreview(winsInput, gamesInput));
        });
    }
}

function updateKDPreview(killsInput, deathsInput) {
    const kills = parseInt(killsInput.value) || 0;
    const deaths = parseInt(deathsInput.value) || 0;
    const kd = deaths > 0 ? (kills / deaths).toFixed(2) : kills;

    showStatPreview(killsInput, `K/D: ${kd}`);
}

function updateWinRatePreview(winsInput, gamesInput) {
    const wins = parseInt(winsInput.value) || 0;
    const games = parseInt(gamesInput.value) || 0;
    const winRate = games > 0 ? ((wins / games) * 100).toFixed(1) : 0;

    showStatPreview(winsInput, `Win Rate: ${winRate}%`);
}

function showStatPreview(input, text) {
    // Remove existing preview
    const existingPreview = input.parentNode.querySelector('.stat-preview');
    if (existingPreview) {
        existingPreview.remove();
    }

    // Add new preview
    const preview = document.createElement('small');
    preview.className = 'stat-preview text-info d-block mt-1';
    preview.textContent = text;
    input.parentNode.appendChild(preview);
}

// Theme System
function applyCurrentTheme() {
    // Get theme from local storage or detect from CSS
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        applyTheme(JSON.parse(savedTheme));
    }
}

function applyTheme(theme) {
    if (!theme) return;

    // Apply CSS variables
    const root = document.documentElement;
    if (theme.primary_color) root.style.setProperty('--primary-color', theme.primary_color);
    if (theme.secondary_color) root.style.setProperty('--secondary-color', theme.secondary_color);
    if (theme.background_color) root.style.setProperty('--bg-primary', 
        `linear-gradient(135deg, ${theme.background_color} 0%, ${theme.card_background || '#2d2d2d'} 100%)`);
    if (theme.card_background) root.style.setProperty('--bg-secondary', 
        `linear-gradient(135deg, ${theme.card_background} 0%, ${theme.background_color || '#1a1a1a'} 100%)`);
    if (theme.text_color) root.style.setProperty('--text-color', theme.text_color);
    if (theme.accent_color) root.style.setProperty('--accent-color', theme.accent_color);

    // Save theme to local storage
    localStorage.setItem('selectedTheme', JSON.stringify(theme));
}

// Advanced Features
function initializeAdvancedFeatures() {
    initializeQuickFilters();
    initializeKeyboardShortcuts();
    initializeTableEnhancements();
    initializeSearchEnhancements();
}

function initializeQuickFilters() {
    const searchForm = document.querySelector('.search-form');
    if (!searchForm) return;

    const filtersDiv = document.createElement('div');
    filtersDiv.className = 'quick-filters d-flex gap-2 mt-2 flex-wrap';
    filtersDiv.innerHTML = `
        <small class="text-muted align-self-center me-2">Быстрые фильтры:</small>
        <button type="button" class="btn btn-outline-info btn-sm" data-filter="level:high">
            <i class="fas fa-star"></i> Высокий уровень
        </button>
        <button type="button" class="btn btn-outline-success btn-sm" data-filter="kd:good">
            <i class="fas fa-trophy"></i> Хороший K/D
        </button>
        <button type="button" class="btn btn-outline-warning btn-sm" data-filter="active">
            <i class="fas fa-fire"></i> Активные
        </button>
        <button type="button" class="btn btn-outline-secondary btn-sm" data-filter="reset">
            <i class="fas fa-undo"></i> Сбросить
        </button>
    `;

    searchForm.appendChild(filtersDiv);

    // Add filter functionality
    filtersDiv.querySelectorAll('[data-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
            applyQuickFilter(btn.dataset.filter);
        });
    });
}

function applyQuickFilter(filter) {
    const rows = document.querySelectorAll('.player-row');

    rows.forEach(row => {
        let show = true;

        switch (filter) {
            case 'level:high':
                const levelText = row.querySelector('.level-badge, .stat-value')?.textContent || '0';
                const level = parseInt(levelText.replace('Уровень ', '').replace('Level ', ''));
                show = level >= 50; // Changed from 25 to 50 for "High Level"
                break;
            case 'kd:good':
                const kdText = row.querySelector('.stat-value')?.textContent || '0';
                const kd = parseFloat(kdText);
                show = kd >= 1.5;
                break;
            case 'active':
                const games = parseInt(row.querySelector('.player-row td:nth-child(8)')?.textContent || '0');
                show = games >= 50;
                break;
            case 'reset':
                show = true;
                break;
        }

        row.style.display = show ? '' : 'none';
    });
}

// Mobile Optimizations
function initializeMobileOptimizations() {
    if (!isMobileDevice()) return;

    // Add mobile-specific styles
    document.body.classList.add('mobile-device');

    // Optimize table for mobile
    optimizeTableForMobile();

    // Add touch gestures
    initializeTouchGestures();
}

function isMobileDevice() {
    return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function optimizeTableForMobile() {
    const tables = document.querySelectorAll('table.leaderboard-table');

    tables.forEach(table => {
        // Make table horizontally scrollable
        table.style.fontSize = '0.85rem';

        // Add scroll indicators
        const container = table.closest('.table-responsive, .leaderboard-table-container'); // Changed selector to be more general
        if (container) {
            container.style.position = 'relative';

            const scrollIndicator = document.createElement('div');
            scrollIndicator.className = 'scroll-indicator d-md-none';
            scrollIndicator.innerHTML = '<i class="fas fa-arrows-alt-h"></i> Прокрутите горизонтально';
            scrollIndicator.style.cssText = `
                position: absolute;
                bottom: 5px; /* Adjusted position */
                right: 5px; /* Adjusted position */
                background: rgba(0,0,0,0.7);
                color: white;
                padding: 3px 8px; /* Adjusted padding */
                border-radius: 15px;
                font-size: 0.65rem; /* Adjusted font size */
                z-index: 10;
                pointer-events: none; /* Prevent interaction */
            `;

            container.appendChild(scrollIndicator);

            // Hide indicator after user scrolls
            const scrollHandler = () => {
                scrollIndicator.style.opacity = '0.3';
                container.removeEventListener('scroll', scrollHandler);
            };
            container.addEventListener('scroll', scrollHandler, { once: true });

            // Also hide if container is not scrollable
            if (container.scrollWidth <= container.clientWidth) {
                scrollIndicator.style.display = 'none';
            }
        }
    });
}

function initializeTouchGestures() {
    // Touch gestures completely disabled to prevent double scrolling
    return;
}

// Keyboard Shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search focus
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('input[name="search"]');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }

        // Escape to clear search
        if (e.key === 'Escape') {
            const searchInput = document.querySelector('input[name="search"]');
            if (searchInput && searchInput.value) {
                searchInput.value = '';
                searchInput.form.submit();
            }
        }
    });
}

// Table Enhancements
function initializeTableEnhancements() {
    const tables = document.querySelectorAll('.leaderboard-table');

    tables.forEach(table => {
        // Add zebra striping enhancement
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach((row, index) => {
            if (index % 2 === 0) {
                row.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
            }
        });

        // Add hover effect enhancement
        rows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'rgba(255, 193, 7, 0.1)';
                this.style.transform = 'translateX(5px)';
            });

            row.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
                this.style.transform = '';
            });
        });
    });
}

// Search Enhancements
function initializeSearchEnhancements() {
    const searchInput = document.querySelector('input[name="search"]');
    if (!searchInput) return;

    // Add search suggestions
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            // Could implement live search here
            console.log('🔍 Search query:', this.value);
        }, 300);
    });

    // Add search history
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');

    searchInput.addEventListener('focus', function() {
        if (searchHistory.length > 0) {
            showSearchSuggestions(this, searchHistory.slice(0, 5));
        }
    });

    searchInput.form.addEventListener('submit', function() {
        const query = searchInput.value.trim();
        if (query && !searchHistory.includes(query)) {
            searchHistory.unshift(query);
            if (searchHistory.length > 10) searchHistory.pop();
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        }
    });
}

function showSearchSuggestions(input, suggestions) {
    // Remove existing suggestions
    const existingSuggestions = document.querySelector('.search-suggestions');
    if (existingSuggestions) {
        existingSuggestions.remove();
    }

    if (suggestions.length === 0) return;

    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.className = 'search-suggestions position-absolute bg-dark border rounded shadow-lg';
    suggestionsDiv.style.cssText = `
        top: 100%;
        left: 0;
        right: 0;
        z-index: 1000;
        max-height: 200px;
        overflow-y: auto;
    `;

    suggestions.forEach(suggestion => {
        const item = document.createElement('div');
        item.className = 'suggestion-item px-3 py-2 text-light cursor-pointer';
        item.textContent = suggestion;
        item.style.cursor = 'pointer';

        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(255, 193, 7, 0.2)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });

        item.addEventListener('click', function() {
            input.value = suggestion;
            input.form.submit();
        });

        suggestionsDiv.appendChild(item);
    });

    input.parentNode.style.position = 'relative';
    input.parentNode.appendChild(suggestionsDiv);

    // Remove suggestions when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function(e) {
            if (!input.parentNode.contains(e.target)) {
                suggestionsDiv.remove();
            }
        }, { once: true });
    }, 100);
}

// Accessibility
function initializeAccessibility() {
    // Add keyboard navigation for custom elements
    const customButtons = document.querySelectorAll('.stat-card, .action-card');

    customButtons.forEach(button => {
        if (!button.hasAttribute('tabindex')) {
            button.setAttribute('tabindex', '0');
        }

        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Add screen reader announcements for dynamic content
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);

    window.announceToScreenReader = function(message) {
        announcer.textContent = message;
        setTimeout(() => announcer.textContent = '', 1000);
    };
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    }
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Error Handling
window.addEventListener('error', function(e) {
    console.log('🚨 JavaScript Error:', {
        message: e.message,
        filename: e.filename,
        line: e.lineno,
        column: e.colno
    });
});

// Export for other scripts
window.BedwarsLeaderboard = {
    applyTheme,
    logUserInteraction,
    announceToScreenReader: window.announceToScreenReader
};