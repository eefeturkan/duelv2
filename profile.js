// Profile Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation between sections
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.dataset.section;
            
            // Remove active class from all nav items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked nav item and corresponding section
            this.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
            
            // Smooth scroll to top of content
            document.querySelector('.profile-content').scrollTop = 0;
        });
    });
    
    // Transaction category toggle functionality removed to prevent conflicts with modal

    // Modal functionality
    const modal = document.getElementById('transactionModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.close');
    
    // Transaction data
    const transactionData = {
        win: {
            title: 'Game Wins',
            transactions: [
                { type: 'Game Win', amount: '+$150.00', time: '2 hours ago', date: '2024-01-15' },
                { type: 'Game Win', amount: '+$275.00', time: '1 day ago', date: '2024-01-14' },
                { type: 'Game Win', amount: '+$450.00', time: '3 days ago', date: '2024-01-12' },
                { type: 'Game Win', amount: '+$325.00', time: '5 days ago', date: '2024-01-10' },
                { type: 'Game Win', amount: '+$600.00', time: '1 week ago', date: '2024-01-08' },
                { type: 'Game Win', amount: '+$225.00', time: '1 week ago', date: '2024-01-07' },
                { type: 'Game Win', amount: '+$175.00', time: '2 weeks ago', date: '2024-01-01' }
            ]
        },
        deposit: {
            title: 'Deposits',
            transactions: [
                { type: 'Bank Deposit', amount: '+$500.00', time: '1 day ago', date: '2024-01-14' },
                { type: 'Credit Card Deposit', amount: '+$1,000.00', time: '1 week ago', date: '2024-01-08' },
                { type: 'Bank Deposit', amount: '+$750.00', time: '2 weeks ago', date: '2024-01-01' },
                { type: 'PayPal Deposit', amount: '+$300.00', time: '3 weeks ago', date: '2023-12-25' },
                { type: 'Bank Deposit', amount: '+$1,200.00', time: '1 month ago', date: '2023-12-15' },
                { type: 'Credit Card Deposit', amount: '+$450.00', time: '1 month ago', date: '2023-12-10' }
            ]
        },
        withdraw: {
            title: 'Withdrawals',
            transactions: [
                { type: 'Bank Withdrawal', amount: '-$300.00', time: '3 days ago', date: '2024-01-12' },
                { type: 'PayPal Withdrawal', amount: '-$450.00', time: '1 week ago', date: '2024-01-08' },
                { type: 'Bank Withdrawal', amount: '-$600.00', time: '2 weeks ago', date: '2024-01-01' },
                { type: 'Crypto Withdrawal', amount: '-$250.00', time: '3 weeks ago', date: '2023-12-25' },
                { type: 'Bank Withdrawal', amount: '-$200.00', time: '1 month ago', date: '2023-12-15' }
            ]
        },
        loss: {
            title: 'Game Losses',
            transactions: [
                { type: 'Game Loss', amount: '-$75.00', time: '2 days ago', date: '2024-01-13' },
                { type: 'Game Loss', amount: '-$125.00', time: '4 days ago', date: '2024-01-11' },
                { type: 'Game Loss', amount: '-$50.00', time: '6 days ago', date: '2024-01-09' },
                { type: 'Game Loss', amount: '-$200.00', time: '1 week ago', date: '2024-01-08' },
                { type: 'Game Loss', amount: '-$100.00', time: '2 weeks ago', date: '2024-01-01' },
                { type: 'Game Loss', amount: '-$150.00', time: '3 weeks ago', date: '2023-12-25' }
            ]
        }
    };

    // Add click event to transaction categories
    const transactionCategories = document.querySelectorAll('.transaction-category');
    
    transactionCategories.forEach(category => {
        category.addEventListener('click', function() {
            const categoryType = this.dataset.category;
            const data = transactionData[categoryType];
            
            if (data) {
                openModal(data);
            }
        });
    });

    function openModal(data) {
        modalTitle.textContent = data.title;
        modalBody.innerHTML = '';
        
        data.transactions.forEach(transaction => {
            const transactionElement = document.createElement('div');
            transactionElement.className = 'modal-transaction-item';
            
            const iconClass = transaction.amount.includes('+') ? 'win' : 
                            transaction.amount.includes('-') ? 'loss' : 'deposit';
            
            const iconSymbol = transaction.amount.includes('+') ? 'fa-arrow-up' : 
                              transaction.amount.includes('-') ? 'fa-arrow-down' : 'fa-plus';
            
            transactionElement.innerHTML = `
                <div class="transaction-icon ${iconClass}">
                    <i class="fas ${iconSymbol}"></i>
                </div>
                <div class="transaction-info">
                    <span class="transaction-type">${transaction.type}</span>
                    <span class="transaction-time">${transaction.time} - ${transaction.date}</span>
                </div>
                <span class="transaction-amount ${iconClass}">${transaction.amount}</span>
            `;
            
            modalBody.appendChild(transactionElement);
        });
        
        modal.style.display = 'block';
    }

    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Toggle switches functionality
    const toggleSwitches = document.querySelectorAll('.toggle-switch input[type="checkbox"]');
    
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const label = this.nextElementSibling.nextElementSibling;
            if (label && label.classList.contains('toggle-label')) {
                label.textContent = this.checked ? 'Enabled' : 'Disabled';
            }
            
            // Add visual feedback
            const toggleContainer = this.closest('.toggle-switch');
            toggleContainer.style.transform = 'scale(0.95)';
            setTimeout(() => {
                toggleContainer.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Form validation and submission
    const changeButtons = document.querySelectorAll('.btn-secondary');
    
    changeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            this.textContent = 'Saving...';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.textContent = 'Saved!';
                this.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                this.style.color = 'white';
                this.style.borderColor = '#10b981';
                
                setTimeout(() => {
                    this.textContent = 'Change';
                    this.style.background = '';
                    this.style.color = '';
                    this.style.borderColor = '';
                }, 2000);
            }, 1000);
        });
    });
    
    // Primary button actions
    const primaryButtons = document.querySelectorAll('.btn-primary');
    
    primaryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const buttonText = this.textContent;
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            this.textContent = 'Processing...';
            this.disabled = true;
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.textContent = 'Success!';
                
                setTimeout(() => {
                    this.textContent = buttonText;
                    this.disabled = false;
                }, 2000);
            }, 1500);
        });
    });
    
    // Animate statistics on load
    const statValues = document.querySelectorAll('.stat-value');
    
    function animateValue(element, start, end, duration, suffix = '') {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            
            if (suffix === '%') {
                element.textContent = current.toFixed(1) + suffix;
            } else if (suffix === '$') {
                element.textContent = suffix + Math.floor(current).toLocaleString();
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    }
    
    // Intersection Observer for stat animations
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValue = entry.target;
                const text = statValue.textContent;
                
                if (text.includes('$')) {
                    const value = parseInt(text.replace(/[$,]/g, ''));
                    animateValue(statValue, 0, value, 2000, '$');
                } else if (text.includes('%')) {
                    const value = parseFloat(text.replace('%', ''));
                    animateValue(statValue, 0, value, 2000, '%');
                } else {
                    const value = parseInt(text);
                    if (!isNaN(value)) {
                        animateValue(statValue, 0, value, 2000);
                    }
                }
                
                statsObserver.unobserve(statValue);
            }
        });
    }, { threshold: 0.5 });
    
    statValues.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.info-card, .stat-card, .transaction-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Simulate real-time updates
    function updateBalance() {
        const balanceElement = document.querySelector('.status-value.balance');
        if (balanceElement) {
            const currentBalance = parseFloat(balanceElement.textContent.replace(/[$,]/g, ''));
            const change = (Math.random() - 0.5) * 100; // Random change between -50 and +50
            const newBalance = Math.max(0, currentBalance + change);
            balanceElement.textContent = '$' + newBalance.toFixed(2);
            
            // Add visual feedback for balance changes
            if (change > 0) {
                balanceElement.style.color = '#10b981';
                setTimeout(() => {
                    balanceElement.style.color = '';
                }, 2000);
            } else if (change < 0) {
                balanceElement.style.color = '#ef4444';
                setTimeout(() => {
                    balanceElement.style.color = '';
                }, 2000);
            }
        }
    }
    
    // Update balance every 30 seconds (for demo purposes)
    setInterval(updateBalance, 30000);
    
    // Add loading states
    function addLoadingState(element) {
        element.style.opacity = '0.6';
        element.style.pointerEvents = 'none';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.pointerEvents = 'auto';
        }, 1000);
    }
    
    // Add click ripple effect
    function createRipple(event) {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.addEventListener('click', createRipple);
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Console easter egg
    console.log(`
    🎮 DUEL PROFILE SYSTEM
    =====================
    Welcome to your profile dashboard!
    
    Features:
    • Real-time balance updates
    • Interactive statistics
    • Security management
    • Transaction history with categories
    • Clickable transaction popups
    
    🔥 Ready to dominate the tables?
    `);
});