// switchTab.js
    
// Function to switch tabs
export const switchTab = (activeTab) => {
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Add active class to the clicked tab
    activeTab.classList.add('active');
};