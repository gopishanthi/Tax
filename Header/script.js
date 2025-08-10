// India Post Employee Portal - JavaScript
// Minimal functionality for interactive elements

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize the portal
    console.log('India Post Employee Portal loaded successfully');
    
    // Collapsible Header Functionality
    const topHeader = document.getElementById('topHeader');
    const headerToggleBtn = document.getElementById('headerToggleBtn');
    const toggleIcon = document.getElementById('toggleIcon');
    const restoreToggleBtn = document.getElementById('restoreToggleBtn');
    const restoreIcon = document.getElementById('restoreIcon');
    const primaryHeader = document.querySelector('.primary-header');
    const mainContent = document.querySelector('.main-content');
    
    let isHeaderCollapsed = false;
    
    if (headerToggleBtn && restoreToggleBtn) {
        console.log('Both buttons found:', headerToggleBtn, restoreToggleBtn);
        
        // Collapse button functionality
        headerToggleBtn.addEventListener('click', function() {
            console.log('Collapse button clicked');
            isHeaderCollapsed = true;
            
            // Collapse header
            topHeader.classList.add('collapsed');
            headerToggleBtn.style.display = 'none';
            restoreToggleBtn.style.display = 'flex';
            primaryHeader.classList.add('header-collapsed');
            mainContent.classList.add('header-collapsed');
            
            // Show toast notification
            showToast('Header collapsed. Click Restore to bring it back.');
            
            console.log('Header collapsed, restore button should be visible');
            console.log('Restore button display:', restoreToggleBtn.style.display);
        });
        
        // Restore button functionality
        restoreToggleBtn.addEventListener('click', function() {
            console.log('Restore button clicked');
            isHeaderCollapsed = false;
            
            // Expand header (restore)
            topHeader.classList.remove('collapsed');
            headerToggleBtn.style.display = 'flex';
            restoreToggleBtn.style.display = 'none';
            primaryHeader.classList.remove('header-collapsed');
            mainContent.classList.remove('header-collapsed');
            
            // Show toast notification
            showToast('Header restored successfully!');
            
            console.log('Header restored');
        });
        
        // Set initial titles
        headerToggleBtn.title = 'Collapse Header';
        restoreToggleBtn.title = 'Restore Header';
    } else {
        console.error('Toggle buttons not found:', {
            headerToggleBtn: !!headerToggleBtn,
            restoreToggleBtn: !!restoreToggleBtn
        });
    }
    
    // Simple image loading confirmation
    const logoImg = document.querySelector('.india-post-logo');
    const emblemImg = document.querySelector('.emblem');
    
    if (logoImg) {
        logoImg.addEventListener('load', function() {
            console.log('✅ India Post logo loaded successfully');
        });
    }
    
    if (emblemImg) {
        emblemImg.addEventListener('load', function() {
            console.log('✅ Emblem of India loaded successfully');
        });
    }
    
    // Notification button functionality
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            // Placeholder for notification functionality
            console.log('Notification button clicked');
            showToast('Notifications feature coming soon!');
        });
    }
    
    // Profile icon functionality
    const profileIcon = document.querySelector('.profile-icon');
    if (profileIcon) {
        profileIcon.addEventListener('click', function() {
            // Placeholder for profile functionality
            console.log('Profile icon clicked');
            showToast('Profile settings coming soon!');
        });
    }
    
    // Search icon functionality
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            // Placeholder for search functionality
            console.log('Search icon clicked');
            showToast('Search feature coming soon!');
        });
    }
    
    // Bookmark icon functionality
    const bookmarkIcon = document.querySelector('.bookmark-icon');
    if (bookmarkIcon) {
        bookmarkIcon.addEventListener('click', function() {
            // Placeholder for bookmark functionality
            console.log('Bookmark icon clicked');
            showToast('Bookmarks feature coming soon!');
        });
    }
    
    // Smooth scroll behavior for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Simple image loading confirmation
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            console.log('Image loaded:', this.src);
        });
    });
    
    // Handle window resize for responsive design
    window.addEventListener('resize', function() {
        // Recalculate any dynamic positioning if needed
        console.log('Window resized - responsive adjustments applied');
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key to close any open modals (placeholder)
        if (e.key === 'Escape') {
            console.log('Escape key pressed');
        }
    });
    
    // Simple toast notification function
    function showToast(message) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #333;
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            font-size: 14px;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        // Add to page
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
    
    // Add hover effects for better interactivity
    const interactiveElements = document.querySelectorAll('.icon-btn, .profile-icon, .sidebar-icon');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Performance optimization: Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Handle resize logic here if needed
            console.log('Resize debounced');
        }, 250);
    });
    
    // Add accessibility improvements
    const focusableElements = document.querySelectorAll('button, [tabindex]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #007bff';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
    
    // Log portal initialization
    console.log('Portal initialization complete');
    console.log('Features: Interactive icons, responsive design, accessibility support');
    
});

// Export functions for potential future use
window.IndiaPostPortal = {
    showNotification: function(message) {
        // Public method for showing notifications
        if (typeof showToast === 'function') {
            showToast(message);
        }
    },
    
    getPortalInfo: function() {
        return {
            name: 'India Post Employee Portal',
            version: '1.0.0',
            features: ['Responsive Design', 'Interactive Icons', 'Accessibility Support']
        };
    }
}; 