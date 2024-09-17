// showTable.js

// Function to show the selected table and hide others
export const showTable = (tableToShow) => {
    // Hide all tab contents
    const tables = document.querySelectorAll('.tab-content');
    tables.forEach(tab => {
        tab.style.display = 'none';
    });

    // Show the selected table
    tableToShow.style.display = 'block';
}