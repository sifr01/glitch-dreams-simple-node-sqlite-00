// formatDate.js

// Function to format the date
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    // Adjust for UTC+1
    const utcOffset = 1; // UTC+1
    const adjustedDate = new Date(date.getTime() + utcOffset * 60 * 60 * 1000);

    const options = { weekday: 'long' }; // Get the full name of the weekday
    const weekday = adjustedDate.toLocaleDateString('en-US', options).slice(0, 3); // Shorten to first 3 letters
    const hours = String(adjustedDate.getHours()).padStart(2, '0'); // Format hours
    const minutes = String(adjustedDate.getMinutes()).padStart(2, '0'); // Format minutes
    const day = String(adjustedDate.getDate()).padStart(2, '0'); // Format day
    const month = String(adjustedDate.getMonth() + 1).padStart(2, '0'); // Format month (0-indexed)
    const year = adjustedDate.getFullYear(); // Get the full year

    // Check if the date is today
    const today = new Date();
    const isToday = adjustedDate.getDate() === today.getDate() &&
                    adjustedDate.getMonth() === today.getMonth() &&
                    adjustedDate.getFullYear() === today.getFullYear();

    return {
        formattedDate: `${weekday}, ${hours}:${minutes}, ${day}-${month}-${year}`,
        isToday: isToday
    };
};