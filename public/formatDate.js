// formatDate.js

// Function to format the date
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long' }; // Get the full name of the weekday
    const weekday = date.toLocaleDateString('en-US', options).slice(0, 3); // Shorten to first 3 letters
    const hours = String(date.getHours()).padStart(2, '0'); // Format hours
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Format minutes
    const day = String(date.getDate()).padStart(2, '0'); // Format day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Format month (0-indexed)
    const year = date.getFullYear(); // Get the full year

    // Check if the date is today
    const today = new Date();
    const isToday = date.getDate() === today.getDate() &&
                    date.getMonth() === today.getMonth() &&
                    date.getFullYear() === today.getFullYear();

    return {
        formattedDate: `${weekday}, ${hours}:${minutes}, ${day}-${month}-${year}`,
        isToday: isToday
    };
};