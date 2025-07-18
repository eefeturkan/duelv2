// Job Detail Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Get job title from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const jobTitle = urlParams.get('title');
    
    if (jobTitle) {
        document.getElementById('jobTitle').textContent = decodeURIComponent(jobTitle);
        document.title = `${decodeURIComponent(jobTitle)} - Duel.com | Join the Revolution`;
    }
    
    // File upload functionality
    const fileInput = document.getElementById('resume');
    const fileLabel = fileInput.nextElementSibling;
    const originalText = fileLabel.querySelector('span').textContent;
    
    fileInput.addEventListener('change', function() {
        const fileName = this.files[0]?.name;
        const span = fileLabel.querySelector('span');
        
        if (fileName) {
            span.textContent = fileName;
            fileLabel.style.borderColor = 'var(--accent-purple)';
            fileLabel.style.backgroundColor = 'rgba(139, 92, 246, 0.15)';
            fileLabel.style.color = 'var(--accent-purple)';
        } else {
            span.textContent = originalText;
            fileLabel.style.borderColor = 'rgba(139, 92, 246, 0.3)';
            fileLabel.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
            fileLabel.style.color = 'var(--text-secondary)';
        }
    });
    
    // Form submission
    const applicationForm = document.getElementById('applicationForm');
    
    applicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {};
        
        // Convert FormData to regular object
        for (let [key, value] of formData.entries()) {
            if (key !== 'resume') {
                data[key] = value;
            }
        }
        
        // Add job title to the data
        data.position = jobTitle || 'Unknown Position';
        
        // Show loading state
        const submitBtn = document.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Submitting...</span>';
        submitBtn.disabled = true;
        
        // Simulate form submission (in real app, this would be an API call)
        setTimeout(() => {
            // Create mailto link with all the information
            const subject = encodeURIComponent(`Application for ${data.position} Position - ${data.fullName}`);
            const body = encodeURIComponent(`Hello Duel Team,

I am applying for the ${data.position} position. Here are my details:

Full Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Portfolio/GitHub: ${data.portfolio || 'Not provided'}
Experience Level: ${data.experience}
Expected Salary: ${data.salary || 'Not specified'}

Why I want to join the revolution:
${data.coverLetter}

Newsletter Subscription: ${data.newsletter ? 'Yes' : 'No'}

I have attached my resume/CV and look forward to hearing from you.

Best regards,
${data.fullName}`);
            
            const mailtoLink = `mailto:careers@duel.com?subject=${subject}&body=${body}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showSuccessMessage();
            
            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
        }, 2000);
    });
    
    // Success message function
    function showSuccessMessage() {
        // Create success modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(15, 15, 35, 0.8);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: rgba(26, 10, 46, 0.9);
            border: 1px solid rgba(139, 92, 246, 0.3);
            border-radius: 24px;
            padding: 40px;
            text-align: center;
            max-width: 400px;
            margin: 20px;
            backdrop-filter: blur(20px);
            box-shadow: 0 20px 60px rgba(139, 92, 246, 0.3);
        `;
        
        modalContent.innerHTML = `
            <div style="color: var(--accent-gold); font-size: 3rem; margin-bottom: 20px;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3 style="color: var(--text-primary); font-family: 'Space Grotesk', sans-serif; font-size: 1.5rem; margin-bottom: 15px;">
                Application Submitted!
            </h3>
            <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 25px;">
                Your email client should open with your application details. If it doesn't, please copy the information and send it manually to careers@duel.com
            </p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: linear-gradient(135deg, var(--accent-purple), var(--accent-blue));
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 12px;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.2s ease;
            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                Close
            </button>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Fade in
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 100);
        
        // Auto close after 8 seconds
        setTimeout(() => {
            if (modal.parentElement) {
                modal.remove();
            }
        }, 8000);
    }
    
    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation improvements
    const requiredFields = document.querySelectorAll('input[required], select[required], textarea[required]');
    
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = '#ef4444';
                this.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            } else {
                this.style.borderColor = 'var(--accent-purple)';
                this.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
            }
        });
        
        field.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                this.style.boxShadow = 'none';
            }
        });
    });
    
    // Add ripple effect to submit button
    const submitBtn = document.querySelector('.submit-btn');
    
    submitBtn.addEventListener('click', function(e) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
        `;
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
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
    🎯 ${jobTitle || 'Job Application'} - Duel.com
    
    🔥 Ready to join the revolution?
    💜 Apply now and help us tear down the industry!
    🚀 Built with passion, not profit.
    `);
    
}); 