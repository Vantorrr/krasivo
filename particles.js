// Particle System for Premium Effect
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.createParticles();
        this.animate();
        this.handleResize();
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.canvas.style.opacity = '0.6';
        
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.resizeCanvas();
    }
    
    resizeCanvas() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }
    
    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new Particle(this.canvas.width, this.canvas.height));
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.update();
            particle.draw(this.ctx);
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    handleResize() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.particles = [];
            this.createParticles();
        });
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

class Particle {
    constructor(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = this.getRandomColor();
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        
        // Floating animation
        this.angle = Math.random() * Math.PI * 2;
        this.amplitude = Math.random() * 20 + 10;
        this.frequency = Math.random() * 0.02 + 0.01;
    }
    
    getRandomColor() {
        const colors = [
            'rgba(212, 175, 55, ',
            'rgba(201, 176, 55, ',
            'rgba(232, 180, 160, ',
            'rgba(139, 154, 119, ',
            'rgba(156, 169, 134, '
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        // Basic movement
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Floating effect
        this.angle += this.frequency;
        this.y += Math.sin(this.angle) * 0.1;
        
        // Wrap around edges
        if (this.x > this.canvasWidth) this.x = 0;
        if (this.x < 0) this.x = this.canvasWidth;
        if (this.y > this.canvasHeight) this.y = 0;
        if (this.y < 0) this.y = this.canvasHeight;
        
        // Pulse opacity
        this.opacity += Math.sin(this.angle * 2) * 0.005;
        this.opacity = Math.max(0.1, Math.min(0.6, this.opacity));
    }
    
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color + this.opacity + ')';
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color + '0.3)';
        ctx.fill();
        
        ctx.restore();
    }
}

// Mouse Interaction Effects
class MouseInteraction {
    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.createMouseTrail();
        });
    }
    
    createMouseTrail() {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.cssText = `
            position: fixed;
            left: ${this.mouseX}px;
            top: ${this.mouseY}px;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            animation: mouseTrailFade 0.8s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 800);
    }
}

// Add mouse trail CSS
const mouseTrailStyle = document.createElement('style');
mouseTrailStyle.textContent = `
    @keyframes mouseTrailFade {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.3);
        }
    }
`;
document.head.appendChild(mouseTrailStyle);

// Intersection Observer for Advanced Animations
class AdvancedAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupTextReveal();
        this.setupStaggeredAnimations();
        this.setupMorphingShapes();
    }
    
    setupTextReveal() {
        const textElements = document.querySelectorAll('h1, h2, h3, .hero-description');
        
        textElements.forEach(element => {
            const text = element.textContent;
            const words = text.split(' ');
            
            element.innerHTML = words.map(word => 
                `<span class="word-reveal">${word}</span>`
            ).join(' ');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const wordSpans = entry.target.querySelectorAll('.word-reveal');
                        wordSpans.forEach((span, index) => {
                            setTimeout(() => {
                                span.style.opacity = '1';
                                span.style.transform = 'translateY(0)';
                            }, index * 100);
                        });
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(element);
        });
    }
    
    setupStaggeredAnimations() {
        const gridContainers = document.querySelectorAll('.features-grid, .team-grid, .services-grid');
        
        gridContainers.forEach(container => {
            const items = container.children;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        Array.from(items).forEach((item, index) => {
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, index * 150);
                        });
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(container);
        });
    }
    
    setupMorphingShapes() {
        const placeholderImages = document.querySelectorAll('.placeholder-image');
        
        placeholderImages.forEach(placeholder => {
            placeholder.addEventListener('mouseenter', () => {
                this.createMorphingEffect(placeholder);
            });
        });
    }
    
    createMorphingEffect(element) {
        const morphShape = document.createElement('div');
        morphShape.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, 
                rgba(212, 175, 55, 0.2) 0%, 
                rgba(232, 180, 160, 0.2) 50%, 
                rgba(139, 154, 119, 0.2) 100%);
            border-radius: 50%;
            transform: scale(0);
            transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.appendChild(morphShape);
        
        setTimeout(() => {
            morphShape.style.transform = 'scale(1.2)';
            morphShape.style.borderRadius = '0%';
        }, 10);
        
        setTimeout(() => {
            if (morphShape.parentNode) {
                morphShape.parentNode.removeChild(morphShape);
            }
        }, 600);
    }
}

// Scroll-triggered Animations
class ScrollAnimations {
    constructor() {
        this.lastScrollTop = 0;
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            this.handleScrollDirection();
            this.updateParallaxElements();
        });
    }
    
    handleScrollDirection() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector('.header');
        
        if (scrollTop > this.lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        this.lastScrollTop = scrollTop;
    }
    
    updateParallaxElements() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// Initialize all effects when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle systems for specific sections
    const heroSection = document.querySelector('.hero');
    const statsSection = document.querySelector('.stats');
    
    if (heroSection) {
        new ParticleSystem(heroSection);
    }
    
    if (statsSection) {
        new ParticleSystem(statsSection);
    }
    
    // Initialize mouse interaction
    if (window.innerWidth > 768) {
        new MouseInteraction();
    }
    
    // Initialize advanced animations
    new AdvancedAnimations();
    new ScrollAnimations();
    
    // Add word reveal styles
    const wordRevealStyle = document.createElement('style');
    wordRevealStyle.textContent = `
        .word-reveal {
            display: inline-block;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .parallax-element {
            will-change: transform;
        }
    `;
    document.head.appendChild(wordRevealStyle);
});

// Performance optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        this.lazyLoadImages();
        this.optimizeAnimations();
    }
    
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
    
    optimizeAnimations() {
        // Reduce animations on low-performance devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            document.body.classList.add('reduced-motion');
            
            const reducedMotionStyle = document.createElement('style');
            reducedMotionStyle.textContent = `
                .reduced-motion * {
                    animation-duration: 0.1s !important;
                    transition-duration: 0.1s !important;
                }
            `;
            document.head.appendChild(reducedMotionStyle);
        }
    }
}

// Initialize performance optimizations
new PerformanceOptimizer();