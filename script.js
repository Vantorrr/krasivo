
// ELITE LUXURY PRELOADER - уровня Cartier/Chanel
let preloaderHidden = false;

function hideLuxuryPreloader() {
    if (preloaderHidden) return;
    preloaderHidden = true;
    
    const luxuryPreloader = document.getElementById('luxuryPreloader');
    if (luxuryPreloader) {
        luxuryPreloader.classList.add('luxury-fade-out');
        
        // Показываем WhatsApp кнопку после скрытия preloader
        setTimeout(() => {
            const whatsappBtn = document.getElementById('whatsappFloat');
            if (whatsappBtn) {
                whatsappBtn.classList.add('show');
            }
        }, 800);
        
        // Удаляем из DOM после исчезновения
        setTimeout(() => {
            if (luxuryPreloader.parentNode) {
                luxuryPreloader.remove();
            }
        }, 1500); // время на анимацию исчезновения
    }
}

window.addEventListener('load', function() {
    // Показываем элитную заставку 2.5 секунды для плавного перехода
    setTimeout(hideLuxuryPreloader, 2500);
});

// Fallback на случай, если load событие не сработает
document.addEventListener('DOMContentLoaded', function() {
    // Максимум 5 секунд показа прелоадера в любом случае
    setTimeout(hideLuxuryPreloader, 5000);
    
    // Дополнительный fallback для показа WhatsApp кнопки
    setTimeout(() => {
        const whatsappBtn = document.getElementById('whatsappFloat');
        if (whatsappBtn && !whatsappBtn.classList.contains('show')) {
            whatsappBtn.classList.add('show');
        }
    }, 3500);
});

// Navigation functionality with enhanced animations
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('nav-open', isOpen);
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });

    // Enhanced scroll animations
    initScrollAnimations();
    
    // Parallax effects
    initParallaxEffects();
    
    // Custom cursor - REMOVED for cleaner UX
    
    // Enhanced hover effects
    initHoverEffects();

    // Calculator functionality
    const calculatorForm = document.getElementById('eventCalculator');
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', handleCalculatorSubmit);
    }

    // Consultation form
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', handleConsultationSubmit);
    }
    
    // Initialize floating animations
    initFloatingAnimations();
    
    // Add smooth scrolling for all internal links
    initSmoothScrolling();
});

// Enhanced Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation for grid items
                if (entry.target.parentElement.classList.contains('features-grid') ||
                    entry.target.parentElement.classList.contains('team-grid') ||
                    entry.target.parentElement.classList.contains('features-list')) {
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(`
        .feature-card, 
        .team-member, 
        .service-card, 
        .feature-item, 
        .about-text p,
        .info-item,
        .stat-item
    `);
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Special observer for stats counters
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animate');
                entry.target.classList.add('animated');
                
                // Animate counter if it's a stat item
                if (entry.target.classList.contains('stat-item')) {
                    const numberElement = entry.target.querySelector('.stat-number');
                    const target = parseInt(numberElement.getAttribute('data-target'));
                    animateCounter(numberElement, 0, target, 2000);
                }
            }
        });
    }, { threshold: 0.5 });
    
    // Observe stat items separately for counter animation
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => statsObserver.observe(item));
}

// Parallax Effects
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::before, .page-hero::before');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Custom Cursor - REMOVED for cleaner UX
// function initCustomCursor() {
//     if (window.innerWidth > 768) {
//         const cursor = document.createElement('div');
//         cursor.className = 'custom-cursor';
//         document.body.appendChild(cursor);

//         document.addEventListener('mousemove', (e) => {
//             cursor.style.left = e.clientX - 10 + 'px';
//             cursor.style.top = e.clientY - 10 + 'px';
//         });

//         // Hide cursor when leaving window
//         document.addEventListener('mouseleave', () => {
//             cursor.style.opacity = '0';
//         });

//         document.addEventListener('mouseenter', () => {
//             cursor.style.opacity = '1';
//         });

//         // Scale cursor on hover
//         const hoverElements = document.querySelectorAll('a, button, .btn, .feature-card, .team-member');
//         hoverElements.forEach(el => {
//             el.addEventListener('mouseenter', () => {
//                 cursor.style.transform = 'scale(1.5)';
//             });
            
//             el.addEventListener('mouseleave', () => {
//                 cursor.style.transform = 'scale(1)';
//             });
//         });
//     }
// }

// Enhanced Hover Effects
function initHoverEffects() {
    // Add magnetic effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });

    // Add tilt effect to cards
    const cards = document.querySelectorAll('.feature-card, .service-card, .team-member');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) / (rect.width / 2);
            const deltaY = (e.clientY - centerY) / (rect.height / 2);
            
            card.style.transform = `
                perspective(1000px) 
                rotateY(${deltaX * 5}deg) 
                rotateX(${-deltaY * 5}deg) 
                translateZ(10px)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Floating Animations
function initFloatingAnimations() {
    const floatingElements = document.querySelectorAll('.placeholder-image');
    
    floatingElements.forEach((el, index) => {
        const delay = index * 0.5;
        const duration = 3 + (index % 3);
        
        el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
}

// Add floating keyframes
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(floatingStyle);

// Smooth Scrolling
function initSmoothScrolling() {
    document.documentElement.classList.add('smooth-scroll');
    
    // Enhanced smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced Calculator Logic
function handleCalculatorSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const eventType = formData.get('eventType');
    const guestsCount = parseInt(formData.get('guestsCount'));
    const duration = formData.get('duration');
    const eventDate = formData.get('eventDate');
    
    if (!eventType || !guestsCount || !duration || !eventDate) {
        showNotification('Пожалуйста, заполните все поля', 'error');
        return;
    }
    
    // Add loading animation
    const submitBtn = e.target.querySelector('.btn-calculate');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
        const result = calculateEventCost(eventType, guestsCount, duration, eventDate);
        displayCalculatorResult(result);
        
        submitBtn.innerHTML = originalHTML;
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }, 1500);
}

function calculateEventCost(eventType, guestsCount, duration, eventDate) {
    // НОВАЯ ЛОГИКА РАСЧЕТА
    // Базовые расценки
    const hallRent = 70000; // Аренда зала фиксированная
    const menuPerGuest = 5500; // Меню на человека
    const corkagePerGuest = 500; // Пробковый сбор на человека
    const servicePercent = 15; // Сервисный сбор 15%
    
    // Коэффициенты типа мероприятия
    const eventMultipliers = {
        'wedding': 1.5,      // Свадьбы дороже
        'business': 0.8,     // Бизнес-встречи проще
        'corporate': 1.2,    // Корпоративы средне
        'birthday': 1.0      // День рождения базово
    };
    
    // Коэффициенты продолжительности для зала
    const durationMultipliers = {
        '2': 0.5,    // 2-3 часа - половина стоимости зала
        '4': 1.0,    // 4-6 часов - полная стоимость
        '8': 1.5,    // Полный день - +50%
        '24': 3.0    // Несколько дней - тройная стоимость
    };
    
    // Рассчитываем базовую стоимость
    let baseCost = 0;
    
    // Аренда зала с учетом продолжительности
    const adjustedHallRent = hallRent * (durationMultipliers[duration] || 1.0);
    baseCost += adjustedHallRent;
    
    // Меню на всех гостей
    const menuCost = menuPerGuest * guestsCount;
    baseCost += menuCost;
    
    // Пробковый сбор на всех гостей
    const corkageCost = corkagePerGuest * guestsCount;
    baseCost += corkageCost;
    
    // Применяем коэффициент типа мероприятия
    const eventMultiplier = eventMultipliers[eventType] || 1.0;
    baseCost *= eventMultiplier;
    
    // Сервисный сбор 15%
    const serviceFee = baseCost * (servicePercent / 100);
    
    // Итоговая стоимость
    const totalCost = Math.round(baseCost + serviceFee);
    
    return {
        totalCost: totalCost,
        hallRent: adjustedHallRent,
        menuCost: menuCost,
        corkageCost: corkageCost,
        serviceFee: serviceFee,
        eventType: eventType,
        guestsCount: guestsCount,
        duration: duration,
        eventDate: eventDate,
        eventMultiplier: eventMultiplier
    };
}

function displayCalculatorResult(result) {
    const calculatorResult = document.getElementById('calculatorResult');
    const resultPrice = document.getElementById('resultPrice');
    const resultDetails = document.getElementById('resultDetails');
    
    if (!calculatorResult || !resultPrice || !resultDetails) return;
    
    // Event type names
    const eventTypeNames = {
        'wedding': 'Свадьба',
        'business': 'Бизнес-встреча',
        'corporate': 'Корпоратив',
        'birthday': 'День рождения'
    };
    
    // Duration names
    const durationNames = {
        '2': '2-3 часа',
        '4': '4-6 часов',
        '8': 'Полный день',
        '24': 'Многодневное событие'
    };
    
    // Format date for display
    const eventDate = new Date(result.eventDate);
    const formattedDate = eventDate.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Create modern breakdown HTML
    const details = `
        <p><span>Тип мероприятия:</span> <strong>${eventTypeNames[result.eventType]}</strong></p>
        <p><span>Количество гостей:</span> <strong>${result.guestsCount} чел.</strong></p>
        <p><span>Продолжительность:</span> <strong>${durationNames[result.duration]}</strong></p>
        <p><span>Дата мероприятия:</span> <strong>${formattedDate}</strong></p>
        <hr style="margin: 1rem 0; border: none; border-top: 1px solid rgba(212, 175, 55, 0.3);">
        <p><span>Аренда зала:</span> <strong>${new Intl.NumberFormat('ru-RU').format(result.hallRent)} ₽</strong></p>
        <p><span>Меню (${new Intl.NumberFormat('ru-RU').format(5500)} ₽/чел.):</span> <strong>${new Intl.NumberFormat('ru-RU').format(result.menuCost)} ₽</strong></p>
        <p><span>Пробковый сбор (500 ₽/чел.):</span> <strong>${new Intl.NumberFormat('ru-RU').format(result.corkageCost)} ₽</strong></p>
        <p><span>Сервисный сбор (15%):</span> <strong>${new Intl.NumberFormat('ru-RU').format(result.serviceFee)} ₽</strong></p>
        <hr style="margin: 1rem 0; border: none; border-top: 2px solid var(--color-gold);">
        <p><span>Итого:</span> <strong>${new Intl.NumberFormat('ru-RU').format(result.totalCost)} ₽</strong></p>
    `;
    
    resultDetails.innerHTML = details;
    
    // Hide form and show result
    document.querySelector('.calculator-form-modern').style.display = 'none';
    calculatorResult.style.display = 'block';
    
    // Animate result appearance
    setTimeout(() => {
        calculatorResult.classList.add('show');
        
        // Animate price counting up after result is visible
        setTimeout(() => {
            animateCounter(resultPrice, 0, result.totalCost, 2000, ' ₽');
        }, 300);
        
    }, 100);
    
    // Smooth scroll to result
    setTimeout(() => {
        calculatorResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 800);
    
    // Add celebration effect for high-value calculations
    if (result.totalCost > 1000000) {
        setTimeout(() => {
            createCelebrationEffect();
        }, 1000);
    }
}

// Animated Counter
function animateCounter(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        // For stat counters, just show the number (suffix is handled by CSS)
        if (element.classList.contains('stat-number')) {
            element.textContent = current;
        } else {
            element.textContent = new Intl.NumberFormat('ru-RU').format(current) + suffix;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Celebration Effect
function createCelebrationEffect() {
    const colors = ['#d4af37', '#c9b037', '#e8b4a0'];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(colors[Math.floor(Math.random() * colors.length)]);
    }
}

function createParticle(color) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: 50%;
        top: 50%;
    `;
    
    document.body.appendChild(particle);
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 300 + 100;
    const gravity = 500;
    const life = Math.random() * 2000 + 1000;
    
    let x = 0, y = 0;
    let vx = Math.cos(angle) * velocity;
    let vy = Math.sin(angle) * velocity;
    
    const startTime = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const dt = elapsed / 1000;
        
        vy += gravity * dt;
        x += vx * dt;
        y += vy * dt;
        
        particle.style.transform = `translate(${x}px, ${y}px)`;
        particle.style.opacity = Math.max(0, 1 - elapsed / life);
        
        if (elapsed < life) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }
    
    requestAnimationFrame(animate);
}

function resetCalculator() {
    const calculatorForm = document.getElementById('eventCalculator');
    const calculatorResult = document.getElementById('calculatorResult');
    const calculatorFormModern = document.querySelector('.calculator-form-modern');
    
    if (calculatorForm && calculatorResult && calculatorFormModern) {
        // Reset form data
        calculatorForm.reset();
        
        // Hide result with animation
        calculatorResult.classList.remove('show');
        
        setTimeout(() => {
            calculatorResult.style.display = 'none';
            calculatorFormModern.style.display = 'block';
            
            // Scroll back to form with smooth animation
            calculatorFormModern.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
        
        // Remove any validation classes
        const formFields = document.querySelectorAll('.form-field');
        formFields.forEach(field => {
            field.classList.remove('success', 'error');
        });
    }
}

// Enhanced Modal functionality
function openConsultationModal() {
    const modal = document.getElementById('consultationModal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
        document.body.style.overflow = 'hidden';
        
        // Pre-fill form with calculator data if available
        prefillConsultationForm();
    }
}

function closeConsultationModal() {
    const modal = document.getElementById('consultationModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

function prefillConsultationForm() {
    const resultDetails = document.getElementById('resultDetails');
    const messageField = document.getElementById('consultationMessage');
    
    if (resultDetails && messageField && resultDetails.innerHTML.trim()) {
        const eventTypeMatch = resultDetails.textContent.match(/Тип мероприятия:\s*(.+)/);
        const guestsMatch = resultDetails.textContent.match(/Количество гостей:\s*(\d+)/);
        
        if (eventTypeMatch && guestsMatch) {
            const prefilledMessage = `Здравствуйте! Я заинтересован(а) в организации мероприятия.\n\n` +
                `Тип: ${eventTypeMatch[1]}\n` +
                `Количество гостей: ${guestsMatch[1]}\n\n` +
                `Прошу связаться со мной для обсуждения деталей и уточнения стоимости.`;
            
            messageField.value = prefilledMessage;
        }
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('consultationModal');
    if (modal && e.target === modal) {
        closeConsultationModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeConsultationModal();
    }
});

// Enhanced consultation form submission
function handleConsultationSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('clientName');
    const phone = formData.get('clientPhone');
    const email = formData.get('clientEmail');
    const message = formData.get('consultationMessage');
    
    if (!name || !phone || !email) {
        showNotification('Пожалуйста, заполните обязательные поля', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Пожалуйста, введите корректный email', 'error');
        return;
    }
    
    if (!validatePhone(phone)) {
        showNotification('Пожалуйста, введите корректный номер телефона', 'error');
        return;
    }
    
    // Add loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправляем...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showNotification(`Спасибо, ${name}! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.`, 'success');
        
        // Reset form and close modal
        e.target.reset();
        closeConsultationModal();
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // In real application, here would be AJAX request to send data to server
        console.log('Form data:', { name, phone, email, message });
    }, 1500);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    `;
    
    // Set background color based on type
    const colors = {
        success: 'linear-gradient(135deg, #27ae60, #2ecc71)',
        error: 'linear-gradient(135deg, #e74c3c, #c0392b)',
        info: 'linear-gradient(135deg, #3498db, #2980b9)'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return re.test(phone);
}

// Real-time form validation with enhanced UX
document.addEventListener('input', function(e) {
    if (e.target.type === 'email') {
        const isValid = !e.target.value || validateEmail(e.target.value);
        updateFieldValidation(e.target, isValid);
    }
    
    if (e.target.type === 'tel') {
        const isValid = !e.target.value || validatePhone(e.target.value);
        updateFieldValidation(e.target, isValid);
    }
    
    if (e.target.required && e.target.value.trim()) {
        updateFieldValidation(e.target, true);
    }
});

// Enhanced select interactions
document.addEventListener('change', function(e) {
    if (e.target.tagName === 'SELECT') {
        // Add animation class
        e.target.classList.add('value-changed');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            e.target.classList.remove('value-changed');
        }, 300);
        
        // Create ripple effect
        createSelectRipple(e.target);
        
        // Show success validation
        if (e.target.value) {
            updateFieldValidation(e.target, true);
        }
    }
});

// Create ripple effect for select elements
function createSelectRipple(selectElement) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%);
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 0;
        animation: selectRipple 0.6s ease-out;
    `;
    
    const formGroup = selectElement.closest('.form-group');
    formGroup.style.position = 'relative';
    formGroup.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Add ripple animation to CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes selectRipple {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

function updateFieldValidation(field, isValid) {
    // Try to find modern form field first, then fallback to legacy
    const formField = field.closest('.form-field') || field.closest('.form-group');
    
    if (formField) {
        if (isValid) {
            // Remove error class and add success class
            formField.classList.remove('error');
            formField.classList.add('success');
            
            // Legacy styles for non-premium/non-modern forms
            if (!formField.classList.contains('premium') && !formField.classList.contains('form-field')) {
                field.style.borderColor = '#27ae60';
                field.style.boxShadow = '0 0 10px rgba(39, 174, 96, 0.2)';
            }
            
            // Add success animation
            field.style.animation = 'successPulse 0.3s ease-out';
            setTimeout(() => {
                field.style.animation = '';
            }, 300);
            
        } else {
            // Remove success class and add error class
            formField.classList.remove('success');
            formField.classList.add('error');
            
            // Legacy styles for non-premium/non-modern forms
            if (!formField.classList.contains('premium') && !formField.classList.contains('form-field')) {
                field.style.borderColor = '#e74c3c';
                field.style.boxShadow = '0 0 10px rgba(231, 76, 60, 0.2)';
            }
            
            // Add error shake animation
            field.style.animation = 'errorShake 0.5s ease-out';
            setTimeout(() => {
                field.style.animation = '';
            }, 500);
        }
    }
}

// Add success and error animations
const validationStyle = document.createElement('style');
validationStyle.textContent = `
    @keyframes successPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
    
    @keyframes errorShake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
        20%, 40%, 60%, 80% { transform: translateX(3px); }
    }
`;
document.head.appendChild(validationStyle);

// Enhanced navigation with scroll spy
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Page transition effects
function initPageTransitions() {
    // Add fade effect when navigating between pages
    const links = document.querySelectorAll('a[href$=".html"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
}

// Mobile navigation enhancement
function initMobileNavigation() {
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 70px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 70px);
                background: linear-gradient(135deg, var(--color-white) 0%, var(--color-light) 100%);
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                padding-top: var(--spacing-xl);
                transition: left 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
                backdrop-filter: blur(20px);
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .nav-menu li {
                margin: var(--spacing-md) 0;
                opacity: 0;
                transform: translateX(-50px);
                transition: opacity 0.3s ease, transform 0.3s ease;
            }
            
            .nav-menu.active li {
                opacity: 1;
                transform: translateX(0);
            }
            
            .nav-menu.active li:nth-child(1) { transition-delay: 0.1s; }
            .nav-menu.active li:nth-child(2) { transition-delay: 0.2s; }
            .nav-menu.active li:nth-child(3) { transition-delay: 0.3s; }
            .nav-menu.active li:nth-child(4) { transition-delay: 0.4s; }
            
            .nav-menu a {
                font-size: 1.2rem;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                transition: all 0.3s ease;
            }
            
            .nav-menu a:hover {
                background: rgba(139, 154, 119, 0.1);
            }
            
            .nav-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .nav-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .nav-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Performance optimization: Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Dynamic background effects
function initDynamicBackgrounds() {
    const hero = document.querySelector('.hero');
    if (hero) {
        // Add subtle mouse-follow effect
        hero.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            
            hero.style.backgroundPosition = `${x}% ${y}%`;
        });
    }
}

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', function() {
    initScrollSpy();
    initPageTransitions();
    initMobileNavigation();
    initLazyLoading();
    initDynamicBackgrounds();
    
    // Add entrance animation to body
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        }, 0);
    });
}

// Contact selector functionality
function toggleContactOptions() {
    const contactOptions = document.getElementById('contactOptions');
    const isVisible = contactOptions.style.display === 'block';
    
    if (isVisible) {
        contactOptions.style.display = 'none';
    } else {
        contactOptions.style.display = 'block';
    }
}

// Close contact options when clicking outside
document.addEventListener('click', function(event) {
    const contactSelector = document.querySelector('.contact-selector');
    const contactOptions = document.getElementById('contactOptions');
    
    if (contactSelector && contactOptions && !contactSelector.contains(event.target)) {
        contactOptions.style.display = 'none';
    }
});

// Contact selection for consultation modal
function selectContact(method) {
    // Remove selected class from all choices
    document.querySelectorAll('.contact-choice').forEach(choice => {
        choice.classList.remove('selected');
    });
    
    // Add selected class to clicked choice
    event.target.closest('.contact-choice').classList.add('selected');
    
    // Set radio button value
    const radio = event.target.closest('.contact-choice').querySelector('input[type="radio"]');
    radio.checked = true;
    
    // Show contact details section
    const contactDetails = document.getElementById('contactDetails');
    const contactLabel = document.getElementById('contactLabel');
    const contactValue = document.getElementById('contactValue');
    
    // Update label and placeholder based on selected method
    const contactConfig = {
        'whatsapp': {
            label: '📱 Ваш WhatsApp',
            placeholder: '+7 (999) 123-45-67',
            type: 'tel'
        },
        'phone': {
            label: '📞 Ваш телефон',
            placeholder: '+7 (999) 123-45-67',
            type: 'tel'
        },
        'telegram': {
            label: '✈️ Ваш Telegram',
            placeholder: '@username или +7 (999) 123-45-67',
            type: 'text'
        },
        'email': {
            label: '✉️ Ваш Email',
            placeholder: 'example@mail.com',
            type: 'email'
        }
    };
    
    const config = contactConfig[method];
    contactLabel.textContent = config.label;
    contactValue.placeholder = config.placeholder;
    contactValue.type = config.type;
    contactValue.value = '';
    
    // Show contact details with animation
    contactDetails.style.display = 'block';
}